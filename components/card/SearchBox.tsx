"use client"; // 標記為 Client Component，因為需要處理互動和狀態

import { useState, FormEvent } from "react"; // 引入 React Hooks 和事件類型
import { Search } from "lucide-react";

export default function SearchBox() {
  // 使用 useState 來追蹤輸入框的內容
  const [query, setQuery] = useState("");

  // 定義表單提交時執行的函數
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止表單的預設提交行為（重新載入頁面）
    if (query.trim()) {
      // 檢查輸入內容是否為空或只有空白
      // 建構 Google 搜尋 URL，使用 encodeURIComponent 處理特殊字元
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        query
      )}`;
      // 使用 window.location.href 將使用者導向到搜尋結果頁面
      window.location.href = searchUrl;
    }
  };

  return (
    // 將 div 換成 form，並綁定 onSubmit 事件處理器
    <form
      onSubmit={handleSearchSubmit}
      className="w-full max-w-lg bg-linear rounded-lg flex items-center px-4 py-3 mb-6"
    >
      <Search className="h-5 w-5 text-[#960000] mr-2" />
      <input
        type="text"
        placeholder="今天要搜尋什麼呢？"
        className="bg-transparent border-none outline-none w-full text-black placeholder-[#960000]"
        value={query} // 將 input 的值與 state 綁定
        onChange={(e) => setQuery(e.target.value)} // 當輸入改變時，更新 state
      />
      {/* 不需要明確的提交按鈕，按 Enter 會自動觸發 form 的 onSubmit */}
    </form>
  );
}
