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
  /** 项目 logo 图标（public/logos/ 下的 SVG 或 PNG） */
  logo?: string;
  /** logo 为横向宽幅（如带字横幅），渲染时用宽容器 */
  logoWide?: boolean;
  /** 项目归属分类：fliggy 飞猪工作项目 / techpark 科技园工作项目 / personal 个人独立项目 */
  category?: "fliggy" | "techpark" | "personal";
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
  /** 详情页顶部关键指标带（大号数字 + 短标签），值均取自 achievements/highlights 的真实数据 */
  metrics?: { value: string; label: string }[];
  responsibilities?: string[];
  challenges?: { challenge: string; solution: string }[];
  achievements?: string[];
  fullTechStack?: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  /** 岗位业务定位短句（页面展示于公司名下方，回答“这个岗位在业务线里做什么”） */
  subtitle?: string;
  description: string;
  highlights: string[];
}

// ===== 个人信息 =====
export const profile: Profile = {
  name: "Wangziyan",
  title: "Agent 应用工程师",
  slogan:
    "让智能走进业务。\n让技术创造价值。",
  summary:
    "计算机科班本科，四年软件开发经验。主导航司政策解析 Agent 与知识库建设，负责自动投放后端、跨服务联调及生产问题排查。具备模型接入、工具编排、知识检索与评测实践，个人作品覆盖决策辅助和交互式问答；结合业务规则、状态管理与降级机制，交付可追溯、可验证的 AI 应用。",
  contact: {
    email: "17754222230@163.com",
    github: "https://github.com/17754222230-maker",
  },
};

