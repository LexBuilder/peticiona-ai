import fetch from "node-fetch";
import * as cheerio from "cheerio";

export async function fetchCPCArticles() {
  const url = "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm";
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);
  const artigos = [];

  $("p.MsoNormal").each((_, el) => {
    const text = $(el).text().trim();
    if (/^Art\.\s?\d+/.test(text)) {
      const match = text.match(/^Art\.\s?\d+/);
      artigos.push({
        artigo: match[0],
        texto: text.replace(match[0], "").trim(),
        url: `${url}#${match[0].toLowerCase().replace(/\./g, "").replace(/\s/g, "")}`
      });
    }
  });

  return artigos;
}
