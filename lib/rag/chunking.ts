import type { KnowledgeDocument } from "./knowledge";

// 单个 chunk 的最大字符数，超出则按段落切分
const MAX_CHUNK_LENGTH = 500;

/**
 * 将知识文档切分为适合 embedding 的 chunks。
 * 大部分作品集段落本身较短会直接透传；超长段落（如 Markdown 文档）按段落聚合切分。
 */
export function chunkDocuments(docs: KnowledgeDocument[]): KnowledgeDocument[] {
  const chunks: KnowledgeDocument[] = [];

  for (const doc of docs) {
    if (doc.text.length <= MAX_CHUNK_LENGTH) {
      chunks.push(doc);
      continue;
    }

    // 按空行分段，再聚合到不超过 MAX_CHUNK_LENGTH
    const paragraphs = doc.text.split(/\n\n+/);
    let current = "";
    let idx = 0;

    for (const para of paragraphs) {
      const candidate = current ? `${current}\n\n${para}` : para;
      if (candidate.length > MAX_CHUNK_LENGTH && current) {
        chunks.push({ ...doc, id: `${doc.id}-${idx++}`, text: current });
        current = para;
      } else {
        current = candidate;
      }
    }
    if (current) {
      chunks.push({ ...doc, id: `${doc.id}-${idx}`, text: current });
    }
  }

  return chunks;
}
