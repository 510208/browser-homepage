import { HomepageConfig } from "./types/config";

/**
 * 首頁配置設定
 *
 * 這個文件包含了首頁的主要配置選項：
 * - 主題色調設定
 * - 背景圖片設定
 * - 底部裝飾圖片設定
 *
 * 配置說明請參考 docs/configuration.md
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

  // 天氣地點設定
  weatherLocation: {
    /** 天氣所抓取的地點（目前天氣僅支援抓取台灣一個國家，其他國家未來考慮開發）
     * 地點名稱請參考附件三所列的地點名稱
     * dataCode請查詢對應都市的中央氣象署天氣資料代碼，參考附件三之一所列的
     */
    weatherCity: "大里區",
    weatherDataCode: "F-D0047-073", // 預設使用中央氣象署的天氣資料代碼
    /** 日出日落所抓取的地點（目前日出日落僅支援抓取台灣一個國家，其他國家未來考慮開發）
     * 地點名稱請參考附件二所列的地點名稱
     */
    sunRiseSunSetCity: "臺中市",
    /** 空氣品質所抓取的測站（目前空品僅支援抓取台灣測站，其他國家因API問題不考慮開發）
     * 測站名稱請參考附件一所列的測站名稱
     */
    aqiStation: "大里",
  },
};

// 預設匯出配置物件
export default config;
