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

**· 远程 VPS 中登录**

执行登录命令并在浏览器中授权后，会跳转到一个`localhost`链接，复制该链接然后新开一个终端窗口，执行以下命令以完成登录；

```bash
curl <LOCALHOST_URL>
```

文档链接：「[Using wrangler login on a remote machine](https://developers.cloudflare.com/workers/wrangler/commands/#using-wrangler-login-on-a-remote-machine)」

## 初始配置

### 克隆项目并安装依赖

```bash
git clone git@github.com:wdssmq/fadian-cf.git fadian-cf
cd fadian-cf
pnpm install

```

### 设置 Secrets 变量

> 开发者 | 爱发电：[https://afdian.com/dashboard/dev](https://afdian.com/dashboard/dev "开发者 | 爱发电")
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


## 投喂

二维码：[https://github.com/wdssmq#二维码](https://github.com/wdssmq#二维码 "wdssmq#二维码")

爱发电：[https://afdian.com/a/wdssmq](https://afdian.com/a/wdssmq "沉冰浮水正在创作和 z-blog 相关或无关的各种有用或没用的代码 | 爱发电")

更多「小代码」：[https://cn.bing.com/search?q=小代码+沉冰浮水](https://cn.bing.com/search?q=%E5%B0%8F%E4%BB%A3%E7%A0%81+%E6%B2%89%E5%86%B0%E6%B5%AE%E6%B0%B4 "小代码 沉冰浮水 - 搜索")
