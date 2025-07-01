# 配置文件說明

本專案採用 TypeScript 配置文件系統，讓您可以輕鬆自定義首頁的外觀和功能。

## 配置文件結構

### 主要配置文件

- **`config.ts`** - 主要配置文件，包含所有可自定義的設定
- **`types/config.ts`** - TypeScript 類型定義文件，確保配置的類型安全

## 配置選項

### 主題設定 (`theme`)

```typescript
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
    to: "rgba(218, 168, 148, 0.6)"
  }
}
```

### 背景設定 (`background`)

```typescript
background: {
  /** 主要背景 - 可以是顏色或圖片 URL */
  main: "#e8c8bb",

  /** 底部裝飾圖片設定 */
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
    height: 150
  }
}
```

## 自定義步驟

### 1. 修改主題色彩

編輯 `config.ts` 文件中的 `theme` 區段：

```typescript
// 將主要顏色改為藍色主題
theme: {
  primaryColor: "#0066cc",
  backgroundColor: "#f0f8ff",
  cardBackground: {
    from: "rgba(173, 216, 230, 0.6)",
    to: "rgba(135, 206, 235, 0.6)"
  }
}
```

### 2. 更換背景圖片

1. 將您的圖片放到 `public/background/` 資料夾中
2. 修改 `config.ts` 中的背景設定：

```typescript
background: {
  main: "#your-background-color",
  footerImage: {
    enabled: true,
    src: "/background/your-image.png",
    alt: "您的圖片描述",
    width: 800,
    height: 200
  }
}
```

### 3. 停用底部圖片

如果您不想顯示底部裝飾圖片：

```typescript
background: {
  // ...existing code...
  footerImage: {
    enabled: false,
    // 其他設定可以保留或移除
  }
}
```

### 4. 更換天氣預報目標

如果你所住的地點跟我不同（只支援台灣，且縣市名的臺要用繁體臺而非簡體台）：

```typescript
  // ...existing code...
  weatherLocation: {
    weatherCity: "大里區",
    weatherDataCode: "F-D0047-073",
    sunRiseSunSetCity: "臺中市",
    aqiStation: "大里",
  },
```

- `weatherCity`與`weatherDataCode`請參考[附件三（和 3-1）](docs/others/weatherCity.md)
- `aqiStation`請參考[aqiStation.md](docs/others/aqiStation.md)
- `sunRiseSunSetCity`請參考[sunRiseSunSetCity.md](docs/others/sunRiseSunSetCity.md)

## 進階自定義

### 新增配置選項

如果您想新增更多配置選項：

1. **更新類型定義** (`types/config.ts`)：

```typescript
export interface HomepageConfig {
  theme: ThemeConfig;
  background: BackgroundConfig;
  // 新增您的配置區段
  features: {
    enableSearch: boolean;
    enableWeather: boolean;
    // 更多功能開關...
  };
}
```

2. **更新配置文件** (`config.ts`)：

```typescript
export const config: HomepageConfig = {
  // ...existing code...
  features: {
    enableSearch: true,
    enableWeather: true,
    // 設定預設值...
  },
};
```

3. **在元件中使用**：

```typescript
import config from "@/config";

// 在元件中使用配置
if (config.features.enableSearch) {
  // 顯示搜尋功能
}
```

## 樣式系統

本專案使用混合樣式系統：

- **靜態樣式**: `app/globals.css` - 基礎樣式和 Tailwind CSS
- **動態樣式**: `components/DynamicStyles.tsx` - 根據配置生成的樣式

### DynamicStyles 元件

這個元件會根據您的配置自動生成對應的 CSS：

```tsx
// 會根據 config.theme.primaryColor 生成對應的樣式
.text-primary {
  color: ${config.theme.primaryColor};
}

.bg-linear {
  background: linear-gradient(
    180deg,
    ${config.theme.cardBackground.from} -77%,
    ${config.theme.cardBackground.to} 175%
  );
}
```

## 最佳實踐

1. **類型安全**: 利用 TypeScript 的類型檢查確保配置正確
2. **一致性**: 所有顏色都使用配置文件中的值，避免硬編碼
3. **可維護性**: 將相關的配置組織在一起
4. **擴展性**: 新增功能時先更新類型定義

## 常見問題

### Q: 修改配置後看不到變化？

A: 請確保：

1. 儲存了所有修改的文件
2. 重新啟動開發伺服器 (`pnpm run dev`)
3. 清除瀏覽器快取

### Q: 如何恢復預設配置？

A: 您可以從 Git 歷史記錄中恢復 `config.ts` 文件，或參考本文檔中的預設值重新設定。

### Q: 可以使用圖片作為主背景嗎？

A: 可以！將 `background.main` 設定為圖片 URL：

```typescript
background: {
  main: "url('/your-background-image.jpg')",
  // ...
}
```

然後在 `page.tsx` 中適當調整樣式。
