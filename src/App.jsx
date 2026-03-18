import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import styles from "./styles.js";
import { PROFILE, ABOUT, SKILLS, WORKS, HISTORY } from "./data.js";

/* ══════════════════════════════════════════
   SVG アイコン
══════════════════════════════════════════ */
const IconGitHub = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);
const IconLinkedIn = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const IconZenn = () => (
  <svg width="20" height="20" viewBox="0 0 88 88" fill="currentColor">
    <path d="M0 0h88v88H0z" fill="none"/>
    <path d="M9.5 74.3L33.6 13h10.8L20.3 74.3H9.5zM43.5 74.3L67.6 13H78L53.9 74.3H43.5zM56 56.5h22.5v10H56z"/>
  </svg>
);
const IconNote = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/>
  </svg>
);

import SplashScreen from './SplashScreen.jsx';

/* ══════════════════════════════════════════
   ナビゲーション
══════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const links = [
    { to: "/home",    label: "Home" },
    { to: "/about",   label: "About" },
    { to: "/works",   label: "Works" },
    { to: "/history", label: "History" },
  ];

  return (
    <>
      <nav className={`nav${scrolled ? " solid" : ""}`}>
        <NavLink to="/" className="nav-logo">
          {PROFILE.displayName}
          <span className="nav-cursor" />
        </NavLink>
        <div className="nav-links">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => isActive ? "active" : ""}>
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </div>
      </nav>
      <div className={`mmenu${menuOpen ? " open" : ""}`}>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => isActive ? "active" : ""}>
            {l.label}
          </NavLink>
        ))}
      </div>
    </>
  );
}

/* ══════════════════════════════════════════
   フッター
══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <span>© 2025 {PROFILE.displayName}</span>
      <span>Built with React + Vite · Deployed on Vercel</span>
    </footer>
  );
}

/* ══════════════════════════════════════════
   SNS バー（Contact 下）
══════════════════════════════════════════ */
function SnsBar() {
  const links = [
    { key: "github",   label: "GitHub",   icon: <IconGitHub />,   url: PROFILE.github },
    { key: "linkedin", label: "LinkedIn", icon: <IconLinkedIn />, url: PROFILE.linkedin },
    { key: "zenn",     label: "Zenn",     icon: <IconZenn />,     url: PROFILE.zenn },
    { key: "note",     label: "note",     icon: <IconNote />,     url: PROFILE.note },
  ].filter(l => l.url);
  if (links.length === 0) return null;
  return (
    <div className="sns-bar">
      {links.map(l => (
        <a key={l.key} href={l.url} target="_blank" rel="noreferrer" className="sns-btn">
          {l.icon}{l.label}
        </a>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   ページ: Home
══════════════════════════════════════════ */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const handleSubmit = async e => {
    e.preventDefault();
    // Formspree使用時: コメントアウトを外してYOUR_FORM_IDを置換
    // const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    //   method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
    // });
    // if (res.ok) setSent(true);
    setSent(true);
  };
  if (sent) return (
    <div className="form-sent">
      <div className="form-sent-icon">✓</div>
      <p>送信しました！ありがとうございます。</p>
    </div>
  );
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input placeholder="お名前" value={form.name} onChange={set("name")} required />
        <input type="email" placeholder="メールアドレス" value={form.email} onChange={set("email")} required />
      </div>
      <textarea placeholder="メッセージ（インターンのお誘い、ハッカソンのチーム募集など）" value={form.message} onChange={set("message")} required />
      <button type="submit" className="form-btn">送信する →</button>
    </form>
  );
}

function HomePage() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = ["home","about-sec","projects","skills","contact"];
    const obs = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { threshold: 0.3 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>


      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-grid" />
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="hero-dot" />
            <span>IT系インターン 2025 求職中</span>
          </div>
          <h1>
            {PROFILE.displayName}<br />
            <span className="hero-accent">{PROFILE.tagline.split("×")[0].trim()}</span>
            {" × "}{PROFILE.tagline.split("×")[1].trim()}
          </h1>
          <div className="hero-role">// {PROFILE.university}　{PROFILE.department}</div>
          <p className="hero-desc">{PROFILE.description}</p>
          <div className="hero-btns">
            <NavLink to="/works" className="btn btn-primary">作品を見る →</NavLink>
            {PROFILE.github && <a className="btn btn-outline" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>}
          </div>
          <div className="chips">
            {SKILLS.flatMap(s => s.items).map(i => <span key={i.name} className="chip">{i.name}</span>)}
          </div>
        </div>
      </section>

      <div className="sep" />

      {/* About */}
      <section id="about-sec" className="sec">
        <div className="sec-eye">// about</div>
        <h2 className="sec-title">About Me</h2>
        <div className="about-grid">
          <div className="about-body">
            <p><strong>{PROFILE.university}</strong>の<strong>{PROFILE.department}</strong>に所属する学生エンジニアです。ロボットを「動かす」制御・機械設計と、「使いやすくする」ソフトウェア開発、その両方を学んでいます。</p>
            <p>ラズパイ IoT 開発でセンサーからクラウドまで一貫したシステム設計を経験。今年はハッカソンへ積極参加予定で、<strong>IT 系インターン</strong>への応募を通じて実際のプロダクト開発に携わりたいと考えています。</p>
          </div>
          <div className="about-cards">
            {[
              { badge: "UEC", cls: "",     title: "電気通信大学",           sub: "先端ロボティクス専攻 — ロボット制御・機械設計・プログラミングを専門的に学ぶ" },
              { badge: "HW",  cls: "blue", title: "ハードウェア × ソフトウェア", sub: "CAD設計・ラズパイ制御・センサー実装をコードと組み合わせて開発" },
              { badge: "ACT", cls: "",     title: "ハッカソン参加予定",      sub: "今年積極的に参戦予定。短期間でアイデアを形にする実行力を磨く" },
              { badge: "IT",  cls: "blue", title: "IT系インターン志望",      sub: "バックエンド / Web / IoT 系ポジションを中心に探しています" },
            ].map(c => (
              <div key={c.title} className="acard">
                <span className={`abadge${c.cls ? " "+c.cls : ""}`}>{c.badge}</span>
                <div>
                  <div className="acard-title">{c.title}</div>
                  <div className="acard-sub">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sep" />

      {/* Projects */}
      <section id="projects" className="sec">
        <div className="sec-eye">// projects</div>
        <h2 className="sec-title">Projects</h2>
        <div className="works-grid">
          {WORKS.slice(0, 3).map((w, i) => (
            <div key={w.title} className="work-card">
              <div className="work-thumb">
                {w.image ? <img src={w.image} alt={w.title} /> : (
                  <div className="work-thumb-placeholder">
                    <div className="work-thumb-icon">◻</div>
                    <div className="work-thumb-label">// 画像追加予定</div>
                  </div>
                )}
              </div>
              <div className="work-body">
                <div className="work-title">{w.title}</div>
                <div className="work-desc">{w.description}</div>
                <div className="work-tags">{w.tags.map(t => <span key={t} className="work-tag">{t}</span>)}</div>
                <div className="work-links">
                  {w.codeUrl && <a href={w.codeUrl} target="_blank" rel="noreferrer" className="work-link">GitHub →</a>}
                  {w.demoUrl && <a href={w.demoUrl} target="_blank" rel="noreferrer" className="work-link primary">Demo →</a>}
                  {!w.codeUrl && !w.demoUrl && <span className="work-link dim">準備中</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <NavLink to="/works" className="btn btn-outline">すべての作品を見る →</NavLink>
        </div>
      </section>

      <div className="sep" />

      {/* Skills */}
      <section id="skills" className="sec">
        <div className="sec-eye">// skills</div>
        <h2 className="sec-title">Skills</h2>
        <div className="skills-grid">
          {SKILLS.map(s => (
            <div key={s.category} className="scard">
              <div className="scat">{s.category}</div>
              <div className="sitems">
                {s.items.map(item => (
                  <div key={item.name} className="sitem">
                    <span className={`sdot ${item.level}`} />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="slegend">
          <span><span className="dot-g" />得意</span>
          <span><span className="dot-b" />学習中・使用経験あり</span>
        </div>
      </section>

      <div className="sep" />

      {/* Contact */}
      <section id="contact" className="sec">
        <div className="sec-eye">// contact</div>
        <h2 className="sec-title">Contact</h2>
        <div className="contact-grid">
          <div className="cinfo">
            <h3>気軽にご連絡ください</h3>
            <p>インターンのお誘い、ハッカソンでのチーム募集、共同開発など、どんなご連絡でも歓迎します。ハッカソン会場でお会いした方もぜひ！</p>
            <div className="socials">
              {PROFILE.github && <a href={PROFILE.github} target="_blank" rel="noreferrer" className="soc"><span className="soc-badge">GH</span>github.com/arupakaniisan</a>}
              {PROFILE.twitter && <a href={PROFILE.twitter} target="_blank" rel="noreferrer" className="soc"><span className="soc-badge">𝕏</span>Twitter / X</a>}
              {PROFILE.zenn && <a href={PROFILE.zenn} target="_blank" rel="noreferrer" className="soc"><span className="soc-badge">Z</span>Zenn</a>}
              {PROFILE.note && <a href={PROFILE.note} target="_blank" rel="noreferrer" className="soc"><span className="soc-badge">N</span>note</a>}
              {PROFILE.email && <a href={`mailto:${PROFILE.email}`} className="soc"><span className="soc-badge">@</span>{PROFILE.email}</a>}
            </div>
          </div>
          <ContactForm />
        </div>
        <SnsBar />
      </section>

      <Footer />
    </>
  );
}

/* ══════════════════════════════════════════
   ページ: About
══════════════════════════════════════════ */
function AboutPage() {
  const socialLinks = [
    { label: "GitHub",   icon: <IconGitHub />,   url: PROFILE.github },
    { label: "LinkedIn", icon: <IconLinkedIn />, url: PROFILE.linkedin },
    { label: "Zenn",     icon: <IconZenn />,     url: PROFILE.zenn },
    { label: "note",     icon: <IconNote />,     url: PROFILE.note },
  ].filter(l => l.url);

  return (
    <>
      <div className="page">
        <div className="page-eye">// about</div>
        <h1 className="page-title">About</h1>

        {/* アバター */}
        <div className="about-avatar">
          {PROFILE.avatar
            ? <img src={PROFILE.avatar} alt={PROFILE.displayName} />
            : PROFILE.displayName[0].toUpperCase()
          }
        </div>

        {/* プロフィール表 */}
        <div className="about-section-title" style={{ marginTop: 0 }}>プロフィール</div>
        <div className="about-profile-grid">
          {ABOUT.profile.map(row => (
            <>
              <div key={row.label + "-l"} className="about-profile-label">{row.label}</div>
              <div key={row.label + "-v"} className="about-profile-value">{row.value}</div>
            </>
          ))}
        </div>

        {/* 資格 */}
        {ABOUT.qualifications.length > 0 && (
          <>
            <div className="about-section-title">資格・受賞</div>
            <div className="qual-list">
              {ABOUT.qualifications.map(q => (
                <div key={q.title} className="qual-item">
                  <div className="qual-title">{q.title}</div>
                  <div className="qual-date">{q.date}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 趣味 */}
        <div className="about-section-title">趣味</div>
        <div className="hobby-tags">
          {ABOUT.hobbies.map(h => <span key={h} className="hobby-tag">{h}</span>)}
        </div>

        {/* リンク */}
        {socialLinks.length > 0 && (
          <>
            <div className="about-section-title">リンク</div>
            <div className="social-links">
              {socialLinks.map(l => (
                <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="social-link">
                  {l.icon}{l.label}
                </a>
              ))}
              {PROFILE.email && (
                <a href={`mailto:${PROFILE.email}`} className="social-link">
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12 }}>@</span>
                  {PROFILE.email}
                </a>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

/* ══════════════════════════════════════════
   ページ: Works
══════════════════════════════════════════ */
function WorksPage() {
  return (
    <>
      <div className="page">
        <div className="page-eye">// works</div>
        <h1 className="page-title">Works</h1>
        <p style={{ fontSize: 15, color: "var(--muted2)", marginBottom: 48, fontWeight: 300 }}>
          これまでに制作した作品の一覧です。
        </p>
        <div className="works-grid">
          {WORKS.map((w, i) => (
            <div key={w.title} className="work-card">
              <div className="work-thumb">
                {w.image ? (
                  <img src={w.image} alt={w.title} />
                ) : (
                  <div className="work-thumb-placeholder">
                    <div className="work-thumb-icon">◻</div>
                    <div className="work-thumb-label">// 画像追加予定</div>
                  </div>
                )}
              </div>
              <div className="work-body">
                <div className="work-title">{w.title}</div>
                <div className="work-desc">{w.description}</div>
                <div className="work-tags">{w.tags.map(t => <span key={t} className="work-tag">{t}</span>)}</div>
                <div className="work-links">
                  {w.codeUrl && <a href={w.codeUrl} target="_blank" rel="noreferrer" className="work-link">GitHub →</a>}
                  {w.demoUrl && <a href={w.demoUrl} target="_blank" rel="noreferrer" className="work-link primary">Demo →</a>}
                  {!w.codeUrl && !w.demoUrl && <span className="work-link dim">準備中</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

/* ══════════════════════════════════════════
   ページ: History
══════════════════════════════════════════ */
function HistoryPage() {
  const typeLabel = { dev: "開発", education: "学業", hackathon: "ハッカソン", work: "仕事", life: "人生" };
  const typeDotColor = { dev: "var(--accent)", education: "var(--accent2)", hackathon: "#f59e0b", work: "#a855f7", life: "var(--border2)" };

  return (
    <>
      <div className="page">
        <div className="page-eye">// history</div>
        <h1 className="page-title">History</h1>

        {/* 凡例 */}
        <div className="tl-legend">
          {Object.entries(typeLabel).map(([type, label]) => (
            <div key={type} className="tl-legend-item">
              <div className="tl-legend-dot" style={{ background: typeDotColor[type] }} />
              {label}
            </div>
          ))}
        </div>

        {/* タイムライン */}
        <div className="timeline">
          {HISTORY.map((item, i) => (
            <div key={i} className="tl-item">
              <div className={`tl-dot ${item.type}`} />
              <div className={`tl-type-badge tl-type-${item.type}`}>{typeLabel[item.type]}</div>
              <div className="tl-date">{item.date}</div>
              <div className="tl-title">{item.title}</div>
              {item.description && <div className="tl-desc">{item.description}</div>}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

/* ══════════════════════════════════════════
   App ルート
══════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <style>{styles}</style>
      <BrowserRouter>
        <Routes>
          <Route path="/"        element={<SplashScreen />} />
          <Route path="/home"    element={<><Nav /><HomePage /></>} />
          <Route path="/about"   element={<><Nav /><AboutPage /></>} />
          <Route path="/works"   element={<><Nav /><WorksPage /></>} />
          <Route path="/history" element={<><Nav /><HistoryPage /></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
