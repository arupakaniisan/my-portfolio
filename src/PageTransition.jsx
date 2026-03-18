import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/* ══════════════════════════════════════════
   ページ遷移エフェクト
   - 横スライス（グリッチ風スキャン）で画面を切り替え
   - ページ名を一瞬フラッシュ表示
   - 終了後にコンテンツがフェードイン
══════════════════════════════════════════ */

const PAGE_LABELS = {
  "/home":    "HOME",
  "/about":   "ABOUT",
  "/works":   "WORKS",
  "/history": "HISTORY",
};

const transCSS = `
  @keyframes pt-scanDown {
    0%   { transform: scaleY(0); transform-origin: top; }
    50%  { transform: scaleY(1); transform-origin: top; }
    51%  { transform: scaleY(1); transform-origin: bottom; }
    100% { transform: scaleY(0); transform-origin: bottom; }
  }
  @keyframes pt-scanDown2 {
    0%,10%   { transform: scaleY(0); transform-origin: top; }
    55%  { transform: scaleY(1); transform-origin: top; }
    56%  { transform: scaleY(1); transform-origin: bottom; }
    100% { transform: scaleY(0); transform-origin: bottom; }
  }
  @keyframes pt-label {
    0%   { opacity: 0; letter-spacing: 12px; }
    30%  { opacity: 1; letter-spacing: 6px; }
    70%  { opacity: 1; letter-spacing: 6px; }
    100% { opacity: 0; letter-spacing: 16px; }
  }
  @keyframes pt-glitch1 {
    0%,100% { clip-path: inset(0 0 95% 0); transform: translate(-4px, 0); }
    25%     { clip-path: inset(20% 0 60% 0); transform: translate(4px, 0); }
    50%     { clip-path: inset(50% 0 30% 0); transform: translate(-2px, 0); }
    75%     { clip-path: inset(80% 0 5% 0);  transform: translate(3px, 0); }
  }
  @keyframes pt-glitch2 {
    0%,100% { clip-path: inset(5% 0 80% 0);  transform: translate(4px, 0); }
    25%     { clip-path: inset(40% 0 40% 0);  transform: translate(-4px, 0); }
    50%     { clip-path: inset(70% 0 10% 0);  transform: translate(2px, 0); }
    75%     { clip-path: inset(10% 0 70% 0);  transform: translate(-3px, 0); }
  }
  @keyframes pt-fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pt-lineH {
    0%   { transform: scaleX(0); transform-origin: left; opacity: 1; }
    60%  { transform: scaleX(1); transform-origin: left; opacity: 1; }
    61%  { transform: scaleX(1); transform-origin: right; }
    100% { transform: scaleX(0); transform-origin: right; opacity: .3; }
  }
  .pt-content-enter {
    animation: pt-fadeIn .45s cubic-bezier(.16,1,.3,1) both;
  }
`;

export default function PageTransition({ children }) {
  const location = useLocation();
  const [phase, setPhase] = useState("idle"); // idle | in | out
  const [displayChildren, setDisplayChildren] = useState(children);
  const [label, setLabel] = useState("");
  const prevPath = useRef(location.pathname);
  const timerRef = useRef(null);

  useEffect(() => {
    if (location.pathname === prevPath.current) return;
    prevPath.current = location.pathname;

    const newLabel = PAGE_LABELS[location.pathname] || "";
    setLabel(newLabel);

    // フェーズ: in（オーバーレイ表示）→ コンテンツ更新 → out（オーバーレイ消える）
    setPhase("in");
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDisplayChildren(children);
      setPhase("out");
      timerRef.current = setTimeout(() => {
        setPhase("idle");
      }, 400);
    }, 420);

    return () => clearTimeout(timerRef.current);
  }, [location.pathname, children]);

  useEffect(() => {
    setDisplayChildren(children);
  }, []);

  const isActive = phase === "in" || phase === "out";

  return (
    <>
      <style>{transCSS}</style>

      {/* コンテンツ */}
      <div
        key={location.pathname}
        className={phase === "out" ? "pt-content-enter" : ""}
      >
        {displayChildren}
      </div>

      {/* オーバーレイ */}
      {isActive && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9000,
          pointerEvents: "none", overflow: "hidden",
        }}>
          {/* メインスキャン（緑） */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, #020608 0%, #051a12 40%, #020608 100%)",
            animation: "pt-scanDown .85s cubic-bezier(.76,0,.24,1) both",
          }} />

          {/* グリッドオーバーレイ */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(0,229,160,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,160,.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            animation: "pt-scanDown .85s cubic-bezier(.76,0,.24,1) both",
          }} />

          {/* 横ライン上部 */}
          <div style={{
            position: "absolute", top: "49%", left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, #00e5a0, #fff, #00e5a0, transparent)",
            boxShadow: "0 0 12px #00e5a0, 0 0 32px rgba(0,229,160,.5)",
            animation: "pt-lineH .85s cubic-bezier(.76,0,.24,1) both",
          }} />
          <div style={{
            position: "absolute", top: "51%", left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(0,229,160,.4), transparent)",
            animation: "pt-lineH .85s cubic-bezier(.76,0,.24,1) .05s both",
          }} />

          {/* ページ名ラベル */}
          {label && (
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: 12,
            }}>
              {/* メインテキスト */}
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(28px, 6vw, 56px)",
                fontWeight: 700,
                color: "#00e5a0",
                letterSpacing: "6px",
                textTransform: "uppercase",
                textShadow: "0 0 12px rgba(0,229,160,.9), 0 0 40px rgba(0,229,160,.5)",
                animation: "pt-label .85s ease both",
              }}>
                {label}
              </div>

              {/* グリッチ複製1（赤） */}
              <div aria-hidden style={{
                position: "absolute",
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(28px, 6vw, 56px)",
                fontWeight: 700,
                color: "#ff003c",
                letterSpacing: "6px",
                opacity: .5,
                animation: "pt-glitch1 .15s linear infinite, pt-label .85s ease both",
              }}>
                {label}
              </div>

              {/* グリッチ複製2（青） */}
              <div aria-hidden style={{
                position: "absolute",
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(28px, 6vw, 56px)",
                fontWeight: 700,
                color: "#00f7ff",
                letterSpacing: "6px",
                opacity: .4,
                animation: "pt-glitch2 .15s linear infinite, pt-label .85s ease both",
              }}>
                {label}
              </div>

              {/* スラッシュ装飾 */}
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 13,
                color: "rgba(0,229,160,.5)",
                letterSpacing: "4px",
                animation: "pt-label .85s ease .05s both",
              }}>
                // loading
              </div>
            </div>
          )}

          {/* ノイズスライス（ランダムな横線） */}
          {[15, 32, 48, 67, 83].map((top, i) => (
            <div key={i} style={{
              position: "absolute",
              top: `${top}%`,
              left: `${i % 2 === 0 ? 0 : "auto"}`,
              right: `${i % 2 === 1 ? 0 : "auto"}`,
              width: `${40 + i * 12}%`,
              height: "1px",
              background: `rgba(0,229,160,${0.1 + i * 0.04})`,
              animation: `pt-lineH .6s ease ${i * 0.04}s both`,
            }} />
          ))}
        </div>
      )}
    </>
  );
}
