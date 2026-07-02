# AGENTS.md

## Cursor Cloud specific instructions

### What this repo is
A dependency-free, framework-free static slide presentation (Traditional Chinese) in
`ai-course-presentation/` (plain HTML/CSS/vanilla JS), plus one optional Vercel serverless
function `api/comments.js` that powers a guestbook by storing entries as GitHub Issues.
There is **no package manager, lockfile, or build step** — nothing to install. Node 22 and
Python 3.12 are preinstalled.

### Running the presentation (core product)
Serve the static folder (do not rely on `file://`, the scripts use relative paths):

```bash
cd ai-course-presentation && python3 -m http.server 8080
```

Then open `http://localhost:8080/`. Navigate with the `下一幕`/`上一幕` buttons, arrow/space
keys, or the progress dots. There is no lint/test/build tooling in this repo.

### Guestbook API (`api/comments.js`) — optional
- It is a Vercel serverless function (ES module default export `handler(req, res)`), only
  routed when running under Vercel. A plain `python3 -m http.server` will **404** on
  `/api/comments`, so the guestbook shows a load error locally — this is expected and does
  **not** mean the site is broken.
- `POST` (submitting a comment) requires `GITHUB_TOKEN` (a PAT with `repo` scope); without it
  the handler returns HTTP 503 by design. `GET` works without a token but is GitHub
  rate-limited.
- The target repo and label are hard-coded at the top of `api/comments.js`
  (`REPO`, `LABEL`).
- To exercise the guestbook end-to-end you need `vercel dev` (installs `vercel` CLI globally,
  and typically needs a linked/authenticated Vercel account) plus `GITHUB_TOKEN`. You can also
  unit-test the handler directly by importing it into a small Node script and passing mock
  `req`/`res` objects.
