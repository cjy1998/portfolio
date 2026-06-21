import { embedText } from "./embeddings";
import { searchVectorStore, getAllChunks } from "./vectorstore";

/**
 * 检索与 query 最相关的知识片段，返回拼接后的上下文文本供注入 system prompt
 */
export async function retrieve(query: string, topK = 5): Promise<string> {
  const queryEmbedding = await embedText(query);
  const results = await searchVectorStore(queryEmbedding, topK);
  return results.map((r) => r.chunk.text).join("\n\n---\n\n");
}

/**
 * 降级用：返回全部知识文本（embedding 服务不可用时使用）
 */
export async function getAllKnowledgeAsText(): Promise<string> {
  const chunks = await getAllChunks();
  return chunks.map((c) => c.text).join("\n\n---\n\n");
}