// ===== 技能列表（后端 & AI 优先） =====
// 名称源自 /data/profile.md；核心两类的 subtext 为手工深度润色（技术理解 + 应用场景），
// 有 subtext 的技能在首页重点卡以「标签 + 短句」形式展示，其余类别维持标签墙
export const skills: Skill[] = [
  // ★★★ 后端技术（核心）
  { name: "Java", category: "后端技术", subtext: "多年 Java 开发经验，具备 JVM 调优和线上问题排查经验" },
  { name: "SpringBoot", category: "后端技术", subtext: "熟悉 SpringBoot 自动配置原理及启动流程，能基于 Starter 快速集成第三方组件" },
  { name: "SpringCloud", category: "后端技术", subtext: "微服务治理的关键不在引组件，而在限流熔断阈值与业务容量压测对齐" },
  { name: "JVM 调优", category: "后端技术", subtext: "翻 GC 日志的人工调优经验沉淀为 AI skill：机器人实时巡检 JVM 指标，提前预判 OOM 隐患" },
  { name: "微服务架构", category: "后端技术", subtext: "按限界上下文划服务边界，防腐层隔离外部系统，集成代码不污染领域模型" },
  { name: "Python", category: "后端技术", subtext: "用于 FastAPI/LangGraph 应用、数据处理与工程脚本的 AI 辅助开发实践" },
  { name: "C++", category: "后端技术", subtext: "MES 遗留模块维护的底子：读得懂指针与内存布局，排查过产线偶发崩溃" },

  // ★★★ AI 与智能化（前沿）
  { name: "AI Coding", category: "AI 与智能化", subtext: "深度使用 AI 开发工具，把提效落进每天的开发节奏里" },
  { name: "SDD 规格驱动开发", category: "AI 与智能化", subtext: "把不确定性前移进规格，让 AI 生成的代码可追溯、可验证、可回归" },
  { name: "Harness 工程", category: "AI 与智能化", subtext: "搭过外层编码代理：生命周期控制、计划门禁与修复闭环的完整实践" },
  { name: "Spring AI", category: "AI 与智能化", subtext: "生产级 LLM 集成的工程化约束：Prompt 版本化、超时降级、结构化输出" },
  { name: "LangChain", category: "AI 与智能化", subtext: "理解 Chain/Agent 的抽象边界，知道哪些场景该绕开框架直接调模型" },
  { name: "LangGraph", category: "AI 与智能化", subtext: "用状态图编排多步推理：节点级重试与降级，比一杆到底的 Chain 可控" },
  { name: "Agent开发", category: "AI 与智能化", subtext: "从工具编排、状态管理到超时降级，把 Agent 做成可靠的生产系统" },

  // 数据库
  { name: "MySQL", category: "数据库" },
  { name: "Redis", category: "数据库" },
  { name: "华为 GaussDB", category: "数据库" },
  { name: "ElasticSearch", category: "数据库" },
  { name: "DB2", category: "数据库" },

  // 消息与中间件
  { name: "RocketMQ", category: "消息与中间件" },
  { name: "Nacos", category: "消息与中间件" },
  { name: "Sentinel", category: "消息与中间件" },
  { name: "Seata", category: "消息与中间件" },

  // 前端技术
  { name: "Vue.js", category: "前端技术" },
  { name: "Next.js", category: "前端技术" },
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
    slug: "fliggy-flight-booking",
    title: "飞猪机票自营采购预订系统",
    thumbnail: "/images/projects/fliggy-flight-booking-hero.webp",
    logo: "/logos/feizhu.svg",
    category: "fliggy",
    description:
      "飞猪自营机票的统一采购预订通道，覆盖验座、验价、询价、预订、取消等 13 条核心业务流。我参与预订主链与收益换货策略开发，在供给失败或变价时处理重选、静默换货与兜底，兼顾收益和风险边界；通过分布式锁、接口幂等与领域事件处理跨系统一致性，并结合 41 个归因码、链路日志及监控排查线上问题。",
    tags: ["Java", "DDD 六边形架构", "TBBPM", "HSF", "Tair", "分布式一致性"],
    role: "核心开发工程师（Java 后端）",
    highlights: [
      "系统覆盖国内/国际双轨的 13 条核心业务流，通过 HSF 对接 25+ 外部系统",
      "收益换货采用 30 档可配置策略链，41 个归因码记录换货与不换货的决策原因",
      "TBBPM 编排预订与失败兜底，按国内单商品、国际全单粒度处理失败及变价",
      "分布式锁、幂等与异步落账配合链路监控，支撑一致性治理和收益归因排查",
    ],
    period: "2026.04 - 至今",
    company: "飞猪（阿里巴巴旗下）",
    metrics: [
      { value: "13", label: "系统核心业务流" },
      { value: "41", label: "系统换货归因码" },
      { value: "30", label: "可配置策略档位" },
      { value: "25+", label: "外部系统对接规模" },
    ],
    responsibilities: [
      "参与 DDD 六边形架构下的预订主链开发，通过 TBBPM 串联验价、收益计算、选货、预订、失败重选与取消兜底",
      "参与收益换货策略开发，以模板方法和责任链组织可配置决策，结合灰度、亏损上限及航司配置约束风险",
      "参与分布式一致性治理：Tair 锁与接口幂等防重复预订，多商品并发处理；以主库落单为准，领域事件驱动 MetaQ 异步落账，非关键收益计算超时降级",
      "结合 41 个决策归因码、EagleEye 链路日志、TripMonitor 指标和 DataHub 事件排查预订、收益及 JVM 问题，沉淀可复用诊断方法",
      "参与AI研发流程治理，规格/测试/评审门禁与审计留痕",
    ],
    challenges: [
      {
        challenge: "国内/国际业务与多类换货场景交织，失败时难以解释为何换货或保留原供给",
        solution: "以配置化策略链组织分支，记录换货与不换货归因码，并关联订单链路日志辅助复核",
      },
      {
        challenge: "供给波动下的静默换货可能带来亏损，收益优化需要明确风险边界",
        solution: "结合灰度开关、每日亏损上限、航司阈值及失败兜底，约束换货策略的执行范围",
      },
      {
        challenge: "跨系统调用、重复提交与多商品并发可能造成重复占座或落账不一致",
        solution: "入口防重与接口幂等协作，主库落单后通过领域事件异步落账；非关键计算超时降级，避免阻塞预订主流程",
      },
    ],
    achievements: [
      "参与建设覆盖 13 条核心业务流的预订主链与收益换货能力，完善失败重选及兜底处理",
      "基于系统 41 个归因码记录决策原因，支持订单级换货复核与收益分析",
      "结合链路日志、RT/成功率指标与异步决策事件，支撑跨系统问题定位及线上稳定性维护",
    ],
    fullTechStack: ["Java 8", "Spring Boot / Pandora Boot", "HSF", "TBBPM", "MySQL + TDDL", "MyBatis", "Tair", "MetaQ/RocketMQ", "Diamond", "Sentinel", "EagleEye", "TripMonitor", "DataHub", "EventBus", "MapStruct"],
  },
  {
    slug: "fliggy-merchant-ai",
    title: "飞猪航司政策自动投放与解析 Agent 平台",
    thumbnail: "/images/projects/fliggy-merchant-ai-hero.webp",
    logo: "/logos/feizhu.svg",
    category: "fliggy",
    description:
      "作为航司政策自动投放链路的核心解析环节，主导 Java 后端与 Agent 联调，将 Word/Excel/PDF 转换为结构化政策结果；建设知识库检索、任务编排与解析节点人工校验机制，并完成基于投放反馈的解析迭代闭环方案设计。",
    tags: ["Java", "Next.js 15", "Vercel AI SDK", "MCP", "RAG", "Flowable", "Agent"],
    role: "政策自动投放后端 Owner / Agent 主导开发",
    highlights: [
      "主导航司政策解析 Agent 全量开发，基于 Next.js 15 + Vercel AI SDK 编排 Python/Bash 工具，产出结构化政策与多文件结果，覆盖 20+ 家航司",
      "主导知识库建设：经 MCP 按航司及政策特征选篇、全文注入规则，运行中按需检索补充上下文",
      "异步任务具备幂等、状态与事件记录、超时处理和模型配置，Java Flowable 链路在解析节点保留人工校验",
      "完成解析迭代 Agent 的闭环方案设计，以投放反馈驱动知识与 Prompt 修复，经人工审批和影子回归验收",
    ],
    period: "2026.04 - 至今",
    company: "飞猪（阿里巴巴旗下）",
    metrics: [
      { value: "Agent", label: "政策解析与工具编排" },
      { value: "RAG", label: "选篇注入与按需检索" },
      { value: "SOP", label: "人工校验与投放编排" },
      { value: "闭环设计", label: "投放反馈解析迭代" },
    ],
    responsibilities: [
      "主导解析 Agent 全量开发：以 Next.js 15 + Vercel AI SDK 编排 Python/Bash 执行、知识查询与结果提交工具，处理 Word/Excel/PDF 并支持多产物结果",
      "主导知识库检索接入：通过 MCP 按航司及政策特征选取规则文档、全文注入上下文，运行时按需只读检索，并设置服务超时与故障降级",
      "实现异步任务幂等受理、状态持久化、事件流、超时处理及模型配置，支持任务过程追踪与异常排查",
      "作为自动投放后端 Owner，主导 Java 后端与 Agent 联调，以 Flowable 串联上传→解析→人工校验→预校验/验价→抽检→投放，解析节点人工校验不可跳过",
      "统一跨线程与 MQ 回调日志链路，开展字段级归因，将解析规则和运营处理经验沉淀为知识文档",
      "完成迭代 Agent 方案设计：投放终版与 AI 加工初版确定性对比、字段溯源归因、知识/Prompt 修复分流、人工审批与影子回归验收",
    ],
    challenges: [
      {
        challenge: "政策格式与业务规则各异，LLM 结构化输出不能直接等同于可投放结果",
        solution: "由工具执行解析并产出结构化文件，解析节点必须人工校验，再进入预校验、验价与抽检，分阶段处理失败状态",
      },
      {
        challenge: "航司规则持续变化，笼统检索容易遗漏关键规则或引入不相关上下文",
        solution: "按航司与政策特征选篇后全文注入，结合运行时按需检索；限制工具为只读并配置知识服务超时降级",
      },
      {
        challenge: "任务跨 Agent、Java 异步线程与 MQ 回调，状态卡点及字段错误难以定位",
        solution: "结合幂等、任务事件和关联日志追踪执行过程，显式收尾 Flowable 异步节点，并将字段归因与规则修复经验沉淀为文档",
      },
    ],
    achievements: [
      "完成生产解析 Agent 全量开发与 Java 联调，支持 20+ 家航司政策文件的结构化加工及多产物提交",
      "主导知识库选篇、全文注入与按需检索能力，推动解析规则和运营经验持续沉淀",
      "打通带解析节点人工校验的自动投放 SOP，并落地任务状态、事件与日志归因能力",
      "完成基于投放反馈的解析迭代闭环方案设计，明确人工审批与影子回归验收边界",
    ],
    fullTechStack: ["JDK 17", "Spring Boot 3.2", "Spring AI Alibaba (DashScope)", "Flowable 6.8", "Next.js 15", "Vercel AI SDK", "MCP (@modelcontextprotocol/sdk)", "MongoDB", "ioredis", "Python/Bash（Agent 工具执行）", "HSF", "MetaQ/RocketMQ", "TDDL", "Tair", "Diamond", "SchedulerX", "EagleEye", "MySQL", "Hologres", "OSS", "EasyExcel"],
  },
  // ===== 个人项目 =====
  {
    slug: "bp-agent",
    title: "英魂之刃 BO5 禁选决策 Agent（coachBpAgent）",
    thumbnail: "/images/projects/bp-agent-three-lanes.webp",
    logo: "/logos/yhzr.png",
    logoWide: true,
    category: "personal",
    description:
      "基于十二年游戏经历与长期赛事观察，围绕英魂之刃 BO5 跨局英雄资源分配、阵容协同和短时限禁选开发个人决策 Agent。以规则生成合法候选，结合 LLM 候选内排序融合、盘面知识切片与预算降级，提供可解释的推荐和替代方案；配套交互界面与历史回放评测，将游戏理解转化为可操作、可复核的 AI 应用。",
    tags: ["Python", "FastAPI", "LangGraph", "规则约束", "LLM 排序融合", "回测评估"],
    role: "个人项目 / 全栈开发",
    highlights: [
      "规则筛选 Top 15 合法候选，选择性调用 LLM 并融合排序，约束模型决策边界",
      "版本化确定性知识切片按盘面组织英雄信息、历史情境与对手偏好",
      "30 秒预算与降级链路结合 BO5 状态机、WebSocket 和回合守卫",
      "候选矩阵、反事实解释与模型表现面板配合 3180 步历史回放，支持推荐复核和对照评估",
    ],
    period: "2026.05 - 至今",
    company: "个人项目",
    metrics: [
      { value: "BO5", label: "全局单边禁选赛制" },
      { value: "15", label: "规则筛选候选上限" },
      { value: "3180", label: "历史回放步数" },
      { value: "30s", label: "决策预算" },
    ],
    responsibilities: [
      "以 LangGraph 编排规则筛选、候选内模型排序与结果校验，将禁选规则、阵容协同和跨局资源保留纳入决策约束",
      "构建版本化确定性知识切片，按盘面组织英雄与历史情境，结合对手偏好补充上下文；保留 Chroma 可选检索路径",
      "实现选择性模型调用与候选排序融合，结合结构化校验、节点超时和规则降级，提高决策过程的可控性",
      "通过 FastAPI/WebSocket 管理跨局状态与回合交互，提供候选矩阵、反事实解释和模型表现面板",
      "建立 3180 步历史回放基线，支持时间留出、规则/LLM 配对比较、置信区间和差异检验，形成可复现的评估流程",
    ],
    challenges: [
      {
        challenge: "BO5 跨局禁选持续压缩候选空间，模型容易忽略规则或长期保留价值",
        solution: "先由规则生成合法候选，再在候选内进行模型排序融合，结合跨局状态与输出合法性校验约束建议",
      },
      {
        challenge: "模型延迟及异步响应可能超出操作窗口，或把上一回合建议带入当前回合",
        solution: "按剩余预算限制调用并预留规则降级路径，以 WebSocket 状态同步和回合守卫拒绝过期结果",
      },
      {
        challenge: "推荐理由看似合理，却缺乏可复现的质量评估依据",
        solution: "按时间留出进行历史回放和规则/LLM 配对比较，以候选召回、动作命中、置信区间与差异检验观察推荐表现，区分回放一致性与实战胜率",
      },
    ],
    achievements: [
      "完成规则约束、候选内模型排序与预算降级协作的 BO5 决策应用",
      "完成带回合守卫的 WebSocket 交互，以及候选矩阵、反事实解释和模型表现面板",
      "构建 3180 步历史回放与配对统计评估能力，支持推荐复核与方案对照",
    ],
    fullTechStack: ["Python 3.11", "FastAPI", "LangGraph", "OpenAI 兼容模型接口", "Chroma（可选检索）", "Redis", "Pydantic v2", "WebSocket", "React + Vite"],
  },
  {
    slug: "resume-website",
    title: "个人简历与智能知识站",
    thumbnail: "/images/projects/resume-website-sunrise.webp",
    logo: "/logos/resume-w.svg",
    category: "personal",
    description:
      "基于 Next.js 16 的个人简历与作品展示站，接入 DeepSeek 流式问答，让访客通过结构化工具查询技能、项目与经历。knowledge.ts 同时驱动页面和 AI 取数，减少内容维护偏差；会话按 sessionId 隔离，并提供桌面与移动端响应式阅读、项目详情及对话交互。",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "LangChain", "DeepSeek", "结构化工具"],
    role: "个人全栈开发（AI 辅助）",
    highlights: [
      "Next.js 16 App Router 组织简历与项目详情，提供桌面和移动端响应式展示",
      "DeepSeek 流式对话结合结构化工具按需读取简历，会话按 sessionId 隔离",
      "knowledge.ts 单源驱动页面渲染与 AI 工具取数，统一内容维护入口",
    ],
    period: "2026.07 - 至今",
    company: "个人项目",
    responsibilities: [
      "以 AI 辅助完成 Next.js 16 页面与项目详情开发，结合 TypeScript、Tailwind CSS 和动画组织响应式信息展示",
      "基于 LangChain.js 接入 DeepSeek，构建 /api/chat 流式接口与前端流式对话交互，进行输入格式校验",
      "通过 DynamicStructuredTool 封装个人信息、技能、项目与经历查询，按 sessionId 隔离内存会话并保留 10 轮上下文",
      "以 knowledge.ts 作为页面与 AI 的结构化单源，统一简历内容维护和工具取数",
    ],
    challenges: [
      {
        challenge: "页面展示与 AI 问答分别维护简历，容易出现内容偏差",
        solution: "页面、System Prompt 与结构化工具统一从 knowledge.ts 取数，减少重复维护",
      },
      {
        challenge: "不同屏幕下既要清晰展示项目信息，又要容纳流式对话交互",
        solution: "采用响应式布局、分区背景与可收起的对话入口，分别调整桌面和移动端阅读体验",
      },
    ],
    achievements: [
      "完成个人简历与作品站，支持响应式阅读及项目详情展示",
      "接入 DeepSeek 流式问答、结构化查询工具与会话隔离能力",
      "实现页面与 AI 共用结构化单源，降低内容更新不一致的风险",
    ],
    fullTechStack: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4", "framer-motion", "Vercel AI SDK", "LangChain.js", "DeepSeek API"],
  },
  // ===== 现有项目 =====
  {
    slug: "chalco-erp",
    title: "中铝国贸 1.0 系统（ERP）",
    thumbnail: "/images/projects/chalco-erp-hero.webp",
    logo: "/logos/chalco.svg",
    category: "techpark",
    description:
      "中铝国际贸易集团的 ERP 系统，覆盖合同、生产、物流、财务等业务流程。我主要做财务和客商两个模块的开发，也参与了数据库国产化迁移和日常运维。",
    tags: ["SpringBoot", "SpringCloud", "MySQL", "GaussDB", "Redis", "RocketMQ"],
    role: "软件开发工程师",
    highlights: [
      "财务结算链路用 RocketMQ 异步解耦，核心 SQL 从 3s 优化到 200ms",
      "客商模块被 30+ 业务方高频调用，加 Redis 多级缓存后响应从 800ms 降到 100ms",
      "参与 MySQL → 华为 GaussDB 国产化迁移，binlog 增量同步，迁移零丢失",
      "主持周代码走查，累计审核 400+ 处代码",
    ],
    period: "2025.03 - 2025.12",
    company: "安徽工业大学科技园有限公司",
    metrics: [
      { value: "3s→200ms", label: "核心 SQL 优化" },
      { value: "800→100ms", label: "客商接口响应" },
      { value: "0", label: "GaussDB 迁移数据丢失" },
      { value: "400+", label: "处代码走查" },
    ],
    responsibilities: [
      "负责付款、结算、发票等财务核心模块的需求分析与开发",
      "负责客商基础信息模块的缓存架构优化，缓解高频调用下的数据库压力",
      "参与 MySQL 至华为 GaussDB 的国产化迁移方案设计与实施",
      "维护开发文档规范，主持周代码走查会议",
    ],
    challenges: [
      {
        challenge: "财务结算单据在月底集中生成，原来的同步处理在高峰期接口明显变慢",
        solution: "用 RocketMQ 把付款单生成、销售结算单创建这些操作从主流程里拆出来异步处理，同时分析核心 SQL 的执行计划重建索引，从 3s 降到 200ms",
      },
      {
        challenge: "客商模块是基础数据源，30+ 业务方高频调用，数据库扛不住",
        solution: "做了本地缓存 + Redis 的两级缓存，配套预热和失效策略，接口响应从 800ms 降到 100ms，落库查询量也降了小一半",
      },
      {
        challenge: "国产化要求把核心数据从 MySQL 迁到华为 GaussDB，语法兼容和性能差异都得处理",
        solution: "用官方迁移工具做全量+增量同步，追平 binlog 后逐表校验数据一致性再切流，迁移过程零数据丢失",
      },
    ],
    achievements: [
      "核心 SQL 查询时间从 3s 优化到 200ms 以内，支撑日均数万笔交易",
      "客商接口响应 800ms 降到 100ms，数据库压力明显缓解",
      "GaussDB 迁移零数据丢失",
      "累计代码走查 400+ 处",
    ],
    fullTechStack: ["SpringBoot", "SpringCloud", "MyBatis-Plus", "MySQL", "华为 GaussDB", "Redis", "RocketMQ"],
  },
  {
    slug: "online-education-platform",
    title: "皖江在线教育云平台",
    thumbnail: "/images/projects/online-education-platform-hero.webp",
    logo: "/logos/education.svg",
    category: "techpark",
    description:
      "面向皖江区域高校与职业培训机构的在线学习平台，覆盖课程浏览、报名购课、订单支付与学习进度管理，注册用户 5 万+，日活约 2000。负责交易链路与课程查询侧的后端设计与开发，重点解决热门课程开抢防超卖、支付状态一致性、慢 SQL 与缓存稳定性等问题。",
    tags: ["SpringBoot", "MySQL", "Redis", "RocketMQ", "支付链路", "缓存优化"],
    role: "软件开发工程师",
    highlights: [
      "热门课程限时开抢：Redis 预扣名额 + Lua 原子校验 + MQ 削峰，峰值 150 QPS 零超卖",
      "订单状态机 + 支付回调幂等 + 延迟消息自动关单，对账差异单从每周 10+ 降至基本清零",
      "课程详情页 Redis 缓存 + 穿透/雪崩/击穿防护，P95 350ms → 90ms",
      "慢 SQL 治理：日均 20+ 条降至 3 条以内，核心接口 P95 全部 <200ms",
    ],
    period: "2024.07 - 2024.11",
    company: "安徽工业大学科技园有限公司",
    metrics: [
      { value: "150+", label: "QPS 开抢零超卖" },
      { value: "350→90ms", label: "详情页 P95 响应" },
      { value: "5万+", label: "注册用户" },
      { value: "20+→3", label: "日均慢 SQL 治理" },
    ],
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
    thumbnail: "/images/projects/sangang-smart-operations-hero.webp",
    logo: "/logos/sangang.png",
    category: "techpark",
    description:
      "三钢闽光厂内 ERP，覆盖销售、采购、库存与财务结算，与计量、质检系统联动打通购销存到财务的单据链路。负责客商主数据与销售到应收结算链路的开发，重点解决一户多码治理、钢材过磅重量结算与磅差处理、信用放货管控、月结卡点治理等问题。",
    tags: ["SpringBoot", "MySQL", "客商主数据", "应收结算", "信用管控", "月结"],
    role: "软件开发工程师",
    highlights: [
      "客商主数据治理：统一社会信用代码唯一键 + 一户多角色，合并存量重复档案 300+ 户",
      "销售到应收一体化：对接计量过磅数据结算，磅差允差内自动摊销、超差走调整单，发票按结算单勾稽",
      "信用放货管控：可用额度（信用额度 + 预收余额 - 未核销应收）出库时实时校验，超额 OA 特批留痕",
      "月结卡点清单化治理，月结周期从 5 个工作日压缩至 2 个",
    ],
    period: "2023.09 - 2024.05",
    company: "安徽工业大学科技园有限公司",
    metrics: [
      { value: "300+", label: "户重复客商合并" },
      { value: "5→2天", label: "月结周期压缩" },
      { value: "50+→个位", label: "月对账差异单" },
      { value: "2min→15s", label: "月报生成提速" },
    ],
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
    thumbnail: "/images/projects/masteel-mes-hero.webp",
    logo: "/logos/masteel.svg",
    category: "techpark",
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
    metrics: [
      { value: "20万+", label: "条/日 L2 数采报文" },
      { value: "99.5%", label: "物料账实一致率" },
      { value: "40+", label: "张业务报表落地" },
      { value: "2h→30min", label: "人工核账提速" },
    ],
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
    company: "飞猪-机票经营项目（易宝软件，外派阿里巴巴飞猪）",
    role: "Java 后端 / Agent 应用开发",
    period: "2026.04 - 至今",
    subtitle:
      "生产机票业务后端：主导航司政策解析 Agent 与知识库，参与预订收益链路开发及排查",
    description:
      "担任航司政策自动投放后端 Owner，主导解析 Agent 开发、知识库建设与 Java 联调，打通带人工校验的解析与投放链路。参与采购预订、收益换货及生产问题排查，并完成基于投放修订反馈的解析迭代闭环方案设计。",
    highlights: [
      "主导解析 Agent 与知识库建设，打通上传、解析、人工校验、预校验/验价、抽检至投放链路，解析节点人工校验不可跳过",
      "参与自营预订主链、收益换货及分布式一致性开发，结合系统 41 个归因码和链路日志开展线上问题排查",
      "完成解析迭代 Agent 闭环方案设计，明确投放反馈归因、知识/Prompt 修复、人工审批与影子回归验收",
    ],
  },
  {
    company: "安徽工业大学科技园有限公司",
    role: "软件开发工程师",
    period: "2022.07 - 2026.01",
    subtitle:
      "从 7×24 产线 MES 到在线交易平台：四年项目制交付，把幂等、对账、归因、兜底练成肌肉记忆，也养成先领域建模、再写代码的工程习惯",
    description:
      "四个项目横跨制造业核心生产系统与互联网交易平台：马钢 MES 在 7×24 连续生产约束下保障计划闭环与账实一致；福建三钢与中铝国贸两套 ERP 打通购销存到财务结算的单据链路，并完成数据库国产化迁移；皖江在线教育平台承载 5 万+ 用户的课程交易。业务形态迥异，但对数据一致性与稳定性的要求一致严苛——这段经历沉淀了领域建模与工程治理的基本功。",
    highlights: [
      "【中铝国贸 ERP】中铝国际贸易集团的购销存与财务一体化系统：负责财务结算与客商主数据两大模块，把付款、结算、发票等财务流程从线下搬进系统，并完成数据库国产化迁移",
      "【皖江在线教育平台】面向高校与培训机构的在线学习与课程交易平台：负责选课、下单、支付回调的交易链路，重点解决热门课程高并发开抢与支付状态一致性",
      "【福建三钢智能运营】三钢闽光的厂内智能运营系统：负责客商主数据与销售到应收结算链路，打通计量过磅、磅差结算、发票勾稽、信用管控的购销业务闭环",
      "【马钢 MES 系统】马钢产线的 L3 制造执行系统：向上承接订单计划、向下对接产线数采，负责计划分解、物料跟踪与存货对账，让 7×24 连续生产下的账实保持一致",
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

// ==================== 博客文章 ====================

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  category?: string;
  publishDate: string;   // ISO 格式
  readingTime: number;   // 分钟
  likeCount?: number;
  source: "juejin" | "other";
  sourceUrl: string;
  featured?: boolean;
}

export const blogs: BlogArticle[] = [
  {
    id: "7634007458996158502",
    slug: "ddd-hexagonal-architecture-guide",
    title: "DDD 六边形架构入门：8000 字带你彻底搞懂聚合根、领域服务、防腐层",
    summary:
      "从 CRUD 到 DDD 的认知突围笔记：通过对比传统 Controller-Service-DAO 模式在大型项目中的五大痛点，系统讲解通用语言、限界上下文、聚合根、领域服务、仓储五个核心概念，并以真实机票订单场景建立直觉认知，帮助 Java 开发者建立 DDD 思维框架。",
    tags: ["DDD", "Java", "软件架构", "领域驱动设计"],
    category: "技术架构",
    publishDate: "2026-04-29",
    readingTime: 15,
    likeCount: 484,
    source: "juejin",
    sourceUrl: "https://juejin.cn/post/7634007458996158502",
    featured: true,
  },
  {
    id: "7667863299438641152",
    slug: "sdd-specification-driven-development-practice",
    title: "把「写代码」变成可追溯的工程：SDD 开发方法论实践",
    summary:
      "SDD（规格驱动开发）的核心理念是「把不确定性前移，让规格成为唯一事实源」。通过编号化需求（REQ/SC/EDGE）、前移澄清、规格驱动设计与编码、强制验证、完整追溯等九个阶段，解决传统开发中需求返工、架构腐化、质量依赖人品等顽疾；最小落地集只需需求编号化、验证证据化、完成门禁化三件事，在 AI 参与编码的时代尤为关键。",
    tags: ["工程化", "规格驱动", "开发方法论", "质量保证"],
    category: "开发方法论",
    publishDate: "2026-07-30",
    // 掘金标注 1 分钟明显失真（8000字级内容），按正文体量估 5 分钟
    readingTime: 5,
    likeCount: 2,
    source: "juejin",
    sourceUrl: "https://juejin.cn/post/7667863299438641152",
    featured: false,
  },
  {
    id: "7668331078027149327",
    slug: "rag-driven-architecture-reflection",
    title: "从 Prompt 工程到知识库驱动：一次自动化率跌至 6% 后的架构反思",
    summary:
      "航司政策自动化解析率跌至 6% 的根本原因不在模型，而在知识管理缺失。以真实 DDD 分层项目为样本，复盘静态 Prompt 工程架构的四大结构性缺陷，论证向知识库（RAG）驱动转型的必要性，以及「确定性代码层 + 推理知识层 + 人工兜底层」的三层分工。",
    tags: ["AI架构设计", "知识库驱动", "DDD实践", "Prompt工程"],
    category: "AI 架构",
    publishDate: "2026-07-31",
    // 掘金标注 1 分钟明显失真，按正文体量估 7 分钟
    readingTime: 7,
    likeCount: 3,
    source: "juejin",
    sourceUrl: "https://juejin.cn/post/7668331078027149327",
    featured: false,
  },
];

/**
 * 获取精选博客文章（按发布日期倒序）
 */
export function getFeaturedBlogs(): BlogArticle[] {
  return blogs
    .filter((b) => b.featured)
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

/**
 * 获取全部博客文章（按发布日期倒序）
 */
export function getBlogs(): BlogArticle[] {
  return [...blogs].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}
