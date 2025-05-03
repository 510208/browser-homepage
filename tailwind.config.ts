import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // 指定 Tailwind 要掃描哪些檔案來尋找使用的 class 名稱
    // 這樣可以確保最終生成的 CSS 只包含實際用到的樣式，以減小檔案大小
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // `extend` 用於擴展或覆蓋 Tailwind 的預設主題設定
    extend: {
      // 自訂顏色。這裡使用了 CSS 變數 (hsl(var(--...)))，
      // 這通常與像 shadcn/ui 這樣的 UI 函式庫結合使用，以便於主題切換。
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // 主要顏色，包含預設色和前景文字色
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // 自訂字體家族
      fontFamily: {
        // 定義一個名為 'cyly' 的字體，優先使用 CSS 變數 '--font-cyly'，
        // 如果不可用，則依序使用 'Noto Serif TC' 和通用 'serif' 字體作為後備。
        cyly: ["var(--font-cyly)", "Noto Serif TC", "serif"],
      },
      // 自訂圓角大小。這裡也使用了 CSS 變數 '--radius'，
      // 允許基於一個基礎變數來定義不同大小的圓角。
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [], // 用於添加 Tailwind 的外掛程式，目前沒有使用任何外掛。
};
export default config;
