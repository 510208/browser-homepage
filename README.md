<center><img src="docs/image/image.png" width="500"></center>

<center><h1>SamHacker 的瀏覽器首頁</strong></h1></center>

最近在練習寫 Next.js（好不容易總算學成當然要分享），於是就想起很想改的 Chrome 首頁。起先用 Figma 稍稍打了個版，然後丟給 v0 先幫我把打的版切出來，然後開始東改西改，然後就有了這個。

這是一個使用 Next.js、TypeScript 和 Tailwind CSS 打造的個人化瀏覽器首頁，旨在提供天氣資訊、每日佳句、快速捷徑等功能。

## 基本架構

- **框架**: [Next.js](https://nextjs.org/) (App Router)
- **語言**: [TypeScript](https://www.typescriptlang.org/)
- **樣式**: [Tailwind CSS](https://tailwindcss.com/)
- **UI 元件**: [shadcn/ui](https://ui.shadcn.com/) (基於 [Radix UI](https://www.radix-ui.com/) 和 [Tailwind CSS](https://tailwindcss.com/))
- **狀態管理**: React Hooks (`useState`, `useEffect`, `useContext` 等)
- **資料獲取**: 原生 `fetch` API
- **拖放**: @dnd-kit
- **表單**: React Hook Form + Zod

## 素材來源

### 天氣資料

> 瀏覽器首頁不能看天氣感覺還是有點怪怪的吧？你們不這麼認為嗎？

| 平台名稱                    | 管理者           | 連結                                                                   | 使用處                               |
| --------------------------- | ---------------- | ---------------------------------------------------------------------- | ------------------------------------ |
| 中央氣象署 OpenDataAPI      | 中央氣象署       | [https://opendata.cwa.gov.tw/index](https://opendata.cwa.gov.tw/index) | [weather.ts](lib/weather/weather.ts) |
| 政府資料開放平台 AQI 資料集 | 行政院數位發展部 | [https://data.gov.tw/dataset/40448](https://data.gov.tw/dataset/40448) | [weather.ts](lib/weather/weather.ts) |

### 每次佳句

> 不說每日是因為 API 並沒有要每日一句的意思，每次請求就換一句 awa

| 平台名稱 | 管理者   | 連結                                                                 | 使用處                                 |
| -------- | -------- | -------------------------------------------------------------------- | -------------------------------------- |
| Hikoto   | 萌创团队 | [https://hitokoto.cn/](https://hitokoto.cn/)                         | [Quote.tsx](components/card/Quote.tsx) |
| OpenCC   | BYVoid   | [https://github.com/BYVoid/OpenCC](https://github.com/BYVoid/OpenCC) | [Quote.tsx](components/card/Quote.tsx) |

### 底圖

> 御坂我老婆，誰都不准搶！！

[御坂美琴](https://zh.moegirl.org.cn/%E5%BE%A1%E5%9D%82%E7%BE%8E%E7%90%B4)、
[白井黑子](https://zh.moegirl.org.cn/%E7%99%BD%E4%BA%95%E9%BB%91%E5%AD%90)、
[婚后光子](https://zh.moegirl.org.cn/%E5%A9%9A%E5%90%8E%E5%85%89%E5%AD%90)、
[初春飾利](https://zh.moegirl.org.cn/%E5%88%9D%E6%98%A5%E9%A5%B0%E5%88%A9)、
[佐天淚子](https://zh.moegirl.org.cn/%E4%BD%90%E5%A4%A9%E6%B3%AA%E5%AD%90)、
[一方通行](https://zh.moegirl.org.cn/%E4%B8%80%E6%96%B9%E9%80%9A%E8%A1%8C)、
[上条當麻](https://zh.moegirl.org.cn/%E4%B8%8A%E6%9D%A1%E5%BD%93%E9%BA%BB)、
[20001 號（最後之作）](https://zh.moegirl.org.cn/%E6%9C%80%E5%90%8E%E4%B9%8B%E4%BD%9C)，圖片由 Canva 拼合

（怎麼越寫越像在寫科砲的角色列表了...）

## 依賴元件

> 非常感謝各位偉大的工程師前輩~~

| 專案名稱            | 維護者                          | 連結                                                                                  |
| ------------------- | ------------------------------- | ------------------------------------------------------------------------------------- |
| Next.js             | Vercel                          | [https://nextjs.org/](https://nextjs.org/)                                            |
| Tailwind            | Tailwind                        | [https://tailwindcss.com/](https://tailwindcss.com/)                                  |
| @dnd-kit/\_         | Claudéric Demers                | [https://dndkit.com/](https://dndkit.com/)                                            |
| @hookform/resolvers | React Hook Form Team            | [https://react-hook-form.com/](https://react-hook-form.com/)                          |
| @radix-ui/\_        | Radix UI Team / WorkOS          | [https://www.radix-ui.com/](https://www.radix-ui.com/)                                |
| autoprefixer        | PostCSS Team                    | [https://github.com/postcss/autoprefixer](https://github.com/nk2028/opencc-js)        |
| lucide-react        | Lucide Contributors             | [https://lucide.dev/](https://github.com/nk2028/opencc-js)                            |
| opencc-js           | NKLC / Dolphin Wood             | [NK2028/opencc-js](https://github.com/nk2028/opencc-js)                               |
| react / react-dom   | Meta (Facebook)                 | [https://react.dev/](https://react.dev/)                                              |
| tailwindcss-animate | shadcn (based on Tailwind Labs) | [jamiebuilds/tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) |
| zod Colin           | McDonnell                       | [https://zod.dev/](https://zod.dev/)                                                  |

![Collabtors](https://contrib.rocks/image?repo=510208/browser-homepage)
