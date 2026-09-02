/**
 * PM2 进程守护配置 —— 让 Next.js 生产服务常驻运行、崩溃自动重启、开机自启
 *
 * 用法（在服务器项目根目录 /var/www/ResumeWebsite 下执行）：
 *   pm2 start ecosystem.config.cjs
 *   pm2 save            # 记住进程列表（配合 pm2 startup 开机自启）
 *
 * 若你的代码目录不是 /var/www/ResumeWebsite，先改下面的 cwd。
 */
module.exports = {
  apps: [
    {
      name: 'resume',
      cwd: '/var/www/ResumeWebsite',
      script: 'npm',
      args: 'run start',
      instances: 1,
      autorestart: true,
      max_memory_restart: '500M', // 超过 500M 自动重启，防内存泄漏拖垮 4G 机器
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      time: true // 日志带时间戳
    }
  ]
};
