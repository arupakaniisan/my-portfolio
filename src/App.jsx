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

/* ══════════════════════════════════════════
   スプラッシュ画面（バチバチ電流演出）
══════════════════════════════════════════ */
const splashCSS = `
  @keyframes flicker {
    0%,60%{opacity:1}
    61%{opacity:.85} 62%{opacity:1} 63%{opacity:.9}
    64%,72%{opacity:1}
    73%{opacity:.4} 74%{opacity:.95} 75%{opacity:.3} 76%{opacity:.9}
    77%,88%{opacity:1}
    89%{opacity:.7} 90%{opacity:1} 91%{opacity:.5} 92%{opacity:1}
    93%{opacity:.08} 94%{opacity:.85} 95%{opacity:.15} 96%{opacity:.9}
    97%,100%{opacity:1}
  }
  @keyframes flicker2 {
    0%,55%{opacity:1}
    56%{opacity:.6} 57%{opacity:1}
    58%,78%{opacity:1}
    79%{opacity:.2} 80%{opacity:.8} 81%{opacity:.05} 82%{opacity:.7} 83%{opacity:1}
    84%,100%{opacity:1}
  }
  @keyframes glitch {
    0%,100%{transform:translate(0,0) skewX(0deg)}
    91%{transform:translate(0,0) skewX(0deg)}
    92%{transform:translate(-4px,0) skewX(-4deg)}
    93%{transform:translate(4px,0) skewX(3deg)}
    94%{transform:translate(-2px,1px) skewX(1deg)}
    95%{transform:translate(0,0) skewX(0deg)}
    97%{transform:translate(3px,-1px) skewX(-2deg)}
    98%{transform:translate(-1px,0) skewX(0deg)}
  }
  @keyframes glitchR {
    0%,89%,100%{clip-path:inset(100% 0 100% 0); transform:translate(0,0);}
    90%{clip-path:inset(10% 0 60% 0); transform:translate(-6px,0); color:#ff003c; opacity:.7;}
    91%{clip-path:inset(55% 0 5% 0);  transform:translate(6px,0);  color:#00f7ff; opacity:.6;}
    92%{clip-path:inset(30% 0 40% 0); transform:translate(-3px,0); color:#fff;    opacity:.8;}
    93%{clip-path:inset(100% 0 100% 0); transform:translate(0,0);}
  }
  @keyframes shake {
    0%,100%{transform:translate(0,0)}
    10%{transform:translate(-3px,1px)}
    20%{transform:translate(3px,-2px)}
    30%{transform:translate(-2px,3px)}
    40%{transform:translate(2px,-1px)}
    50%{transform:translate(-1px,2px)}
    60%{transform:translate(3px,1px)}
    70%{transform:translate(-2px,-1px)}
    80%{transform:translate(1px,3px)}
    90%{transform:translate(-1px,-2px)}
  }
  @keyframes arcFlash {
    0%,100%{opacity:0; transform:scaleX(1)}
    50%{opacity:1; transform:scaleX(1.04)}
  }
  @keyframes spark {
    0%  {opacity:1; transform:translate(0,0) scale(1);}
    100%{opacity:0; transform:translate(var(--sx),var(--sy)) scale(0);}
  }
  @keyframes scanBad {
    0%  {transform:translateY(-100%); opacity:.6}
    100%{transform:translateY(100vh); opacity:.2}
  }
  @keyframes chargeUp {
    0%  {box-shadow:0 0 8px rgba(0,229,160,.3);}
    50% {box-shadow:0 0 40px rgba(0,229,160,.9),0 0 80px rgba(0,229,160,.4),0 0 120px rgba(0,229,160,.2);}
    100%{box-shadow:0 0 8px rgba(0,229,160,.3);}
  }
  @keyframes borderArc {
    0%,100%{border-color:rgba(0,229,160,.5); box-shadow:0 0 12px rgba(0,229,160,.3);}
    25%{border-color:rgba(255,255,255,.9); box-shadow:0 0 32px rgba(255,255,255,.6),0 0 64px rgba(0,229,160,.4);}
    50%{border-color:rgba(0,229,160,.8); box-shadow:0 0 20px rgba(0,229,160,.5);}
    75%{border-color:rgba(120,255,200,.9); box-shadow:0 0 28px rgba(120,255,200,.7),0 0 56px rgba(0,229,160,.3);}
  }
  @keyframes noiseShift {
    0%{background-position:0 0}
    100%{background-position:0 100px}
  }
  @keyframes btnZap {
    0%,100%{box-shadow:0 0 10px rgba(0,229,160,.3), inset 0 0 8px rgba(0,229,160,.1);}
    30%{box-shadow:0 0 40px rgba(0,229,160,.9),0 0 80px rgba(0,229,160,.4),inset 0 0 20px rgba(0,229,160,.3);}
    31%{box-shadow:0 0 8px rgba(255,255,255,.8),0 0 40px rgba(0,229,160,.6),inset 0 0 10px rgba(255,255,255,.2);}
    32%{box-shadow:0 0 40px rgba(0,229,160,.9),inset 0 0 20px rgba(0,229,160,.2);}
    70%{box-shadow:0 0 60px rgba(0,229,160,1),0 0 100px rgba(0,229,160,.5),0 0 160px rgba(0,229,160,.2),inset 0 0 30px rgba(0,229,160,.4);}
    71%{box-shadow:0 0 10px rgba(255,255,255,.9),inset 0 0 10px rgba(255,255,255,.3);}
    72%{box-shadow:0 0 60px rgba(0,229,160,1),inset 0 0 20px rgba(0,229,160,.3);}
  }
  @keyframes whiteBurst {
    0%,100%{opacity:0}
    50%{opacity:1}
  }
  .zap-btn:hover {
    background: #00e5a0 !important;
    color: #0b0c0e !important;
    animation: none !important;
    box-shadow: 0 0 40px rgba(0,229,160,.9), 0 0 80px rgba(0,229,160,.4) !important;
    transform: scale(1.04) !important;
  }
`;

