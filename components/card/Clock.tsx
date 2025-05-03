"use client";

import { useEffect, useState } from "react";
// 匯入Google Fonts中的Micro 5
import { Micro_5 } from "next/font/google";

const micro5 = Micro_5({
  subsets: ["latin"],
  weight: "400",
});

// Helper function to get formatted time
const getFormattedTime = () => {
  // 這個函數現在主要用於在客戶端格式化時間
  if (typeof window === "undefined") {
    // 保留檢查以防萬一，但邏輯流程改變
    return "00:00"; // 或者返回 null，但 "00:00" 可以避免佈局變動
  }
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default function Clock() {
  // 使用在伺服器和客戶端初始渲染時都相同的值來初始化狀態
  const [currentTime, setCurrentTime] = useState<string>("00:00"); // 使用一致的佔位符

  useEffect(() => {
    // 僅在元件掛載到客戶端後設定 *實際* 時間。
    // 這會在成功 hydration 之後執行。
    setCurrentTime(getFormattedTime());

    // Set interval to update every minute
    const interval = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 60000); // Update every 60 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs only once on mount

  {
    /* Clock */
  }
  return (
    <div className={`${micro5.className} text-8xl font-bold text-black mb-2`}>
      {/* 渲染狀態。初始時在伺服器/客戶端都會是 "00:00"，掛載後會更新。 */}
      {currentTime}
    </div>
  );
}
