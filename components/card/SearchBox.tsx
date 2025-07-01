"use client"; // 標記為 Client Component，因為需要處理互動和狀態

import { useState, FormEvent, useEffect, useRef } from "react"; // 引入更多 React Hooks
import { Search } from "lucide-react";

export default function SearchBox() {
  // 使用 useState 來追蹤輸入框的內容和建議列表
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // 當 query 改變時獲取建議
  useEffect(() => {
    // 如果輸入為空，則清除建議並返回
    if (query.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Debounce: 延遲 300ms 後才發送請求，避免過於頻繁的 API 呼叫
    const debounceTimer = setTimeout(() => {
      const fetchSuggestions = async () => {
        try {
          const response = await fetch(
            `/api/suggestions?q=${encodeURIComponent(query)}`
          );
          if (response.ok) {
            const data = await response.json();
            setSuggestions(data);
            setShowSuggestions(data.length > 0);
          }
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
          setSuggestions([]);
          setShowSuggestions(false);
        }
      };

      fetchSuggestions();
    }, 300);

    // Cleanup: 當 effect 重新執行或元件卸載時，清除計時器
    return () => clearTimeout(debounceTimer);
  }, [query]);

  // 點擊外部區域時隱藏建議列表
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      setShowSuggestions(false); // 隱藏建議列表
    }
  };

  // 處理建議項目點擊
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion); // 將點擊的建議填入輸入框
    setShowSuggestions(false); // 隱藏建議列表
    // 直接進行搜尋
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      suggestion
    )}`;
    window.location.href = searchUrl;
  };

  // 處理輸入框聚焦
  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    // 將 div 換成 form，並綁定 onSubmit 事件處理器，加上 relative 定位
    <form
      ref={formRef}
      onSubmit={handleSearchSubmit}
      className="ui-card relative"
    >
      <div className="flex items-center">
        <Search className="h-5 w-5 text-[#960000] mr-2" />
        <input
          type="text"
          placeholder="今天要搜尋什麼呢？"
          className="bg-transparent border-none outline-none w-full text-[#960000] placeholder-[#960000] font-noto"
          value={query} // 將 input 的值與 state 綁定
          onChange={(e) => setQuery(e.target.value)} // 當輸入改變時，更新 state
          onFocus={handleInputFocus} // 聚焦時顯示建議（如果有的話）
          autoComplete="off" // 關閉瀏覽器預設的自動完成
        />
      </div>

      {/* 建議列表 */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute top-full ui-card mt-6 bg-linear-fill left-0 right-0 shadow-lg z-[999] max-h-60 overflow-y-auto">
          {suggestions.slice(0, 5).map(
            (
              suggestion,
              index // 限制顯示最多 5 個建議
            ) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer transition-colors duration-200 hover:bg-[#96000013] text-[#960000] font-noto rounded-lg"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center">
                  <Search className="h-4 w-4 text-[#960000] mr-2" />
                  {suggestion}
                </div>
              </li>
            )
          )}
        </ul>
      )}
      {/* 不需要明確的提交按鈕，按 Enter 會自動觸發 form 的 onSubmit */}
    </form>
  );
}
