import { getFormData } from "./base"
import fdApi from "./api"
import type { DataScheme } from "./worker-configuration"

addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request))
})

const config = {
    use_proxy: parseInt(USE_PROXY) || 1,
    data_scheme: {
        ts: "int",
    } as DataScheme,
}

class main {
    // 请求信息
    reqMethod = ""
    reqUrl = ""
    reqPath = ""
    reqHeaders = {} as Headers
    reqData = {}
    // 转发地址
    origUrl = ""
    // ----
    errInfo = {
        code: 0,
        msg: "",
    }

    setErr(code: number, msg: string) {
        this.errInfo.code = code
        this.errInfo.msg = msg
    }

    constructor() {

    }

    _origUrl(path: string) {
        return path.replace("/api", "https://afdian.com/api/open")
    }

    checkPath() {
        if (!this.reqPath.includes("/api") || this.reqMethod !== "POST") {
            this.setErr(404, "Not Found")
        }
    }

    async proxy() {
        if (this.errInfo.code > 0) {
            return this.errInfo
        }
        const origRes = await fetch(this.origUrl, {
            method: this.reqMethod,
            body: JSON.stringify(this.reqData),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json())
        return origRes
    }

    async reqApi() {
        const fdApiIt = new fdApi(USER_ID, USER_TOKEN)
        return await fdApiIt.querySponsor({ page: 1 })
    }

    async init(request: Request) {
        // 解析请求数据
        this.reqMethod = request.method
        this.reqUrl = request.url
        this.reqPath = new URL(this.reqUrl).pathname
        this.checkPath()
        this.reqHeaders = request.headers
        if (this.errInfo.code) return
        this.reqData = await getFormData(request.formData(), this.reqHeaders, config.data_scheme)

        // 替换原始地址
        this.origUrl = this._origUrl(this.reqPath)
    }

}

async function handleRequest(request: Request<unknown, CfProperties<unknown>>) {
    const mzMain = new main()
    await mzMain.init(request)

    let resJSON = ""

    if (config.use_proxy) {
        const proxyRes = await mzMain.proxy()
        resJSON = JSON.stringify(proxyRes)
    } else {
        const apiRes = await mzMain.reqApi()
        resJSON = JSON.stringify(apiRes)
    }

    return new Response(resJSON)
}
