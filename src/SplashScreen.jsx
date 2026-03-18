import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PROFILE } from "./data.js";
import styles from "./styles.js";

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

export default function SplashScreen() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [booting, setBooting] = useState(false);
  const [bootLines, setBootLines] = useState([]);
  const [glitchName, setGlitchName] = useState(PROFILE.displayName);
  const canvasRef2 = useRef(null);

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
    if (transitioning) return;
    setTransitioning(true);
    setBooting(true);

    // Linux起動ログのシーケンス
    const bootSequence = [
      { text: 'BIOS v2.4.1  Copyright (C) 2025  arupakani Systems', color: '#888', delay: 0 },
      { text: 'CPU: ARM Cortex-A76 @ 2.4GHz  [OK]', color: '#00e5a0', delay: 80 },
      { text: 'RAM: 8192MB DDR4  [OK]', color: '#00e5a0', delay: 160 },
      { text: '', color: '#444', delay: 220 },
      { text: 'Loading portfolio kernel...', color: '#aaa', delay: 300 },
      { text: '[    0.000000] Linux version 6.1.0-portfolio (arupakani@uec)', color: '#666', delay: 420 },
      { text: '[    0.000012] Command line: BOOT_IMAGE=/portfolio root=/dev/sda1', color: '#555', delay: 500 },
      { text: '[    0.082341] ACPI: Core revision 20221020', color: '#555', delay: 560 },
      { text: '[    0.124897] PCI: Using configuration type 1 for base access', color: '#555', delay: 610 },
      { text: '[    0.201443] clocksource: tsc-early: mask: 0xffffffffffffffff', color: '#555', delay: 650 },
      { text: '[    0.334821] NET: Registered PF_INET6 protocol family', color: '#555', delay: 690 },
      { text: '', color: '#444', delay: 730 },
      { text: '[  OK  ] Started udev Kernel Device Manager.', color: '#00e5a0', delay: 780 },
      { text: '[  OK  ] Started D-Bus System Message Bus.', color: '#00e5a0', delay: 860 },
      { text: '[  OK  ] Reached target Network.', color: '#00e5a0', delay: 940 },
      { text: '[  OK  ] Mounted /proc filesystem.', color: '#00e5a0', delay: 1000 },
      { text: '[  OK  ] Mounted /sys filesystem.', color: '#00e5a0', delay: 1060 },
      { text: '[ WARN ] portfolio-renderer: initializing display pipeline...', color: '#f59e0b', delay: 1140 },
      { text: '[  OK  ] Started Portfolio Web Server on port 443.', color: '#00e5a0', delay: 1260 },
      { text: '[  OK  ] Reached target Graphical Interface.', color: '#00e5a0', delay: 1360 },
      { text: '', color: '#444', delay: 1420 },
      { text: 'Ubuntu 24.04.1 LTS arupakani-portfolio tty1', color: '#eee', delay: 1500 },
      { text: '', color: '#444', delay: 1560 },
      { text: 'arupakani@portfolio login: _', color: '#00e5a0', delay: 1620, blink: true },
      { text: 'arupakani@portfolio login: visitor', color: '#00e5a0', delay: 1900 },
      { text: 'Password: ••••••••', color: '#888', delay: 2100 },
      { text: '', color: '#444', delay: 2260 },
      { text: 'Last login: Thu Mar 19 2026 from hackathon.local', color: '#666', delay: 2320 },
      { text: '', color: '#444', delay: 2380 },
      { text: '$ cd ~/portfolio && npm run start', color: '#00e5a0', delay: 2440 },
      { text: '> arupakani-portfolio@1.0.0 start', color: '#888', delay: 2580 },
      { text: '> Launching...', color: '#aaa', delay: 2660 },
      { text: '', color: '#444', delay: 2720 },
      { text: '✓ Portfolio loaded successfully.', color: '#00e5a0', delay: 2800 },
    ];

    let lines = [];
    bootSequence.forEach(({ text, color, delay, blink }) => {
      setTimeout(() => {
        lines = [...lines, { text, color, blink: blink || false }];
        setBootLines([...lines]);
      }, delay);
    });

    // 最後にグリーンフラッシュで遷移
    // 最後のログ(2800ms) + 3秒待機 = 5800ms で光が広がり始める
    setTimeout(() => setLeaving(true), 5800);
    // 光がゆっくり広がる(1.2s) 後に遷移
    setTimeout(() => navigate('/home'), 7000);
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
      <style>{styles}</style>
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

        {/* トランジション用 canvas（Enter押したとき） */}
        <canvas ref={canvasRef2} style={{
          position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
        }} />

        {/* Linux ブート画面 */}
        {booting && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 15,
            background: '#000',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
            padding: '24px 32px',
            overflow: 'hidden',
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(10px, 1.4vw, 13px)',
            lineHeight: 1.7,
          }}>
            {bootLines.map((line, i) => (
              <div key={i} style={{
                color: line.color,
                whiteSpace: 'pre',
                animation: i === bootLines.length - 1 ? 'fadeUp .15s ease both' : 'none',
              }}>
                {line.text}
                {line.blink && <span style={{ animation: 'blink .8s step-end infinite' }}>█</span>}
              </div>
            ))}
            {/* カーソル点滅 */}
            <div style={{
              width: 8, height: 14, background: '#00e5a0',
              display: 'inline-block', marginTop: 2,
              animation: 'blink 0.8s step-end infinite',
            }} />
          </div>
        )}

        {/* 中央から白い光が広がるトランジション */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 25, pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #e8f4ee 20%, #0b0c0e 70%)',
          opacity: leaving ? 1 : 0,
          transform: leaving ? 'scale(3)' : 'scale(0)',
          transition: leaving ? 'opacity 1.2s ease-out, transform 1.2s cubic-bezier(0.1,0,0.3,1)' : 'none',
          borderRadius: '50%',
        }} />
        {/* 背景を /home と同じ色で覆う（光が広がった後） */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 24, pointerEvents: 'none',
          background: '#0b0c0e',
          opacity: leaving ? 1 : 0,
          transition: leaving ? 'opacity 1.2s ease-out 0.6s' : 'none',
        }} />

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