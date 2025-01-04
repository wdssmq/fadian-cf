
interface ApiOpts {
    id: string;
    token: string;
    ts: number;
    url: string;
    sign_str: string;
}

interface ApiReqData {
    user_id: string;
    params: string;
    ts: number;
    sign: string;
}

import { genMD5 } from "./base"

class fdApi {
    opts = {} as ApiOpts
    reqData = {} as ApiReqData
    baseUrl = "https://afdian.com/api/open/"

    constructor(id: string, token: string) {
        const ts = Math.floor(Date.now() / 1000)
        this.opts = Object.assign(this.opts, { id, token, ts })
    }

    setApiUrl(path: string) {
        this.opts.url = this.baseUrl + path
        return this
    }

    setSignStr() {
        const { user_id, params, ts } = this.reqData
        this.opts.sign_str = `${this.opts.token}params${params}ts${ts}user_id${user_id}`
        return this
    }

    setReqData(params: string) {
        this.reqData = Object.assign(this.reqData, {
            user_id: this.opts.id,
            params,
            ts: this.opts.ts,
        })
        this.setSignStr()
        return this
    }

    async apiPost() {
        const { url, sign_str } = this.opts
        this.reqData.sign = await genMD5(sign_str)
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.reqData),
        })
        return await res.json()
    }

    async querySponsor(params: { page: number; }) {
        this.setApiUrl("query-sponsor").setReqData(JSON.stringify(params))
        return await this.apiPost()
    }
}

export default fdApi
