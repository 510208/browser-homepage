// 定義捷徑資料結構
export type Shortcut = {
  id: string
  name: string
  url: string
}

// 預設捷徑
export const defaultShortcuts: Shortcut[] = [
  { id: "1", name: "Google", url: "https://google.com" },
  { id: "2", name: "Facebook", url: "https://facebook.com" },
  { id: "3", name: "Twitter", url: "https://twitter.com" },
  { id: "4", name: "Instagram", url: "https://instagram.com" },
  { id: "5", name: "LinkedIn", url: "https://linkedin.com" },
  { id: "6", name: "GitHub", url: "https://github.com" },
]

// 從 URL 獲取域名
export function getDomain(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch (e) {
    return url
  }
}
