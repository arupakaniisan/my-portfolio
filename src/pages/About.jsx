import { PROFILE, ABOUT } from "../data.js";
import { Footer } from "../components/Footer.jsx";
import { IconGitHub, IconLinkedIn, IconZenn, IconNote } from "../components/Icons.jsx";

export default function About() {
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
