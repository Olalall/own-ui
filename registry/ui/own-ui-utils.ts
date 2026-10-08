export const cx = (...names: Array<string | undefined | false>) => names.filter(Boolean).join(" ")
