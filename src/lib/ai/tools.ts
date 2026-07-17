/**
 * AI 工具定义
 * 从 knowledge.ts 读取结构化数据，供 LLM 调用
 */
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import {
  profile,
  skills,
  projects,
  experiences,
  getProjectBySlug,
  getSkillCategories,
} from "@/lib/knowledge";

/**
 * 1. 获取个人基本信息
 */
export const getPersonalInfo = new DynamicStructuredTool({
  name: "get_personal_info",
  description: "获取王仔研的个人基本信息，包括姓名、职位、简介、联系方式等",
  schema: z.object({}),
  func: async () => {
    return JSON.stringify({
      name: profile.name,
      title: profile.title,
      slogan: profile.slogan,
      summary: profile.summary,
      contact: profile.contact,
    });
  },
});

/**
 * 2. 获取技能列表
 */
export const getSkills = new DynamicStructuredTool({
  name: "get_skills",
  description: "获取王仔研的技术技能列表，可按分类筛选（如：后端技术、AI与智能化、数据库等）",
  schema: z.object({
    category: z.string().optional().describe("技能分类名称，不传则返回全部"),
  }),
  func: async ({ category }) => {
    const all = category
      ? skills.filter((s) => s.category === category)
      : skills;

    const grouped: Record<string, string[]> = {};
    for (const s of all) {
      if (!grouped[s.category]) grouped[s.category] = [];
      grouped[s.category].push(s.name);
    }
    return JSON.stringify(grouped);
  },
});

/**
 * 3. 获取项目列表 / 项目详情
 */
export const getProjects = new DynamicStructuredTool({
  name: "get_projects",
  description: "获取王仔研的项目经历列表，或传入 slug 获取单个项目详情",
  schema: z.object({
    slug: z.string().optional().describe("项目标识，不传则返回所有项目摘要"),
  }),
  func: async ({ slug }) => {
    if (slug) {
      const p = getProjectBySlug(slug);
      if (!p) return JSON.stringify({ error: "未找到该项目" });
      return JSON.stringify({
        title: p.title,
        description: p.description,
        role: p.role,
        period: p.period,
        company: p.company,
        tags: p.tags,
        highlights: p.highlights,
        responsibilities: p.responsibilities,
        achievements: p.achievements,
      });
    }
    return JSON.stringify(
      projects.map((p) => ({
        slug: p.slug,
        title: p.title,
        description: p.description,
        role: p.role,
        tags: p.tags,
      })),
    );
  },
});

/**
 * 4. 获取工作经历
 */
export const getExperiences = new DynamicStructuredTool({
  name: "get_experiences",
  description: "获取王仔研的工作经历，包括公司、时间、角色和主要成就",
  schema: z.object({}),
  func: async () => {
    return JSON.stringify(
      experiences.map((e) => ({
        company: e.company,
        role: e.role,
        period: e.period,
        description: e.description,
        highlights: e.highlights,
      })),
    );
  },
});

/**
 * 5. 获取技能分类列表
 */
export const getSkillCategoriesList = new DynamicStructuredTool({
  name: "get_skill_categories",
  description: "获取技能分类列表，如：后端技术、AI与智能化、数据库等",
  schema: z.object({}),
  func: async () => {
    return JSON.stringify(getSkillCategories());
  },
});

/**
 * 所有工具集合
 */
export const allTools = [
  getPersonalInfo,
  getSkills,
  getProjects,
  getExperiences,
  getSkillCategoriesList,
];

/**
 * 工具名称 → 工具实例的映射
 */
export const toolsByName: Record<string, DynamicStructuredTool> = {};
for (const tool of allTools) {
  toolsByName[tool.name] = tool as DynamicStructuredTool;
}
