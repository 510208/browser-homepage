"use client";

import config from "@/config";

/**
 * 動態樣式元件
 * 根據配置文件生成 CSS 變數和樣式
 */
export default function DynamicStyles() {
  return (
    <style jsx global>{`
      :root {
        --primary-color: ${config.theme.primaryColor};
        --background-color: ${config.theme.backgroundColor};
        --card-gradient-from: ${config.theme.cardBackground.from};
        --card-gradient-to: ${config.theme.cardBackground.to};
      }

      /* 動態卡片背景 */
      .bg-linear,
      .ui-card {
        background: linear-gradient(
          180deg,
          ${config.theme.cardBackground.from} -77%,
          ${config.theme.cardBackground.to} 175%
        );
      }

      .bg-linear-fill {
        background: linear-gradient(
          180deg,
          ${config.theme.cardBackground.from.replace("0.6", "1")} -77%,
          ${config.theme.cardBackground.to.replace("0.6", "1")} 175%
        ) !important;
      }

      /* 動態更新主要顏色 */
      .text-primary {
        color: ${config.theme.primaryColor};
      }

      .bg-primary {
        background-color: ${config.theme.primaryColor};
      }

      .border-primary {
        border-color: ${config.theme.primaryColor};
      }

      /* 修正搜尋框 placeholder 顏色 */
      .search-input::placeholder {
        color: ${config.theme.primaryColor} !important;
        opacity: 0.7;
      }

      .search-input::-webkit-input-placeholder {
        color: ${config.theme.primaryColor} !important;
        opacity: 0.7;
      }

      .search-input::-moz-placeholder {
        color: ${config.theme.primaryColor} !important;
        opacity: 0.7;
      }

      .search-input:-ms-input-placeholder {
        color: ${config.theme.primaryColor} !important;
        opacity: 0.7;
      }

      /* 動態更新搜尋框樣式 */
      .search-text {
        color: ${config.theme.primaryColor};
      }

      .search-hover:hover {
        background-color: ${config.theme.primaryColor}13;
      }

      .search-selected {
        background-color: ${config.theme.primaryColor}20;
      }

      /* 動態更新其他元件樣式 */
      .primary-text {
        color: ${config.theme.primaryColor};
      }

      .primary-bg {
        background-color: ${config.theme.primaryColor};
      }
    `}</style>
  );
}
