import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

// 默认使用通义千问 DashScope（OpenAI 兼容协议），可通过 .env 切换智谱 GLM 等
const baseURL =
  process.env.AI_BASE_URL ||
  "https://dashscope.aliyuncs.com/compatible-mode/v1";
const apiKey = process.env.AI_API_KEY || "";
const chatModelName = process.env.AI_MODEL || "qwen-plus";
const embeddingModelName =
  process.env.AI_EMBEDDING_MODEL || "text-embedding-v2";

export const aiProvider = createOpenAICompatible({
  name: "ai-provider",
  baseURL,
  apiKey,
});

// 对话模型，用于 streamText
export const chatModel = aiProvider(chatModelName);

// Embedding 模型，用于 RAG 向量检索
export const embeddingModel = aiProvider.embeddingModel(embeddingModelName);

export const AI_CONFIG = {
  baseURL,
  chatModelName,
  embeddingModelName,
  hasApiKey: Boolean(apiKey),
};