// canvasでリアルタイム稲妻を描くコンポーネント
function LightningCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let frameCount = 0;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // 横方向の放電アークのみ
    function drawArc() {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // 1〜2本の横アーク
      const count = 1 + (Math.random() > .6 ? 1 : 0);
      for (let i = 0; i < count; i++) {
        const sy = H * (.15 + Math.random() * .7);
        const alpha = .25 + Math.random() * .5;
        // メインライン
        ctx.beginPath();
        ctx.moveTo(0, sy);
        let cx = 0;
        while (cx < W) {
          cx += 6 + Math.random() * 24;
          ctx.lineTo(cx, sy + (Math.random() - .5) * 48);
        }
        ctx.strokeStyle = '#00e5a0';
        ctx.lineWidth = .8 + Math.random() * .8;
        ctx.shadowColor = '#00e5a0';
        ctx.shadowBlur = 18;
        ctx.globalAlpha = alpha;
        ctx.stroke();
        // グロー（太め・薄め）
        ctx.beginPath();
        ctx.moveTo(0, sy);
        cx = 0;
        while (cx < W) {
          cx += 8 + Math.random() * 28;
          ctx.lineTo(cx, sy + (Math.random() - .5) * 30);
        }
        ctx.lineWidth = 3;
        ctx.globalAlpha = alpha * .15;
        ctx.stroke();
      }
    }

    function loop() {
      frameCount++;
      // 廃病院の電灯：長い沈黙のあとにぱっと放電
      const interval = 40 + Math.floor(Math.random() * 80);
      if (frameCount % interval === 0) {
        drawArc();
        const onTime = 40 + Math.random() * 120;
        setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), onTime);
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
    }} />
  );
}

// 白いフラッシュ
function WhiteFlash() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const fire = () => {
      setOn(true);
      setTimeout(() => setOn(false), 40 + Math.random() * 200);
    };
    const rand = () => setTimeout(() => { fire(); rand(); }, 2000 + Math.random() * 5000);
    const t = rand();
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
      background: 'rgba(200,255,230,.04)',
      opacity: on ? 1 : 0, transition: 'opacity .04s',
    }} />
  );
}

