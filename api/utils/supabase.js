import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function salvarArtigoComEmbedding(artigo, embedding) {
  const { error } = await supabase
    .from("artigos_legais")
    .insert([{ ...artigo, embedding }]);

  if (error) throw error;
}
