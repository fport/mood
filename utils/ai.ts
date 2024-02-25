/*
  Info for NLP: https://www.youtube.com/watch?v=rmVRLeJRkl4&list=PLoROMvodv4rMFqRtEuo6SGjY4XbRIVRd4
  LLM: Large Language Model
  Nerual Network: https://www.youtube.com/watch?v=60c4rMq-aH0
  Transformars: https://www.youtube.com/watch?v=5vcj8kSwBCY
 */

import {OpenAI} from "@langchain/openai"

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
  console.log({ result });
}