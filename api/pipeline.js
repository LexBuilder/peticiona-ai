import { fetchCPCArticles } from "./utils/fetchCPC.js";
import { gerarEmbedding } from "./utils/openai.js";
import { salvarArtigoComEmbedding } from "./utils/supabase.js";

export default async function handler(req, res) {
  try {
    const artigos = await fetchCPCArticles();

    for (const artigo of artigos) {
      const texto = `${artigo.artigo}: ${artigo.texto}`;
      const embedding = await gerarEmbedding(texto);
      await salvarArtigoComEmbedding(artigo, embedding);
      console.log("✅ Inserido:", artigo.artigo);
    }

    res.status(200).json({ sucesso: true, total: artigos.length });
  } catch (error) {
    console.error("❌ Erro:", error);
    res.status(500).json({ erro: error.message });
  }
}
