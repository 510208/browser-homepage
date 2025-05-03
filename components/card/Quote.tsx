// "use server";

// 定義 API 回應的結構 (可選，但建議增加型別安全)
interface HitokotoResponse {
  id: number;
  uuid: string;
  hitokoto: string;
  type: string;
  from: string;
  from_who: string | null;
  creator: string;
  creator_uid: number;
  reviewer: number;
  commit_from: string;
  created_at: string;
  length: number;
}

// 匯入OpenCC的轉換函式
import * as OpenCC from "opencc-js";
// 匯入自訂字體以安裝Chenyuluoyen.ttf
import localFont from "next/font/local";

const cyly = localFont({
  src: "../../public/fonts/Chenyuluoyen.ttf",
  display: "swap",
  variable: "--font-cyly",
});

export default async function Quote() {
  // 在伺服器端發送請求
  // 使用 cache: 'no-store' 確保每次請求都獲取新的名言
  const res = await fetch("https://v1.hitokoto.cn/", {
    next: { revalidate: 3600 },
  });
  // const res = await fetch("https://v1.hitokoto.cn/", { cache: "no-cache" });
  const converter = OpenCC.Converter({ from: "cn", to: "tw" });
  // 基本的錯誤處理：如果請求失敗，顯示預設文字
  const quoteData: HitokotoResponse | null = res.ok ? await res.json() : null;

  return (
    <p className={`${cyly.className} text-black mb-8 text-[26px]`}>
      {quoteData
        ? converter(quoteData.hitokoto)
        : "今日的命運仍在編織中，請靜待時鐘敲響的那一刻。"}
    </p>
  );
}
