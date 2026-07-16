import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lightbulb, Target, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects, getProjectBySlug } from "@/lib/knowledge";
import type { Project } from "@/lib/knowledge";
import AiAgentCharacter from "@/components/AiAgentCharacter";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <ProjectDetail slugPromise={params} />
  );
}

async function ProjectDetail({ slugPromise }: { slugPromise: Promise<{ slug: string }> }) {
  const { slug } = await slugPromise;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-cool-bg">
      {/* 顶栏 */}
      <header className="border-b border-border-light bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-4">
          <Link
            href="/#projects"
            className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-deep-blue-900"
          >
            <ArrowLeft size={16} />
            <span>返回列表</span>
          </Link>
          <div className="h-3 w-px bg-border-medium" />
          <span className="truncate text-sm font-medium text-deep-blue-900">
            {project.title}
          </span>
        </div>
      </header>

      {/* 主内容 */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* ===== 头部信息 ===== */}
        <section className="mb-12">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge variant="gold">{project.role}</Badge>
            {project.period && (
              <span className="font-mono text-xs text-text-secondary">
                {project.period}
              </span>
            )}
          </div>
          <h1 className="mb-4 text-3xl font-bold text-deep-blue-900 md:text-4xl">
            {project.title}
          </h1>
          {project.company && (
            <p className="mb-4 text-sm text-gold-500">{project.company}</p>
          )}
          <p className="max-w-2xl text-base leading-relaxed text-text-secondary">
            {project.description}
          </p>

          {/* 标签 */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="skill" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </section>

        <div className="mb-12 h-px bg-gradient-to-r from-gold-500/30 via-border-light to-transparent" />

        {/* ===== 项目职责 ===== */}
        {project.responsibilities && project.responsibilities.length > 0 && (
          <Section icon={Target} title="主要职责">
            <ul className="space-y-3">
              {project.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ===== 项目难点与解决方案 ===== */}
        {project.challenges && project.challenges.length > 0 && (
          <Section icon={Lightbulb} title="难点与解决方案" delay>
            <div className="space-y-6">
              {project.challenges.map((c, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border-light bg-cool-bg-card p-5 shadow-sm"
                >
                  <div className="mb-3">
                    <h4 className="mb-1 flex items-center gap-2 text-sm font-semibold text-deep-blue-900">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                      难点 {i + 1}
                    </h4>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {c.challenge}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gold-500/5 p-3">
                    <h4 className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gold-500">
                      <CheckCircle2 size={14} />
                      解决方案
                    </h4>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {c.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ===== 成果 ===== */}
        {project.achievements && project.achievements.length > 0 && (
          <Section icon={CheckCircle2} title="项目成果" delay>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {project.achievements.map((a, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gold-500/10 bg-gradient-to-br from-cool-bg-card to-gold-500/[0.02] p-4 text-center shadow-sm"
                >
                  <p className="text-sm font-medium text-deep-blue-900">
                    {a}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ===== 技术栈详情 ===== */}
        {(project.fullTechStack && project.fullTechStack.length > 0) && (
          <Section icon={Code2} title="技术栈详情" delay>
            <div className="flex flex-wrap gap-2">
              {project.fullTechStack.map((t) => (
                <Badge
                  key={t}
                  variant="skill"
                  className="text-xs transition-all hover:bg-deep-blue-900 hover:text-gold-500"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </Section>
        )}

        {/* ===== 底部导航 ===== */}
        <div className="mt-16 flex items-center justify-between border-t border-border-light pt-8">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-deep-blue-900"
          >
            <ArrowLeft size={14} />
            <span>返回项目列表</span>
          </Link>
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-deep-blue-900"
            >
              <Code2 size={14} />
              <span>查看源码</span>
            </a>
          )}
        </div>
      </main>

      {/* AI 数字人助手 */}
      <AiAgentCharacter />
    </div>
  );
}

// ===== 通用区块组件 =====
function Section({
  icon: Icon,
  title,
  children,
  delay,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
  delay?: boolean;
}) {
  return (
    <section className="mb-12">
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/10">
          <Icon size={16} className="text-gold-500" />
        </div>
        <h2 className="text-lg font-semibold text-deep-blue-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}
