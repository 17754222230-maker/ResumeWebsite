import HeroSection from "@/components/HeroSection";
import TechStack from "@/components/TechStack";
import ProjectGrid from "@/components/ProjectGrid";
import AiAgentCharacter from "@/components/AiAgentCharacter";

export default function Home() {
  return (
    <>
      {/* 英雄区 */}
      <HeroSection />

      {/* 技术栈展示 */}
      <TechStack />

      {/* 项目卡片网格 */}
      <ProjectGrid />

      {/* AI 数字人助手 */}
      <AiAgentCharacter />
    </>
  );
}
