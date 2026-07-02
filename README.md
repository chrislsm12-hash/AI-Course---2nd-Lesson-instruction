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

## 留言板設定（Vercel）

最後一頁設有留言板，訪客可留下姓名和訊息。留言會儲存在此 repo 的 [GitHub Issues](https://github.com/chrislsm12-hash/AI-Course---2nd-Lesson-instruction/issues)（標籤 `guestbook`），你會收到 GitHub 通知。

**只需設定一次：**

1. 登入 GitHub 帳號 **`chrislsm12-hash`**（必須是 repo 擁有者）
2. 建立 **Classic** Personal Access Token（不要用 Fine-grained，較易設定）  
   👉 [建立 Classic Token](https://github.com/settings/tokens/new?scopes=public_repo&description=Vercel%20Guestbook)
3. 勾選 **`public_repo`**（此 repo 為公開 repo）
4. 按 **Generate token**，複製整串 token（以 `ghp_` 開頭）
5. 在 Vercel 專案 → **Settings** → **Environment Variables**
6. 刪除舊的 `GITHUB_TOKEN`（如有），再新增：
   - **Name:** `GITHUB_TOKEN`
   - **Value:** 貼上 token（前後不要有空格）
   - **Environments:** Production、Preview、Development 全部勾選
7. **Redeploy** 專案

> 若出現 **Bad credentials**，代表 token 無效或貼錯。請重新建立 token 並確保使用 `chrislsm12-hash` 帳號建立。

完成後，訪客即可在網站最後一頁留言，你可在 GitHub Issues 查看和管理。
