import { useState } from "react";
import emailjs from "@emailjs/browser";
import { PROFILE } from "../data.js";
import { IconGitHub, IconLinkedIn, IconZenn, IconNote } from "./Icons.jsx";

const CONTACT_TO_EMAIL = "aruni.san.tech@gmail.com";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setError("送信設定が未完了です。VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_TEMPLATE_ID / VITE_EMAILJS_PUBLIC_KEY を設定してください。");
      return;
    }

    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: CONTACT_TO_EMAIL,
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          reply_to: form.email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError("送信に失敗しました。設定値とテンプレートを確認してください。");
    } finally {
      setSending(false);
    }
  };
  if (sent) return (
    <div className="form-sent">
      <div className="form-sent-icon">✓</div>
      <p>{CONTACT_TO_EMAIL} に送信しました。ありがとうございます。</p>
    </div>
  );
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-title">お問い合わせフォーム</div>
      <div className="form-row">
        <label className="form-field">
          <span className="form-label">お名前</span>
          <input placeholder="お名前" value={form.name} onChange={set("name")} required />
        </label>
        <label className="form-field">
          <span className="form-label">メールアドレス</span>
          <input type="email" placeholder="メールアドレス" value={form.email} onChange={set("email")} required />
        </label>
      </div>
      <label className="form-field">
        <span className="form-label">メッセージ</span>
        <textarea placeholder="メッセージ（インターンのお誘い、ハッカソンのチーム募集など）" value={form.message} onChange={set("message")} required />
      </label>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" className="form-btn" disabled={sending}>{sending ? "送信中..." : "送信する →"}</button>
    </form>
  );
}
