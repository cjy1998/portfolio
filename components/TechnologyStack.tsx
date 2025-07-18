"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
gsap.registerPlugin(InertiaPlugin);

const TechnologyStack = () => {
  const svgsRef = useRef<(HTMLDivElement | null)[]>([]);

  const setSvgRef = (index: number) => (el: HTMLDivElement | null) => {
    svgsRef.current[index] = el;
  };

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
  let oldX = 0,
    oldY = 0,
    deltaX = 0,
    deltaY = 0;
  const handleMouseMove = (e: React.MouseEvent) => {
    deltaX = e.clientX - oldX;

    // Calculate vertical movement since the last mouse position
    deltaY = e.clientY - oldY;

    // Update old coordinates with the current mouse position
    oldX = e.clientX;
    oldY = e.clientY;
    console.log(deltaX, deltaY);
  };
  useEffect(() => {
    svgsRef.current.forEach((svg) => {
      if (svg) {
        svg.addEventListener("mouseenter", () => {
          const tl = gsap.timeline({
            onComplete: () => {
              tl.kill();
            },
          });
          tl.timeScale(1.2);
          const image = svg.querySelector("img");
          tl.to(image, {
            inertia: {
              x: {
                velocity: deltaX * 30, // Higher number = movement amplified
                end: 0, // Go back to the initial position
              },
              y: {
                velocity: deltaY * 30, // Higher number = movement amplified
                end: 0, // Go back to the initial position
              },
            },
          });
          tl.fromTo(
            image,
            {
              rotate: 0,
            },
            {
              duration: 0.4,
              rotate: (Math.random() - 0.5) * 30, // Returns a value between -15 & 15
              yoyo: true,
              repeat: 1,
              ease: "power1.inOut", // Will slow at the begin and the end
            },
            "<"
          );
        });
      }
    });
  }, [deltaX, deltaY]);
  return (
    <div
      onMouseMove={handleMouseMove}
      className="w-full h-full grid grid-cols-4 gap-4"
    >
      {images.map((src, index) => (
        <div key={index} ref={setSvgRef(index)}>
          <Image src={src} height={32} width={32} alt="技术栈" />
        </div>
      ))}
    </div>
  );
};

export default TechnologyStack;
