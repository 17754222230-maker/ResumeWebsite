"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TechStack from "@/components/TechStack";
import ProjectGrid from "@/components/ProjectGrid";
import BlogSection from "@/components/BlogSection";
import AiAgentCharacter from "@/components/AiAgentCharacter";

/**
 * 首页客户端包装：静态「日照金山」雪山图全屏固定背景 + 统一夜色蒙版。
 * 背景层为 pure 静态图片（无任何动画/交互），其上叠加纵向渐变蒙版保证文字可读；
 * 用 z-0 + 内容层 z-10 而非负 z-index：负 z-index 会被排到 body 背景（bg-cool-bg）之下导致不可见。
 */
export default function HomeClient() {
  return (
    <>
      {/* 全屏固定背景：雪山静态图（cover 填充、重心偏主峰）+ 可读性蒙版
          （顶部天空自深，蒙版较轻；中部金色山脊较亮，蒙版加重；向下渐深融入分区夜色） */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/images/mountain-golden.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,22,38,0.15) 0%, rgba(10,22,38,0.26) 45%, rgba(10,22,38,0.44) 100%)",
          }}
        />
      </div>

      {/* 页面内容统一抬到 z-10，位于雪山背景层之上 */}
      <div className="relative z-10">
        <Navbar />
        {/* 英雄区 */}
        <HeroSection />

        {/* 技术栈展示 */}
        <TechStack />

        {/* 项目卡片网格 */}
        <ProjectGrid />

        {/* 博客文章 */}
        <BlogSection />

        {/* AI 数字人助手 */}
        <AiAgentCharacter />
      </div>
    </>
  );
}
