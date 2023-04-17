addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
});


function makePostRequest(url: RequestInfo<unknown, CfProperties<unknown>>, data: { user_id: string; params: string; ts: number; sign: string; }, headers: { "Content-Type": string; }) {
    return fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    })
}

async function generateMD5Hash(data: string | undefined) {
    const encoder = new TextEncoder();
    const msgUint8 = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest("MD5", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    return hashHex;
}

async function genSign(params: string, userId: string, userToken: string) {
    const ts = Math.floor(Date.now() / 1000);
    const str = `${userToken}params${params}ts${ts}user_id${userId}`;
    return await generateMD5Hash(str);
}

async function buildParams(params: { page: number; }, userId: string, userToken: string) {
    const sign = await genSign(JSON.stringify(params), userId, userToken);
    // console.log(sign, typeof sign);
    const queryData = {
        user_id: userId,
        params: JSON.stringify(params),
        ts: Math.floor(Date.now() / 1000),
        sign,
    };
    return queryData;
}

async function handleRequest(request: Request<unknown, CfProperties<unknown>>) {
    const userId = USER_ID;
    const userToken = USER_TOKEN;
    const url = "https://afdian.net/api/open/query-sponsor";
    const headers = {
        "Content-Type": "application/json",
    };
    const queryData = await buildParams({ page: 1 }, userId, userToken);
    // console.log(queryData);
    return makePostRequest(url, queryData, headers);
}

