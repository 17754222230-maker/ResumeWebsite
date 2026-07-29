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

      {/* SVG 卡通 Q 版阿拉丁神灯 — 金属光泽灯体 + 青蓝魔法烟雾 + 拟人大眼 */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
      <svg
        width="200"
        height="300"
        viewBox="0 0 100 150"
        className="drop-shadow-xl"
        aria-label="AI 助手神灯"
      >
        <defs>
          {/* 灯体金属渐变：亮金 → 金 → 暗金（明暗过渡出金属感） */}
          <linearGradient id="lampGoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="45%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          {/* 灯盖：gold-300 → gold-500 */}
          <linearGradient id="lampLidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          {/* 魔法烟雾：底部金 → 青蓝 → 透明（金水意境） */}
          <linearGradient id="lampSmokeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(245,158,11,0.85)" />
            <stop offset="45%" stopColor="rgba(127,182,224,0.8)" />
            <stop offset="100%" stopColor="rgba(127,182,224,0)" />
          </linearGradient>
          {/* 柔和金晕：与深色首屏 / 淡蓝分区两种背景解耦 */}
          <radialGradient id="lampGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(251,191,36,0.30)" />
            <stop offset="55%" stopColor="rgba(251,191,36,0.12)" />
            <stop offset="100%" stopColor="rgba(251,191,36,0)" />
          </radialGradient>
        </defs>

        {/* 光晕包裹层 */}
        <circle cx="48" cy="72" r="46" fill="url(#lampGlowGrad)" />

        {/* 壶嘴魔法烟雾（静态 path + y/opacity 循环；hover 时加速上冒） */}
        <motion.path
          d="M 12.5 49 C 9.5 44 15 40 12 34 C 9.5 29.5 14 25 12.5 20"
          stroke="url(#lampSmokeGrad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
          animate={{ y: [1, -9], opacity: [0, 0.9, 0] }}
          transition={{ duration: isHovered ? 1.3 : 2.6, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.path
          d="M 16 48 C 14.5 44 19 40.5 17.5 35 C 16.5 31 20 27 19 23"
          stroke="url(#lampSmokeGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          animate={{ y: [1, -8], opacity: [0, 0.75, 0] }}
          transition={{ duration: isHovered ? 1.6 : 3.2, repeat: Infinity, ease: "easeOut", delay: 0.9 }}
        />
        {/* 壶口雾团（scale/opacity 呼吸） */}
        <motion.circle
          cx="13" cy="48.5" r="2" fill="#7FB6E0"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: isHovered ? 1.3 : 2.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        {/* 上浮金色魔法微粒（y/opacity 循环，几何属性全静态） */}
        <motion.circle
          cx="20" cy="42" r="1.2" fill="#FCD34D"
          animate={{ y: [0, -10], opacity: [0, 0.9, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />
        <motion.circle
          cx="7" cy="40" r="0.9" fill="#FBBF24"
          animate={{ y: [0, -8], opacity: [0, 0.8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.4 }}
        />

        {/* 灯体整组：平时轻晃（飘带摆动的迁移载体），hover 俏皮摇摆（挥手的迁移载体），锚点在底座中心 */}
        <motion.g
          animate={isHovered ? { rotate: [0, -7, 5, -7, 5, 0] } : { rotate: [0, -1.6, 0, 1.6, 0] }}
          transition={isHovered ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
        >
          {/* 底座：短脚 + 托盘 */}
          <path d="M 44 92.5 Q 50 95.5 56 92.5 L 58 97 Q 50 100.5 42 97 Z" fill="url(#lampGoldGrad)" />
          <ellipse cx="50" cy="99" rx="13" ry="3.2" fill="url(#lampGoldGrad)" stroke="#B45309" strokeWidth="0.5" opacity="0.98" />

          {/* 把手（优雅 S 弯，右侧）+ 内侧暗线提体积 */}
          <path d="M 70 66 C 82 62 88 72 82 80 C 79 84 74 86 70 85" stroke="url(#lampGoldGrad)" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          <path d="M 71 67.5 C 80.5 64.5 85.5 72.5 80.5 79 C 78 82.2 74.5 84 71.5 83.4" stroke="#B45309" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4" />

          {/* 壶嘴（左侧上翘）+ 壶口 */}
          <path d="M 34 72 C 24 70 15 64 11.5 53 C 11 51.3 12.2 50.2 13.8 51 C 17.5 57 24 61.5 34 63.5 Z" fill="url(#lampGoldGrad)" stroke="#B45309" strokeWidth="0.5" />
          <ellipse cx="12.8" cy="51.2" rx="1.6" ry="1.1" fill="#92400E" opacity="0.85" />

          {/* 胖圆灯肚（金属渐变 + 暗金描边，浅底可见性） */}
          <ellipse cx="50" cy="77" rx="23" ry="16.5" fill="url(#lampGoldGrad)" stroke="#B45309" strokeWidth="0.6" opacity="0.98" />
          {/* 金属高光带 + 镜面反光弧（左亮右暗） */}
          <path d="M 34 71 Q 38 63 47 60.8" stroke="#FFF7E0" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.65" />
          <ellipse cx="38" cy="68.5" rx="2" ry="3.5" fill="#FFFFFF" opacity="0.5" transform="rotate(-22 38 68.5)" />
          <path d="M 66.5 69.5 Q 69.5 76 66.5 83.5" stroke="#B45309" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.38" />

          {/* 灯肚水波刻线（金水流转点缀） */}
          <path d="M 39 87 Q 44.5 84.6 50 87 Q 55.5 89.4 61 87" stroke="#B45309" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
          <path d="M 43 90 Q 46.5 88.4 50 90 Q 53.5 91.6 57 90" stroke="#B45309" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4" />

          {/* 灯盖：圆顶 + 盖沿 + 小圆钮 + 深蓝宝石 */}
          <path d="M 38.5 63.5 C 40 55.5 60 55.5 61.5 63.5 Z" fill="url(#lampLidGrad)" />
          <ellipse cx="50" cy="63.5" rx="12" ry="2.8" fill="url(#lampGoldGrad)" stroke="#B45309" strokeWidth="0.5" />
          <circle cx="50" cy="54.5" r="2.4" fill="url(#lampLidGrad)" stroke="#B45309" strokeWidth="0.5" />
          <circle cx="49.2" cy="53.8" r="0.7" fill="#FFF7E0" opacity="0.85" />
          <circle cx="50" cy="60.2" r="1.7" fill="#1D4A7A" stroke="#FBBF24" strokeWidth="0.6" />

          {/* 拟人大眼（眨眼：静态 rx/ry + scaleY，规避属性关键帧竞态） */}
          <motion.ellipse
            cx="43" cy="74" rx="2.4" ry="3.4" fill="#0B2A4A"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: [1, 1, 0.1, 1] }}
            transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.92, 0.96, 1], ease: "easeInOut" }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <motion.ellipse
            cx="57" cy="74" rx="2.4" ry="3.4" fill="#0B2A4A"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: [1, 1, 0.1, 1] }}
            transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.92, 0.96, 1], ease: "easeInOut" }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <circle cx="42.2" cy="72.6" r="1" fill="#FFFFFF" />
          <circle cx="56.2" cy="72.6" r="1" fill="#FFFFFF" />

          {/* 微笑 + 暗金腮红 */}
          <path d="M 46.5 80 Q 50 82.6 53.5 80" stroke="#0B2A4A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <ellipse cx="37.5" cy="78.5" rx="2.2" ry="1.4" fill="#D97706" opacity="0.45" />
          <ellipse cx="62.5" cy="78.5" rx="2.2" ry="1.4" fill="#D97706" opacity="0.45" />
        </motion.g>
      </svg>
      </motion.div>

      {/* AI 对话窗口 */}
      <AiChatDialog open={chatOpen} onClose={() => setChatOpen(false)} />
    </motion.div>
  );
}
