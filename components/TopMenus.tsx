import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { LocaleToggle } from "./LocaleToggle";
import Link from "next/link";
import { useTranslations } from "next-intl";
export const TopMenus = () => {
  const $t = useTranslations("TopMenus");
  return (
    <div className="sticky top-0 z-40 py-3 overflow-x-hidden supports-backdrop-blur:bg-white/95 bg-white/75 backdrop-blur dark:bg-[#22272e]/75 ">
      <div className="flex items-center justify-between max-w-3xl px-3 mx-auto xl:max-w-5xl xl:px-0">
        <Link href="/">
          <Avatar className="cursor-pointer">
            <AvatarImage src="/avator.jpg" />
            <AvatarFallback>CJY</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex items-center gap-0.5 sm:gap-2 ">
          <Button variant="ghost" className="cursor-pointer font-bold text-md">
            <Link href="#projects">{$t("project")}</Link>
          </Button>
          <Button variant="ghost" className="cursor-pointer font-bold text-md">
            <Link target="_blank" href="https://cjy.cc.cd">
              {$t("blog")}
            </Link>
          </Button>
          <Button variant="ghost" className="cursor-pointer font-bold text-md">
            <Link href="#about">{$t("about")}</Link>
          </Button>
          <LocaleToggle />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
