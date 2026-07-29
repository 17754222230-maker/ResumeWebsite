"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Galaxy from "@/components/Galaxy";
import HeroSection from "@/components/HeroSection";
import TechStack from "@/components/TechStack";
import ProjectGrid from "@/components/ProjectGrid";
import AiAgentCharacter from "@/components/AiAgentCharacter";

/**
 * 首页客户端包装：持有 Navbar「W」与 Galaxy 星空的联动状态。
 * 默认态：W 白色，星空开启鼠标斥力跟随（saturation 0.7）；
 * 点击 W 切换：W 金色，星空关闭鼠标跟随且 saturation 0.2；再点切回。
 */
export default function HomeClient() {
  const [starLocked, setStarLocked] = useState(false);

  return (
    <>
      {/* 全屏固定背景：深色 #120F17 基调极微渐变 + Galaxy 星空（透明叠加）。
          用 z-0 + 内容层 z-10 而非负 z-index：负 z-index 会被排到 body 背景（bg-cool-bg 浅灰）之下导致不可见 */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 100% 70% at 50% 45%,
              #191521 0%,
              #15111B 45%,
              #120F17 100%)
          `,
        }}
      >
        <Galaxy
          hueShift={180}
          saturation={starLocked ? 0.2 : 0.7}
          glowIntensity={0.5}
          twinkleIntensity={0.2}
          density={0.3}
          starSpeed={0.2}
          speed={0.4}
          rotationSpeed={0.1}
          mouseInteraction={!starLocked}
          mouseRepulsion={!starLocked}
          repulsionStrength={1.5}
          autoCenterRepulsion={5}
          transparent
        />
      </div>

      {/* 页面内容统一抬到 z-10，位于星空背景层之上 */}
      <div className="relative z-10">
        <Navbar logoGold={starLocked} onLogoClick={() => setStarLocked((v) => !v)} />
        {/* 英雄区 */}
        <HeroSection />

        {/* 技术栈展示 */}
        <TechStack />

        {/* 项目卡片网格 */}
        <ProjectGrid />

        {/* AI 数字人助手 */}
        <AiAgentCharacter />
      </div>
    </>
  );
}
