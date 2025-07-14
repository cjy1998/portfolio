"use client";
import React, { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { MapPinCheckInside, Mail, Github } from "lucide-react";

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
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={"/people.jpg"}
        className="w-full rounded-t-md "
        width={300}
        height={200}
        alt={"people"}
      />
      <div className="p-4 flex flex-col gap-3">
        <span className="text-xl font-semibold text-gray-800 dark:text-white">
          Cjy
        </span>
        <span className="text-gray-700 dark:text-gray-400">
          不积跬步无以至千里，不积小流无以成江河
        </span>
        <div>
          <span className="flex gap-1 py-2 text-gray-700 dark:text-gray-200">
            <MapPinCheckInside />
            杭州 . 中国
          </span>
          <span className="flex gap-1  py-2 text-gray-700 dark:text-gray-200">
            <Mail />
            1404340013@qq.com
          </span>
          <span className="flex gap-1  py-2 text-gray-700 dark:text-gray-200">
            <Github />
            https://github.com/cjy1998
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
