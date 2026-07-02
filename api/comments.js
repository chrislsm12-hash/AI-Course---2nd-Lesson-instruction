const REPO = "chrislsm12-hash/AI-Course---2nd-Lesson-instruction";
const LABEL = "guestbook";

function getToken() {
  return process.env.GITHUB_TOKEN?.trim() || "";
}

function mapGithubError(message, status) {
  if (status === 401 || message === "Bad credentials") {
    return "GitHub 憑證無效，請在 Vercel 重新設定 GITHUB_TOKEN";
  }
  if (status === 403) {
    return "GitHub 權限不足，請確認 token 已勾選 repo 或 public_repo 權限";
  }
  return message || "送出失敗，請稍後再試";
}

function githubHeaders(token) {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${REPO}/issues?labels=${LABEL}&state=all&per_page=50&sort=created&direction=desc`,
        { headers: githubHeaders(getToken()) }
      );
      const issues = await response.json();
      if (!response.ok || !Array.isArray(issues)) {
        return res.status(500).json({ error: "無法載入留言" });
      }
      const comments = issues
        .filter((issue) => !issue.pull_request)
        .map((issue) => ({
          id: issue.id,
          name: issue.title,
          message: issue.body,
          date: issue.created_at,
        }));
      return res.status(200).json(comments);
    } catch {
      return res.status(500).json({ error: "無法載入留言" });
    }
  }

  if (req.method === "POST") {
    const token = getToken();
    if (!token) {
      return res.status(503).json({ error: "留言功能尚未設定，請聯絡網站管理員" });
    }

    const { name, message } = req.body || {};
    const trimmedName = String(name || "").trim();
    const trimmedMessage = String(message || "").trim();

    if (!trimmedName || !trimmedMessage) {
      return res.status(400).json({ error: "請填寫姓名和留言內容" });
    }
    if (trimmedName.length > 50) {
      return res.status(400).json({ error: "姓名不能超過 50 字" });
    }
    if (trimmedMessage.length > 1000) {
      return res.status(400).json({ error: "留言不能超過 1000 字" });
    }

    try {
      const response = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
        method: "POST",
        headers: {
          ...githubHeaders(token),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: trimmedName,
          body: trimmedMessage,
          labels: [LABEL],
        }),
      });
      const issue = await response.json();
      if (!response.ok) {
        return res.status(500).json({ error: mapGithubError(issue.message, response.status) });
      }
      return res.status(201).json({
        id: issue.id,
        name: issue.title,
        message: issue.body,
        date: issue.created_at,
      });
    } catch {
      return res.status(500).json({ error: "送出失敗，請稍後再試" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
