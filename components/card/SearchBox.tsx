"use client"; // 標記為 Client Component，因為需要處理互動和狀態

import { useState, FormEvent, useEffect, useRef } from "react"; // 引入更多 React Hooks
import { Search } from "lucide-react";

export default function SearchBox() {
  // 使用 useState 來追蹤輸入框的內容和建議列表
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1); // 追蹤當前選中的建議索引
  const formRef = useRef<HTMLFormElement>(null);

  // 當 query 改變時獲取建議
  useEffect(() => {
    // 如果輸入為空，則清除建議並返回
    if (query.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedIndex(-1); // 重設選中索引
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
            setSelectedIndex(-1); // 重設選中索引
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

  // 處理鍵盤導航
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.slice(0, 5).length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.slice(0, 5).length - 1
        );
        break;
      case "Enter":
        event.preventDefault();
        if (
          selectedIndex >= 0 &&
          selectedIndex < suggestions.slice(0, 5).length
        ) {
          // 如果有選中的建議，使用選中的建議進行搜尋
          const selectedSuggestion = suggestions[selectedIndex];
          setQuery(selectedSuggestion);
          setShowSuggestions(false);
          const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
            selectedSuggestion
          )}`;
          window.location.href = searchUrl;
        } else {
          // 否則使用當前輸入的內容進行搜尋
          handleSearchSubmit(event as any);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

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
          onKeyDown={handleKeyDown} // 處理鍵盤導航
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
                className={`px-4 py-2 cursor-pointer transition-colors duration-200 text-[#960000] font-noto rounded-lg ${
                  selectedIndex === index
                    ? "bg-[#96000020]" // 選中時的背景色
                    : "hover:bg-[#96000013]" // Hover 時的背景色
                }`}
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
