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
    "以匠心打造产品壁垒，用技术驱动业务价值。",
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
  // ===== 个人项目 =====
  {
    slug: "bp-agent",
    title: "英魂之刃赛事 BP 智能决策系统（BP Agent）",
    description:
      "面向职业/半职业战队的电竞赛事 BP 实时决策与模拟训练系统。针对 BO5 全局单边 BP 赛制下后期决策空间指数级收缩、教练认知负荷过高的问题，设计并实现规则-模型-LLM 三层混合决策架构，在 30 秒操作时限内提供可解释、可信赖的针对性 BP 建议。",
    tags: ["Python", "FastAPI", "LightGBM", "LangChain", "RAG", "大模型"],
    role: "独立开发者（全栈 + AI）",
    highlights: [
      "规则-模型-LLM 三层混合决策架构：80% 常规决策由前两层处理，仅复杂博弈触发 LLM",
      "硬超时降级 + 多模型档位切换，P99 延迟 <25s，决策链路零超时",
      "自研 LightGBM 阵容协同评分模型，弥补纯 LLM 方案的组合评估盲区",
      "对手画像 RAG + 预计算 80×80 Counter 矩阵，BP 会话期间零外部 IO",
    ],
    period: "2026.05 - 至今",
    company: "个人项目",
    responsibilities: [
      "设计规则-模型-LLM 三层递进决策链路：规则引擎（<50ms）、LightGBM 协同评分模型（<10ms）、LLM 推理（2-8s），并实现硬超时自动降级与多模型档位切换的熔断机制",
      "构建自动化爬虫 + 清洗管线，基于对手近 20 场 BO5 记录提取 Ban/Pick 偏好与关键局英雄池标签，通过 RAG 将对手画像注入 System Prompt（Token 预算 ≤300），实现针对性 BP 推荐",
      "基于历史赛事数据训练 LightGBM 阵容协同评分模型，量化评估控制链衔接、伤害类型互补、节奏匹配度，作为 Layer 1 核心排序因子",
      "预计算 80×80 Counter 矩阵与阵容协同特征，保障 BP 会话期间零外部 IO",
      "制定结构化可解释输出规范：严格 JSON Schema 约束 LLM 输出，强制每条推荐附带 Counter 匹配度、协同分变化、选手熟练度、全局保留价值四维理由，并支持教练反馈标记形成闭环",
      "设计标准 GameState 接口实现感知-决策解耦（输入层可插拔），并对 Counter 关系、Tier List 等知识引入类 Git 版本控制，支持版本回滚与影响分析",
    ],
    challenges: [
      {
        challenge: "30 秒 BP 操作时限 vs LLM 2-8s 推理延迟，直接调用 LLM 无法保障实时性与稳定性",
        solution: "将决策链路拆为规则引擎（<50ms）、LightGBM 协同评分（<10ms）、LLM 推理（2-8s）三层递进调用，80% 常规决策由前两层处理；配合硬超时自动降级与多模型档位切换策略，P99 延迟 <25s，决策链路零超时",
      },
      {
        challenge: "LLM 懂单英雄克制但不懂阵容的组合化学反应，纯 LLM 方案存在整体性评估盲区",
        solution: "基于历史赛事数据训练 LightGBM 协同评分模型，量化控制链衔接、伤害类型互补、节奏匹配度，作为 Layer 1 核心排序因子弥补 LLM 组合盲区",
      },
      {
        challenge: "通用推荐缺乏针对性，无法体现对手的 Ban/Pick 偏好与英雄池特征",
        solution: "自动化爬虫 + 清洗管线提取对手近 20 场 BO5 的画像标签，通过 RAG 注入 System Prompt（Token 预算 ≤300）；预计算 80×80 Counter 矩阵与阵容协同特征，实现从通用推荐到针对性 BP 的升级",
      },
    ],
    achievements: [
      "P99 延迟 <25s，决策链路零超时",
      "80% 常规决策由规则引擎与协同评分模型处理，仅复杂博弈场景触发 LLM",
      "BP 会话期间零外部 IO",
      "对手画像注入 Token 预算控制在 300 以内",
    ],
    fullTechStack: ["Python", "FastAPI", "LightGBM", "LangChain", "通义千问", "PostgreSQL", "Redis", "Next.js", "WebSocket"],
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
      "面向皖江区域高校与职业培训机构的在线学习平台，覆盖课程浏览、报名购课、订单支付与学习进度管理，注册用户 5 万+，日活约 2000。负责交易链路与课程查询侧的后端设计与开发，重点解决热门课程开抢防超卖、支付状态一致性、慢 SQL 与缓存稳定性等问题。",
    tags: ["SpringBoot", "MySQL", "Redis", "RocketMQ", "支付链路", "缓存优化"],
    role: "Java 开发工程师",
    highlights: [
      "热门课程限时开抢：Redis 预扣名额 + Lua 原子校验 + MQ 削峰，峰值 150 QPS 零超卖",
      "订单状态机 + 支付回调幂等 + 延迟消息自动关单，对账差异单从每周 10+ 降至基本清零",
      "课程详情页 Redis 缓存 + 穿透/雪崩/击穿防护，P95 350ms → 90ms",
      "慢 SQL 治理：日均 20+ 条降至 3 条以内，核心接口 P95 全部 <200ms",
    ],
    period: "2024.07 - 2024.11",
    company: "安徽工业大学科技园有限公司",
    responsibilities: [
      "负责交易链路的表结构设计与接口开发，覆盖课程、订单、支付回调等核心表与接口",
      "设计热门课程限时开抢方案：名额预热至 Redis，Lua 脚本原子扣减，下单请求经 RocketMQ 异步落库，Nginx 层做入口限流",
      "实现订单状态机（待支付/已支付/已关闭/已退款）与支付回调幂等（流水号唯一约束 + 状态迁移校验），超时未支付通过 RocketMQ 延迟消息自动关单并回补名额",
      "设计课程详情页缓存方案：Redis 缓存多表聚合结果，空值缓存防穿透、TTL 随机抖动防集中过期、互斥重建防击穿，延迟双删处理更新一致性",
      "统一治理 XXL-Job 定时任务：渠道对账、关单兜底扫描等任务接入统一告警，失败任务可追溯可重跑",
      "主导上线前接口压测与容量评估，输出各核心接口的基线 QPS 与扩容阈值，并推动慢 SQL 治理",
    ],
    challenges: [
      {
        challenge: "合作高校统一开课报名，开抢 1 分钟内峰值约 150 QPS（平时不足 20），初版直接扣减数据库名额，出现超卖和连接池耗尽",
        solution: "名额提前预热进 Redis，Lua 脚本将校验与扣减合并为原子操作，扣减成功才投递 MQ 异步创建订单；关单、退款的名额回补走同一段 Lua 保证账目闭合。对比过分布式锁方案，因串行化后吞吐不够而放弃",
      },
      {
        challenge: "第三方支付回调存在重复推送，且与主动查单结果乱序到达，曾出现已关闭订单被回调置为已支付的资损风险",
        solution: "以支付流水号建唯一约束做幂等表，所有状态变更必须通过状态机校验合法迁移，非法迁移拒绝落库并记录告警；XXL-Job 每日拉取渠道账单对账，差异单自动进人工处理队列",
      },
      {
        challenge: "课程详情页聚合课程、章节、教师、评价多表数据，高峰期偶发响应超 1s，且缓存集中过期时数据库出现压力尖刺",
        solution: "聚合结果写入 Redis 并对 TTL 加随机抖动避免集中失效，不存在的课程缓存空值防穿透，热点 key 用互斥锁单线程重建；同步对底层查询补联合索引、改写大 JOIN 为分步查询，P95 从 350ms 降至 90ms",
      },
    ],
    achievements: [
      "热门课程开抢峰值 150+ QPS 平稳承接，全期零超卖、零重复扣款",
      "课程详情页接口 P95 从 350ms 降至 90ms，消除缓存集中过期引发的数据库压力尖刺",
      "慢 SQL 从日均 20+ 条治理至 3 条以内，核心接口 P95 全部控制在 200ms 内",
      "支付对账差异单从每周 10+ 降至基本清零，无需人工介入",
    ],
    fullTechStack: ["SpringBoot", "MyBatis-Plus", "MySQL", "Redis", "RocketMQ", "XXL-Job", "Nginx"],
  },
  {
    slug: "sangang-smart-operations",
    title: "福建三钢闽光智能运营系统",
    description:
      "三钢闽光厂内 ERP，覆盖销售、采购、库存与财务结算，与计量、质检系统联动打通购销存到财务的单据链路。负责客商主数据与销售到应收结算链路的开发，重点解决一户多码治理、钢材过磅重量结算与磅差处理、信用放货管控、月结卡点治理等问题。",
    tags: ["SpringBoot", "MySQL", "客商主数据", "应收结算", "信用管控", "月结"],
    role: "Java 开发工程师",
    highlights: [
      "客商主数据治理：统一社会信用代码唯一键 + 一户多角色，合并存量重复档案 300+ 户",
      "销售到应收一体化：对接计量过磅数据结算，磅差允差内自动摊销、超差走调整单，发票按结算单勾稽",
      "信用放货管控：可用额度（信用额度 + 预收余额 - 未核销应收）出库时实时校验，超额 OA 特批留痕",
      "月结卡点清单化治理，月结周期从 5 个工作日压缩至 2 个",
    ],
    period: "2023.09 - 2024.05",
    company: "安徽工业大学科技园有限公司",
    responsibilities: [
      "负责客商主数据模块：客户/供应商档案、开票信息、银行账户、信用额度与启停状态管理，向销售、采购、财务提供统一主数据接口",
      "开发应收结算链路：销售出库对接计量系统过磅数据生成应收结算单，状态机（草稿/审核/已开票/部分核销/关闭）控制合法迁移，金额全链路 BigDecimal + DECIMAL 保证精度",
      "实现发票勾稽与红冲：销项发票按结算单勾稽开具，作废走红冲反向单据，保留完整可追溯链路",
      "实现信用放货校验与超期应收预警：出库保存时实时计算可用额度，XXL-Job 定时扫描超期应收生成预警清单",
      "参与月结流程治理：未开票结算单、未核销收款等卡点清单化，支撑期初期末对平与与 MES 产量数据核对",
      "开发销售与往来对账报表，通过联合索引与 SQL 改写将月报生成时间从 2 分钟缩短至 15 秒",
    ],
    challenges: [
      {
        challenge: "钢材销售按实际磅重结算，理计与实计存在磅差，早期人工调差导致应收金额与发票不符，月底对账大量差异单",
        solution: "结算单直接取计量系统过磅数据，磅差在允差范围内自动摊入结算金额、超差自动生成调整单走审批；发票严格按结算单勾稽，差异只能通过红冲/调整单修正而非直改数据。对账差异单从月均 50+ 降至个位数",
      },
      {
        challenge: "历史系统客商重复建档（简称/全称/更名各建一户），同一家企业应收分散在多个档案下，往来对账口径混乱",
        solution: "以统一社会信用代码为唯一键清洗存量数据，保留主档、历史档建合并映射表保证历史单据可追溯；新增建档强校验 + 审批；既是客户又是供应商的企业挂同一主体下不同角色，而非重复建两份档案",
      },
      {
        challenge: "赊销客户超额度发货靠业务员人工把关，出现过超信用发货形成坏账风险的案例",
        solution: "出库单保存时实时计算可用额度 = 信用额度 + 预收余额 - 未核销应收 - 在途发货，超额阻断并转 OA 特批留痕；权衡过实时查应收的性能开销，未核销金额改为单据审核时增量维护而非每次全量汇总",
      },
    ],
    achievements: [
      "合并存量重复客商档案 300+ 户，新增建档重复率降为 0",
      "应收结算与发票勾稽对账差异单从月均 50+ 降至个位数",
      "月结周期从 5 个工作日压缩至 2 个，超信用发货实现系统硬管控",
      "月报生成时间 2min → 15s，往来对账报表支撑财务日常对账",
    ],
    fullTechStack: ["SpringBoot", "MyBatis-Plus", "MySQL", "Redis", "XXL-Job", "EasyExcel"],
  },
  {
    slug: "masteel-mes",
    title: "马钢股份制造管理系统（MES）",
    description:
      "马钢型材、热轧产线的 L3 级制造执行系统，向上承接 L4 订单计划、向下对接 L2 过程控制，覆盖作业计划、物料跟踪、存货与生产报表。负责型材计划分解、热轧卷号跟踪与存货对账等模块，日均处理 20 万+ 条数采报文，在 7×24 连续生产约束下保障计划闭环与账实一致。",
    tags: ["C#", "Oracle", "MES/L3", "物料跟踪", "L2 数采", "中间表集成"],
    role: "MES 开发工程师",
    highlights: [
      "型材 L4→L3 计划分解：合同订单拆为轧制批次作业计划，支持插单、改判调整与实绩回传闭环",
      "热轧物料跟踪：切分/合卷母子卷号继承治理，月盘点账实差异从 30+ 卷降至个位数",
      "L2 数采接入：中间表异步消费 + 报文流水号幂等，日均 20 万+ 条，重复入账清零",
      "40+ 张炼钢业务报表与日终对账 Job，人工核账从每天约 2 小时降至半小时内",
    ],
    period: "2022.07 - 2026.01",
    company: "安徽工业大学科技园有限公司",
    responsibilities: [
      "负责型材 L4/L3 计划模块：承接 L4 合同订单分解为轧制批次作业计划，处理插单、改判、余材利用等调整场景，生产实绩按批次回传 L4",
      "负责热轧物料跟踪：坯料投入→轧制→精整→入库全程卷号跟踪，维护切分/合卷时的母子卷继承关系与堆场库位信息",
      "开发 L2 数采接入：称重计量、生产实绩报文经 DB 中间表异步消费入库，设计报文流水号幂等与异常报文挂起重处理机制",
      "负责四钢轧存货模块：入库、出库、盘点流程，设计日终账实对账 Job，差异自动生成待处理清单",
      "完成 40+ 张三级炼钢业务报表的口径梳理与落地，清理重写部分遗留 Oracle 存储过程",
      "在 7×24 连续生产约束下参与制定发版方案：利用检修窗口发布，数据库变更先兼容后切换，中间表缓冲保证停机期间 L2 数据不丢",
    ],
    challenges: [
      {
        challenge: "L2 称重报文存在重发与乱序，曾出现同一卷称重实绩重复入账，导致产量报表与实物对不上，财务月结前集中排查成本很高",
        solution: "报文落中间表后按流水号 + 业务键做幂等校验，消费状态标记防重复处理；乱序报文不按到达顺序处理，而是按卷号归并后取业务时间最新值；日终对账 Job 兜底校验，异常报文进挂起队列人工确认而非直接丢弃",
      },
      {
        challenge: "热轧卷切分、合卷时卷号继承规则不统一，跟踪链断裂后堆场实物与系统账面对不上，月盘点差异卷数长期 30+ 卷",
        solution: "梳理切分/合卷的卷号继承规则并落入母子卷关系表，任何物料变更必须留继承记录；行车吊运、倒垛导致的库位不符单独记异动流水，盘点差异可按链路回溯定位到具体环节",
      },
      {
        challenge: "产线 7×24 连续生产，L3 停机升级会阻断计划下发与数采入库，无法像互联网系统一样随时发版",
        solution: "发版固定在产线检修窗口；数据库变更采用先加列兼容旧版、再切换的两步策略；L2 报文由中间表缓冲，L3 短暂停机期间数据不丢、恢复后补消费，多次升级未影响生产",
      },
    ],
    achievements: [
      "日均 20 万+ 条 L2 数采报文稳定接入，重复/乱序导致的实绩错账清零",
      "热轧物料账实一致率提升至 99.5% 以上，月盘点差异卷数从 30+ 降至个位数",
      "型材计划下发-实绩回传闭环稳定运行，插单改判成为日常化系统操作",
      "40+ 张业务报表落地，日终对账 Job 将人工核账从每天约 2 小时降至半小时内",
    ],
    fullTechStack: ["C#", ".NET Framework", "WinForms", "DevExpress", "Oracle", "DB2", "PL/SQL 存储过程", "WebService", "DB 中间表集成"],
  },
];

// ===== 工作经历 =====
export const experiences: Experience[] = [
  {
    company: "飞猪（阿里巴巴旗下，易宝软件外包）",
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
      "【皖江在线教育平台】Redis+Lua 限时开抢 · 支付幂等与订单状态机 · 详情页缓存防护 · 慢SQL治理",
      "【福建三钢智能运营】客商主数据治理 · 磅差结算与发票勾稽 · 信用放货管控 · 月结 5天→2天",
      "【马钢 MES 系统】L4→L3 计划分解 · 热轧卷号跟踪治理 · L2 数采幂等接入 · 40+ 报表与日终对账",
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
