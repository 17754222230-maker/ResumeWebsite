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

  // 详情页扩展字段
  period?: string;
  company?: string;
  responsibilities?: string[];
  challenges?: { challenge: string; solution: string }[];
  achievements?: string[];
  fullTechStack?: string[];
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
    period: "2026.04 - 至今",
    company: "飞猪（阿里巴巴旗下）",
    responsibilities: [
      "负责机票核心域后端开发，覆盖验座、验价、询价、收益计算、兜底出票等全链路功能",
      "对接多家航空公司及代理商接口，实现实时库存与价格同步",
      "优化高并发场景下的机票搜索与价格计算性能",
      "保障 ToC 端系统稳定性，支撑千万级用户访问",
    ],
    challenges: [
      {
        challenge: "机票价格实时性要求极高，多源数据聚合场景下接口响应慢",
        solution: "引入 Redis 多级缓存架构，设计缓存预热+失效策略；对核心查询链路进行异步化改造，结合 RocketMQ 削峰填谷",
      },
      {
        challenge: "兜底出票流程涉及多系统协调，分布式事务一致性问题突出",
        solution: "基于 Seata 实现分布式事务最终一致性，配合本地消息表+定时任务补偿机制，确保出票零差错",
      },
    ],
    achievements: [
      "支撑日均数万笔机票交易平稳处理",
      "核心接口响应时间降低 60%",
      "系统可用性保持在 99.99%",
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
    period: "2026.04 - 至今",
    company: "飞猪（阿里巴巴旗下）",
    responsibilities: [
      "主导 AI 解析引擎的架构设计与开发，基于 Spring AI 框架搭建核心能力",
      "对接大模型 API，设计提示词工程实现航司政策文件的规则提取与结构化转换",
      "开发政策文件的预处理管线，支持 PDF、Word 等多格式解析",
      "与运营团队协作，持续优化解析准确率与覆盖范围",
    ],
    challenges: [
      {
        challenge: "航司政策文件格式多样（PDF/Word/扫描件），非结构化文本解析难度大",
        solution: "设计多步骤解析管线：先 OCR/文本提取，再基于大模型分段理解，最后规则引擎校验，层层递进保障准确率",
      },
      {
        challenge: "政策文件中的专业术语和隐含规则难以准确提取",
        solution: "构建行业术语词库 + 少样本提示词模板，结合人工校验反馈循环持续优化模型输出质量",
      },
    ],
    achievements: [
      "政策解析准确率达到 90% 以上",
      "人工处理成本降低 70%",
      "成为团队 AI 赋能提效的标杆项目",
    ],
    fullTechStack: ["Java", "Spring AI", "SpringBoot", "LangChain", "OpenAI API", "RAG", "Python"],
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
    period: "2025.03 - 2025.12",
    company: "安徽工业大学科技园有限公司",
    responsibilities: [
      "负责付款、结算、发票等财务核心模块的需求分析与开发",
      "主导客商基础信息模块的缓存架构优化，提升系统吞吐量",
      "参与 MySQL 至华为 GaussDB 的国产化数据库迁移方案设计与实施",
      "制定开发文档规范，主导周代码走查会议",
    ],
    challenges: [
      {
        challenge: "财务结算单据生成高峰期并发激增，原同步处理导致接口响应缓慢",
        solution: "引入 RocketMQ 消息队列对结算流程进行异步化改造，将付款单生成、销售结算单创建等操作解耦；同时对核心 SQL 进行执行计划分析与索引重构",
      },
      {
        challenge: "客商模块作为基础数据源被 30+ 业务方高频调用，数据库压力过大",
        solution: "设计 Redis 多级缓存架构（本地缓存 + 分布式缓存），实现缓存预热与失效策略，接口响应时间从 800ms 降至 100ms，数据库查询量减少 40%",
      },
      {
        challenge: "国产化要求需将核心数据从 MySQL 迁移至华为 GaussDB，面临语法兼容与性能差异",
        solution: "使用官方迁移工具进行全量+增量同步，追平 binlog 后校验数据一致性，迁移过程零数据丢失",
      },
    ],
    achievements: [
      "核心 SQL 查询时间从 3s 优化至 200ms 以内",
      "系统吞吐量提升 2 倍，支撑日均数万笔交易",
      "数据库查询量减少 40%，迁移零数据丢失",
      "累计代码走查 400+ 处，提升团队代码质量",
    ],
    fullTechStack: ["SpringBoot", "SpringCloud", "MyBatis-Plus", "MySQL", "华为 GaussDB", "Redis", "RocketMQ"],
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
    period: "2024.07 - 2024.11",
    company: "安徽工业大学科技园有限公司",
    responsibilities: [
      "参与微服务架构选型与搭建，基于 Spring Cloud Alibaba 构建 12 个微服务",
      "负责促销秒杀活动整体方案设计与开发",
      "实现分布式事务一致性方案，保障订单与支付数据最终一致",
      "参与系统容量评估与性能瓶颈排查",
    ],
    challenges: [
      {
        challenge: "微服务拆分后服务数量达 12 个，服务发现、配置管理、路由转发复杂度剧增",
        solution: "基于 Nacos 建设服务注册与配置中心，实现配置动态刷新；Gateway 统一入口定制全局过滤器实现鉴权、日志、限流；引入 Sentinel 配置熔断降级规则",
      },
      {
        challenge: "促销课程秒杀活动瞬时流量冲击数据库，存在超卖、库存不一致、订单重复等风险",
        solution: "设计多级防护体系：前端限流 + 按钮防抖；Redis 预减库存 + Lua 脚本保证原子性；RocketMQ 异步削峰下单；热点课程采用 Redis 集群 + Caffeine 本地缓存抗热点",
      },
      {
        challenge: "用户下单支付涉及订单、支付、积分等多系统，需保证分布式事务最终一致性",
        solution: "基于 Seata AT 模式解决跨服务数据一致性；设计本地消息表 + 定时任务补偿方案处理超时场景；Redis 记录支付流水号进行幂等性设计",
      },
    ],
    achievements: [
      "服务调用成功率提升至 99.99%",
      "万人同时抢课，订单创建成功率 99.9%，无超卖",
      "压测 QPS 由 500 提升至 2500+",
      "支付成功率提升至 99.95%",
    ],
    fullTechStack: ["SpringBoot", "Spring Cloud Alibaba", "Nacos", "Gateway", "Sentinel", "Seata", "MySQL", "Redis", "ElasticSearch", "RocketMQ", "Caffeine"],
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
    period: "2023.09 - 2024.05",
    company: "安徽工业大学科技园有限公司",
    responsibilities: [
      "负责销售订单的创建、审批、变更、发货跟踪等核心功能开发",
      "实现基于客户等级、订货量、产品规格的阶梯定价规则",
      "开发多维度销售报表，支撑管理层实时查看销售数据",
      "参与合同管理、到期提醒等功能开发",
    ],
    challenges: [
      {
        challenge: "月报统计中大数据量查询缓慢，报表生成时间长达 2 分钟",
        solution: "通过 MySQL 索引优化（联合索引、覆盖索引）和 SQL 改写（子查询代替复杂 JOIN），将报表生成时间从 2 分钟缩短至 15 秒；引入 Redis 缓存热点统计结果，每日凌晨定时刷新",
      },
      {
        challenge: "阶梯定价计算复杂，客户等级 × 订货量 × 产品规格组合条件多",
        solution: "设计价格计算引擎，通过 Redis 缓存客户等级与价格表，价格查询响应时间从 200ms 降至 20ms",
      },
    ],
    achievements: [
      "报表生成时间 2min → 15s，效率提升 8 倍",
      "价格查询响应 200ms → 20ms",
      "实现销售全流程线上化闭环",
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
    period: "2022.07 - 2026.01",
    company: "安徽工业大学科技园有限公司",
    responsibilities: [
      "负责型材 L4/L3 计划相关业务落地，承接上层生产计划拆解为可执行作业计划",
      "管控热轧物料从投入、生产、流转到入库的全流程跟踪",
      "统筹 L4 存货模块日常管理，梳理入库、出库、盘点等业务流程",
      "完成 40+ 张三级炼钢业务报表的业务逻辑梳理与落地",
    ],
    challenges: [
      {
        challenge: "钢铁制造流程复杂（炼铁→炼钢→连铸→热轧→冷轧→型材），各环节数据标准不统一",
        solution: "梳理全流程物料编码和数据规范，建立统一的物料跟踪体系，确保各环节数据准确衔接",
      },
      {
        challenge: "L4 存货模块与 L3 生产计划数据实时同步要求高，数据不一致风险大",
        solution: "设计定时对账机制，通过存储过程实现日终数据一致性校验，异常数据自动告警并触发补偿处理",
      },
    ],
    achievements: [
      "保障型材生产计划有序推进，计划达成率显著提升",
      "热轧物料账实一致率提升至 99.5% 以上",
      "40+ 张业务报表准确落地，为管理层提供精准数据支撑",
    ],
    fullTechStack: ["C#", ".NET Framework", "WinForms", "DevExpress", "C++", "Oracle", "DB2", "EPEX"],
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
