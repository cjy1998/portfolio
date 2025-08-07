import React from "react";
import Image from "next/image";
import { Avatar, AvatarImage } from "./ui/avatar";
import { initData } from "@/lib/utils";
import { Mail, Github } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { forwardRef } from "react";

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
const ShareCard = forwardRef<HTMLDivElement>((props, ref) => {
  // bg-white/30 backdrop-blur-lg border-white/40
  return (
    <div
      ref={ref}
      className="flex flex-col items-center  bg-white gap-2 w-[500px] p-6   border  shadow-lg"
    >
      {/* 顶部头像 和 用户名 座右铭 */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col  gap-2">
          <Avatar className="w-[96px] h-[96px]">
            <AvatarImage src="/avator.jpg" />
          </Avatar>
          <div className="flex gap-2">
            {initData.username && (
              <p className="text-[20px] text-gray-500 font-bold">
                {initData.username}
              </p>
            )}
            {initData.address && (
              <p className="text-[14px] text-gray-600 self-end">
                {initData.address}
              </p>
            )}
          </div>

          {initData.motto && (
            <em className="text-[14px] text-gray-600 ">{initData.motto}</em>
          )}
        </div>
        {/* 社交信息 */}
        <div className="flex flex-col  gap-3  py-1 text-gray-600 text-[16px]">
          {initData.email && (
            <span className="flex gap-1 ">
              <Mail />
              {initData.email}
            </span>
          )}
          {initData.github && (
            <span className="flex gap-1  ">
              <Github />
              {initData.github}
            </span>
          )}
          {/* 技术栈 */}
          <div className="flex gap-2 flex-wrap  py-1">
            {images.map((src, index) => (
              <div key={index} className="flex md:justify-start justify-center">
                <Image src={src} height={24} width={24} alt="技术栈" />
              </div>
            ))}
          </div>
        </div>

        {/* 二维码 */}
        <div className="self-end">
          <QRCodeCanvas value={"http://cjy.deepthinkspace.cn/"} size={48} />
          {/* <QrCode /> */}
        </div>
      </div>
    </div>
  );
});
ShareCard.displayName = "ShareCard";
export default ShareCard;
