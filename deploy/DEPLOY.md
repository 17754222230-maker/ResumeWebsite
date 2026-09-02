# 个人简历站 · 腾讯云轻量服务器部署手册

> 机器：轻量应用服务器 2核4G5M · Node.js 22.12.0 镜像（OpenCloudOS Server 9）
> 代码：GitHub 公开仓库 `https://github.com/17754222230-maker/ResumeWebsite.git`
> 阶段：域名已买（实名审核中）→ **先部署、用 IP 预览；备案通过后再挂域名 + HTTPS**

---

## 里程碑总览

| 里程碑 | 内容 | 前置 |
|---|---|---|
| M1 | 代码跑起来，`http://IP:3000` 能看 | 服务器已开、能登录 |
| M2 | pm2 守护常驻 | M1 |
| M3 | 域名解析 + Nginx + HTTPS 正式上线 | **ICP 备案通过**（较久） |

---

## 先记 3 个值（后面会反复用）

- **服务器公网 IP**：腾讯云控制台 → 轻量应用服务器 → 实例列表
- **登录账号**：控制台「重置密码」时能看到；多数系统镜像是 `root`
- **域名**：你买的那个（先用占位符，备案通过后启用）

---

## M1：把网站跑起来（备案期间用 IP 预览）

### 1. 登录服务器

方式一（最简单，零工具）：腾讯云控制台 → 轻量应用服务器 → 点实例 **「登录」**（网页版终端，浏览器直连）

方式二（本机终端）：Windows Terminal / PowerShell 里
```bash
ssh root@<你的IP>
```
> 若提示没装 ssh 或连不上，先回控制台确认「重置密码」且实例处于运行中。

### 2. 确认环境已就绪

```bash
node -v      # 应显示 v22.12.0
npm -v
git --version
```
Node.js 22.12.0 应用镜像已预装 Node/npm/git。若 git 缺失：`dnf install -y git`。

### 3. 克隆代码 + 安装依赖 + 配置环境变量 + 生产构建

```bash
mkdir -p /var/www && cd /var/www
git clone https://github.com/17754222230-maker/ResumeWebsite.git
cd ResumeWebsite

# 配置环境变量（聊天功能需要 DeepSeek key，不填网站也能跑）
cp .env.example .env.local
nano .env.local        # 把 DEEPSEEK_API_KEY 换成你自己的真实 key，Ctrl+O 保存，Ctrl+X 退出

# 装依赖 + 构建（首次约 1~3 分钟，耐心等）
npm ci
npm run build
```

看到 `✓ Generating static pages` 等即构建成功。若有报错，把报错贴回来。

### 4. 启动并预览

```bash
npm run start &        # 先手工起一次，确认能跑
# 或直接用 pm2（更稳，见 M2）
```
浏览器访问 **`http://<你的IP>:3000`**，能看到首页即成功 🎉

> 打不开？九成是防火墙没放行 3000 端口，见下一步。

### 5. 放行 3000 端口（防火墙）

腾讯云控制台 → 该轻量实例 → **防火墙** → 添加规则：
- 应用类型：自定义；端口：`3000`；协议：TCP；来源：`0.0.0.0/0`

> 备案通过前就用 `IP:3000` 预览。端口 80/443 暂时别放行也行，等 M3 一起配。

---

## M2：pm2 常驻守护（防止关终端就停）

```bash
cd /var/www/ResumeWebsite
npm i -g pm2
pm2 start ecosystem.config.cjs    # 用的是仓库 deploy/ 里的配置
pm2 save                          # 记住进程，便于开机自启
pm2 startup                       # 按提示执行它给的那条命令（开机自启）
pm2 status                        # resume 状态 online 即 OK
pm2 logs resume                   # 看实时日志（排查问题）
```

常用：
- 改代码后更新：`git pull && npm ci && npm run build && pm2 restart resume`
- 重启：`pm2 restart resume`；停止：`pm2 stop resume`

---

## M3：正式上线（等 ICP 备案通过后做）

前置条件：① 备案通过 ② 域名实名通过。

1. **解析域名**：DNS 控制台加一条 **A 记录**，主机记录 `@`（和 `www`），值填服务器 IP。
2. **安装 Nginx 反代**：
   ```bash
   dnf install -y nginx
   cp /var/www/ResumeWebsite/deploy/nginx-resume.conf /etc/nginx/conf.d/resume.conf
   sed -i 's/__DOMAIN__/你的域名/g' /etc/nginx/conf.d/resume.conf
   nginx -t && systemctl enable --now nginx
   ```
3. **放行 80/443**：轻量控制台防火墙加 80、443。
4. **申请免费证书 + HTTPS**（可用 acme.sh 或腾讯云免费 SSL），生成后加一段 443 的 server 块并 301 跳转。
5. 访问 `https://你的域名` 收尾验证。

---

## 环境变量清单（只一个，重要）

| 变量 | 用途 | 来源 |
|---|---|---|
| `DEEPSEEK_API_KEY` | 首页 AI 数字人对话 | https://platform.deepseek.com/ 申请，需充值少许 |

> `.env.local` 在 `.gitignore` 里，不会入库，请部署时在服务器单独创建。
