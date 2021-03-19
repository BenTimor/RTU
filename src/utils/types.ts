export function parseBoolean(value: string): boolean {
    return typeof (value) === "boolean" ? value : ["true", "1"].includes(value.toLowerCase())
}