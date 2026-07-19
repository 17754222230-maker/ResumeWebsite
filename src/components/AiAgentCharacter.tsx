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

      {/* SVG 小龙人 — Q 版简约 */}
      <svg
        width="200"
        height="300"
        viewBox="0 0 100 150"
        className="drop-shadow-xl"
        aria-label="AI 助手小龙人"
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="hornGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#F2EBC0" />
          </linearGradient>
        </defs>

        {/* 尾巴 */}
        <path
          d="M 56 68 Q 68 64 72 54 Q 76 44 70 38"
          stroke="url(#bodyGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 70 38 L 66 32 L 74 34 Z"
          fill="#D4AF37"
          opacity="0.7"
        />

        {/* 身体 */}
        <ellipse cx="42" cy="56" rx="16" ry="20" fill="url(#bodyGrad)" />
        <ellipse cx="42" cy="60" rx="10" ry="13" fill="#BAE6FD" opacity="0.35" />

        {/* 脊背金色小棘刺 */}
        <path d="M 56 44 L 61 42 L 57 48 Z" fill="#D4AF37" opacity="0.6" />
        <path d="M 57 52 L 62 50 L 58 56 Z" fill="#D4AF37" opacity="0.5" />
        <path d="M 56 60 L 61 58 L 57 64 Z" fill="#D4AF37" opacity="0.4" />

        {/* 小翅膀 */}
        <path
          d="M 54 42 Q 68 32 64 48 Q 58 44 54 46 Z"
          fill="#818CF8"
          opacity="0.35"
        />

        {/* 脚 */}
        <ellipse cx="34" cy="78" rx="7" ry="3.5" fill="url(#bodyGrad)" />
        <ellipse cx="50" cy="78" rx="7" ry="3.5" fill="url(#bodyGrad)" />

        {/* 左手臂 */}
        <path
          d="M 26 52 Q 14 58 18 72"
          stroke="url(#bodyGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="18" cy="72" r="3" fill="url(#bodyGrad)" />

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

        {/* 头部 */}
        <circle cx="42" cy="30" r="15" fill="url(#bodyGrad)" />

        {/* 龙角（三角） */}
        <path d="M 30 18 L 27 6 L 34 15 Z" fill="url(#hornGrad)" />
        <path d="M 54 18 L 57 6 L 50 15 Z" fill="url(#hornGrad)" />

        {/* 眼睛 */}
        <ellipse cx="35" cy="28" rx="3" ry="3.5" fill="#1E293B" />
        <circle cx="33.5" cy="26" r="1.2" fill="#FFFFFF" />
        <ellipse cx="49" cy="28" rx="3" ry="3.5" fill="#1E293B" />
        <circle cx="47.5" cy="26" r="1.2" fill="#FFFFFF" />

        {/* 腮红 */}
        <ellipse cx="28" cy="33" rx="3" ry="2" fill="#F5A0A0" opacity="0.35" />
        <ellipse cx="56" cy="33" rx="3" ry="2" fill="#F5A0A0" opacity="0.35" />

        {/* 微笑 */}
        <path d="M 37 34 Q 42 38 47 34" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>

      {/* AI 对话窗口 */}
      <AiChatDialog open={chatOpen} onClose={() => setChatOpen(false)} />
    </motion.div>
  );
}
