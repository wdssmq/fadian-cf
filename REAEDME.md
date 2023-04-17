# Cloudflare Worker 反代爱发电 API

## 使用 Wrangler CLI 开发

### 安装 wrangler

```bash
# npm install -g wrangler
pnpm install -g wrangler
# yarn global add wrangler

```

### 登录

```bash
# 登录
wrangler login
# 查看登录状态
wrangler whoami
# 登出
wrangler logout

```

## 初始配置

### 克隆项目并安装依赖

```bash
git clone git@github.com:wdssmq/fadian-cf.git fadian-cf
cd fadian-cf
pnpm install

```

### 设置 Secrets 变量

> 开发者 | 爱发电：[https://afdian.net/dashboard/dev](https://afdian.net/dashboard/dev "开发者 | 爱发电")
>
> ↑ 点击链接，获取爱发电 ID 和 TOKEN

1、本地开发环境设置 Secrets

- 在项目根目录下创建 `.dev.vars` 文件，内容如下：

```dotenv
USER_ID=爱发电 ID
USER_TOKEN=爱发电 TOKEN

```

2、线上环境设置 Secrets

```bash
# 依次执行以下命令，输入对应的值；
wrangler secret put USER_ID

wrangler secret put USER_TOKEN

# 查看 Secrets
wrangler secret list

# 删除 Secrets
# wrangler secret delete <KEY> [OPTIONS]
```

### 运行 / 发布


执行命令后可以按 \[`b`\] 键打开浏览器，\[`d`\] 键打开开发者工具，\[`l`\] 键开启本地模式，\[`c`\] 键清空控制台，\[`x`\] 键退出；

默认可能会超时报错，所以建议切换本地模式；

> ✘ [ERROR] Error while creating remote dev session: TypeError: fetch failed

```bash
# 调试运行
npm start

# │ [b] open a browser, [d] open Devtools, [l] turn on local mode, [c] clear console, [x] to exit

```

```bash
# 发布
npm run deploy

```


## 参考文档

Environment variables · Cloudflare Workers docs
https://developers.cloudflare.com/workers/platform/environment-variables/#add-secrets-to-your-project

Commands · Cloudflare Workers docs
https://developers.cloudflare.com/workers/wrangler/commands/#secret
