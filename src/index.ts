import { getFormData } from "./base"
import type { DataScheme } from "./worker-configuration"

addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request))
})

class main {
    reqMethod = ""
    reqUrl = ""
    reqPath = ""
    reqHeaders = {} as Headers
    reqData = {}
    origUrl = ""
    dataScheme = {
        ts: "int",
    } as DataScheme
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
        return path.replace("/api", "https://afdian.net/api/open")
    }

    checkPath() {
        if (!this.reqPath.includes("/api") || this.reqMethod !== "POST") {
            this.setErr(404, "Not Found")
        }
    }

    async proxy() {
        const origRes = await fetch(this.origUrl, {
            method: this.reqMethod,
            body: JSON.stringify(this.reqData),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json())
        return origRes
    }

    async init(request: Request) {
        // 解析请求数据
        this.reqMethod = request.method
        this.reqUrl = request.url
        this.reqPath = new URL(this.reqUrl).pathname
        this.checkPath()
        this.reqHeaders = request.headers
        if (this.errInfo.code) return
        this.reqData = await getFormData(request.formData(), this.reqHeaders, this.dataScheme)

        // 替换原始地址
        this.origUrl = this._origUrl(this.reqPath)
    }

}

async function handleRequest(request: Request<unknown, CfProperties<unknown>>) {
    const mzFadian = new main()
    await mzFadian.init(request)
    if (mzFadian.errInfo.code > 0) {
        return new Response(JSON.stringify(mzFadian.errInfo))
    }

    const proxyRes = await mzFadian.proxy()
    return new Response(JSON.stringify(proxyRes))
}
