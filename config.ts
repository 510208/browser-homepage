import { HomepageConfig } from "./types/config";

/**
 * 首頁配置設定
 *
 * 這個文件包含了首頁的主要配置選項：
 * - 主題色調設定
 * - 背景圖片設定
 * - 底部裝飾圖片設定
 */
export const config: HomepageConfig = {
  // 主題和色調設定
  theme: {
    /** 主要顏色 - 用於文字、圖示和強調元素 */
    primaryColor: "#960000",

    /** 頁面背景顏色 */
    backgroundColor: "#e8c8bb",

    /** 卡片背景漸層設定 */
    cardBackground: {
      /** 漸層起始顏色 (較深) */
      from: "rgba(200, 137, 103, 0.6)",
      /** 漸層結束顏色 (較淺) */
      to: "rgba(218, 168, 148, 0.6)",
    },
  },

  // 背景設定
  background: {
    /** 主要背景 - 目前使用純色，也可以改為圖片 URL */
    main: "#e8c8bb",

    /** 底部裝飾圖片設定 (Anime Characters Image) */
    footerImage: {
      /** 是否顯示底部圖片 */
      enabled: true,

      /** 圖片檔案路徑 */
      src: "/background/background.png",

      /** 圖片替代文字 (無障礙功能) */
      alt: "動漫角色插圖",

      /** 圖片顯示寬度 */
      width: 700,

      /** 圖片顯示高度 */
      height: 150,
    },
  },
};

// 預設匯出配置物件
export default config;
