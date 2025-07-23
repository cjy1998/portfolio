import React from "react";
import Image from "next/image";
import { Avatar, AvatarImage } from "./ui/avatar";
import { initData } from "@/lib/utils";
import { Mail, Github, QrCode } from "lucide-react";
const images = [
  "/svg/js.svg",
  "/svg/tailwindcss.svg",
  "/svg/vue.svg",
  "/svg/react.svg",
  "/svg/canvas.svg",
  "/svg/threejs.svg",
  "/svg/nextjs.svg",
  "/svg/nestjs.svg",
];
const ShareCard = () => {
  return (
    <div className="flex flex-col items-center  gap-2 w-[300px] p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/40 shadow-lg">
      {/* 顶部头像 和 用户名 座右铭 */}
      <div className="flex items-center gap-3">
        <Avatar className="w-[72px] h-[72px]">
          <AvatarImage src="/avator.jpg" />
        </Avatar>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            {initData.username && (
              <p className="text-[16px] font-bold">{initData.username}</p>
            )}
            {initData.address && (
              <p className="text-[10px] text-gray-600 self-end">
                {initData.address}
              </p>
            )}
          </div>

          {initData.motto && (
            <em className="text-[12px] text-gray-600 ">{initData.motto}</em>
          )}
        </div>
      </div>
      {/* 社交信息 */}
      <div className="flex flex-col  gap-3 self-start px-2 py-1">
        {initData.email && (
          <span className="flex gap-1 text-gray-600 text-[14px]">
            <Mail />
            {initData.email}
          </span>
        )}
        {initData.github && (
          <span className="flex gap-1  text-gray-600 text-[14px]">
            <Github />
            {initData.github}
          </span>
        )}
      </div>
      {/* 技术栈 */}
      <div className="flex gap-2 flex-wrap self-start px-2 py-1">
        {images.map((src, index) => (
          <div key={index} className="flex md:justify-start justify-center">
            <Image src={src} height={18} width={18} alt="技术栈" />
          </div>
        ))}
      </div>
      {/* 二维码 */}
      <div className="self-end">
        <QrCode />
      </div>
    </div>
  );
};

export default ShareCard;
