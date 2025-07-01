/**
 * @fileoverview 定義首頁的配置結構
 * 允許在整個應用程式中進行類型安全的設置存取
 */

/**
 * 主題和外觀配置
 */
export interface ThemeConfig {
  /** 主要顏色，用於強調、連結和突出顯示 */
  primaryColor: string;
  /** 頁面的主要背景顏色 */
  backgroundColor: string;
  /** 卡片元素的背景配置，可以是純色或漸層 */
  cardBackground: {
    /** 漸層起始顏色 */
    from: string;
    /** 漸層結束顏色 */
    to: string;
  };
}

/**
 * 背景和底部圖片配置
 */
export interface BackgroundConfig {
  /** 頁面主要背景，可以是顏色或圖片 URL */
  main: string;
  /** 頁面底部裝飾圖片的配置 */
  footerImage: {
    /** 是否顯示圖片 */
    enabled: boolean;
    /** 圖片路徑，例如 '/background/background.png' */
    src: string;
    /** 圖片的替代文字 */
    alt: string;
    /** 圖片寬度 */
    width: number;
    /** 圖片高度 */
    height: number;
  };
}

/**
 * 主要配置物件，整合所有其他配置
 */
export interface HomepageConfig {
  /** 主題和外觀設定 */
  theme: ThemeConfig;
  /** 背景和底部圖片設定 */
  background: BackgroundConfig;
}
