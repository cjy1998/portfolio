import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PROFILE = {
  email: "cjy19980128@gmail.com",
  github: "https://github.com/cjy1998",
};
