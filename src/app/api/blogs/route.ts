/**
 * 博客动态获取 API
 * 服务端代理请求掘金公开接口（浏览器直连存在 CORS 限制），
 * 按 user_id 拉取最新文章列表，成功结果内存缓存 1 小时（失败不缓存）。
 * 掘金接口失败时前端自动回退 knowledge.ts 本地硬编码文章，本接口只负责尽力拉取。
 */
import { NextResponse } from "next/server";
import type { BlogArticle } from "@/lib/knowledge";

/** 掘金用户 ID（个人主页 URL 末尾数字，公开信息、非账号凭据） */
const JUEJIN_USER_ID = "4021391248864506";

/** 掘金公开接口：按用户查询文章列表（无需登录态） */
const JUEJIN_QUERY_LIST_API =
  "https://api.juejin.cn/content_api/v1/article/query_list";

/** 单次拉取上限 */
const LIMIT = 20;

/** 成功结果缓存时长：1 小时 */
const CACHE_TTL_MS = 60 * 60 * 1000;

/** 掘金原始响应中单篇文章的字段（仅声明用到的） */
interface JuejinArticleRaw {
  article_id: string;
  article_info: {
    title: string;
    brief_content: string;
    ctime: number; // 秒级时间戳
    digg_count?: number;
  };
  tags?: { tag_name: string }[];
}

/** 内存缓存（Serverless 冷启动后重建，可接受） */
let articleCache: { articles: BlogArticle[]; expireAt: number } | null = null;

/** 掘金原始文章 → BlogArticle（与 knowledge.ts 博客结构完全一致，前端零转换） */
function mapJuejinArticle(raw: JuejinArticleRaw): BlogArticle {
  const summary =
    raw.article_info.brief_content?.trim() ||
    "作者在稀土掘金发布的原创技术文章，点击阅读原文查看全文。";
  return {
    id: raw.article_id,
    slug: raw.article_id,
    title: raw.article_info.title,
    summary,
    tags: (raw.tags ?? []).map((t) => t.tag_name).filter(Boolean).slice(0, 4),
    category: "掘金专栏",
    publishDate: new Date(raw.article_info.ctime * 1000)
      .toISOString()
      .slice(0, 10),
    // 掘金接口不返回阅读时长，按技术文章均值取 5 分钟（无正文可估算）
    readingTime: 5,
    likeCount: raw.article_info.digg_count ?? 0,
    source: "juejin",
    sourceUrl: `https://juejin.cn/post/${raw.article_id}`,
    featured: false, // 动态文章一律非精选，保持本地精选卡唯一
  };
}

export async function GET() {
  // 命中缓存直接返回
  if (articleCache && Date.now() < articleCache.expireAt) {
    return NextResponse.json({ articles: articleCache.articles, cached: true });
  }

  try {
    const res = await fetch(JUEJIN_QUERY_LIST_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 模拟浏览器来源，降低被掘金风控拦截的概率
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Origin: "https://juejin.cn",
        Referer: "https://juejin.cn/",
      },
      body: JSON.stringify({
        user_id: JUEJIN_USER_ID,
        cursor: "0",
        sort_type: 2, // 2 = 按最新发布排序
        limit: LIMIT,
      }),
      signal: AbortSignal.timeout(8000),
      // 跳过 Next 数据缓存，本接口自行管理缓存
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`[blogs] 掘金接口 HTTP ${res.status}`);
      return NextResponse.json(
        { error: "掘金接口暂不可用" },
        { status: 502 },
      );
    }

    const body = await res.json();
    if (body?.err_no !== 0 || !Array.isArray(body?.data)) {
      console.error(
        `[blogs] 掘金接口返回异常: ${JSON.stringify(body?.err_msg ?? body)}`,
      );
      return NextResponse.json({ error: "掘金接口返回异常" }, { status: 502 });
    }

    const articles = (body.data as JuejinArticleRaw[])
      .filter((raw) => raw?.article_info?.title)
      .map(mapJuejinArticle);

    // 仅成功结果进缓存
    articleCache = { articles, expireAt: Date.now() + CACHE_TTL_MS };

    return NextResponse.json({ articles });
  } catch (error: any) {
    console.error("[blogs] 拉取掘金文章失败:", error?.message ?? error);
    return NextResponse.json({ error: "拉取掘金文章失败" }, { status: 502 });
  }
}
