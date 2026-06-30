# AI Course 分享 — Perplexity 獵頭應用

NotebookLM 風格的 6 幕互動簡報，向同事分享 AI 課程所學。

## 使用方式

### 本地預覽

**最簡單：** 雙擊 `index.html` 即可在瀏覽器開啟。

若字型或資源載入異常，可用 Cursor 的 **Live Server** 擴充，或安裝 Python 後執行：

```bash
python -m http.server 8080
```

### 第三幕截圖

將你的 Perplexity 搜尋截圖存為：

```
screenshots/scene3-perplexity-search.png
```

若未放置截圖，會自動顯示依真實搜尋結果重建的表格 mock。

## 操作

- **下一幕 / 上一幕** 按鈕
- 鍵盤：`→` 或 `空白` 下一幕，`←` 上一幕
- 頂部圓點可跳至任意幕

## 部署

將整個資料夾上傳至 Vercel、Netlify 或 GitHub Pages 即可靜態託管。

## 結構

```
├── index.html
├── css/styles.css
├── js/scenes.js      # 六幕文案與設定
├── js/app.js         # 翻頁、旁白、Avatar、視覺元件
└── screenshots/      # 第三幕 Perplexity 截圖（可選）
```
