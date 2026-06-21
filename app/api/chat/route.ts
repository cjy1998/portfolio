import { cookies, headers } from "next/headers";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { chatModel, AI_CONFIG } from "@/lib/ai/provider";
import { retrieve, getAllKnowledgeAsText } from "@/lib/rag/retriever";
import { rateLimit } from "@/lib/ai/ratelimit";
import { LOCALE_COOKIE, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

// 安全防护配置
const MAX_INPUT_LENGTH = 1000; // 单条消息最大字符数
const MAX_HISTORY_MESSAGES = 10; // 最多保留最近 N 条历史消息
const ALLOWED_ORIGINS = (process.env.AI_ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// 需要 Node.js runtime：使用 fs 读取 data/docs、cookies() 读取 locale
export const runtime = "nodejs";

const SYSTEM_PROMPT_CN = `你是陈建岩个人作品集网站的 AI 智能助手。你的职责是根据提供的资料库内容，准确回答访客关于站主个人简介、技能栈、项目经历等问题。

以下是检索到的相关资料（请优先基于这些资料回答）：

{context}

回答要求：
1. 优先基于上述资料回答；如资料中未提及，可结合常识但需说明
2. 使用简体中文回答
3. 回答简洁友好，适当使用 Markdown 格式（加粗、列表等）
4. 不要逐字复述资料原文，用自然语言组织回答`;

const SYSTEM_PROMPT_EN = `You are the AI assistant for Chen Jianyan's personal portfolio website. Your job is to answer visitors' questions about the site owner's profile, skills, and project experience based on the provided knowledge base.

Here is the retrieved relevant information (prioritize this when answering):

{context}

Guidelines:
1. Prioritize the information above; if not covered, you may use general knowledge but state it clearly
2. Respond in English
3. Keep answers concise and friendly, use Markdown formatting where appropriate
4. Do not copy the source text verbatim — rephrase naturally`;

/**
 * 从 UIMessage 数组中提取最后一条用户消息的文本内容
 */
function extractLastUserMessage(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role === "user") {
      return msg.parts
        .filter((p): p is { type: "text"; text: string } => p.type === "text")
        .map((p) => p.text)
        .join(" ");
    }
  }
  return "";
}

export async function POST(req: Request) {
  if (!AI_CONFIG.hasApiKey) {
    return new Response(
      JSON.stringify({
        error: "AI_API_KEY 未配置，请在 .env中设置 AI_API_KEY",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // ===== 安全防护 1: Origin / Referer 校验，防止跨站滥用 =====
  if (ALLOWED_ORIGINS.length > 0) {
    const reqHeaders = await headers();
    const origin = reqHeaders.get("origin") || "";
    const referer = reqHeaders.get("referer") || "";
    const isAllowed =
      ALLOWED_ORIGINS.some(
        (o) => origin === o || referer.startsWith(o)
      );
    if (!isAllowed) {
      return new Response(
        JSON.stringify({ error: "Forbidden origin" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // ===== 安全防护 2: 基于 IP 的速率限制 =====
  const reqHeaders = await headers();
  const ip =
    reqHeaders.get("x-forwarded-for")?.split(",")[0].trim() ||
    reqHeaders.get("x-real-ip") ||
    "unknown";
  if (!rateLimit(`chat:${ip}`)) {
    return new Response(
      JSON.stringify({ error: "请求过于频繁，请稍后再试" }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
        },
      }
    );
  }

  const { messages } = (await req.json()) as { messages: UIMessage[] };

  // ===== 安全防护 3: 输入长度限制 + 历史消息截断 =====
  const lastUserMessage = extractLastUserMessage(messages);
  if (lastUserMessage.length > MAX_INPUT_LENGTH) {
    return new Response(
      JSON.stringify({
        error: `单条消息不能超过 ${MAX_INPUT_LENGTH} 字符`,
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  // 只保留最近 N 条历史消息，防止注入超长上下文消耗 token
  const trimmedMessages = messages.slice(-MAX_HISTORY_MESSAGES);

  // 读取 locale 决定回答语言
  const cookieStore = await cookies();
  const locale =
    (cookieStore.get(LOCALE_COOKIE)?.value as Locale) || DEFAULT_LOCALE;

  // RAG 检索（带降级策略）
  let context = "";
  try {
    context = lastUserMessage
      ? await retrieve(lastUserMessage, 5)
      : await getAllKnowledgeAsText();
  } catch (e) {
    console.error("[AI Chat] RAG 检索失败，降级为全量上下文:", e);
    try {
      context = await getAllKnowledgeAsText();
    } catch {
      context = "";
    }
  }

  // 构建系统提示
  const template = locale === "en" ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_CN;
  const systemPrompt = template.replace("{context}", context || "（暂无相关资料）");

  // 转换 UIMessage → CoreMessage 供 streamText 使用（使用截断后的历史）
  const coreMessages = await convertToModelMessages(trimmedMessages);

  // 流式生成
  const result = streamText({
    model: chatModel,
    system: systemPrompt,
    messages: coreMessages,
  });

  return result.toUIMessageStreamResponse();
}
