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
// 名称源自 /data/profile.md；核心两类的 subtext 为手工深度润色（技术理解 + 应用场景），
// 有 subtext 的技能在首页重点卡以「标签 + 短句」形式展示，其余类别维持标签墙
export const skills: Skill[] = [
  // ★★★ 后端技术（核心）
  { name: "Java", category: "后端技术", subtext: "多年 Java 开发经验，具备 JVM 调优和线上问题排查经验" },
  { name: "SpringBoot", category: "后端技术", subtext: "熟悉 SpringBoot 自动配置原理及启动流程，能基于 Starter 快速集成第三方组件" },
  { name: "SpringCloud", category: "后端技术", subtext: "微服务治理的关键不在引组件，而在限流熔断阈值与业务容量压测对齐" },
  { name: "JVM 调优", category: "后端技术", subtext: "翻 GC 日志的人工调优经验沉淀为 AI skill：机器人实时巡检 JVM 指标，提前预判 OOM 隐患" },
  { name: "微服务架构", category: "后端技术", subtext: "按限界上下文划服务边界，防腐层隔离外部系统，集成代码不污染领域模型" },
  { name: "Python", category: "后端技术", subtext: "AI 应用的胶水层：爬虫清洗管线、推理服务与工程脚本都用它落地" },
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
    logo: "/logos/feizhu.svg",
    category: "fliggy",
    description:
      "飞猪机票交易域的核心预订引擎，B2C/B2B/B2B2C 全业务域预订占编的统一通道，覆盖验座、验价、询价、预订、取消、支付校验、辅营预订等 13 条核心业务流。在‘100% 保障出票’的承诺下，收益换货决策引擎从多个供给候选里实时选收益最优的供给，失败重选次优、兜底预订、静默换货层层保障。项目以 100% VibeCoding 流程开发：devix 机器人接入我们参与研发的 superpower-harness 流程治理框架，把开发纪律从提示词挪进 AI 进程外的 hook，需求→设计→编码→评审整个开发 loop 留痕上报、可审计。我负责预订主链路与收益换货决策引擎的开发。",
    tags: ["Java", "DDD 六边形架构", "TBBPM", "HSF", "Tair", "100% VibeCoding", "superpower-harness"],
    role: "核心开发工程师（Java 后端）",
    highlights: [
      "全业务域预订占编统一通道：13 条核心业务流、HSF 对接 25+ 外部系统，支撑国内/国际双轨全量自营预订流量",
      "收益换货决策引擎：模板方法+责任链的 30 档可配置策略链，41 个归因码让每次换/不换决策都可追溯可审计",
      "TBBPM 编排 17 个 Scenario / 19 条流程，国内单商品粒度、国际全单粒度的差异化失败处理与变价返价",
      "蚂蚁 VCC 支付接入：多支付方式按返佣排序 + 失败自动灾备切换，预估年化收益提升 650 万",
      "100% VibeCoding 流程交付：devix 机器人接入参与研发的 superpower-harness 流程治理框架，规则不写在提示词里、写进 AI 每次动作都要过的进程外 hook，开发纪律对 AI 不可绕过",
    ],
    period: "2026.04 - 至今",
    company: "飞猪（阿里巴巴旗下）",
    responsibilities: [
      "参与 DDD 六边形架构（10 个 Maven 模块、约 10 万行代码）下的领域建模：adaptor 防腐→application 编排→domain→infrastructure 四层，核心聚合根 BookInfoAggregate 坚持‘聚合根唯一写入口 + CQRS 读写分离’，JSON 宽表持久化让 schema 演进不用改 DDL",
      "开发收益换货决策引擎：收益分单实时选货、静默换货失败兜底、显式重订、备货准备、控比/覆盖 5 大场景，基于 AbsChangeByConfigValue 的模板方法+责任链实现 30 档可配置策略链",
      "用 TBBPM 编排验价→收益计算→选货→预订→失败重选→兜底→部分失败取消→持久化全链路，国内/国际各 10 个 Activity 节点，失败处理粒度按两轨差异化设计",
      "保高并发下的一致性：Tair 分布式锁按 traceId 维度防重复预订，CompletionService+线程池做多商品并发验座/验价/预订，MySQL+Tair+DataHub+EventBus 多写靠领域事件驱动 MetaQ 异步落账",
      "维护外部集成防腐层：Adaptor+Proxy 双层防腐包 15 个外部系统代理，BookInfoRepositoryRouter 按‘故障单/派单自开/国内国际’三维路由 7 个仓储实现，flybp 走反向 SPI（对方定接口、我们 @HSFProvider 实现），收益计算并发拆分并卡 1 秒硬超时",
      "接入蚂蚁 VCC 支付：支付方式配置域按国内国际+office 维度匹配，收益计算里多支付方式按返佣排序，履约协议传支付方式列表并支持失败自动灾备切换",
      "参与研发 superpower-harness 流程治理框架：宿主 CLI（Claude Code/Qoder）在 AI 写文件、跑命令、派子任务前先跑进程外 hook，脚本说不行动作就不执行；6 个 hook 拦截违规——写代码阶段主对话禁改源码只能派子任务、状态文件禁 AI 手改、没走门禁不能执行",
      "『延迟推进+证据门槛』与需求工程标准化：阶段不在 AI 说‘做完了’时推进，而在它想做下一步时回头查旁路日志证据（如是否真加载过 TDD skill），凭证由 hook 进程外记录、模型无权限伪造；proposal→spec→design→tasks 四份编号文档串成 US-N→FR-N→组件→T001 追溯链、断链写不进磁盘，落地 EARS 句式、Gherkin 验收场景、RFC 2119 优先级",
      "独立审核与代码归置：每轮派全新子任务扫描、两个立场对立的子任务辩论（一个只读需求文档、一个只读设计和代码）3 次锁定转人工，避开自己查自己查不出盲点；约 3000 行归置规范坍缩成约 8 条本质规则 JSON，写前注入约束卡、写后静态规则机械检查+语义规则派子任务判，换架构只改 JSON",
      "工程素质与 devix 接入：自举开发（30+ 份设计文档即其自身产物）、36 个测试文件零 npm 依赖、bash 约 15ms 快筛前置 + Node 约 250ms 兜底；devix 机器人接入完成需求开发 loop 上报，三份报告（一致性分析/代码评审/测试验证）连同 hook 决策日志归档，/harness-audit 按时间戳合并四路日志审计流程本身",
      "JVM 调优经验落地 AI 化：把人工排查思路写成 skill 接入 devix 机器人，AI 实时巡检线上分组（10 台）的堆水位、GC、direct buffer 等指标，曾定位『内存基线最高的两台 direct buffer 反而最低』的反直觉异常，拆解出 metaspace 类加载累积与 Netty 池未收缩的根因，输出补 MaxDirectMemorySize 上限等 P0-P2 分级参数方案——OOM 隐患从人工事后排查变成 AI 主动预判",
    ],
    challenges: [
      {
        challenge: "国内/国际双轨、13 条业务流、5 大换货场景交织，决策分支多到靠人脑对不住，出了问题说不清为什么换了或没换",
        solution: "策略链骨架用 final 模板方法锁死，子类只能填空不能改流程；每次决策必须落一个归因码（16 个 ChangeReason + 25 个 UnChangeReason），归因为空直接当 Bug 处理。代价是写策略时多一道强制约束，换来决策 100% 可追溯可审计",
      },
      {
        challenge: "静默换货直接动钱，选错供给或市场波动时可能持续亏损，不能为了收益把风险敞开",
        solution: "上了四重硬约束：灰度开关、每日亏损上限（Tair 原子累计，碰线即停）、航司维度配置、强阻塞次数限制；价差收单按航司阈值精细化，压测流量用 EagleEye 标识隔离不污染真实亏损统计",
      },
      {
        challenge: "预订链路跨 25+ 外部系统，重复提交、多商品并发、多存储多写，任何一环不一致都可能重复占座或漏单",
        solution: "Tair 分布式锁按 traceId 防重入口，接口幂等兜底；多写不追强一致，主库落单为准，收益差异走领域事件发 MetaQ 异步落账；收益计算这种非关键路径卡 1 秒硬超时，超时就降级，不拖死预订主流程",
      },
      {
        challenge: "把开发流程全交给 AI 后出了真问题：一个 19 任务、57 轮子任务的项目里，AI 全程没加载被要求的执行流程、19 个任务首轮实现全不合格、一次代码没提交、做完也不触发评审——流程规则全写在提示词里，和模型在同一个地方，遵不遵守由模型自己决定",
        solution: "superpower-harness 把『靠 AI 自觉』的事交给程序：规则从提示词挪进 AI 进程外的 hook，每个动作先过检查，AI 读不到也改不了；写代码只能派上下文全新的子任务、没走门禁就执行不了；事后审计的不是代码而是流程本身——四路日志按时间戳合并做语义分析，最初那次 57 轮的问题就是这样复盘出来的",
      },
    ],
    achievements: [
      "支撑国内/国际双轨全量自营预订流量，失败重选、兜底预订、静默换货多层保障支撑‘100% 保障出票’承诺",
      "换货决策 41 个归因码全覆盖，每一单换/不换都能回答为什么",
      "蚂蚁 VCC 支付接入预估年化收益提升 650 万",
      "全链路 tracerId + TripMonitor RT/成功率埋点 + DataHub 5 个 topic 决策日志异步上报，支撑收益运营离线分析",
      "项目以 100% VibeCoding 流程交付：devix + superpower-harness 治理下开发纪律对 AI 不可绕过，需求→设计→编码→评审全 loop 留痕上报",
    ],
    fullTechStack: ["Java 8", "Spring Boot / Pandora Boot", "HSF", "TBBPM", "MySQL + TDDL", "MyBatis", "Tair", "MetaQ/RocketMQ", "Diamond", "Sentinel", "EagleEye", "DataHub", "EventBus", "MapStruct", "superpower-harness", "devix 机器人", "Claude Code / Qoder CLI", "node:test"],
  },
  {
    slug: "fliggy-merchant-ai",
    title: "飞猪机票代理人经营工作站（航班管理工作站）",
    logo: "/logos/feizhu.svg",
    category: "fliggy",
    description:
      "飞猪机票代理人经营域的核心业务中台，管航司政策的完整生命周期：政策文件经 AI 解析、结构化转换、规则校验、引擎验价、人工确认后投放生效，同时提供 SOP 流程编排、运营工单、市场可视化和监控告警。核心子模块『机票运营 AI Agent 平台』基于 Next.js 15 + Vercel AI SDK 构建并部署于阿里 Aone FaaS 无服务器环境：运营上传航司政策原文（Word/Excel/PDF），Agent 自主编写并执行 Python 脚本完成解析、字段映射与飞猪结构化 Excel 产出，替代纯人工加工。我负责政策、政策校验、SOP 等子域与政策解析 Agent 的研发。",
    tags: ["Java", "JDK 17", "DDD 六边形架构", "Spring AI Alibaba", "Next.js 15", "Vercel AI SDK", "MCP", "RAG"],
    role: "核心研发工程师（Java 后端）",
    highlights: [
      "机票运营 AI Agent 平台：基于 Next.js 15 + Vercel AI SDK 构建并部署阿里 Aone FaaS，Agent 自主编写并执行 Python 脚本，实现航司政策原文（Word/Excel/PDF）到飞猪结构化 Excel 的全自动转换，覆盖 20+ 家航司",
      "MCP 协议接入企业知识库的双通道 RAG：任务启动按航司全文预取『通用+专属规则』注入 System Prompt，运行时向量检索按需追问——解析规则由知识库实时维护、Agent 自动获取，更新无需发版即生效",
      "异步工作流秒级受理、事件流实时推送前端仪表盘；航司级模型动态路由与灰度白名单配置热更新，知识库故障自动降级内置 Prompt 兜底；仅暴露只读检索工具，隔离 MCP 写删操作杜绝误删风险",
      "基于 Spring AI Alibaba 搭建航司政策文件解析链路，守住‘投放生效前必须人工确认’的红线",
      "Flowable 编排 SOP：上传→AI 解析→预校验→引擎验价→抽检→投放，节点失败强制熔断",
    ],
    period: "2026.04 - 至今",
    company: "飞猪（阿里巴巴旗下）",
    responsibilities: [
      "负责政策（policy/policytask）、政策校验（policycheck）、SOP、航线管理等子域的领域建模与开发：充血模型、Field<T> 封装变更追踪、ResultDO<T> 统一返回，四种 DDD 模式都有 Checkstyle 门禁卡着",
      "基于 Spring AI Alibaba（DashScope）开发航司政策文件（PDF/Excel/文本）的解析链路，比如 MU 中转航线政策；Prompt 模板做版本化管理，改提示词像发版一样可回滚",
      "用 Flowable 的 BPMN 把上传→AI 解析→预校验→引擎验价→抽检→投放串成 SOP，节点失败走强制熔断，不让半成品政策流到线上",
      "做验价链路的可观测性：用 EagleEye 把主线程、异步线程和 MQ 回调的 traceId 统一起来，再加 bizTraceId 把一次政策投放的全链路日志串成一条线",
      "开发数据看板：ODPS/Hologres 查询、Excel 异步导出、OSS 预签名下载全链路，处理过 DWD 层数据断档的治理和补数",
      "维护工程质量门禁：30 个维度的编码规则集、Checkstyle 对 DDD 分层做硬卡点，Domain 层单测跟代码同步写",
      "基于 Next.js 15 + Vercel AI SDK 开发机票运营 AI Agent 平台（部署阿里 Aone FaaS）：streamText + 30 步硬上限编排 Agent，持有 Python 执行 / Bash 执行 / 结果提交 / 知识检索四工具，submitFinalResult 结果经多重 JSON 反序列化修复与 AI 小模型兜底纠错",
      "设计 MCP 协议双通道 RAG：A 通道任务启动按航司精确预取『通用规则+航司专属规则（含动态发现的子文档）』全文注入 System Prompt，B 通道运行时只读向量检索按需追问；MCP 客户端懒加载单例 + 8s 超时 + 失败自动重置，航司→pageId 映射 10min TTL 缓存",
      "实现异步工作流与配置驱动：POST /api/workflows/start 秒级返回 taskId 后台执行全流程（模板刷新→工作区创建→OSS 下载→知识注入→Agent 执行→OSS 上传），MongoDB 持久化任务状态与事件流；Diamond 配置中心实现航司灰度白名单与模型动态路由（精确匹配→通配→兜底三级降级），热更新订阅",
      "动态 Prompt 三段式拼装与知识库安全封装：MongoDB 基础 Prompt（global+airline 两层 scope）→ kbase 实时规则注入段（权威来源，冲突时优先）→ 运行环境段；仅向 Agent 暴露单一只读检索工具，隔离 MCP 原生写/删操作；thinking/tool_call/tool_result/complete 事件流全量落库，Dashboard 实时展示推理过程",
    ],
    challenges: [
      {
        challenge: "大模型解析政策没法保证百分百准，而政策一旦投错直接影响验价和出票，出错代价远高于省下的人工",
        solution: "链路上做 LLM 超时控制、降级重试和人工兜底，解析结果要先过规则校验和引擎验价，最后守一条红线：投放生效前必须人工确认。AI 负责把天级的人工录入压到分钟级，人只做最后一道确认",
      },
      {
        challenge: "解析规则复杂且多变：大客户编码（PAT:A#C/A*）、EI 项、班期前缀、含儿童判断等十余类规则 × 20+ 家航司各异，原本靠运营从知识库人工搬运进数据库 Prompt 表，同步滞后且易不一致",
        solution: "MCP 协议直连企业知识库，设计双通道 RAG：任务启动按航司全文预取注入（权威低延迟），运行时向量检索按需追问（灵活覆盖新增问题）；检索参数调优 topK 5→3、chunk 上限 1000→2000 字符，规则由知识库实时维护、Agent 自动获取，更新无需发版即生效",
      },
      {
        challenge: "Agent 持有 MCP 客户端全量工具（约 25 个，大半为写/删操作），存在误删知识库的资损风险；知识库服务本身也可能故障",
        solution: "仅向 Agent 暴露单一只读检索工具，隔离 MCP 原生写删操作；MCP 客户端懒加载单例 + 8s 超时 + 失败自动重置，知识库任意环节故障自动降级内置 Prompt 兜底，任务不中断",
      },
      {
        challenge: "SOP 流程里有节点靠 MQ 回调推进，回调处理完业务逻辑后节点状态没收尾，流程卡死，政策停在半路",
        solution: "排查发现是异步回调只做了业务处理、没有主动完成 Flowable 节点，修复后沉淀成规范：所有异步回调必须显式结束节点状态，新增节点按这条规范过 code review",
      },
      {
        challenge: "往返验价生效率掉到 0%，链路跨主线程、异步线程和 MQ 回调，日志散落各处，光靠翻日志定位不了",
        solution: "先统一 traceId 把三段链路的日志串起来，再用两阶段日志判别法收窄范围，最终定位是 farebasis 漏填导致降级成星花码验价，修复后生效率恢复；这套排查方法也把后续同类问题的定位从小时级降到分钟级",
      },
    ],
    achievements: [
      "航司政策从文档到可投放的处理时效从人工天级缩短到分钟级，人工只做投放前确认",
      "航司政策解析覆盖 20+ 家航司（CA/HU/GS/SC/LT/DZ 等），知识库 23+ 篇规则文档全量可注入",
      "解析规则获取从『人工搬运』变为『实时拉取』，消除同步滞后；规则更新无需发版即生效（配置热更新 + 映射 TTL 缓存）",
      "SOP 节点卡死问题修复并沉淀为团队规范：异步回调必须主动结束节点状态",
      "验价链路全链路 traceId 落地，线上问题排查从小时级降到分钟级",
      "约 30 万行代码、2800+ Java 类的工程在 DDD 分层门禁约束下保持分层不腐化",
    ],
    fullTechStack: ["JDK 17", "Spring Boot 3.2", "Spring AI Alibaba (DashScope)", "Flowable 6.8", "Next.js 15", "Vercel AI SDK", "MCP (@modelcontextprotocol/sdk)", "MongoDB", "Python 3.10", "HSF", "MetaQ/RocketMQ", "TDDL", "Tair", "Diamond", "SchedulerX", "EagleEye", "MySQL", "ODPS/Hologres", "OSS", "EasyExcel"],
  },
  // ===== 个人项目 =====
  {
    slug: "bp-agent",
    title: "英魂之刃赛事 BP 智能决策系统（BP Agent）",
    logo: "/logos/yhzr.png",
    logoWide: true,
    category: "personal",
    description:
      "面向职业/半职业战队的电竞赛事 BP 实时决策与模拟训练系统。针对 BO5 全局单边 BP 赛制下后期决策空间指数级收缩、教练认知负荷过高的问题，设计并实现规则-模型-LLM 三层混合决策架构，在 30 秒操作时限内提供可解释、可信赖的针对性 BP 建议。",
    tags: ["Python", "FastAPI", "LightGBM", "LangChain", "RAG", "大模型"],
    role: "全栈开发",
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
  {
    slug: "resume-website",
    title: "个人简历与智能知识站",
    logo: "/logos/resume-w.svg",
    category: "personal",
    description:
      "正在浏览的这个网站本身：Next.js 16 全栈开发的个人简历与智能知识站，深蓝夜幕 + 日照金山视觉体系，内置接入 DeepSeek 的 AI 数字人『大白』，把简历沉淀为可对话的结构化知识库。",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "LangChain", "DeepSeek", "AI Agent"],
    role: "全栈开发",
    highlights: [
      "全栈开发与 UI 设计一肩挑：Next.js 16 App Router + TypeScript + Tailwind CSS v4，framer-motion 编排入场与交互动画",
      "AI 数字人『大白』：LangChain.js + DeepSeek 流式对话，DynamicStructuredTool 工具集按需读取简历数据，sessionId 隔离的 10 轮会话记忆",
      "单一数据源架构：knowledge.ts 同时驱动页面渲染与 AI 工具层，简历内容一处更新、双端同步",
      "响应式与视觉体系打磨：深蓝夜幕 + 金色流转主题、玻璃拟态卡片、分区蒙版无缝衔接，移动端与桌面端独立调优",
    ],
    period: "2026.07 - 至今",
    company: "个人项目",
    responsibilities: [
      "独立完成产品定位、UI 设计与全栈开发：确立『深蓝夜幕 + 日照金山』主题体系与金色密度控制原则，玻璃拟态卡片、编辑式分区标题统一全站视觉语言",
      "基于 Next.js 16 App Router 组织信息架构：首页 Hero / 工作经历与技术栈 / 项目 / 博客模块化组件，项目详情动态路由 + generateStaticParams 静态生成，入场动画视口触发并支持 prefers-reduced-motion 降级",
      "构建 AI 对话服务：/api/chat 流式接口基于 LangChain ChatOpenAI 接入 DeepSeek，System Prompt 动态拼装简历知识，输入校验与 prompt injection 关键词防护",
      "设计 Agent 工具层：DynamicStructuredTool 封装个人信息 / 技能 / 项目 / 经历查询工具，LLM 按需调用读取结构化数据；内存会话记忆按 sessionId 隔离、保留 10 轮",
      "打磨前端对话体验：Vercel AI SDK useChat 流式渲染，白熊数字人形象以 SVG + clipPath 实现，首访自动引导开场",
    ],
    challenges: [
      {
        challenge: "简历内容要同时服务两类读者——人看的页面与 AI 读的知识库，维护两份数据必然漂移",
        solution: "knowledge.ts 单一数据源：页面渲染、AI System Prompt 与工具层全部从同一份结构化数据取值，内容更新零同步成本",
      },
      {
        challenge: "深色雪山背景上大面积文字的可读性，以及多个分区蒙版交界处的生硬分界线",
        solution: "分区半透明夜色蒙版按色值首尾衔接（上一区终点与下一区起点同色），文字对比度按 WCAG AA 校准，金色装饰控制在一屏 4-5 个触点",
      },
      {
        challenge: "AI 助手既要主动引导访客对话，又不能破坏页面的视觉极简",
        solution: "白熊形象去掉气泡框与耳麦，默认只保留形象本体悬于右下角；问候语按系统时间动态生成，仅在对话窗口打开时出现",
      },
    ],
    achievements: [
      "网站即作品集：设计与工程双端完整交付，桌面与移动端独立调优",
      "AI 问答覆盖简历全部内容：工具调用按需取数 + 会话记忆，访客可直接向『大白』提问",
      "单数据源驱动页面与 AI 双端，内容维护零同步成本",
      "部署于 Vercel，推送即发布，Turbopack 本地构建秒级热更新",
    ],
    fullTechStack: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4", "framer-motion", "Vercel AI SDK", "LangChain.js", "DeepSeek API", "Vercel"],
  },
  // ===== 现有项目 =====
  {
    slug: "chalco-erp",
    title: "中铝国贸 1.0 系统（ERP）",
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
    company: "飞猪旅行（外派阿里巴巴旗下飞猪-机票经营项目组，易宝软件）",
    role: "Java 开发工程师",
    period: "2026.04 - 至今",
    subtitle:
      "机票交易域核心研发：一条线守预订链路的『100% 出票』，一条线用 AI 重构政策经营效率",
    description:
      "飞猪机票交易域两条核心业务线的后端研发。自营采购预订系统是 B2C/B2B/B2B2C 全业务域预订占编的统一通道：『100% 保障出票』承诺下，13 条核心业务流经 DDD 六边形架构编排，收益换货决策引擎在多个供给候选中实时权衡收益与风险，失败重选、兜底预订、静默换货层层保障，41 个归因码让决策全程可审计。代理人经营工作站管理航司政策全生命周期：核心子模块『机票运营 AI Agent 平台』基于 Next.js 15 + Vercel AI SDK 部署阿里 Aone FaaS，MCP 协议接入企业知识库的双通道 RAG（启动全文注入+运行时向量检索）驱动政策解析，Agent 自主编写执行 Python 脚本产出飞猪结构化 Excel，覆盖 20+ 家航司，规则由知识库实时维护、更新无需发版；主链路上 Spring AI 提效与 Flowable SOP 熔断兜底分层协作，把政策处理时效从人工天级压到分钟级。",
    highlights: [
      "【机票自营采购预订系统】『100% 保障出票』的难点不在下单而在兜底：作为全业务域预订占编统一通道，DDD 六边形架构编排 13 条核心业务流，防腐层隔离 25+ 外部供给系统，领域模型不随供给端变化腐化",
      "收益换货决策引擎：供给失败或变价时实时重选收益最优供给。30 档可配置策略链用模板方法锁死骨架、子类只填空；41 个归因码强制落库，每次换与不换都有据可查",
      "跨 25+ 系统的分布式链路守住一致性：Tair 分布式锁按 traceId 防重复预订，多存储多写以领域事件异步落账替代强一致，非关键路径卡 1 秒硬超时——可以降级，不能拖死预订主流程",
      "接入自研 devix 机器人，以参与研发的 superpower-harness 流程治理框架驱动 100% VibeCoding 开发：规则写进 AI 进程外的 hook 而非提示词，整个需求开发 loop 留痕上报",
      "【机票代理人经营工作站】航司政策格式各异、投放错误直接冲击验价与出票：以 DDD 六边形架构承载 13 个业务子域约 30 万行代码，Domain 层零框架依赖、Checkstyle 硬门禁，规模增长下分层不腐化",
      "Spring AI 把政策解析从人工天级压到分钟级，但 AI 不做终审：LLM 只管结构化解析，规则校验与引擎验价兜底，守住『投放生效前必须人工确认』红线——效率交给机器，风险留给人",
      "负责开发机票运营 AI Agent 平台：MCP 接入企业知识库、双通道 RAG 驱动航司政策解析，Agent 自主产出飞猪结构化结果，覆盖 20+ 家航司、打通解析→验价→抽检→投放 SOP 全流程",
    ],
  },
  {
    company: "安徽工业大学科技园有限公司",
    role: "软件开发工程师",
    period: "2022.07 - 2026.01",
    subtitle:
      "从 7×24 产线 MES 到在线交易平台：项目制交付四年，养成先领域建模、再写代码的工程习惯",
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
