let currentIndex = 0;
let typingTimer = null;

const els = {
  progressFill: document.getElementById("progressFill"),
  sceneDots: document.getElementById("sceneDots"),
  avatarPanel: document.getElementById("avatarPanel"),
  narrationText: document.getElementById("narrationText"),
  visualArea: document.getElementById("visualArea"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  sceneCounter: document.getElementById("sceneCounter"),
  slide: document.getElementById("slide"),
};

function renderDots() {
  els.sceneDots.innerHTML = SCENES.map(
    (_, i) =>
      `<button type="button" class="scene-dot${i === currentIndex ? " active" : ""}" data-index="${i}" aria-label="第 ${i + 1} 幕"></button>`
  ).join("");

  els.sceneDots.querySelectorAll(".scene-dot").forEach((dot) => {
    dot.addEventListener("click", () => goToScene(Number(dot.dataset.index)));
  });
}

function goToScene(index) {
  if (index < 0 || index >= SCENES.length) return;
  currentIndex = index;
  renderScene();
}

function typeNarration(text) {
  if (typingTimer) clearInterval(typingTimer);
  els.narrationText.textContent = "";
  els.narrationText.classList.add("typing");

  let i = 0;
  typingTimer = setInterval(() => {
    if (i < text.length) {
      els.narrationText.textContent += text[i];
      i++;
    } else {
      clearInterval(typingTimer);
      typingTimer = null;
      els.narrationText.classList.remove("typing");
    }
  }, 35);
}

function renderAvatar(scene) {
  const { expression, outfit, props } = scene.avatar;
  const showCursor = props.includes("cursor-giant");
  const showComputer = props.includes("side-computer");

  const facePaths = {
    welcome: `<path d="M75 68 Q85 78 95 68" fill="none" stroke="#2c2825" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="82" cy="58" r="3" fill="#2c2825"/><circle cx="98" cy="58" r="3" fill="#2c2825"/>`,
    explaining: `<ellipse cx="82" cy="58" rx="3" ry="4" fill="#2c2825"/><ellipse cx="98" cy="58" rx="3" ry="4" fill="#2c2825"/>
      <path d="M78 72 Q90 76 102 72" fill="none" stroke="#2c2825" stroke-width="2" stroke-linecap="round"/>
      <path d="M115 75 L125 70 L120 80 Z" fill="#c17f59"/>`,
    "money-eyes": `<text x="78" y="62" font-size="14" font-weight="bold" fill="#e6a817">$</text>
      <text x="94" y="62" font-size="14" font-weight="bold" fill="#e6a817">$</text>
      <path d="M76 72 Q90 80 104 72" fill="none" stroke="#2c2825" stroke-width="2.5" stroke-linecap="round"/>`,
    relaxed: `<path d="M78 58 Q82 54 86 58" fill="none" stroke="#2c2825" stroke-width="2" stroke-linecap="round"/>
      <path d="M94 58 Q98 54 102 58" fill="none" stroke="#2c2825" stroke-width="2" stroke-linecap="round"/>
      <path d="M78 72 Q90 78 102 72" fill="none" stroke="#2c2825" stroke-width="2" stroke-linecap="round"/>`,
    thoughtful: `<circle cx="82" cy="58" r="3" fill="#2c2825"/><circle cx="98" cy="58" r="3" fill="#2c2825"/>
      <path d="M80 72 L100 72" fill="none" stroke="#2c2825" stroke-width="2" stroke-linecap="round"/>
      <circle cx="108" cy="48" r="8" fill="none" stroke="#e6a817" stroke-width="1.5"/>
      <text x="105" y="51" font-size="10" fill="#e6a817">💡</text>`,
    proud: `<path d="M78 58 Q82 54 86 58" fill="none" stroke="#2c2825" stroke-width="2" stroke-linecap="round"/>
      <path d="M94 58 Q98 54 102 58" fill="none" stroke="#2c2825" stroke-width="2" stroke-linecap="round"/>
      <path d="M76 70 Q90 78 104 70" fill="none" stroke="#2c2825" stroke-width="2.5" stroke-linecap="round"/>`,
  };

  const outfitLayers = {
    default: `<rect x="65" y="95" width="50" height="55" rx="8" fill="#6b9080"/>`,
    hunter: `<rect x="65" y="95" width="50" height="55" rx="8" fill="#8b6914"/>
      <ellipse cx="90" cy="42" rx="28" ry="8" fill="#5c4033"/>
      <rect x="62" y="38" width="56" height="6" rx="2" fill="#5c4033"/>`,
    vacation: `<rect x="65" y="95" width="50" height="40" rx="8" fill="#4a90a4"/>
      <rect x="55" y="130" width="70" height="8" rx="4" fill="#c17f59" transform="rotate(-5 90 134"/>
      <rect x="70" y="50" width="40" height="6" rx="2" fill="#333" opacity="0.8"/>`,
  };

  const cursorGiant = showCursor
    ? `<svg class="cursor-giant" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea"/><stop offset="100%" style="stop-color:#764ba2"/>
        </linearGradient></defs>
        <path d="M20 10 L20 60 L35 48 L48 70 L58 65 L45 43 L65 40 Z" fill="url(#cg)"/>
        <text x="70" y="45" font-size="14" font-weight="bold" fill="#667eea">Cursor</text>
      </svg>`
    : "";

  const computer = showComputer
    ? `<svg class="side-computer" viewBox="0 0 90 70" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="80" height="50" rx="4" fill="#333"/>
        <rect class="computer-screen" x="10" y="10" width="70" height="40" rx="2" fill="#1a1a2e"/>
        <text x="15" y="28" font-size="6" fill="#4ade80">Generating email...</text>
        <rect x="15" y="32" width="50" height="3" rx="1" fill="#667eea" opacity="0.6"/>
        <rect x="15" y="38" width="35" height="3" rx="1" fill="#667eea" opacity="0.4"/>
        <text class="email-float" x="60" y="25" font-size="12">✉️</text>
        <rect x="25" y="58" width="40" height="4" rx="1" fill="#555"/>
        <rect x="35" y="62" width="20" height="3" rx="1" fill="#444"/>
      </svg>`
    : "";

  els.avatarPanel.innerHTML = `
    ${cursorGiant}
    <svg class="avatar-svg" viewBox="0 0 180 160" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="90" cy="155" rx="45" ry="8" fill="rgba(0,0,0,0.06)"/>
      <ellipse cx="90" cy="75" rx="35" ry="38" fill="#f5d0b5"/>
      ${outfitLayers[outfit] || outfitLayers.default}
      <ellipse cx="90" cy="55" rx="28" ry="30" fill="#f5d0b5"/>
      ${facePaths[expression] || facePaths.welcome}
    </svg>
    ${computer}
  `;
}

function renderLLMIcons() {
  return `
    <div class="llm-grid">
      <div class="llm-icon">
        <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#10a37f"/><text x="20" y="25" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">AI</text></svg>
        <span>ChatGPT</span>
      </div>
      <div class="llm-icon">
        <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#d97757"/><text x="20" y="25" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">C</text></svg>
        <span>Claude</span>
      </div>
      <div class="llm-icon">
        <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#4285f4"/><text x="20" y="25" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">G</text></svg>
        <span>Gemini</span>
      </div>
      <div class="llm-icon">
        <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#1fb8cd"/><text x="20" y="25" text-anchor="middle" fill="#fff" font-size="8" font-weight="bold">P</text></svg>
        <span>Perplexity</span>
      </div>
    </div>`;
}

function renderTitleCard(title) {
  return `
    <div class="title-card-visual">
      <h2>${title}</h2>
      <p>更有效率 · 更省錢 · 更精準</p>
    </div>`;
}

function renderScreenshotComparison() {
  const candidates = [
    { rank: 1, name: "Alan Ng", company: "Hongkong Land Limited", score: 97, note: "People & Culture Business Partner" },
    { rank: 2, name: "Rachel Kwan", company: "KNK PROPERTY LTD.", score: 95, note: "10+ years HR in property" },
    { rank: 3, name: "Elaine Liu", company: "Sino Group", score: 93, note: "Senior HR leader, 30 years exp." },
    { rank: 4, name: "Chris T O Ng", company: "Nan Fung Group", score: 90, note: "Land developer HR" },
    { rank: 5, name: "Michelle Ho", company: "—", score: 86, note: "HK real estate HR" },
  ];

  const tableRows = candidates
    .map(
      (c) => `<tr>
        <td>${c.rank}</td><td>${c.name}</td><td>${c.company}</td>
        <td class="score">${c.score}</td>
        <td>${c.note}<span class="tag">linkedin</span></td>
      </tr>`
    )
    .join("");

  return `
    <div class="comparison-layout">
      <div class="price-compare">
        <div class="price-card">
          <div class="label">LinkedIn Premium Business</div>
          <div class="price">$69.99<span style="font-size:0.8rem;font-weight:400">/月</span></div>
        </div>
        <div class="price-card highlight">
          <div class="label">Perplexity + 正確 Prompt</div>
          <div class="price">更省成本</div>
        </div>
      </div>
      <div class="screenshot-frame">
        <div class="perplexity-mock" id="perplexityMock">
          <div class="mock-header">Revised shortlist — HK real estate HR candidates (10+ years)</div>
          <table>
            <thead><tr><th>Rank</th><th>Candidate</th><th>Company</th><th>Score</th><th>Why it fits</th></tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
        </div>
        <img src="screenshots/scene3-perplexity-search.png" alt="Perplexity 獵頭搜尋結果"
          onload="this.previousElementSibling.style.display='none'"
          onerror="this.style.display='none'" />
      </div>
    </div>`;
}

function renderVacationMetrics() {
  return `
    <div class="metrics-layout">
      <div class="metric-card">
        <h4>📈 公司業績</h4>
        <div class="chart-bars">
          <div class="chart-bar"></div><div class="chart-bar"></div>
          <div class="chart-bar"></div><div class="chart-bar"></div>
        </div>
      </div>
      <div class="metric-card">
        <h4>⭐ 招聘滿意度</h4>
        <div class="stars">
          <span class="star filled">★</span><span class="star filled">★</span>
          <span class="star filled">★</span><span class="star filled">★</span>
          <span class="star filled">★</span>
        </div>
      </div>
      <div class="metric-summary">時間 ↓　成本 ↓　滿意度 ↑</div>
    </div>`;
}

function renderToolVsHuman() {
  return `
    <div class="tool-human-layout">
      <div class="tool-side">
        <div class="icon">🔍</div>
        <h4>AI 工具</h4>
        <p>Perplexity 搜尋<br/>一鍵生成電郵</p>
      </div>
      <div class="formula-center">×</div>
      <div class="human-side">
        <div class="icon">💡</div>
        <h4>你的創意 & 組織力</h4>
        <p>Prompt 設計<br/>流程整合</p>
      </div>
      <div class="formula-result">工具 × 人 = 真正成效</div>
    </div>`;
}

function renderAgentFinale() {
  return `
    <div class="finale-layout">
      <div class="timeline">
        <span class="timeline-step">AI Tool</span>
        <span class="timeline-arrow">→</span>
        <span class="timeline-step active">AI Agent</span>
        <span class="timeline-arrow">→</span>
        <span class="timeline-step">本頁由 Cursor 打造</span>
      </div>
      <div class="cursor-badge">
        <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M5 3l14 9-6 2-3 6z"/></svg>
        Built with Cursor
      </div>
      <p class="finale-teaser">第三堂，再見 👋</p>
    </div>`;
}

function renderVisual(scene) {
  const { visual } = scene;
  switch (visual.type) {
    case "llm-icons":
      return renderLLMIcons();
    case "title-card":
      return renderTitleCard(visual.title);
    case "screenshot-comparison":
      return renderScreenshotComparison();
    case "vacation-metrics":
      return renderVacationMetrics();
    case "tool-vs-human":
      return renderToolVsHuman();
    case "agent-finale":
      return renderAgentFinale();
    default:
      return "";
  }
}

function renderScene() {
  const scene = SCENES[currentIndex];

  els.slide.style.animation = "none";
  void els.slide.offsetWidth;
  els.slide.style.animation = "fadeIn 0.5s ease";

  els.progressFill.style.width = `${((currentIndex + 1) / SCENES.length) * 100}%`;
  els.sceneCounter.textContent = `${currentIndex + 1} / ${SCENES.length}`;
  els.prevBtn.disabled = currentIndex === 0;
  els.nextBtn.disabled = currentIndex === SCENES.length - 1;
  els.nextBtn.textContent = currentIndex === SCENES.length - 1 ? "完結 ✓" : "下一幕 →";

  renderDots();
  renderAvatar(scene);
  typeNarration(scene.narration);
  els.visualArea.innerHTML = renderVisual(scene);
}

els.prevBtn.addEventListener("click", () => goToScene(currentIndex - 1));
els.nextBtn.addEventListener("click", () => {
  if (currentIndex < SCENES.length - 1) goToScene(currentIndex + 1);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === " ") {
    e.preventDefault();
    if (currentIndex < SCENES.length - 1) goToScene(currentIndex + 1);
  } else if (e.key === "ArrowLeft") {
    goToScene(currentIndex - 1);
  }
});

renderScene();
