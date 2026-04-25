"use client";

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
import { useEffect, useState } from "react";

const cyly = localFont({
  src: "../../public/fonts/Chenyuluoyen.ttf",
  display: "swap",
  variable: "--font-cyly",
});

export default function Quote() {
  const [quoteData, setQuoteData] = useState<HitokotoResponse | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://v1.hitokoto.cn/", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: HitokotoResponse = await response.json();
        setQuoteData(data);
      } catch (error) {
        console.error("Failed to fetch quote:", error);
        setQuoteData(null);
      }
    };

    fetchQuote();
  }, []);

  const converter = OpenCC.Converter({ from: "cn", to: "tw" });

  return (
    <p className={`${cyly.className} text-black mb-8 text-[26px]`}>
      {quoteData
        ? converter(quoteData.hitokoto)
        : "今日的命運仍在編織中，請靜待時鐘敲響的那一刻。"}
    </p>
  );
}
