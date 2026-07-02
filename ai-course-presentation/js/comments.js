const COMMENTS_API = "/api/comments";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString("zh-HK", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderCommentItem(comment) {
  return `
    <article class="comment-item">
      <header class="comment-header">
        <span class="comment-name">${escapeHtml(comment.name)}</span>
        <time class="comment-date" datetime="${comment.date}">${formatDate(comment.date)}</time>
      </header>
      <p class="comment-message">${escapeHtml(comment.message)}</p>
    </article>`;
}

function renderGuestbook() {
  return `
    <div class="guestbook" id="guestbook">
      <div class="guestbook-header">
        <h3>留言板</h3>
        <p>分享你的想法、問題或建議</p>
      </div>
      <form class="guestbook-form" id="guestbookForm">
        <label class="guestbook-field">
          <span>你的名字</span>
          <input type="text" name="name" maxlength="50" placeholder="例如：Alex" required />
        </label>
        <label class="guestbook-field">
          <span>留言內容</span>
          <textarea name="message" rows="4" maxlength="1000" placeholder="寫下你的想法…" required></textarea>
        </label>
        <p class="guestbook-status" id="guestbookStatus" role="status" aria-live="polite"></p>
        <button type="submit" class="guestbook-submit" id="guestbookSubmit">送出留言</button>
      </form>
      <div class="guestbook-list-wrap">
        <h4 class="guestbook-list-title">大家的留言</h4>
        <div class="guestbook-list" id="guestbookList">
          <p class="guestbook-loading">載入留言中…</p>
        </div>
      </div>
    </div>`;
}

async function loadComments() {
  const listEl = document.getElementById("guestbookList");
  if (!listEl) return;

  try {
    const response = await fetch(COMMENTS_API);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "載入失敗");

    if (!data.length) {
      listEl.innerHTML = `<p class="guestbook-empty">暫時未有留言，成為第一個留言的人吧！</p>`;
      return;
    }

    listEl.innerHTML = data.map(renderCommentItem).join("");
  } catch {
    listEl.innerHTML = `<p class="guestbook-empty">無法載入留言，請稍後再試。</p>`;
  }
}

function initGuestbook() {
  const form = document.getElementById("guestbookForm");
  const statusEl = document.getElementById("guestbookStatus");
  const submitBtn = document.getElementById("guestbookSubmit");
  if (!form) return;

  loadComments();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const message = formData.get("message");

    statusEl.textContent = "";
    statusEl.className = "guestbook-status";
    submitBtn.disabled = true;
    submitBtn.textContent = "送出中…";

    try {
      const response = await fetch(COMMENTS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "送出失敗");

      form.reset();
      statusEl.textContent = "多謝留言！已成功送出。";
      statusEl.classList.add("success");

      const listEl = document.getElementById("guestbookList");
      const emptyEl = listEl.querySelector(".guestbook-empty");
      if (emptyEl) emptyEl.remove();
      listEl.insertAdjacentHTML("afterbegin", renderCommentItem(data));
    } catch (err) {
      statusEl.textContent = err.message || "送出失敗，請稍後再試。";
      statusEl.classList.add("error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "送出留言";
    }
  });
}