function SplashScreen({ onEnter }) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [glitchName, setGlitchName] = useState(PROFILE.displayName);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // テキストグリッチ（文字化け）
  useEffect(() => {
    const chars = 'アイウエオカキクケコサシスセソ░▒▓█▄▌▐▀01アイウABCDEF#@!%';
    const orig = PROFILE.displayName;
    let frame = 0;
    const glitch = () => {
      frame++;
      if (frame % 60 < 4) {
        const arr = orig.split('');
        const numGlitch = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < numGlitch; i++) {
          const idx = Math.floor(Math.random() * arr.length);
          arr[idx] = chars[Math.floor(Math.random() * chars.length)];
        }
        setGlitchName(arr.join(''));
        setTimeout(() => setGlitchName(orig), 80);
      }
    };
    const id = setInterval(glitch, 50);
    return () => clearInterval(id);
  }, []);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(onEnter, 800);
  };

  const socialLinks = [
    { url: PROFILE.github,   label: 'GitHub' },
    { url: PROFILE.linkedin, label: 'LinkedIn' },
    { url: PROFILE.zenn,     label: 'Zenn' },
    { url: PROFILE.note,     label: 'note' },
    { url: PROFILE.twitter,  label: 'X' },
  ].filter(l => l.url);

  return (
    <>
      <style>{splashCSS}</style>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#020304',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        transition: 'opacity .8s ease',
        opacity: leaving ? 0 : visible ? 1 : 0,
        pointerEvents: leaving ? 'none' : 'auto',
        animation: visible ? 'flicker 11s linear infinite' : 'none',
      }}>

        {/* リアルタイム稲妻 canvas */}
        <LightningCanvas />

        {/* 白フラッシュ */}
        <WhiteFlash />

        {/* CRTスキャンライン */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.3) 2px, rgba(0,0,0,.3) 4px)',
        }} />

        {/* 高速スキャンライン */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 3, zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(90deg,transparent,rgba(0,229,160,.6),rgba(255,255,255,.8),rgba(0,229,160,.6),transparent)',
          animation: 'scanBad 1.8s linear infinite',
          filter: 'blur(.5px)',
        }} />
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 2, zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(90deg,transparent,rgba(0,229,160,.3),rgba(0,229,160,.3),transparent)',
          animation: 'scanBad 2.9s linear infinite .7s',
        }} />

        {/* グリッド（ノイズで震える） */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(0,229,160,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,160,.07) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,#000 20%,transparent 100%)',
          animation: 'none',
        }} />

        {/* 四隅 電流コーナー */}
        {[
          { top:16,left:16,   borderTop:'2px solid',borderLeft:'2px solid' },
          { top:16,right:16,  borderTop:'2px solid',borderRight:'2px solid' },
          { bottom:16,left:16,  borderBottom:'2px solid',borderLeft:'2px solid' },
          { bottom:16,right:16, borderBottom:'2px solid',borderRight:'2px solid' },
        ].map((s,i)=>(
          <div key={i} style={{
            position:'absolute',...s,
            width:36,height:36,
            borderColor:'rgba(0,229,160,.9)',
            boxShadow:'0 0 12px rgba(0,229,160,.6)',
            zIndex:4,pointerEvents:'none',
            boxShadow:'0 0 10px rgba(0,229,160,.35)',
          }}/>
        ))}

        {/* 中央コンテンツ */}
        <div style={{
          position: 'relative', zIndex: 5,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center', padding: '0 24px',
          transform: leaving ? 'translateY(-16px) scale(.97)' : visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(.97)',
          transition: 'transform .8s cubic-bezier(.16,1,.3,1), opacity .8s ease',
          opacity: leaving ? 0 : visible ? 1 : 0,
          
        }}>

          {/* アバター */}
          <div style={{
            width:96, height:96, borderRadius:'50%',
            background:'rgba(0,229,160,.06)',
            border:'2px solid rgba(0,229,160,.9)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:38, fontFamily:"'Space Mono',monospace", fontWeight:700,
            color:'#00e5a0', marginBottom:28, overflow:'hidden',
            boxShadow:'0 0 16px rgba(0,229,160,.35), 0 0 40px rgba(0,229,160,.12)',
          }}>
            {PROFILE.avatar
              ? <img src={PROFILE.avatar} alt={PROFILE.displayName} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
              : PROFILE.displayName[0].toUpperCase()
            }
          </div>

          {/* 名前（グリッチ） */}
          <div style={{ position:'relative', marginBottom:10 }}>
            <h1 style={{
              fontFamily:"'Space Mono',monospace",
              fontSize:'clamp(22px,5vw,38px)',
              fontWeight:700, letterSpacing:'-1px',
              color:'#eceef2',
              textShadow:'0 0 8px rgba(0,229,160,.5), 2px 0 rgba(255,0,60,.3), -2px 0 rgba(0,247,255,.3)',
              animation:'flicker2 5s linear infinite',
            }}>{glitchName}</h1>
            {/* RGBずれ（グリッチ複製） */}
            <h1 aria-hidden style={{
              position:'absolute', inset:0,
              fontFamily:"'Space Mono',monospace",
              fontSize:'clamp(22px,5vw,38px)',
              fontWeight:700, letterSpacing:'-1px',
              color:'transparent',
              animation:'glitchR 4s linear infinite',
            }}>{PROFILE.displayName}</h1>
          </div>

          {/* 大学・専攻 */}
          <p style={{
            fontFamily:"'Space Mono',monospace", fontSize:12,
            color:'#4a7a6a', letterSpacing:'1px', marginBottom:32, lineHeight:1.8,
            textShadow:'0 0 6px rgba(0,229,160,.3)',
            animation:'flicker 12s linear infinite 2s',
          }}>
            {PROFILE.university}<br/>{PROFILE.department}
          </p>

          {/* SNSボタン */}
          {socialLinks.length > 0 && (
            <div style={{display:'flex',gap:8,marginBottom:40,flexWrap:'wrap',justifyContent:'center'}}>
              {socialLinks.map(l=>(
                <a key={l.label} href={l.url} target="_blank" rel="noreferrer"
                  onClick={e=>e.stopPropagation()}
                  style={{
                    fontFamily:"'Space Mono',monospace", fontSize:11,
                    color:'#4a5568', padding:'6px 14px',
                    border:'1px solid #2a3040', borderRadius:3,
                    transition:'all .15s',
                    textShadow:'none',
                  }}
                  onMouseEnter={e=>{
                    e.currentTarget.style.borderColor='#00e5a0';
                    e.currentTarget.style.color='#00e5a0';
                    e.currentTarget.style.boxShadow='0 0 16px rgba(0,229,160,.6), inset 0 0 8px rgba(0,229,160,.1)';
                    e.currentTarget.style.textShadow='0 0 8px rgba(0,229,160,.8)';
                  }}
                  onMouseLeave={e=>{
                    e.currentTarget.style.borderColor='#2a3040';
                    e.currentTarget.style.color='#4a5568';
                    e.currentTarget.style.boxShadow='none';
                    e.currentTarget.style.textShadow='none';
                  }}
                >{l.label}</a>
              ))}
            </div>
          )}

          {/* 入るボタン（バチバチ） */}
          <button
            className="zap-btn"
            onClick={handleEnter}
            style={{
              display:'flex', alignItems:'center', gap:10,
              background:'transparent',
              border:'1px solid rgba(0,229,160,.9)',
              color:'#00e5a0', borderRadius:3,
              padding:'13px 32px',
              fontSize:14, fontWeight:600,
              fontFamily:"'Space Grotesk',sans-serif",
              cursor:'pointer', letterSpacing:'2px',
              textTransform:'uppercase',
              textShadow:'0 0 8px rgba(0,229,160,.8)',
              animation:'btnZap 2s ease-in-out infinite',
              transition:'all .1s',
            }}
          >
            Enter
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

          {/* 電流警告テキスト */}
          <p style={{
            fontFamily:"'Space Mono',monospace", fontSize:9,
            color:'rgba(0,229,160,.3)', marginTop:24, letterSpacing:'3px',
            textTransform:'uppercase',
            animation:'flicker 3s linear infinite 1s',
          }}>
            ⚡ WARNING: HIGH VOLTAGE ⚡
          </p>
        </div>
      </div>
    </>
  );
}
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
    { to: "/",        label: "Home" },
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
function ArchDiagram() {
  const box = (label, cls = "") => (
    <span style={{
      background: cls === "g" ? "rgba(0,229,160,.1)" : cls === "b" ? "rgba(59,130,246,.1)" : "var(--surface)",
      border: `1px solid ${cls === "g" ? "rgba(0,229,160,.35)" : cls === "b" ? "rgba(59,130,246,.35)" : "var(--border2)"}`,
      color: cls === "g" ? "var(--accent)" : cls === "b" ? "var(--accent2)" : "var(--muted2)",
      borderRadius: 5, padding: "4px 10px", fontFamily: "var(--mono)", fontSize: 10, whiteSpace: "nowrap",
    }}>{label}</span>
  );
  return (
    <div style={{ width: "100%", padding: 24, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)", letterSpacing: 1.5, marginBottom: 4 }}>SYSTEM ARCHITECTURE</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        {box("Hardware","g")}<span style={{ color: "var(--muted)", fontSize: 11 }}>→</span>
        {box("RPi 5","b")}<span style={{ color: "var(--muted)", fontSize: 11 }}>→</span>
        {box("ngrok")}<span style={{ color: "var(--muted)", fontSize: 11 }}>→</span>
        {box("LINE","g")}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {["赤外線センサ","ロードセル","カメラ","サーボ"].map(s => box(s))}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {["lgpio","Flask","OpenCV","Python"].map(s => box(s,"b"))}
      </div>
      <div style={{ marginTop: 6, padding: "10px 12px", background: "var(--accent-dim)", borderRadius: 5, border: "1px solid rgba(0,229,160,.15)", fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted2)", lineHeight: 1.8 }}>
        <span style={{ color: "var(--accent)", display: "block", marginBottom: 2 }}>$ フロー</span>
        LINE:「餌」→ Webhook → Flask → lgpio → サーボ → 給餌
      </div>
    </div>
  );
}

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
                {i === 0 ? <ArchDiagram /> : w.image ? <img src={w.image} alt={w.title} /> : (
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
                {i === 0 ? (
                  <div style={{ width: "100%", padding: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--muted)", letterSpacing: 1.5 }}>SYSTEM ARCHITECTURE</div>
                    {[
                      ["Hardware","g"], ["RPi 5","b"], ["ngrok",""], ["LINE","g"]
                    ].reduce((acc, [label, cls], idx, arr) => {
                      const box = <span key={label} style={{
                        background: cls==="g"?"rgba(0,229,160,.1)":cls==="b"?"rgba(59,130,246,.1)":"var(--surface)",
                        border:`1px solid ${cls==="g"?"rgba(0,229,160,.35)":cls==="b"?"rgba(59,130,246,.35)":"var(--border2)"}`,
                        color: cls==="g"?"var(--accent)":cls==="b"?"var(--accent2)":"var(--muted2)",
                        borderRadius:4, padding:"3px 8px", fontFamily:"var(--mono)", fontSize:10, whiteSpace:"nowrap",
                      }}>{label}</span>;
                      acc.push(box);
                      if (idx < arr.length - 1) acc.push(<span key={"arr"+idx} style={{ color:"var(--muted)", fontSize:10 }}>→</span>);
                      return acc;
                    }, []).reduce((row, el, idx) => {
                      return idx === 0 ? [<div key="row" style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>{[el]}</div>] : (React => row)(null);
                    }, [])}
                    <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                      {[["Hardware","g"],["→",""],["RPi 5","b"],["→",""],["ngrok",""],["→",""],["LINE","g"]].map(([l,c],i)=>(
                        l==="→"
                          ? <span key={i} style={{color:"var(--muted)",fontSize:10}}>→</span>
                          : <span key={i} style={{background:c==="g"?"rgba(0,229,160,.1)":c==="b"?"rgba(59,130,246,.1)":"var(--surface)",border:`1px solid ${c==="g"?"rgba(0,229,160,.35)":c==="b"?"rgba(59,130,246,.35)":"var(--border2)"}`,color:c==="g"?"var(--accent)":c==="b"?"var(--accent2)":"var(--muted2)",borderRadius:4,padding:"3px 8px",fontFamily:"var(--mono)",fontSize:10}}>{l}</span>
                      ))}
                    </div>
                    <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                      {["lgpio","Flask","OpenCV","Python"].map(s=>(
                        <span key={s} style={{background:"rgba(59,130,246,.1)",border:"1px solid rgba(59,130,246,.35)",color:"var(--accent2)",borderRadius:4,padding:"2px 7px",fontFamily:"var(--mono)",fontSize:9}}>{s}</span>
                      ))}
                    </div>
                    <div style={{ padding:"8px 10px", background:"var(--accent-dim)", borderRadius:4, border:"1px solid rgba(0,229,160,.15)", fontFamily:"var(--mono)", fontSize:9, color:"var(--muted2)", lineHeight:1.8 }}>
                      <span style={{ color:"var(--accent)" }}>$ フロー: </span>
                      「餌」→ Webhook → Flask → lgpio → 給餌
                    </div>
                  </div>
                ) : w.image ? (
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
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return (
      <>
        <style>{styles}</style>
        <SplashScreen onEnter={() => setEntered(true)} />
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/"        element={<HomePage />} />
          <Route path="/about"   element={<AboutPage />} />
          <Route path="/works"   element={<WorksPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
