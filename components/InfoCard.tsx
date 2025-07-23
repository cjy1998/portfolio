"use client";
import React, { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { MapPinCheckInside, Mail, Github, QrCode } from "lucide-react";
import QrCodeDialog from "./QrCodeDialog";
import { initData } from "@/lib/utils";
const InfoCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateY = 15 * ((mouseX - width / 2) / (width / 2));
    const rotateX = -15 * ((mouseY - height / 2) / (height / 2));

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };
  const [open, setopen] = useState(false);
  // 点击二维码
  const qrCodeClick = () => {
    setopen((val) => !val);
  };
  return (
    <div
      ref={cardRef}
      className="flex flex-col shadow-xl rounded-md"
      style={{
        transition: "transform 0.3s ease-out",
        transformStyle: "preserve-3d",
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.1, 1.1, 1.1)`
          : "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)",
      }}
    >
      <Image
        src={"/people.jpg"}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full rounded-t-md "
        width={300}
        height={200}
        alt={"people"}
      />
      <div className="p-4 flex flex-col gap-3">
        <span className="text-xl font-semibold text-gray-800 dark:text-white">
          {initData.username}
        </span>
        {initData.motto && (
          <span className="text-gray-700 dark:text-gray-400">
            {initData.motto}
          </span>
        )}

        <div>
          {initData.address && (
            <span className="flex gap-1 py-2 text-gray-700 dark:text-gray-200">
              <MapPinCheckInside />
              {initData.address}
            </span>
          )}
          {initData.email && (
            <span className="flex gap-1  py-2 text-gray-700 dark:text-gray-200">
              <Mail />
              {initData.email}
            </span>
          )}
          {initData.github && (
            <span className="flex gap-1  py-2 text-gray-700 dark:text-gray-200">
              <Github />
              {initData.github}
            </span>
          )}
        </div>
        <div className="flex justify-end">
          <QrCode
            onClick={qrCodeClick}
            className=" text-gray-700 dark:text-gray-200 cusor-pointer"
          />
          <QrCodeDialog open={open} onOpenChange={setopen} />
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
