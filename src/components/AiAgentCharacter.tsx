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
            className="absolute bottom-full right-0 mb-5 origin-bottom-right whitespace-nowrap rounded-xl bg-white px-5 py-3 text-sm text-deep-blue-900 shadow-lg"
          >
            有什么问题随时询问哦~
            <div className="absolute -bottom-1 right-8 h-3 w-3 rotate-45 bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SVG 简约男生数字人 */}
      <svg
        width="200"
        height="300"
        viewBox="0 0 100 160"
        className="drop-shadow-xl"
        aria-label="AI 助手数字人"
      >
        {/* ===== 头发（深蓝色短发） ===== */}
        <path
          d="M 18 28 C 16 10 28 6 40 6 C 52 6 64 10 62 28 C 62 16 52 12 40 12 C 28 12 18 16 18 28 Z"
          fill="#0B1D3A"
        />
        {/* 头发刘海碎发 */}
        <path
          d="M 20 24 Q 30 14 40 14 Q 50 14 60 24"
          stroke="#1A3B5C"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
        {/* 两侧头发 */}
        <path
          d="M 18 28 Q 16 34 18 40"
          stroke="#0B1D3A"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 62 28 Q 64 34 62 40"
          stroke="#0B1D3A"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* ===== 面部 ===== */}
        <circle cx="40" cy="30" r="18" fill="#FDE8D0" />

        {/* 眼睛（简约） */}
        <ellipse cx="33" cy="28" rx="2.5" ry="3" fill="#0B1D3A" />
        <circle cx="32" cy="26.5" r="1.2" fill="#FFFFFF" />
        <ellipse cx="47" cy="28" rx="2.5" ry="3" fill="#0B1D3A" />
        <circle cx="46" cy="26.5" r="1.2" fill="#FFFFFF" />

        {/* 微笑 */}
        <path
          d="M 36 34 Q 40 38 44 34"
          stroke="#0B1D3A"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* ===== 身体（白色 T 恤） ===== */}
        <rect x="25" y="48" width="30" height="36" rx="6" fill="#FFFFFF" />

        {/* 圆形领口 */}
        <path
          d="M 31 50 Q 40 56 49 50"
          stroke="#0B1D3A"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.15"
        />

        {/* 胸前小 logo（金色 V 形） */}
        <path
          d="M 38 60 L 40 64 L 42 60"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.6"
        />

        {/* ===== 裤子（深蓝） ===== */}
        <rect x="26" y="84" width="10" height="26" rx="3" fill="#102A43" />
        <rect x="44" y="84" width="10" height="26" rx="3" fill="#102A43" />

        {/* ===== 鞋子（白色运动鞋） ===== */}
        <ellipse cx="31" cy="112" rx="9" ry="3.5" fill="#FFFFFF" />
        <ellipse cx="49" cy="112" rx="9" ry="3.5" fill="#FFFFFF" />
        <path
          d="M 24 112 Q 31 110 38 112"
          stroke="#D4AF37"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M 42 112 Q 49 110 56 112"
          stroke="#D4AF37"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />

        {/* ===== 左手（静止，始终可见） ===== */}
        <path
          d="M 25 54 Q 12 60 16 74"
          stroke="#FDE8D0"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* 袖子 */}
        <path
          d="M 25 54 Q 20 58 18 62"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="16" cy="74" r="2.5" fill="#FDE8D0" />

        {/* ===== 右手（往上挥手动画） ===== */}
        <motion.path
          d="M 55 54 Q 70 58 66 74"
          stroke="#FDE8D0"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
          animate={
            isHovered
              ? {
                  d: [
                    "M 55 54 Q 70 58 66 74",
                    "M 55 54 Q 64 34 52 32",
                    "M 55 54 Q 70 58 66 74",
                    "M 55 54 Q 64 34 52 32",
                    "M 55 54 Q 70 58 66 74",
                    "M 55 54 Q 66 38 54 34",
                    "M 55 54 Q 70 58 66 74",
                  ],
                }
              : { d: "M 55 54 Q 70 58 66 74" }
          }
          transition={
            isHovered
              ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        />
        {/* 右手 */}
        <motion.circle
          cx="66"
          cy="74"
          r="2.5"
          fill="#FDE8D0"
          animate={
            isHovered
              ? {
                  cx: [66, 52, 66, 52, 66, 54, 66],
                  cy: [74, 32, 74, 32, 74, 34, 74],
                }
              : { cx: 66, cy: 74 }
          }
          transition={
            isHovered
              ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        />
        {/* 右手袖子 */}
        <motion.path
          d="M 55 54 Q 58 58 58 62"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          animate={
            isHovered
              ? {
                  d: [
                    "M 55 54 Q 58 58 58 62",
                    "M 55 54 Q 54 48 50 46",
                    "M 55 54 Q 58 58 58 62",
                    "M 55 54 Q 54 48 50 46",
                    "M 55 54 Q 58 58 58 62",
                    "M 55 54 Q 56 50 52 48",
                    "M 55 54 Q 58 58 58 62",
                  ],
                }
              : { d: "M 55 54 Q 58 58 58 62" }
          }
          transition={
            isHovered
              ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        />
      </svg>
    </motion.div>
  );
}
