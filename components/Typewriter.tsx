"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

interface TypewriterProps {
  text: string | string[];
  cursor?: string;
  speed?: number;
  className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  cursor = "_",
  speed = 0.1,
  className = "",
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const textEl = textRef.current;
    const cursorEl = cursorRef.current;
    if (!textEl || !cursorEl) return;

    const timeline = gsap.timeline();

    const texts = Array.isArray(text) ? text : [text];

    texts.forEach((line, index) => {
      timeline.to(textEl, {
        duration: line.length * speed,
        text: line,
        ease: "none",
      });
      if (index < texts.length - 1) {
        timeline.to(textEl, {
          duration: 1,
          text: "",
          ease: "none",
          delay: 0.5,
        });
      }
    });

    // Cursor blinking animation
    const cursorTween = gsap.to(cursorEl, {
      opacity: 0,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      timeline.kill();
      cursorTween.kill();
    };
  }, [text, speed]);

  return (
    <div className={`inline-block ${className}`}>
      <span ref={textRef}></span>
      <span ref={cursorRef} className="ml-1 font-mono text-lg">
        {cursor}
      </span>
    </div>
  );
};
