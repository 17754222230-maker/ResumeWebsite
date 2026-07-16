"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiAgentCharacter() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      setIsHeroVisible(heroBottom > window.scrollY + 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hideTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const isFullyVisible = isHovered || isHeroVisible;

  return (
    <motion.div
      className="fixed right-0 top-1/2 z-50 -translate-y-1/2 select-none"
      animate={{ x: isFullyVisible ? "0%" : "55%" }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 对话气泡 */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-full right-6 mb-5 origin-bottom-right whitespace-nowrap rounded-xl bg-white px-5 py-3 text-sm text-deep-blue-900 shadow-lg"
          >
            有什么问题随时询问哦~
            <div className="absolute -bottom-1 right-10 h-3 w-3 rotate-45 bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SVG 卡通 AI 助手 */}
      <svg
        width="180"
        height="278"
        viewBox="0 0 100 150"
        className="drop-shadow-xl"
        aria-label="AI 助手数字人"
      >
        {/* ===== 身体（白色简约圆润造型） ===== */}
        <rect x="22" y="40" width="38" height="48" rx="14" fill="#FFFFFF" />

        {/* 金色围领装饰 */}
        <path
          d="M 28 42 Q 41 48 54 42"
          stroke="#D4AF37"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* 胸口金色小徽章 */}
        <circle cx="41" cy="58" r="5" fill="#D4AF37" />
        <circle cx="41" cy="57" r="2" fill="#FFFFFF" />

        {/* 小脚丫（深蓝） */}
        <ellipse cx="32" cy="92" rx="10" ry="5" fill="#0B1D3A" />
        <ellipse cx="50" cy="92" rx="10" ry="5" fill="#0B1D3A" />

        {/* ===== 左手臂（静止，始终可见） ===== */}
        <path
          d="M 22 50 Q 8 56 12 70"
          stroke="#D4AF37"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="12" cy="70" r="3" fill="#FFFFFF" />

        {/* ===== 右手臂（往上挥手动画） ===== */}
        <motion.path
          d="M 60 50 Q 74 56 72 70"
          stroke="#D4AF37"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          animate={
            isHovered
              ? {
                  d: [
                    "M 60 50 Q 74 56 72 70", // 自然垂放
                    "M 60 50 Q 66 34 54 32", // 往头上方挥手
                    "M 60 50 Q 74 56 72 70", // 放下
                    "M 60 50 Q 66 34 54 32", // 再次挥手
                    "M 60 50 Q 74 56 72 70", // 放下
                    "M 60 50 Q 68 38 56 34", // 小幅度招呼
                    "M 60 50 Q 74 56 72 70", // 归位
                  ],
                }
              : { d: "M 60 50 Q 74 56 72 70" }
          }
          transition={
            isHovered
              ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        />
        {/* 右手（跟随手臂动画） */}
        <motion.circle
          cx="72"
          cy="70"
          r="3"
          fill="#FFFFFF"
          animate={
            isHovered
              ? {
                  cx: [72, 54, 72, 54, 72, 56, 72],
                  cy: [70, 32, 70, 32, 70, 34, 70],
                }
              : { cx: 72, cy: 70 }
          }
          transition={
            isHovered
              ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        />

        {/* ===== 头部 ===== */}

        {/* 面部（白色大圆脸） */}
        <circle cx="41" cy="24" r="20" fill="#FFFFFF" />

        {/* 金色小天線 */}
        <line
          x1="41"
          y1="4"
          x2="41"
          y2="10"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="41" cy="3" r="3.5" fill="#D4AF37" />
        {/* 天线小光晕 */}
        <circle cx="40" cy="2" r="1.2" fill="#FFFFFF" opacity="0.6" />

        {/* 眼睛（深蓝，大而可爱） */}
        <circle cx="33" cy="22" r="3.5" fill="#0B1D3A" />
        <circle cx="49" cy="22" r="3.5" fill="#0B1D3A" />

        {/* 眼睛高光 */}
        <circle cx="31.5" cy="20.5" r="1.2" fill="#FFFFFF" />
        <circle cx="47.5" cy="20.5" r="1.2" fill="#FFFFFF" />

        {/* 腮红（粉嫩） */}
        <ellipse cx="27" cy="28" rx="4.5" ry="2.5" fill="#FFB5B5" opacity="0.4" />
        <ellipse cx="55" cy="28" rx="4.5" ry="2.5" fill="#FFB5B5" opacity="0.4" />

        {/* 微笑 */}
        <path
          d="M 36 28 Q 41 33 46 28"
          stroke="#0B1D3A"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}
