import { useState } from "react";
import { PROFILE } from "../data.js";
import { IconGitHub, IconLinkedIn, IconZenn, IconNote } from "./Icons.jsx";

export function SnsBar() {
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

export function ContactForm() {
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
