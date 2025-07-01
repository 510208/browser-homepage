# 部署指南

本專案支援多種部署平台，以下是詳細的部署說明。

## Vercel 部署 (推薦)

### 一鍵部署

點擊下方按鈕進行一鍵部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F510208%2Fbrowser-homepage&env=CWA_OPENAPI_AUTHCODE,CWA_OPENAPI_ENDPOINT,MOE_DATA_APIKEY,MOE_DATA_ENDPOINT&envDescription=%E5%9C%A8%E8%AE%80%E6%88%91%E6%AA%94%E6%A1%88%E4%B8%AD%E6%8F%90%E5%8F%8A%E9%9C%80%E6%96%B0%E5%A2%9E%E7%9A%84%E7%92%B0%E5%A2%83%E8%AE%8A%E6%95%B8&envLink=https%3A%2F%2Fgithub.com%2F510208%2Fbrowser-homepage%2Fblob%2Fmain%2FREADME.md&project-name=samhacker-browser-homepage)

### 手動部署

1. Fork 此專案到您的 GitHub 帳號
2. 在 [Vercel Dashboard](https://vercel.com/dashboard) 中點擊 "New Project"
3. 選擇您 Fork 的專案
4. 設定環境變數（見下方環境變數設定）
5. 點擊 "Deploy"

## Netlify 部署

1. Fork 此專案到您的 GitHub 帳號
2. 登入 [Netlify](https://netlify.com/)
3. 點擊 "New site from Git"
4. 選擇您的 GitHub 專案
5. 設定建置指令：
   - Build command: `npm run build`
   - Publish directory: `dist` 或 `out`
6. 設定環境變數
7. 點擊 "Deploy site"

## GitHub Pages 部署

1. 在您的專案中新增 GitHub Actions workflow
2. 建立 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build
        env:
          CWA_OPENAPI_AUTHCODE: ${{ secrets.CWA_OPENAPI_AUTHCODE }}
          CWA_OPENAPI_ENDPOINT: ${{ secrets.CWA_OPENAPI_ENDPOINT }}
          MOE_DATA_APIKEY: ${{ secrets.MOE_DATA_APIKEY }}
          MOE_DATA_ENDPOINT: ${{ secrets.MOE_DATA_ENDPOINT }}

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

3. 在 GitHub 專案設定中的 Secrets 新增環境變數
4. 推送到 main 分支觸發部署

## 環境變數設定

在您選擇的部署平台中設定以下環境變數：

| 變數名稱               | 說明                | 範例值                                              |
| ---------------------- | ------------------- | --------------------------------------------------- |
| `CWA_OPENAPI_AUTHCODE` | 中央氣象署 API 金鑰 | `CWA-12345678-9ABC-DEF0-1234-56789ABCDEF0`          |
| `CWA_OPENAPI_ENDPOINT` | 中央氣象署 API 端點 | `https://opendata.cwa.gov.tw/api/v1/rest/datastore` |
| `MOE_DATA_APIKEY`      | 環境部 API 金鑰     | `12345678-9abc-def0-1234-56789abcdef0`              |
| `MOE_DATA_ENDPOINT`    | 環境部 API 端點     | `https://data.moenv.gov.tw/api/v2`                  |

### 申請 API 金鑰

1. **中央氣象署開放資料平台**

   - 前往：https://opendata.cwa.gov.tw/
   - 註冊帳號並申請 API 金鑰

2. **環境部環境資料開放平台**
   - 前往：https://data.moenv.gov.tw/
   - 註冊帳號並申請 API 金鑰

## 自定義網域

### Vercel

1. 在 Vercel Dashboard 中選擇您的專案
2. 進入 "Settings" > "Domains"
3. 新增您的自定義網域
4. 根據指示設定 DNS 記錄

### Netlify

1. 在 Netlify Dashboard 中選擇您的網站
2. 進入 "Site settings" > "Domain management"
3. 點擊 "Add custom domain"
4. 根據指示設定 DNS 記錄

## 常見問題

### Q: 部署後天氣功能無法使用？

A: 請確認：

1. 環境變數是否正確設定
2. API 金鑰是否有效
3. 檢查部署平台的錯誤日誌

### Q: 如何更新部署？

A:

- **Vercel/Netlify**: 推送到 GitHub 主分支會自動觸發重新部署
- **GitHub Pages**: 推送到主分支會觸發 GitHub Actions

### Q: 部署後頁面空白？

A: 可能的原因：

1. 建置過程出錯
2. 環境變數未正確設定
3. 靜態資源路徑問題

建議檢查部署平台的建置日誌來找出具體問題。
