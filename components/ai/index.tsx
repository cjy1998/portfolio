"use client";

import { useState } from "react";
import Image from "next/image";
import { ChatDialog } from "./ChatDialog";
import { cn } from "@/lib/utils";

export default function AiAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 悬浮触发按钮 */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full",
          "bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/30",
          "dark:from-lime-400 dark:to-lime-600 dark:shadow-lime-500/30",
          "transition-all duration-300 hover:scale-110 hover:shadow-xl",
          !open && "animate-pulse"
        )}
        aria-label="AI Assistant"
      >
        <Image
          src="/svg/ai.svg"
          alt="AI"
          width={28}
          height={28}
          className="rounded-full"
        />
      </button>

      <ChatDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
