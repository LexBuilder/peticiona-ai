console.log("🚀 pipeline.js carregado");

import { fetchCPCArticles } from "./utils/fetchCPC";
import { embedAndInsert } from "./utils/openai";

export default async function handler(req, res) {
  console.log("🔍 Função /api/pipeline iniciada");

  try {
    const artigos = await fetchCPCArticles();
    console.log(`✅ ${artigos.length} artigos extraídos`);

    const resultados = [];

    for (const artigo of artigos) {
      const embedding = await embedAndInsert(artigo);
      resultados.push({ ...artigo, embedding });
    }

    res.status(200).json({ sucesso: true, artigos: resultados.length });
  } catch (error) {
    console.error("❌ Erro no pipeline:", error);
    res.status(500).json({ sucesso: false, erro: error.message });
  }
}
