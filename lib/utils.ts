import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const initData = {
  //  姓名
  username: "Cjy",
  // 座右铭
  motto: "不积跬步无以至千里，不积小流无以成江河",
  // 地址
  address: "杭州 . 中国",
  // 邮箱
  email: "1404340013@qq.com",
  // github
  github: "https://github.com/cjy1998",
};
