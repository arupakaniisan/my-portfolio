import { useState, useEffect } from "react";
import styles from "./styles.js";
import { PROFILE, SKILLS, PROJECTS, ABOUT_CARDS } from "./data.js";

/* ── アーキテクチャ図（プロジェクト01専用） ── */
function ArchDiagram() {
  return (
    <div className="arch">
      <div className="arch-label">SYSTEM ARCHITECTURE</div>
      <div className="arch-row">
        <div className="abox green">Hardware</div>
        <div className="aarrow">→</div>
        <div className="abox blue">RPi 5</div>
        <div className="aarrow">→</div>
        <div className="abox">ngrok</div>
        <div className="aarrow">→</div>
        <div className="abox green">LINE</div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {["赤外線センサ", "ロードセル", "カメラ", "サーボ"].map(s => (
          <div key={s} className="abox sm">{s}</div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {["lgpio", "Flask", "OpenCV", "Python"].map(s => (
          <div key={s} className="abox blue sm">{s}</div>
        ))}
      </div>
      <div className="arch-code">
        <span className="cl">$ フロー</span>
        LINE:「餌」→ Webhook → Flask → lgpio → サーボ → 給餌
      </div>
    </div>
  );
}

/* ── プロジェクトカード ── */
function ProjectCard({ proj }) {
  return (
    <div className="proj">
      <div className="proj-body">
        <div className="proj-no">PROJECT {proj.id}</div>
        <div className="proj-title">{proj.title}</div>
        <div className="proj-desc">{proj.description}</div>
        <div className="proj-tags">
          {proj.tags.map(t => <span key={t} className="ptag">{t}</span>)}
        </div>
        <div className="plinks">
          {proj.codeUrl && (
            <a href={proj.codeUrl} target="_blank" rel="noreferrer" className="plink">
              GitHub →
            </a>
          )}
          {proj.demoUrl && (
            <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="plink primary">
              Demo →
            </a>
          )}
          {!proj.codeUrl && !proj.demoUrl && (
            <span className="plink dim">準備中</span>
          )}
        </div>
      </div>
      <div className="proj-vis">
        {proj.id === "01" ? (
          <ArchDiagram />
        ) : proj.image ? (
          <img src={proj.image} alt={proj.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div className="vis-placeholder">
            <div className="vis-icon">{proj.isHardware ? "⚙" : "◻"}</div>
            <div className="vis-label">// 画像追加予定</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── コンタクトフォーム ── */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    // ★ Formspreeを使う場合はここを変更 ★
    // const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });
    // if (res.ok) setSent(true);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="form-sent">
        <div className="form-sent-icon">✓</div>
        <p>送信しました！ありがとうございます。</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          placeholder="お名前"
          value={form.name}
          onChange={set("name")}
          required
        />
        <input
          type="email"
          placeholder="メールアドレス"
          value={form.email}
          onChange={set("email")}
          required
        />
      </div>
      <textarea
        placeholder="メッセージ（インターンのお誘い、ハッカソンのチーム募集など）"
        value={form.message}
        onChange={set("message")}
        required
      />
      <button type="submit" className="form-btn">送信する →</button>
    </form>
  );
}

/* ── メインApp ── */
export default function App() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // スクロール検知
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // アクティブセクション検知
  useEffect(() => {
    const ids = ["home", "about", "projects", "skills", "contact"];
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.35 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navLinks = ["About", "Projects", "Skills", "Contact"];

  return (
    <>
      {/* グローバルスタイル注入 */}
      <style>{styles}</style>

      {/* ── ナビゲーション ── */}
      <nav className={`nav${scrolled ? " solid" : ""}`}>
        <div className="nav-logo">
          {PROFILE.displayName}
          <span className="nav-cursor" />
        </div>
        <div className="nav-links">
          {navLinks.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className={active === l.toLowerCase() ? "active" : ""}
            >
              {l}
            </a>
          ))}
          <a className="nav-cta" href="#contact">Contact</a>
        </div>
        {/* ハンバーガーメニュー（スマホ） */}
        <div className="hamburger" onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </div>
      </nav>

      {/* モバイルメニュー */}
      <div className={`mmenu${menuOpen ? " open" : ""}`}>
        {navLinks.map(l => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
          >
            {l}
          </a>
        ))}
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </div>

      {/* ── ヒーロー ── */}
      <section id="home" className="hero">
        <div className="hero-grid" />
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="hero-dot" />
            <span>IT系インターン 2025 求職中</span>
          </div>
          <h1>
            {PROFILE.displayName}<br />
            <span className="hero-accent">{PROFILE.tagline.split("×")[0]}</span>
            ×{PROFILE.tagline.split("×")[1]}
          </h1>
          <div className="hero-role">
            // {PROFILE.university}　{PROFILE.department}
          </div>
          <p className="hero-desc">{PROFILE.description}</p>
          <div className="hero-btns">
            <a className="btn btn-primary" href="#projects">作品を見る →</a>
            <a
              className="btn btn-outline"
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
          <div className="chips">
            {SKILLS.flatMap(s => s.items).map(item => (
              <span key={item.name} className="chip">{item.name}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="sep" />

      {/* ── About ── */}
      <section id="about" className="sec">
        <div className="sec-eye">// about</div>
        <h2 className="sec-title">About Me</h2>
        <div className="about-grid">
          <div className="about-body">
            <p>
              <strong>{PROFILE.university}</strong>の<strong>{PROFILE.department}</strong>に所属する学生エンジニアです。
              ロボットを「動かす」ための制御・機械設計と、「使いやすくする」ためのソフトウェア開発、その両方を学んでいます。
            </p>
            <p>
              授業でのラズパイ IoT 開発を通じて、センサーからクラウドまで一貫したシステム設計を経験。
              Web アプリ開発にも取り組み、<strong>ハードとソフトを繋ぐエンジニア</strong>を目指しています。
            </p>
            <p>
              今年はハッカソンへ積極的に参加予定。チーム開発・アジャイルな実装力を磨きながら、
              IT 系インターンへの応募を通じて実際のプロダクト開発に携わりたいと考えています。
            </p>
          </div>
          <div className="about-cards">
            {ABOUT_CARDS.map(card => (
              <div key={card.title} className="acard">
                <span className={`abadge${card.variant === "blue" ? " blue" : ""}`}>
                  {card.badge}
                </span>
                <div>
                  <div className="acard-title">{card.title}</div>
                  <div className="acard-sub">{card.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sep" />

      {/* ── Projects ── */}
      <section id="projects" className="sec">
        <div className="sec-eye">// projects</div>
        <h2 className="sec-title">Projects</h2>
        <div className="projs">
          {PROJECTS.map(proj => (
            <ProjectCard key={proj.id} proj={proj} />
          ))}
        </div>
      </section>

      <div className="sep" />

      {/* ── Skills ── */}
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

      {/* ── Contact ── */}
      <section id="contact" className="sec">
        <div className="sec-eye">// contact</div>
        <h2 className="sec-title">Contact</h2>
        <div className="contact-grid">
          <div className="cinfo">
            <h3>気軽にご連絡ください</h3>
            <p>
              インターンのお誘い、ハッカソンでのチーム募集、共同開発など、
              どんなご連絡でも歓迎します。ハッカソン会場でお会いした方もぜひ！
            </p>
            <div className="socials">
              {PROFILE.github && (
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="soc">
                  <span className="soc-badge">GH</span>
                  github.com/arupakaniisan
                </a>
              )}
              {PROFILE.twitter && (
                <a href={PROFILE.twitter} target="_blank" rel="noreferrer" className="soc">
                  <span className="soc-badge">𝕏</span>
                  Twitter / X
                </a>
              )}
              {PROFILE.zenn && (
                <a href={PROFILE.zenn} target="_blank" rel="noreferrer" className="soc">
                  <span className="soc-badge">Z</span>
                  Zenn
                </a>
              )}
              {PROFILE.email && (
                <a href={`mailto:${PROFILE.email}`} className="soc">
                  <span className="soc-badge">@</span>
                  {PROFILE.email}
                </a>
              )}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* ── フッター ── */}
      <footer className="footer">
        <span>© 2025 {PROFILE.displayName}</span>
        <span>Built with React + Vite · Deployed on Vercel</span>
      </footer>
    </>
  );
}
