import { PROFILE } from "../data.js";

export function Footer() {
  return (
    <footer className="footer">
      <span>© 2025 {PROFILE.displayName}</span>
      <span>Built with React + Vite · Deployed on Vercel</span>
    </footer>
  );
}
