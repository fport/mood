/*
  Info for NLP: https://www.youtube.com/watch?v=rmVRLeJRkl4&list=PLoROMvodv4rMFqRtEuo6SGjY4XbRIVRd4
  LLM: Large Language Model
  Neural Network: https://www.youtube.com/watch?v=60c4rMq-aH0
  Transformers: https://www.youtube.com/watch?v=5vcj8kSwBCY
 */

import { OpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { loadQARefineChain } from 'langchain/chains'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'

import { z } from 'zod'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { Document } from 'langchain/document'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contlin negative emotions?).'
      ),
    summary: z.string().describe('quick summary of the entire entry.'),
    color: z
      .string()
      .describe(
        'a hexadecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
      )
  })
)

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions }
  })

  const input = await prompt.format({
    entry: content
  })

  return input
}

const getOpenAIModel = () => {
  return new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.OPENAI_API_KEY
  })
}

export const analyze = async (content: string) => {
  const input = await getPrompt(content)
  const model = getOpenAIModel()
  const result = await model.call(input)

  try {
    return parser.parse(result)
  } catch (error) {
    console.error('Failed to parse the output from the AI model.', error)
  }
}

export const qa = async (question: string, entries: any) => {
  const docs = entries.map(
    (entry: any) =>
      new Document({
        pageContent: entry.content,
        metadata: { source: entry.id, date: entry.createdAt }
      })
  )
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const chain = loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.call({
    input_documents: relevantDocs,
    question
  })

  return res.output_text
}