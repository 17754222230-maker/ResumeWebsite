/**
 * 知识卡片数据读取工具
 * 在构建时读取 data/ 下的结构化文件，供页面和 AI Agent 使用
 *
 * @see /data/profile.md 原始简历文档
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
  subtext?: string;
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
  content?: string;
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
  title: "AI 全栈开发工程师",
  slogan:
    "以代码构筑数字世界，用技术驱动业务价值。",
  summary:
    "深耕 Java 后端与微服务架构，积极探索 AI 赋能开发（Spring AI / LangChain / AI Coding）。具备全栈思维，致力于用技术驱动业务价值。",
  contact: {
    email: "17754222230@163.com",
    github: "https://github.com/17754222230-maker",
  },
};

// ===== 技能列表（后端 & AI 优先） =====
// 由简历 /data/profile.md 自动同步
export const skills: Skill[] = [
  // ★★★ 后端技术（核心）
  { name: "Java", category: "后端技术" },
  { name: "SpringBoot", category: "后端技术" },
  { name: "SpringCloudAlibaba", category: "后端技术" },
  { name: "MyBatis-Plus", category: "后端技术" },
  { name: "JVM 调优", category: "后端技术" },
  { name: "并发编程", category: "后端技术" },
  { name: "微服务架构", category: "后端技术" },
  { name: "Python", category: "后端技术" },
  { name: "C++", category: "后端技术" },

  // ★★★ AI 与智能化（前沿）
  { name: "AI Coding 赋能", category: "AI 与智能化" },
  { name: "Spring AI", category: "AI 与智能化" },
  { name: "LangChain", category: "AI 与智能化" },
  { name: "LangGraph", category: "AI 与智能化" },
  { name: "大模型应用", category: "AI 与智能化" },

  // 数据库
  { name: "MySQL", category: "数据库" },
  { name: "Redis", category: "数据库" },
  { name: "华为 GaussDB", category: "数据库" },
  { name: "ElasticSearch", category: "数据库" },
  { name: "Oracle / DB2", category: "数据库" },

  // 消息与中间件
  { name: "RocketMQ", category: "消息与中间件" },
  { name: "Nacos", category: "消息与中间件" },
  { name: "Sentinel", category: "消息与中间件" },
  { name: "Seata", category: "消息与中间件" },

  // 前端技术
  { name: "Vue.js", category: "前端技术" },
  { name: "HTML / CSS", category: "前端技术" },
  { name: "TypeScript", category: "前端技术" },
  { name: "C# / .NET", category: "前端技术" },

  // 系统与工具
  { name: "Git", category: "系统与工具" },
  { name: "Docker", category: "系统与工具" },
  { name: "Linux", category: "系统与工具" },
  { name: "CI/CD", category: "系统与工具" },
];

// ===== 项目列表 =====
export const projects: Project[] = [
  // ===== 飞猪项目（2026.04 - 至今）=====
  {
    slug: "fliggy-ticket-agent",
    title: "飞猪机票代理商经营项目",
    description:
      "飞猪机票代理商经营平台，面向机票代理商提供全链路经营能力。覆盖验座、验价、询价、收益计算、兜底出票等核心功能，是机票开发后端的核心域，日均处理数万笔机票交易。",
    tags: ["Java", "SpringBoot", "SpringCloudAlibaba", "RocketMQ", "Redis", "高并发"],
    role: "后端开发工程师",
    highlights: [
      "负责机票核心域开发：验座、验价、询价、收益计算、兜底出票全链路",
      "高并发机票搜索与价格计算场景下的性能优化",
      "ToC 面向千万级用户，保障系统稳定性与响应速度",
    ],
  },
  {
    slug: "fliggy-merchant-ai",
    title: "商家运营后台经营提效项目",
    description:
      "通过引入 AI 技术提升商家运营效率。核心功能是让 AI 解析航司政策文件（PDF/Word），自动提取核心规则并转换为飞猪内部统一政策文件格式，大幅降低人工处理成本。引入 Spring AI 框架构建智能解析引擎。",
    tags: ["Java", "Spring AI", "AI Coding", "大模型", "智能文档解析", "政策转换"],
    role: "后端开发工程师 / AI 集成",
    highlights: [
      "引入 Spring AI 框架，构建航司政策文件的智能解析与转换引擎",
      "AI 自动提取政策规则，转换为飞猪内部统一政策格式",
      "显著降低人工处理航司政策文档的时间成本，提升运营效率",
    ],
  },
  // ===== 现有项目 =====
  {
    slug: "chalco-erp",
    title: "中铝国贸 1.0 系统（ERP）",
    description:
      "为中国铝业集团打造的企业资源计划系统，整合合同、生产、物流、财务等业务流程，实现企业端到端数据闭环。深度参与系统设计、开发及运维。",
    tags: ["SpringBoot", "SpringCloud", "MySQL", "GaussDB", "Redis", "RocketMQ"],
    role: "Java 开发工程师",
    highlights: [
      "财务模块高并发改造：RocketMQ 异步解耦，核心 SQL 3s → 200ms",
      "客商模块 Redis 多级缓存优化，QPS 1000+ 响应 800ms → 100ms",
      "MySQL → 华为 GaussDB 国产化迁移，binlog 增量同步零丢失",
      "主导周代码走查，累计审核 400+ 处代码",
    ],
  },
  {
    slug: "online-education-platform",
    title: "皖江在线教育云平台",
    description:
      "一站式在线学习平台，提供课程学习、认证考试、教学管理等服务。采用 Spring Cloud Alibaba 微服务架构，实现高并发、高可用分布式系统。",
    tags: ["SpringBoot", "SpringCloudAlibaba", "Redis", "ElasticSearch", "RocketMQ"],
    role: "Java 开发工程师",
    highlights: [
      "12 微服务架构搭建，Nacos + Gateway + Sentinel，可用性 99.99%",
      "秒杀活动：Redis 预减库存 + Lua + RocketMQ 削峰，万人抢课无超卖",
      "Seata 分布式事务 + 本地消息表，支付成功率 99.95%",
      "JVM + SQL 优化，单机 QPS 800 → 2000+",
    ],
  },
  {
    slug: "sangang-smart-operations",
    title: "福建三钢闽光智能运营系统",
    description:
      "三钢集团一体化企业资源管理平台，覆盖销售、采购、库存、质量、财务结算等核心模块，打通产、销、存环节。",
    tags: ["SpringBoot", "MyBatis-Plus", "MySQL", "Redis"],
    role: "Java 开发工程师",
    highlights: [
      "销售订单全流程管理：订单状态机 + 库存联动",
      "阶梯定价引擎：客户等级 × 订货量动态计算，Redis 缓存 200ms → 20ms",
      "多维度销售报表：索引优化 + SQL 改写，生成时间 2min → 15s",
    ],
  },
  {
    slug: "masteel-mes",
    title: "马钢股份制造管理系统（MES）",
    description:
      "马鞍山钢铁厂生产管控中枢 L3 级系统，覆盖炼铁、炼钢、连铸、热轧、冷轧、型材、轮轴等全冶金流程，实现生产计划、执行、质量、物流一体化闭环管控。",
    tags: ["C#", "C++", "Oracle", "DB2", "WinForms"],
    role: "MES 工程师",
    highlights: [
      "型材 L4/L3 计划模块：承接上层计划拆解为车间作业计划",
      "热轧物料全流程跟踪，保障账实一致",
      "四钢轧 L4 存货模块：入库、出库、盘点流程优化",
      "40+ 张三级炼钢业务报表落地",
    ],
  },
];

// ===== 工作经历 =====
export const experiences: Experience[] = [
  {
    company: "飞猪（阿里巴巴旗下，中软国际外包）",
    role: "Java 开发工程师",
    period: "2026.04 - 至今",
    description:
      "负责飞猪机票核心域后端开发及 AI 提效项目建设。",
    highlights: [
      "【飞猪机票代理商经营项目】验座、验价、询价、收益计算、兜底出票等核心功能开发，高并发 ToC 场景",
      "【商家运营后台经营提效项目】引入 Spring AI 框架，AI 解析航司政策文件自动转换为飞猪内部统一政策",
    ],
  },
  {
    company: "安徽工业大学科技园有限公司",
    role: "Java 开发工程师",
    period: "2022.07 - 2026.01",
    description:
      "负责多个企业级项目的后端开发与系统优化，涉及 ERP、在线教育、智能制造等领域。",
    highlights: [
      "【中铝国贸 ERP】财务高并发 + Redis 多级缓存 + MySQL→GaussDB 国产化迁移",
      "【皖江在线教育平台】12 微服务架构 · 万人秒杀 · Seata 分布式事务 · JVM 调优",
      "【福建三钢智能运营】销售全流程 · 阶梯定价引擎 · 报表优化 2min→15s",
      "【马钢 MES 系统】L4/L3 生产计划 · 物料追踪 · 40+ 业务报表",
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
 * 获取所有技能分类（保持定义顺序）
 */
export function getSkillCategories(): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const s of skills) {
    if (!seen.has(s.category)) {
      seen.add(s.category);
      result.push(s.category);
    }
  }
  return result;
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
