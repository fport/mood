/*
  Info for NLP: https://www.youtube.com/watch?v=rmVRLeJRkl4&list=PLoROMvodv4rMFqRtEuo6SGjY4XbRIVRd4
  LLM: Large Language Model
  Neural Network: https://www.youtube.com/watch?v=60c4rMq-aH0
  Transformers: https://www.youtube.com/watch?v=5vcj8kSwBCY
 */

import { z } from 'zod'
import { OpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).'
      ),
    summary: z.string().describe('quick summary of the entire entry.'),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
      )
  })
)

const getOpenAIModel = () => {
  return new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.OPENAI_API_KEY
  })
}

export const analyze = async (propmt: string) => {
  const model = getOpenAIModel()
  const result = await model.call(propmt)
  console.log({ result })
}