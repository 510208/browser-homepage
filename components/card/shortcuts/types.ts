// 定義捷徑資料結構
export type Shortcut = {
  id: string
  name: string
  url: string
}

// 預設捷徑
export const defaultShortcuts: Shortcut[] = [
  { id: "1", name: "SamHacker Blog", url: "https://samhacker.xyz" },
  { id: "2", name: "GitHub", url: "https://github.com/510208" },
  { id: "3", name: "Discord", url: "https://discord.com" },
  { id: "4", name: "YT Music", url: "https://music.youtube.com" },
  { id: "5", name: "Next.js", url: "https://nextjs.org/" },
  { id: "6", name: "TaliwindCSS", url: "https://tailwindcss.com/" },
  { id: "7", name: "環境資料開放平臺", url: "https://data.moenv.gov.tw/" },
  { id: "8", name: "氣象開放資料平台", url: "https://opendata.cwa.gov.tw/" },
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
