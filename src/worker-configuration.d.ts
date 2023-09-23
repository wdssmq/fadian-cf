declare global {
    const USER_ID: string
    const USER_TOKEN: string
    const USE_PROXY: string
    // const myKVNamespace: KVNamespace;
}
interface DataScheme {
    [key: string]: "str" | "int"
}
export { DataScheme }
