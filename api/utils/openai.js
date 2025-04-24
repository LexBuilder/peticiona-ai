import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function gerarEmbedding(texto) {
  const response = await openai.createEmbedding({
    model: "text-embedding-3-small",
    input: texto,
  });

  return response.data.data[0].embedding;
}
