This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 环境变量配置（AI 对话服务）

本站 AI 对话功能基于 DeepSeek API（LangChain.js `ChatOpenAI` OpenAI 兼容模式），需配置以下环境变量：

| 变量名 | 必填 | 说明 |
| --- | --- | --- |
| `DEEPSEEK_API_KEY` | 是 | DeepSeek API 密钥，从 [platform.deepseek.com](https://platform.deepseek.com/) 的 API Keys 页面创建获取 |

> 模型参数目前在 `src/app/api/chat/route.ts` 中硬编码：`model=deepseek-chat`、`baseURL=https://api.deepseek.com/v1`、`temperature=0.3`、`maxTokens=1024`，暂不支持环境变量覆盖。

### 本地配置步骤

1. 复制示例文件：`cp .env.example .env.local`
2. 编辑 `.env.local`，填入真实 key：`DEEPSEEK_API_KEY=sk-xxxx`
3. 重启开发服务器使变量生效：`npm run dev`（Next.js 通常也能热加载 `.env.local`，但重启最稳妥）
4. 验证：
   ```bash
   curl -s -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -d '{"messages":[{"role":"user","content":"你好"}],"sessionId":"test"}'
   ```
   正常时返回流式响应（`0:"..."` 分片 + `d:finish` 结束标记）。

### 密钥管理与安全实践

- **不入库**：真实 key 只放在 `.env.local`（`.gitignore` 已通过 `.env*` 忽略，仅 `.env.example` 例外入库且只含占位符）。禁止写入代码、注释、文档、提交信息。
- **定期轮换**：建议定期在 DeepSeek 控制台重新生成 key 并更新各环境配置。
- **泄露处置**：一旦 key 在聊天记录、截图、提交历史等处明文暴露，立即到 [platform.deepseek.com](https://platform.deepseek.com/) 删除该 key 并新建，同时更新 `.env.local` 与生产环境变量；若曾提交入库，还需清理 git 历史。

### 生产 / Vercel 部署

1. Vercel 项目 → **Settings → Environment Variables**，添加 `DEEPSEEK_API_KEY`（勾选 Production / Preview 按需）。
2. 保存后 **重新部署** 才会生效（环境变量在构建/运行时注入）。
3. 注意：`/api/chat` 声明了 `maxDuration = 60`，Vercel 免费套餐函数超时为 10s，长回复可能被截断，Pro 套餐支持 60s。

### 常见故障排查清单

| 现象 | 原因与定位 |
| --- | --- |
| 返回 `AI 服务暂未配置，请联系站长` | `process.env.DEEPSEEK_API_KEY` 为空。检查 `.env.local` 是否存在、变量名拼写、是否重启了 dev server；生产环境检查 Vercel 环境变量并重新部署 |
| 返回 401 / `Authentication Fails` | key 无效或已被删除/轮换。到 DeepSeek 控制台核对 key，更新后重启 |
| 返回 402 / `Insufficient Balance` | DeepSeek 账户余额不足，到控制台充值 |
| 超时 / 无响应 | 网络无法访问 `api.deepseek.com`（代理/防火墙），或 Vercel 函数超时（免费套餐 10s）。本地可 `curl https://api.deepseek.com/v1/models -H "Authorization: Bearer $KEY"` 排查连通性 |
| 返回 `服务器内部错误，请稍后重试` 或其他 error 文案 | 运行时异常，查看服务端日志 `Chat API error:` 输出定位 |

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
