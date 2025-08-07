import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
export const TopMenus = () => {
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
            <Link href="#projects">Project</Link>
          </Button>
          <Button variant="ghost" className="cursor-pointer font-bold text-md">
            <Link target="_blank" href="https://cjy1998.github.io/vitepress/">
              Blog
            </Link>
          </Button>
          <Button variant="ghost" className="cursor-pointer font-bold text-md">
            <Link href="#about">About</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
