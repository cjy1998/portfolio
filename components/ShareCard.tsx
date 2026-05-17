"use client";
import React from "react";
import Image from "next/image";
import { Avatar, AvatarImage } from "./ui/avatar";
import { PROFILE } from "@/lib/utils";
import { useTranslations } from "next-intl";
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
  const $t = useTranslations("InfoCard");
  const username = $t("name");
  const motto = $t("motto");
  const address = $t("address");
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
            {username && (
              <p className="text-[20px] text-gray-500 font-bold">{username}</p>
            )}
            {address && (
              <p className="text-[14px] text-gray-600 self-end">{address}</p>
            )}
          </div>

          {motto && (
            <em className="text-[14px] text-gray-600 ">{motto}</em>
          )}
        </div>
        {/* 社交信息 */}
        <div className="flex flex-col  gap-3  py-1 text-gray-600 text-[16px]">
          {PROFILE.email && (
            <span className="flex gap-1 ">
              <Mail />
              {PROFILE.email}
            </span>
          )}
          {PROFILE.github && (
            <span className="flex gap-1  ">
              <Github />
              {PROFILE.github}
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
