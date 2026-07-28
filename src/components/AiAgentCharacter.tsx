"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AiChatDialog from "@/components/AiChatDialog";

export default function AiAgentCharacter() {
  const [chatOpen, setChatOpen] = useState(false);
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
    }, 3000);
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
      onClick={() => setChatOpen(true)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "pointer" }}
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

      {/* SVG 小猫 — Q 版萌系（大头大眼、软耳朵、摇尾巴） */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
      <svg
        width="200"
        height="300"
        viewBox="0 0 100 150"
        className="drop-shadow-xl"
        aria-label="AI 助手小猫"
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCC580" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="earGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FBBF77" />
          </linearGradient>
        </defs>

        {/* 尾巴（持续摇摆动画） */}
        <motion.path
          d="M 56 66 Q 72 62 74 48 Q 75 40 70 36"
          stroke="url(#bodyGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          animate={{ d: ["M 56 66 Q 72 62 74 48 Q 75 40 70 36", "M 56 66 Q 70 66 76 56 Q 80 48 78 42", "M 56 66 Q 72 62 74 48 Q 75 40 70 36"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          r="3.2"
          fill="#D97706"
          animate={{ cx: [70, 78, 70], cy: [36, 42, 36] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 身体 */}
        <ellipse cx="42" cy="58" rx="15" ry="18" fill="url(#bodyGrad)" />
        {/* 奶油色肚皮 */}
        <ellipse cx="42" cy="62" rx="9.5" ry="12" fill="#FFF4E0" opacity="0.9" />

        {/* 脚 */}
        <ellipse cx="34" cy="78" rx="7" ry="3.5" fill="url(#bodyGrad)" />
        <ellipse cx="50" cy="78" rx="7" ry="3.5" fill="url(#bodyGrad)" />

        {/* 左手臂 */}
        <path
          d="M 28 52 Q 16 58 20 72"
          stroke="url(#bodyGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="20" cy="72" r="3" fill="url(#bodyGrad)" />

        {/* 右手臂（往上挥手动画） */}
        <motion.path
          d="M 56 52 Q 70 56 66 72"
          stroke="url(#bodyGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          animate={isHovered ? { d: ["M 56 52 Q 70 56 66 72","M 56 52 Q 64 34 52 32","M 56 52 Q 70 56 66 72","M 56 52 Q 64 34 52 32","M 56 52 Q 70 56 66 72","M 56 52 Q 66 38 54 34","M 56 52 Q 70 56 66 72"] } : { d: "M 56 52 Q 70 56 66 72" }}
          transition={isHovered ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
        />
        <motion.circle
          cx="66" cy="72" r="3" fill="url(#bodyGrad)"
          animate={isHovered ? { cx: [66, 52, 66, 52, 66, 54, 66], cy: [72, 32, 72, 32, 72, 34, 72] } : { cx: 66, cy: 72 }}
          transition={isHovered ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
        />

        {/* 软耳朵（外耳 + 粉色内耳） */}
        <path d="M 29 18 Q 24 5 26 3 Q 27.5 1.5 31 5 L 40 12 Z" fill="url(#earGrad)" />
        <path d="M 30.5 14 Q 28 7 29 6 Q 30 5.5 32.5 8.5 L 37 12 Z" fill="#FBAFB8" opacity="0.85" />
        <path d="M 55 18 Q 60 5 58 3 Q 56.5 1.5 53 5 L 44 12 Z" fill="url(#earGrad)" />
        <path d="M 53.5 14 Q 56 7 55 6 Q 54 5.5 51.5 8.5 L 47 12 Z" fill="#FBAFB8" opacity="0.85" />

        {/* 头部（圆润大头） */}
        <circle cx="42" cy="29" r="16" fill="url(#bodyGrad)" />
        {/* 额头浅色斑纹 */}
        <path d="M 39 14 L 40.5 19 L 42 14.5 L 43.5 19 L 45 14 Z" fill="#D97706" opacity="0.45" />

        {/* 大眼睛（眨眼动画） */}
        <motion.ellipse
          cx="35" cy="27.5" rx="3.4" fill="#3B2A1A"
          animate={{ ry: [4, 4, 0.4, 4] }}
          transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.92, 0.96, 1], ease: "easeInOut" }}
        />
        <motion.ellipse
          cx="49" cy="27.5" rx="3.4" fill="#3B2A1A"
          animate={{ ry: [4, 4, 0.4, 4] }}
          transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.92, 0.96, 1], ease: "easeInOut" }}
        />
        <circle cx="33.6" cy="25.5" r="1.3" fill="#FFFFFF" />
        <circle cx="47.6" cy="25.5" r="1.3" fill="#FFFFFF" />

        {/* 粉色小鼻子 + 猫嘴（ω） */}
        <path d="M 40.6 32.4 L 43.4 32.4 L 42 34.6 Z" fill="#F472B6" />
        <path d="M 39 36.4 Q 40.5 38.4 42 36.8 Q 43.5 38.4 45 36.4" stroke="#3B2A1A" strokeWidth="1.3" strokeLinecap="round" fill="none" />

        {/* 胡须 */}
        <path d="M 26 29.5 L 17.5 28.5 M 26 32.5 L 17.5 34" stroke="#D97706" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
        <path d="M 58 29.5 L 66.5 28.5 M 58 32.5 L 66.5 34" stroke="#D97706" strokeWidth="1" strokeLinecap="round" opacity="0.55" />

        {/* 腮红 */}
        <ellipse cx="29" cy="33.5" rx="3" ry="2" fill="#FB7185" opacity="0.4" />
        <ellipse cx="55" cy="33.5" rx="3" ry="2" fill="#FB7185" opacity="0.4" />
      </svg>
      </motion.div>

      {/* AI 对话窗口 */}
      <AiChatDialog open={chatOpen} onClose={() => setChatOpen(false)} />
    </motion.div>
  );
}
