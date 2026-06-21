import { embed, embedMany } from "ai";
import { embeddingModel } from "@/lib/ai/provider";

/**
 * 对单条文本生成 embedding 向量
 */
export async function embedText(text: string): Promise<number[]> {
  const result = await embed({ model: embeddingModel, value: text });
  return result.embedding;
}

/**
 * 批量生成 embedding 向量
 */
export async function embedManyTexts(texts: string[]): Promise<number[][]> {
  const result = await embedMany({ model: embeddingModel, values: texts });
  return result.embeddings;
}
