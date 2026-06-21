import type { KnowledgeDocument } from "./knowledge";
import { getKnowledgeDocuments } from "./knowledge";
import { chunkDocuments } from "./chunking";
import { embedManyTexts } from "./embeddings";

interface IndexedChunk extends KnowledgeDocument {
  embedding: number[];
}

interface VectorStore {
  chunks: IndexedChunk[];
}

// 模块级单例，服务运行期间持久缓存，避免重复 embedding
let store: VectorStore | null = null;

/**
 * 获取（或首次初始化）内存向量存储。
 * 首次调用时：聚合知识 → 切分 → 批量 embedding → 缓存。
 */
export async function getVectorStore(): Promise<VectorStore> {
  if (store) return store;

  const docs = getKnowledgeDocuments();
  const chunks = chunkDocuments(docs);
  const texts = chunks.map((c) => c.text);
  const embeddings = await embedManyTexts(texts);

  const indexed: IndexedChunk[] = chunks.map((c, i) => ({
    ...c,
    embedding: embeddings[i],
  }));

  store = { chunks: indexed };
  return store;
}

/**
 * 计算两个向量的余弦相似度
 */
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

export interface SearchResult {
  chunk: IndexedChunk;
  score: number;
}

/**
 * 基于余弦相似度检索 top-k 最相关的 chunks
 */
export async function searchVectorStore(
  queryEmbedding: number[],
  topK = 5
): Promise<SearchResult[]> {
  const s = await getVectorStore();
  const scored = s.chunks.map((chunk) => ({
    chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));
  scored.sort((a, b) => b.score - a.score);
  const k = Math.min(topK, s.chunks.length);
  return scored.slice(0, k);
}

/**
 * 降级策略：返回全部知识 chunks（embedding 不可用时使用）
 */
export async function getAllChunks(): Promise<KnowledgeDocument[]> {
  try {
    const s = await getVectorStore();
    return s.chunks;
  } catch {
    // embedding 完全不可用时，返回未向量化的 chunks
    return chunkDocuments(getKnowledgeDocuments());
  }
}
