"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import AiChatDialog from "@/components/AiChatDialog";

export default function AiAgentCharacter() {
  const [chatOpen, setChatOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

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
      className="fixed right-4 bottom-24 md:bottom-8 z-50 select-none opacity-[0.92] transition-opacity duration-300 hover:opacity-100"
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
            className="absolute bottom-full right-0 -mb-3 origin-bottom-right whitespace-nowrap rounded-xl border border-gold-500/20 bg-deep-blue-900/90 px-4 py-2.5 text-xs text-text-on-dark shadow-md backdrop-blur-sm"
          >
            有什么问题随时询问哦~
            <div className="absolute -bottom-1 right-[46px] md:right-[58px] h-3 w-3 rotate-45 bg-deep-blue-900/90" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SVG Q 版动漫男生头像 — 深蓝圆底衬 + 金色描边圈 */}
      <motion.div
        animate={reduceMotion ? { y: 0 } : { y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
      <svg
        width="128"
        height="123"
        viewBox="0 24 100 96"
        className="h-auto w-[104px] drop-shadow-md md:w-[128px]"
        aria-label="AI 助手头像"
      >
        <defs>
          {/* 头像底衬：深蓝径向渐变（上亮下深，呼应夜色主题） */}
          <radialGradient id="avatarBgGrad" cx="50%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#2E6398" />
            <stop offset="55%" stopColor="#1D4A7A" />
            <stop offset="100%" stopColor="#0B1D3A" />
          </radialGradient>
          {/* 金色描边圈：亮金 → 金 → 暗金 */}
          <linearGradient id="avatarRingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          {/* 发色：深蓝上浅下深 */}
          <linearGradient id="avatarHairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1D4A7A" />
            <stop offset="100%" stopColor="#0F2B4C" />
          </linearGradient>
          {/* 西装肋部：深蓝渐暗 */}
          <linearGradient id="avatarJacketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1D4A7A" />
            <stop offset="100%" stopColor="#0B1D3A" />
          </linearGradient>
          {/* 柔和金晕：与深色首屏 / 深蓝分区两种背景解耦 */}
          <radialGradient id="avatarGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(251,191,36,0.30)" />
            <stop offset="55%" stopColor="rgba(251,191,36,0.12)" />
            <stop offset="100%" stopColor="rgba(251,191,36,0)" />
          </radialGradient>
          {/* 圆形头像裁剪 */}
          <clipPath id="avatarClip">
            <circle cx="50" cy="72" r="32" />
          </clipPath>
        </defs>

        {/* 光晕包裹层 */}
        <circle cx="50" cy="72" r="46" fill="url(#avatarGlowGrad)" />

        {/* 头像整组：平时静止（降权精简），hover 俏皮点头摇摆（±4°） */}
        <motion.g
          animate={isHovered && !reduceMotion ? { rotate: [0, -4, 3, -4, 3, 0] } : { rotate: 0 }}
          transition={isHovered && !reduceMotion ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
        >
          {/* 圆形深蓝底衬 */}
          <circle cx="50" cy="72" r="32" fill="url(#avatarBgGrad)" />

          {/* 头像内容（圆形裁剪） */}
          <g clipPath="url(#avatarClip)">
            {/* 肩部西装 + 白衬领 + 金色衣扣 */}
            <path d="M 24 106 C 29 90 39 85 44 84.5 L 46 83.5 Q 50 86 54 83.5 L 56 84.5 C 61 85 71 90 76 106 Z" fill="url(#avatarJacketGrad)" />
            <path d="M 45.5 84 L 50 90.5 L 54.5 84 Q 50 86.8 45.5 84 Z" fill="#E8F1FA" />
            <circle cx="50" cy="94" r="1" fill="#FBBF24" />
            <circle cx="50" cy="99" r="1" fill="#FBBF24" opacity="0.85" />

            {/* 脖子 */}
            <path d="M 46 79 L 46 84 Q 50 86 54 84 L 54 79 Z" fill="#F2C39B" />

            {/* 耳朵 + 脸 */}
            <ellipse cx="34.5" cy="67" rx="2.2" ry="3.2" fill="#FFDFC4" />
            <ellipse cx="65.5" cy="67" rx="2.2" ry="3.2" fill="#FFDFC4" />
            <ellipse cx="50" cy="67" rx="15.5" ry="14.5" fill="#FFDFC4" />

            {/* 干净短发（深蓝）+ 刘海 + 金色发丝高光 */}
            <path d="M 34.5 67 C 33 48 41 44 50 44 C 59 44 67 48 65.5 67 C 63.5 59 60.5 57 56.5 60.5 C 53.5 55.5 47 55.5 44 60 C 40.5 56.5 36.5 59.5 34.5 67 Z" fill="url(#avatarHairGrad)" />
            <path d="M 42 49.5 Q 46 47.5 50.5 48" stroke="#FBBF24" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M 55 50 Q 58.5 51.5 60.5 54.5" stroke="#FCD34D" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.5" />

            {/* 眉毛 */}
            <path d="M 40.5 62.5 Q 43.5 61 46 62.3" stroke="#123A63" strokeWidth="1" strokeLinecap="round" fill="none" />
            <path d="M 54 62.3 Q 56.5 61 59.5 62.5" stroke="#123A63" strokeWidth="1" strokeLinecap="round" fill="none" />

            {/* 大眼睛（眨眼：静态 rx/ry + scaleY，规避属性关键帧竞态） */}
            <motion.ellipse
              cx="43.5" cy="66.5" rx="2.3" ry="3.1" fill="#0B2A4A"
              initial={{ scaleY: 1 }}
              animate={reduceMotion ? { scaleY: 1 } : { scaleY: [1, 1, 0.1, 1] }}
              transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.92, 0.96, 1], ease: "easeInOut" }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            <motion.ellipse
              cx="56.5" cy="66.5" rx="2.3" ry="3.1" fill="#0B2A4A"
              initial={{ scaleY: 1 }}
              animate={reduceMotion ? { scaleY: 1 } : { scaleY: [1, 1, 0.1, 1] }}
              transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.92, 0.96, 1], ease: "easeInOut" }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            <circle cx="42.8" cy="65.3" r="0.9" fill="#FFFFFF" />
            <circle cx="55.8" cy="65.3" r="0.9" fill="#FFFFFF" />

            {/* 亲和微笑 + 暖色腮红 */}
            <path d="M 46.5 74 Q 50 76.8 53.5 74" stroke="#0B2A4A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            <ellipse cx="38.5" cy="71.5" rx="2.2" ry="1.3" fill="#F59E0B" opacity="0.35" />
            <ellipse cx="61.5" cy="71.5" rx="2.2" ry="1.3" fill="#F59E0B" opacity="0.35" />
          </g>

          {/* 金色描边圈 + 外圈淡金光环 */}
          <circle cx="50" cy="72" r="32" fill="none" stroke="url(#avatarRingGrad)" strokeWidth="2.2" />
          <circle cx="50" cy="72" r="34.5" fill="none" stroke="#FBBF24" strokeWidth="1" opacity="0.22" />
        </motion.g>
      </svg>
      </motion.div>

      {/* AI 对话窗口 */}
      <AiChatDialog open={chatOpen} onClose={() => setChatOpen(false)} />
    </motion.div>
  );
}
