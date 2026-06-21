"use client";

import { useEffect, useRef, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { cn } from "@/lib/utils";

interface ChatDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ChatDialog({ open, onClose }: ChatDialogProps) {
  const $t = useTranslations("AIAssistant");
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    []
  );
  const { messages, sendMessage, status, error } = useChat({ transport });

  const scrollRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "submitted" || status === "streaming";

  // 新消息自动滚动到底部
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages, status]);

  const suggestions = [
    $t("suggestion1"),
    $t("suggestion2"),
    $t("suggestion3"),
  ];

  const handleSend = (text: string) => {
    sendMessage({ text });
  };

  const hasMessages = messages.length > 0;

  return (
    <>
      {/* 移动端遮罩 */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:bg-transparent md:backdrop-blur-0"
          onClick={onClose}
        />
      )}

      {/* 聊天面板 */}
      <div
        className={cn(
          "fixed bottom-24 right-4 z-50 flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300 ease-out",
          "w-[calc(100vw-2rem)] max-w-[380px]",
          open
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "pointer-events-none translate-y-4 opacity-0"
        )}
        style={{ height: "min(560px, 70vh)" }}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-orange-50 to-orange-100 px-4 py-3 dark:from-lime-950/40 dark:to-lime-900/20">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Image
                src="/svg/ai.svg"
                alt="AI"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-green-500 ring-2 ring-card" />
            </div>
            <div>
              <p className="text-sm font-semibold">{$t("title")}</p>
              <p className="text-xs text-muted-foreground">{$t("status")}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* 消息区域 */}
        <div
          ref={scrollRef}
          className="flex-1 space-y-4 overflow-y-auto p-4"
        >
          {!hasMessages ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <Image
                src="/svg/ai.svg"
                alt="AI"
                width={56}
                height={56}
                className="rounded-full"
              />
              <p className="max-w-[260px] text-sm text-muted-foreground">
                {$t("welcome")}
              </p>
              <div className="flex w-full max-w-[280px] flex-col gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="rounded-full border border-border bg-background px-4 py-2 text-xs text-foreground transition-colors hover:border-primary/30 hover:bg-accent"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {error && (
                <p className="text-center text-xs text-destructive">
                  {$t("error")}
                </p>
              )}
            </>
          )}
        </div>

        {/* 输入区域 */}
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </div>
    </>
  );
}
