import { HISTORY } from "../data.js";
import { Footer } from "../components/Footer.jsx";

export default function History() {
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
