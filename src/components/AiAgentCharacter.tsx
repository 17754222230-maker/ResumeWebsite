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
    // rAF 节流：scroll 高频触发时每帧最多更新一次（布尔 bail-out 免无谓重渲染）
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const hero = document.getElementById("hero");
        if (!hero) return;
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        setIsHeroVisible(heroBottom > window.scrollY + 100);
        ticking = false;
      });
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

  // 键盘可达性（P0）：Enter/Space 等价于点击，焦点态由全局 focus-visible 金色 ring 提供
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setChatOpen(true);
    }
  };

  const isFullyVisible = isHovered || isHeroVisible;

  return (
    <>
    <motion.div
      className="fixed right-4 bottom-24 md:bottom-8 z-50 select-none opacity-[0.92] transition-opacity duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-deep-blue-900"
      animate={{ x: isFullyVisible ? "0%" : "55%" }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      onClick={() => setChatOpen(true)}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label="打开大白 AI 助手对话"
      style={{ cursor: "pointer" }}
    >
      {/* 对话气泡（hover 触发，玻璃质感） */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-full right-0 -mb-3 origin-bottom-right whitespace-nowrap rounded-xl border border-gold-500/20 bg-white/[0.08] backdrop-blur-md px-4 py-2.5 text-xs text-white/90 shadow-md"
          >
            有什么问题都可以问我哦～
            <div className="absolute -bottom-1 right-[42px] md:right-[52px] h-3 w-3 rotate-45 border-b border-r border-gold-500/20 bg-white/[0.10] backdrop-blur-md" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 白熊数字人（坐姿全身形象）— 透明背景透出夜色 */}
      <motion.div
        animate={reduceMotion ? { y: 0 } : { y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* 全身：平时静止，hover 俏皮摇摆（±4°，以足底为轴） */}
        <motion.img
          src="/images/white-bear-sit.png"
          alt="大白 AI 助手"
          width={365}
          height={395}
          draggable={false}
          className="h-auto w-[92px] drop-shadow-md md:w-[112px]"
          animate={isHovered && !reduceMotion ? { rotate: [0, -4, 3, -4, 3, 0] } : { rotate: 0 }}
          transition={isHovered && !reduceMotion ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
          style={{ transformOrigin: "50% 100%" }}
        />
      </motion.div>
    </motion.div>

    {/* AI 对话窗口：与头像容器分离渲染（头像容器 x 位移 transform 会使其成为 fixed
        子元素的包含块，半隐藏态打开时窗口会相对头像定位而溢出视口；分离后始终相对视口定位） */}
    <AiChatDialog open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
