"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { Send, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const $t = useTranslations("AIAssistant");
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 自适应高度
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
  }, [value]);

  const handleSend = () => {
    const text = value.trim();
    if (!text || isLoading) return;
    onSend(text);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 border-t border-border p-3">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={$t("placeholder")}
        rows={1}
        disabled={isLoading}
        className={cn(
          "flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none",
          "min-h-[42px] max-h-28 transition-colors",
          "placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/30",
          "disabled:opacity-50"
        )}
      />
      <button
        onClick={handleSend}
        disabled={!value.trim() || isLoading}
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl transition-all",
          "bg-gradient-to-br from-orange-400 to-orange-600 text-white",
          "dark:from-lime-400 dark:to-lime-600",
          "shadow-md hover:scale-105 hover:shadow-lg",
          "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        )}
        aria-label="Send"
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
      </button>
    </div>
  );
}
