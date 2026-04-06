const styles = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

:root {
  --bg:          #0b0c0e;
  --surface:     #13151a;
  --surface2:    #1c1f27;
  --border:      #252830;
  --border2:     #2e3340;
  --text:        #eceef2;
  --muted:       #6b7280;
  --muted2:      #9ca3af;
  --accent:      #00e5a0;
  --accent-dim:  rgba(0,229,160,.10);
  --accent2:     #3b82f6;
  --accent2-dim: rgba(59,130,246,.10);
  --sans: 'Space Grotesk', sans-serif;
  --mono: 'Space Mono', monospace;
  /* ネオングロー */
  --neon-glow:  0 0 6px rgba(0,229,160,.7), 0 0 20px rgba(0,229,160,.35), 0 0 40px rgba(0,229,160,.15);
  --neon-glow-sm: 0 0 4px rgba(0,229,160,.6), 0 0 12px rgba(0,229,160,.25);
  --neon-text:  0 0 8px rgba(0,229,160,.9), 0 0 20px rgba(0,229,160,.5);
  --neon2-glow: 0 0 6px rgba(59,130,246,.7), 0 0 20px rgba(59,130,246,.3);
}

/* ── ネオンちかちかアニメーション ── */
@keyframes neonFlicker {
  0%,19%,21%,23%,25%,54%,56%,100% {
    text-shadow: var(--neon-text);
    opacity: 1;
  }
  20%,24%,55% {
    text-shadow: none;
    opacity: .85;
  }
}

@keyframes neonBorderFlicker {
  0%,19%,21%,23%,25%,54%,56%,100% {
    box-shadow: var(--neon-glow);
    border-color: var(--accent);
  }
  20%,24%,55% {
    box-shadow: none;
    border-color: rgba(0,229,160,.3);
  }
}

@keyframes neonPulse {
  0%,100% { box-shadow: var(--neon-glow-sm); }
  50%      { box-shadow: var(--neon-glow); }
}

@keyframes scanline {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

body { font-family: var(--sans); font-size: 16px; line-height: 1.7; }

/* スキャンラインオーバーレイ */
body::after {
  content: '';
  position: fixed; inset: 0; z-index: 9998; pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,.03) 2px,
    rgba(0,0,0,.03) 4px
  );
}

/* ── NAV ── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  height: 60px; display: flex; align-items: center; justify-content: space-between;
  padding: 0 clamp(20px,5vw,60px);
  background: rgba(11,12,14,.88); backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border); transition: border-color .3s;
}
.nav.solid { border-color: var(--border2); }
.nav-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.nav-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--border2);
  transition: transform .2s ease, border-color .2s ease;
}
.nav-logo:hover {
  transform: scale(1.05);
  border-color: var(--accent);
}
.nav-logo-icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.nav-logo-text {
  font-family: var(--mono);
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  line-height: 1;
  user-select: none;
}
.nav-title-editor {
  font-family: var(--mono);
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  background: transparent;
  border: 0;
  padding: 0;
  width: min(42vw, 220px);
  outline: none;
  caret-color: var(--accent);
}
.nav-title-editor:focus {
  border: 0;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
.nav-links { display: flex; align-items: center; gap: 4px; }
.nav-links a {
  font-size: 13px; color: var(--muted2); transition: all .2s; font-weight: 500;
  padding: 6px 12px; border-radius: 4px;
}
.nav-links a:hover { color: var(--text); background: var(--surface); }
.nav-links a.active { color: var(--accent); }
.hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
.hamburger span { display: block; width: 22px; height: 2px; background: var(--muted2); border-radius: 2px; }
.mmenu {
  display: none; position: fixed; top: 60px; left: 0; right: 0; z-index: 199;
  background: rgba(11,12,14,.97); border-bottom: 1px solid var(--border2);
  flex-direction: column; padding: 16px clamp(20px,5vw,60px);
}
.mmenu.open { display: flex; }
.mmenu a {
  font-size: 15px; color: var(--muted2); font-weight: 500;
  padding: 12px 0; border-bottom: 1px solid var(--border);
}
.mmenu a:last-child { border-bottom: none; }
.mmenu a.active { color: var(--accent); }

/* ── PAGE WRAPPER ── */
.page {
  min-height: 100vh;
  padding: 100px clamp(20px,5vw,60px) 60px;
  max-width: 1000px; margin: 0 auto;
  animation: fadeUp .4s ease both;
}
@keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
.page-eye {
  font-family: var(--mono); font-size: 11px; letter-spacing: 3px;
  color: var(--accent); text-transform: uppercase; margin-bottom: 10px;
}
.page-title {
  font-size: clamp(28px,5vw,48px); font-weight: 700;
  letter-spacing: -1.5px; margin-bottom: 56px;
}

