// build.cjs – renamed từ build.js để tương thích với "type":"module" trong package.json
const fs = require('fs');
const yaml = require('js-yaml');

const data = yaml.load(fs.readFileSync('_data/site.yml', 'utf8'));

let html = fs.readFileSync('template.html', 'utf8');

// ── Hero ──
html = html
  .replace('{{hero.title_line1}}', data.hero.title_line1)
  .replace('{{hero.title_line2}}', data.hero.title_line2)
  .replace('{{hero.subtitle}}', data.hero.subtitle);

// ── Problems ──
const problemIcons = [
  `<svg viewBox="0 0 64 64"><path d="M32 6 8 18l24 12 24-12L32 6Z"/><path d="M8 30l24 12 24-12"/><path d="M8 42l24 12 24-12"/></svg>`,
  `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="23"/><path d="M32 16v18h14"/></svg>`,
  `<svg viewBox="0 0 64 64"><path d="M32 6C20 21 14 31 14 42a18 18 0 0 0 36 0C50 31 44 21 32 6Z"/></svg>`,
  `<svg viewBox="0 0 64 64"><path d="M12 52V34h8v18H12Z"/><path d="M28 52V20h8v32h-8Z"/><path d="M44 52V8h8v44h-8Z"/></svg>`,
];
const problemsHtml = data.problems.map((p, i) => `
  <div class="problem-item${i === data.problems.length - 1 ? ' last' : ''}">
    ${problemIcons[i]}
    <div><h3>${p.title}</h3><p>${p.desc}</p></div>
  </div>`).join('');
html = html.replace('{{problems}}', problemsHtml);

// ── Approach steps ──
const stepIcons = ['⌕', '⌖', '⚗', '✓'];
const stepsHtml = data.approach.steps.map((s, i) => `
  ${i > 0 ? '<div class="step-arrow">→</div>' : ''}
  <article class="step">
    <div class="step-icon">${stepIcons[i]}</div>
    <span>${s.number}</span>
    <h3>${s.title}</h3>
    <p>${s.desc}</p>
  </article>`).join('');
html = html
  .replace('{{steps}}', stepsHtml)
  .replace('{{approach.note}}', data.approach.note);

// ── Solutions ──
const solutionIcons = ['☼', '▭', '▥', '◉', '⤴', '≋'];
const solutionsHtml = data.solutions.map((s, i) => `
  <article class="solution-card">
    <div class="card-icon">${solutionIcons[i]}</div>
    <h3>${s.title}</h3>
    <p>${s.desc}</p>
  </article>`).join('');
html = html.replace('{{solutions}}', solutionsHtml);

// ── Regions ──
const regionImages = ['istanbul.jpg', 'ankara.jpg', 'izmir.jpg', 'other-regions.jpg'];
const regionsHtml = data.regions.map((r, i) => `
  <article class="region-card">
    <img src="assets/${regionImages[i]}" alt="${r.name}">
    <h3>${r.name}</h3>
    <p>${r.desc}</p>
  </article>`).join('');
html = html.replace('{{regions}}', regionsHtml);

// ── Footer ──
html = html
  .replace('{{footer.headline}}', data.footer_headline)
  .replace('{{footer.headline_accent}}', data.footer_headline_accent)
  .replace('{{footer.subtext}}', data.footer_subtext)
  .replace('{{contact.email}}', data.contact.email)
  .replace('{{contact.phone}}', data.contact.phone)
  .replace('{{contact.address}}', data.contact.address)
  .replace('{{contact.whatsapp}}', data.contact.whatsapp);

fs.writeFileSync('index.html', html);
console.log('✅ Build complete → index.html');
