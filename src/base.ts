import type { DataScheme } from "./worker-configuration"

function readEntryValue(origValue: string, type: string) {
    return type === "int" ? parseInt(origValue) : origValue
}

async function getFormData(_formData: Promise<FormData>, headers: Headers, typeScheme: DataScheme) {
    const contentType = headers.get("Content-Type")
    // console.log(contentType)
    // console.log(typeof contentType)
    const reqData = {} as {
        [key: string]: string | number
    }
    if (contentType === null) {
        return reqData
    }
    const formData = await _formData
    // console.log(formData.entries());
    for (const entry of formData.entries()) {
        // console.log(entry);
        const key = entry[0]
        const type = typeScheme[key] || "str"
        const value = readEntryValue(entry[1], type)
        reqData[key] = value
    }
    return reqData
}

async function genMD5(data: string) {
    const encoder = new TextEncoder()
    const msgUint8 = encoder.encode(data)
    const hashBuffer = await crypto.subtle.digest("MD5", msgUint8)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    return hashHex
}

export {
    getFormData,
    genMD5,
}
