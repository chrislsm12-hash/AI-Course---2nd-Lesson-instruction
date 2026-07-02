# AI-Course---2nd-Lesson-instruction

互動簡報網站位於 [`ai-course-presentation/`](ai-course-presentation/)。

## 線上預覽

| 平台 | 網址 |
|------|------|
| Vercel | 部署後由 Vercel 提供（例如 `https://ai-course-presentation.vercel.app`） |
| GitHub Pages | https://chrislsm12-hash.github.io/AI-Course---2nd-Lesson-instruction/ |

## 發佈到 Vercel（推薦）

此 repo 已包含 `vercel.json`，會自動從 `ai-course-presentation/` 部署靜態網站。

1. 登入 [vercel.com](https://vercel.com)（可用 GitHub 帳號）
2. 點 **[Import Project](https://vercel.com/new/import?s=https://github.com/chrislsm12-hash/AI-Course---2nd-Lesson-instruction)**
3. 選擇 repo `AI-Course---2nd-Lesson-instruction`
4. 保持預設設定（Framework: **Other**，無需 Build Command）
5. 點 **Deploy**

約 1 分鐘後即可取得公開網址。之後每次 push 到 `main` 都會自動重新部署。

### 本地用 CLI 部署（可選）

```bash
npm i -g vercel
vercel login
vercel --prod
```

## 發佈到 GitHub Pages

網站檔案亦已準備在 `gh-pages` 分支：

1. 開啟 [Repository Settings → Pages](https://github.com/chrislsm12-hash/AI-Course---2nd-Lesson-instruction/settings/pages)
2. **Build and deployment** → **Source** 選 **Deploy from a branch**
3. **Branch** 選 `gh-pages`，資料夾選 `/ (root)`
4. 按 **Save**

幾分鐘後，GitHub Pages 連結即可公開瀏覽。
