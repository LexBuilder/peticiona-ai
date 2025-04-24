import { fetchCPCArticles } from "./utils/fetchCPC";
import { embedAndInsert } from "./utils/openai";

export default async function handler(req, res) {
  try {
    const artigos = await fetchCPCArticles();
    const resultados = [];

    for (const artigo of artigos) {
      const embedding = await embedAndInsert(artigo);
      resultados.push({ ...artigo, embedding });
    }

    res.status(200).json({ sucesso: true, artigos: resultados.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ sucesso: false, erro: error.message });
  }
}