/* ── HERO ── */
.hero {
  min-height: 100vh; display: flex; flex-direction: column; justify-content: center;
  padding: 100px clamp(20px,5vw,60px) 60px;
  position: relative; overflow: hidden;
}
.hero-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(0,229,160,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,160,.04) 1px,transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 50%,#000 40%,transparent 100%);
}
.hero-inner { max-width: 860px; position: relative; z-index: 1; animation: fadeUp .6s ease both; }
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--accent-dim); border: 1px solid rgba(0,229,160,.25);
  border-radius: 4px; padding: 5px 12px; margin-bottom: 32px;
}
.hero-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex-shrink: 0; animation: pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }
.hero-badge span { font-family: var(--mono); font-size: 11px; color: var(--accent); letter-spacing: 1.5px; text-transform: uppercase; }
.hero h1 { font-size: clamp(38px,8vw,80px); font-weight: 700; line-height: 1.0; letter-spacing: -2px; margin-bottom: 8px; }
.hero-accent { color: var(--accent); }
.hero-role { font-family: var(--mono); font-size: clamp(12px,2vw,15px); color: var(--muted); margin-bottom: 24px; letter-spacing: .5px; }
.hero-desc { font-size: clamp(15px,2vw,17px); color: var(--muted2); max-width: 560px; font-weight: 300; line-height: 1.85; margin-bottom: 40px; }
.hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 22px; border-radius: 4px; font-size: 14px; font-weight: 600;
  border: 1px solid transparent; transition: all .2s;
}
.btn-primary { background: var(--accent); color: #0b0c0e; border-color: var(--accent); }
.btn-primary:hover { opacity: .85; }
.btn-outline { border-color: var(--border2); color: var(--muted2); }
.btn-outline:hover { border-color: var(--accent); color: var(--accent); }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { font-family: var(--mono); font-size: 11px; padding: 4px 10px; background: var(--surface); border: 1px solid var(--border2); border-radius: 3px; color: var(--muted); letter-spacing: .5px; }

/* ── SEPARATOR ── */
.sep { width: 100%; height: 1px; background: linear-gradient(90deg,transparent,var(--border2),transparent); max-width: 1000px; margin: 0 auto; }
.sec { padding: 80px clamp(20px,5vw,60px); max-width: 1000px; margin: 0 auto; }
.sec-eye { font-family: var(--mono); font-size: 11px; letter-spacing: 3px; color: var(--accent); text-transform: uppercase; margin-bottom: 10px; }
.sec-title { font-size: clamp(26px,4vw,36px); font-weight: 700; letter-spacing: -1px; margin-bottom: 48px; }

/* ── ABOUT SECTION (home page) ── */
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
.about-body { font-size: 15px; color: var(--muted2); line-height: 1.9; font-weight: 300; }
.about-body p + p { margin-top: 14px; }
.about-body strong { color: var(--text); font-weight: 600; }
.about-cards { display: flex; flex-direction: column; gap: 10px; }
.acard { background: var(--surface); border: 1px solid var(--border2); border-radius: 8px; padding: 14px 18px; display: flex; align-items: flex-start; gap: 12px; }
.abadge { font-family: var(--mono); font-size: 10px; font-weight: 700; background: var(--accent-dim); color: var(--accent); border: 1px solid rgba(0,229,160,.2); border-radius: 3px; padding: 3px 7px; white-space: nowrap; flex-shrink: 0; margin-top: 2px; }
.abadge.blue { background: var(--accent2-dim); color: var(--accent2); border-color: rgba(59,130,246,.2); }
.acard-title { font-size: 14px; font-weight: 600; margin-bottom: 3px; }
.acard-sub { font-size: 12px; color: var(--muted); line-height: 1.6; }

/* ── ABOUT PAGE ── */
.about-profile-grid { display: grid; grid-template-columns: auto 1fr; gap: 8px 24px; margin-bottom: 40px; }
.about-profile-label { font-family: var(--mono); font-size: 12px; color: var(--muted); letter-spacing: 1px; padding: 8px 0; border-bottom: 1px solid var(--border); }
.about-profile-value { font-size: 15px; color: var(--text); font-weight: 500; padding: 8px 0; border-bottom: 1px solid var(--border); }
.about-section-title { font-family: var(--mono); font-size: 11px; letter-spacing: 3px; color: var(--accent); text-transform: uppercase; margin-bottom: 20px; margin-top: 40px; }
.qual-list { display: flex; flex-direction: column; gap: 10px; }
.qual-item { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: var(--surface); border: 1px solid var(--border2); border-radius: 8px; }
.qual-title { font-size: 14px; font-weight: 600; }
.qual-date { font-family: var(--mono); font-size: 12px; color: var(--muted); }
.hobby-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.hobby-tag { font-family: var(--mono); font-size: 12px; padding: 6px 14px; background: var(--surface); border: 1px solid var(--border2); border-radius: 100px; color: var(--muted2); }
.about-avatar { width: 100px; height: 100px; border-radius: 50%; background: rgba(0,229,160,.12); border: 2px solid rgba(0,229,160,.3); display: flex; align-items: center; justify-content: center; font-size: 40px; font-family: var(--mono); font-weight: 700; color: var(--accent); margin-bottom: 32px; overflow: hidden; }
.about-avatar img { width: 100%; height: 100%; object-fit: cover; }
.social-links { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
.social-link { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--surface); border: 1px solid var(--border2); border-radius: 6px; font-size: 13px; color: var(--muted2); transition: all .2s; }
.social-link:hover { border-color: var(--accent); color: var(--accent); }

/* ── WORKS PAGE ── */
.works-grid { display: flex; flex-direction: column; gap: 20px; }
.work-card { background: var(--surface); border: 1px solid var(--border2); border-radius: 12px; overflow: hidden; display: grid; grid-template-columns: 280px 1fr; transition: border-color .25s, transform .2s; }
.work-card:hover { border-color: rgba(0,229,160,.4); transform: translateY(-2px); }
.work-thumb { background: var(--surface2); display: flex; align-items: center; justify-content: center; min-height: 180px; overflow: hidden; }
.work-thumb img { width: 100%; height: 100%; object-fit: cover; }
.work-thumb-placeholder { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.work-thumb-icon { font-size: 36px; opacity: .12; }
.work-thumb-label { font-family: var(--mono); font-size: 9px; color: var(--muted); opacity: .4; letter-spacing: 2px; }
.work-body { padding: 24px 28px; }
.work-title { font-size: 18px; font-weight: 700; margin-bottom: 10px; letter-spacing: -.3px; }
.work-desc { font-size: 14px; color: var(--muted2); line-height: 1.8; margin-bottom: 16px; font-weight: 300; }
.work-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
.work-tag { font-family: var(--mono); font-size: 11px; padding: 3px 8px; background: var(--surface2); border: 1px solid var(--border2); border-radius: 3px; color: var(--muted2); }
.work-links { display: flex; gap: 10px; }
.work-link { font-size: 12px; font-weight: 600; padding: 7px 14px; border-radius: 4px; border: 1px solid var(--border2); color: var(--muted2); transition: all .2s; font-family: var(--mono); }
.work-link:hover { border-color: var(--accent); color: var(--accent); }
.work-link.primary { background: var(--accent); color: #0b0c0e; border-color: var(--accent); }
.work-link.primary:hover { opacity: .85; }
.work-link.dim { opacity: .4; cursor: default; }

/* ── HISTORY PAGE ── */
.timeline { position: relative; padding-left: 32px; }
.timeline::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 1px; background: var(--border2); }
.tl-item { position: relative; margin-bottom: 36px; }
.tl-dot {
  position: absolute; left: -36px; top: 6px;
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--surface2); border: 2px solid var(--border2);
  transition: border-color .2s;
}
.tl-dot.dev      { border-color: var(--accent); background: var(--accent-dim); }
.tl-dot.education{ border-color: var(--accent2); background: var(--accent2-dim); }
.tl-dot.hackathon{ border-color: #f59e0b; background: rgba(245,158,11,.1); }
.tl-dot.work     { border-color: #a855f7; background: rgba(168,85,247,.1); }
.tl-dot.life     { border-color: var(--border2); }
.tl-date { font-family: var(--mono); font-size: 12px; color: var(--muted); margin-bottom: 6px; letter-spacing: .5px; }
.tl-title { font-size: 16px; font-weight: 600; margin-bottom: 6px; }
.tl-desc { font-size: 14px; color: var(--muted2); line-height: 1.7; font-weight: 300; }
.tl-type-badge {
  display: inline-block; font-family: var(--mono); font-size: 9px; letter-spacing: 1.5px;
  text-transform: uppercase; padding: 2px 8px; border-radius: 3px; margin-bottom: 8px;
}
.tl-type-dev      { background: var(--accent-dim); color: var(--accent); }
.tl-type-education{ background: var(--accent2-dim); color: var(--accent2); }
.tl-type-hackathon{ background: rgba(245,158,11,.1); color: #f59e0b; }
.tl-type-work     { background: rgba(168,85,247,.1); color: #a855f7; }
.tl-type-life     { background: var(--surface2); color: var(--muted); }
.tl-legend { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 40px; }
.tl-legend-item { display: flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 11px; color: var(--muted); }
.tl-legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

/* ── SKILLS (home page) ── */
.skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; }
.scard { background: var(--surface); border: 1px solid var(--border2); border-radius: 8px; padding: 20px; }
.scat { font-family: var(--mono); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--accent); margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
.scat::after { content: ''; flex: 1; height: 1px; background: var(--border2); }
.sitems { display: flex; flex-direction: column; gap: 8px; }
.sitem { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--muted2); }
.sdot { width: 5px; height: 5px; border-radius: 50%; background: var(--border2); flex-shrink: 0; }
.sdot.expert   { background: var(--accent); }
.sdot.learning { background: var(--accent2); }
.slegend { margin-top: 16px; display: flex; gap: 20px; font-family: var(--mono); font-size: 11px; color: var(--muted); }
.slegend span { display: flex; align-items: center; gap: 6px; }
.slegend .dot-g { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); }
.slegend .dot-b { width: 7px; height: 7px; border-radius: 50%; background: var(--accent2); }

/* ── CONTACT ── */
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
.cinfo h3 { font-size: 20px; font-weight: 700; margin-bottom: 10px; }
.cinfo p { font-size: 14px; color: var(--muted2); line-height: 1.8; font-weight: 300; margin-bottom: 24px; }
.socials { display: flex; flex-direction: column; gap: 10px; }
.soc { display: flex; align-items: center; gap: 12px; padding: 12px 14px; background: var(--surface); border: 1px solid var(--border2); border-radius: 8px; font-size: 14px; color: var(--muted2); transition: all .2s; }
.soc:hover { border-color: var(--accent); color: var(--accent); }
.soc-badge { font-family: var(--mono); font-size: 10px; background: var(--surface2); border: 1px solid var(--border2); padding: 3px 7px; border-radius: 3px; letter-spacing: 1px; flex-shrink: 0; }
.form { display: flex; flex-direction: column; gap: 12px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form input, .form textarea { width: 100%; padding: 11px 14px; background: var(--surface); border: 1px solid var(--border2); border-radius: 6px; font-family: var(--sans); font-size: 14px; color: var(--text); outline: none; transition: border-color .2s; resize: vertical; }
.form input:focus, .form textarea:focus { border-color: var(--accent); }
.form input::placeholder, .form textarea::placeholder { color: var(--muted); }
.form textarea { min-height: 110px; }
.form-btn { background: var(--accent); color: #0b0c0e; border: none; border-radius: 6px; padding: 13px; font-size: 14px; font-weight: 700; font-family: var(--sans); transition: opacity .2s; letter-spacing: .3px; }
.form-btn:hover { opacity: .85; }
.form-sent { padding: 40px; text-align: center; background: var(--surface); border: 1px solid rgba(0,229,160,.2); border-radius: 8px; }
.form-sent-icon { font-size: 28px; margin-bottom: 10px; color: var(--accent); }
.form-sent p { color: var(--muted2); font-size: 14px; }

/* ── SNS BAR ── */
.sns-bar { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 40px; padding-top: 32px; border-top: 1px solid var(--border2); }
.sns-btn { display: flex; align-items: center; gap: 10px; padding: 12px 20px; background: var(--surface); border: 1px solid var(--border2); border-radius: 8px; color: var(--muted2); font-size: 14px; transition: all .2s; }
.sns-btn:hover { border-color: var(--accent); color: var(--accent); }

/* ── FOOTER ── */
.footer { border-top: 1px solid var(--border); padding: 24px clamp(20px,5vw,60px); max-width: 1000px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
.footer span { font-family: var(--mono); font-size: 11px; color: var(--muted); }

/* ── BLOG ── */
.blog-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.blog-card {
  display: block;
  background: var(--surface);
  border: 1px solid var(--border2);
  border-radius: 10px;
  padding: 18px;
  transition: border-color .2s, transform .2s;
}
.blog-card:hover {
  border-color: rgba(0,229,160,.45);
  transform: translateY(-2px);
}
.blog-card-meta {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: .5px;
  color: var(--muted);
  margin-bottom: 6px;
}
.blog-card-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text);
}
.blog-card-excerpt {
  color: var(--muted2);
  font-size: 14px;
  line-height: 1.8;
}
.blog-empty {
  background: var(--surface);
  border: 1px dashed var(--border2);
  border-radius: 10px;
  padding: 22px;
  color: var(--muted2);
}

.blog-post-header {
  margin-bottom: 26px;
}
.blog-post-date {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 8px;
}
.blog-post-title {
  font-size: clamp(30px, 6vw, 52px);
  line-height: 1.1;
  letter-spacing: -1.2px;
  font-weight: 700;
}

.markdown {
  color: var(--muted2);
  font-size: 16px;
  line-height: 1.95;
}
.markdown h1,
.markdown h2,
.markdown h3,
.markdown h4 {
  color: var(--text);
  line-height: 1.3;
  letter-spacing: -.2px;
  margin: 2em 0 .7em;
}
.markdown h2 {
  font-size: 28px;
  border-bottom: 1px solid var(--border2);
  padding-bottom: 10px;
}
.markdown h3 {
  font-size: 22px;
}
.markdown p,
.markdown ul,
.markdown ol,
.markdown pre,
.markdown blockquote {
  margin: 1em 0;
}
.markdown a {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.markdown ul,
.markdown ol {
  padding-left: 1.4em;
}
.markdown li + li {
  margin-top: .45em;
}
.markdown code {
  font-family: var(--mono);
  font-size: .9em;
  background: var(--surface2);
  border: 1px solid var(--border2);
  border-radius: 4px;
  padding: 2px 6px;
  color: var(--text);
}
.markdown pre {
  background: #0d1014;
  border: 1px solid var(--border2);
  border-radius: 8px;
  padding: 16px;
  overflow: auto;
}
.markdown pre code {
  background: transparent;
  border: 0;
  padding: 0;
}
.markdown blockquote {
  border-left: 3px solid var(--accent);
  background: rgba(0,229,160,.06);
  padding: 10px 14px;
  border-radius: 4px;
}

.blog-back {
  display: inline-flex;
  margin-top: 30px;
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .hamburger { display: flex; }
  .about-grid, .contact-grid { grid-template-columns: 1fr; }
  .work-card { grid-template-columns: 1fr; }
  .work-thumb { min-height: 160px; }
  .footer { flex-direction: column; gap: 8px; text-align: center; }
  .form-row { grid-template-columns: 1fr; }
}
`;

export default styles;
