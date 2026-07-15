/**
 * 知识卡片数据读取工具
 * 在构建时读取 data/ 下的结构化文件，供页面和 AI Agent 使用
 */

export interface Profile {
  name: string;
  title: string;
  slogan: string;
  avatar?: string;
  summary: string;
  contact: {
    email?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Skill {
  name: string;
  category: string;
  level?: number; // 0-100
  icon?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail?: string;
  role?: string;
  highlights?: string[];
  links?: {
    demo?: string;
    github?: string;
  };
  content?: string; // 详细描述
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

// ===== 个人信息 =====
export const profile: Profile = {
  name: "Wangziyan",
  title: "全栈开发工程师",
  slogan: "用代码构建数字世界的艺术与逻辑",
  summary:
    "热爱技术与创新的全栈开发者，专注于构建高性能、优雅的用户体验。拥有丰富的前后端开发经验，善于将复杂问题转化为简洁解决方案。",
  contact: {
    email: "wangziyan@example.com",
    github: "https://github.com/17754222230-maker",
  },
};

// ===== 技能列表 =====
export const skills: Skill[] = [
  // 前端
  { name: "React", category: "前端框架", level: 90 },
  { name: "Next.js", category: "前端框架", level: 85 },
  { name: "TypeScript", category: "编程语言", level: 88 },
  { name: "Tailwind CSS", category: "前端框架", level: 85 },
  { name: "Vue.js", category: "前端框架", level: 75 },
  { name: "HTML/CSS", category: "前端基础", level: 92 },

  // 后端
  { name: "Node.js", category: "后端技术", level: 85 },
  { name: "Python", category: "后端技术", level: 80 },
  { name: "FastAPI", category: "后端技术", level: 75 },
  { name: "PostgreSQL", category: "数据库", level: 78 },
  { name: "MongoDB", category: "数据库", level: 72 },
  { name: "Redis", category: "数据库", level: 70 },

  // DevOps & 工具
  { name: "Docker", category: "DevOps", level: 75 },
  { name: "Git", category: "工具", level: 90 },
  { name: "CI/CD", category: "DevOps", level: 72 },
  { name: "Linux", category: "工具", level: 80 },
  { name: "Nginx", category: "DevOps", level: 70 },
  { name: "AWS", category: "云服务", level: 65 },
];

// ===== 项目列表 =====
export const projects: Project[] = [
  {
    slug: "resume-website",
    title: "个人简历 & 智能知识站",
    description:
      "基于 Next.js 14 构建的个人品牌网站，集成 AI 智能助理，八字命理配色体系。",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "AI Agent"],
    role: "独立全栈开发",
    highlights: [
      "八字命理映射的蓝金配色系统",
      "AI 知识助手支持自然语言问答",
      "SSG 静态生成，极致首屏性能",
    ],
    links: {
      github: "https://github.com/17754222230-maker/ResumeWebsite",
    },
  },
  {
    slug: "ai-chat-app",
    title: "AI 对话应用",
    description: "基于大模型的智能对话应用，支持多轮对话、知识库检索与工具调用。",
    tags: ["React", "Python", "FastAPI", "LLM"],
    role: "后端开发 / AI 集成",
    highlights: [
      "集成 DeepSeek 大模型 API",
      "实现工具调用与知识检索增强",
      "流式响应，实时对话体验",
    ],
  },
  {
    slug: "ecommerce-platform",
    title: "电商管理平台",
    description: "全功能电商后台管理系统，涵盖商品管理、订单处理与数据分析看板。",
    tags: ["React", "Node.js", "PostgreSQL", "Docker"],
    role: "全栈开发",
    highlights: [
      "商品管理模块：增删改查 + 批量导入",
      "数据可视化看板：销售额、订单趋势",
      "RBAC 权限控制体系",
    ],
  },
  {
    slug: "devops-toolkit",
    title: "DevOps 自动化工具集",
    description: "自动化部署与监控工具集，实现 CI/CD 流程自动化和服务健康监控。",
    tags: ["Python", "Docker", "Shell", "CI/CD"],
    role: "DevOps 工程师",
    highlights: [
      "自动化部署流水线设计",
      "服务健康监控与告警系统",
      "容器化部署方案",
    ],
  },
];

// ===== 工作经历 =====
export const experiences: Experience[] = [
  {
    company: "科技有限公司",
    role: "全栈开发工程师",
    period: "2023 - 至今",
    description:
      "负责公司核心产品的全栈开发与架构设计，参与技术选型与系统优化。",
    highlights: [
      "主导前端架构从 Vue 迁移到 React/Next.js",
      "设计并实现微服务 API 网关",
      "优化首屏加载性能，LCP 降低 40%",
    ],
  },
  {
    company: "创新互联网公司",
    role: "前端开发工程师",
    period: "2021 - 2023",
    description: "负责 Web 应用的前端开发与性能优化，参与组件库建设。",
    highlights: [
      "搭建企业级 UI 组件库",
      "实现大型表格组件百万级数据渲染优化",
      "推动 TypeScript 在团队全面落地",
    ],
  },
];

// ===== 工具函数 =====

/**
 * 按分类获取技能
 */
export function getSkillsByCategory(category?: string): Skill[] {
  if (category) return skills.filter((s) => s.category === category);
  return skills;
}

/**
 * 获取所有技能分类
 */
export function getSkillCategories(): string[] {
  return [...new Set(skills.map((s) => s.category))];
}

/**
 * 根据 slug 查找项目
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * 搜索项目
 */
export function searchProjects(query: string): Project[] {
  const q = query.toLowerCase();
  return projects.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)),
  );
}
