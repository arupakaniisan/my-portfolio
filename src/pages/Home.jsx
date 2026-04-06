import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { PROFILE, SKILLS, WORKS } from "../data.js";
import { Footer } from "../components/Footer.jsx";
import { SnsBar, ContactForm } from "../components/common.jsx";
import { IconGitHub, IconZenn, IconNote } from "../components/Icons.jsx";

export default function Home() {
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
