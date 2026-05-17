"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { toggleLocale } from "@/i18n/locale";

export const LocaleToggle = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await toggleLocale();
      router.refresh();
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8 cursor-pointer"
      onClick={handleClick}
      disabled={isPending}
      aria-label="Toggle language"
    >
      <Languages />
    </Button>
  );
};
