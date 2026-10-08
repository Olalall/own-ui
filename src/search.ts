import type { ComponentEntry } from "./catalog"

export function matchesComponentSearch(entry: ComponentEntry, query: string) {
  const normalized = query.trim().replace(/\s+/g, " ").toLowerCase()
  const words = entry.english.replace(/([a-z\d])([A-Z])/g, "$1 $2")
  const haystack = `${entry.name} ${entry.english} ${words} ${entry.description} ${entry.tags.join(" ")} ${entry.fit} ${entry.variants} ${entry.states} ${entry.dependencies} React TypeScript CSS Module Vite Next.js`.toLowerCase()
  return !normalized || haystack.includes(normalized)
}
