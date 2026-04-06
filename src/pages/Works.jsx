import { WORKS } from "../data.js";
import { Footer } from "../components/Footer.jsx";

export default function Works() {
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
