/**
 * =============================================
 *  data.js — ここを書き換えるだけで全ページ更新！
 * =============================================
 */

/* ── プロフィール ── */
export const PROFILE = {
  displayName: "arupakani-san",
  university: "電気通信大学",
  department: "先端ロボティクス専攻",
  tagline: "Robotics × SW",
  description: "ロボティクスとソフトウェアを掛け合わせるエンジニア志望。ハードウェア制御から Web アプリまで、幅広いレイヤーで開発できるのが強みです。",
  avatar: null,        // 例: "/avatar.jpg"
  github:   "https://github.com/arupakaniisan",
  linkedin: null,      // 例: "https://linkedin.com/in/yourhandle"
  zenn:     null,      // 例: "https://zenn.dev/yourhandle"
  note:     null,      // 例: "https://note.com/yourhandle"
  twitter:  null,      // 例: "https://twitter.com/yourhandle"
  email:    null,      // 例: "your@email.com"
};

/* ── About ページ ── */
export const ABOUT = {
  // プロフィール詳細
  profile: [
    { label: "名前",  value: "（本名を入力してください）" },
    { label: "所属",  value: "電気通信大学 先端ロボティクス専攻" },
    { label: "学年",  value: "〇年生" },
    { label: "居住",  value: "東京都" },
  ],
  // 資格・受賞
  qualifications: [
    { title: "基本情報技術者試験 合格",    date: "2024-xx" },
    // { title: "〇〇資格",                date: "2023-xx" },
    // ← 追加・削除してください
  ],
  // 趣味
  hobbies: ["プログラミング", "ロボット製作", "ランニング", "CAD設計"],
};

/* ── スキル ── */
export const SKILLS = [
  {
    category: "Software",
    items: [
      { name: "Python",  level: "expert" },
      { name: "C++",     level: "expert" },
      { name: "Ruby",    level: "learning" },
      { name: "React",   level: "learning" },
    ],
  },
  {
    category: "Hardware",
    items: [
      { name: "Raspberry Pi 5", level: "expert" },
      { name: "CAD設計",        level: "expert" },
      { name: "センサー制御",    level: "expert" },
      { name: "サーボモーター",  level: "learning" },
    ],
  },
  {
    category: "Backend & Infra",
    items: [
      { name: "Flask",      level: "expert" },
      { name: "LINE API",   level: "expert" },
      { name: "ngrok",      level: "learning" },
      { name: "Git/GitHub", level: "expert" },
    ],
  },
];

/* ── Works ページ ── */
export const WORKS = [
  {
    title: "ペット監視ロボット",
    description: "Raspberry Pi 5 を脳とする IoT ペット監視システム。赤外線センサーで異変を検知するとカメラが自動起動。LINE から「餌」と送ると即座に給餌する。Flask + ngrok で外部からの LINE Webhook を安全に受信。",
    image: null,         // 例: "/works/pet-robot.jpg"
    tags: ["Python", "Raspberry Pi 5", "Flask", "LINE API", "ngrok", "lgpio", "OpenCV"],
    codeUrl: null,
    demoUrl: null,
  },
  {
    title: "Webアプリケーション",
    description: "チームで開発した Web アプリケーション。フロントエンドからバックエンドまで一貫して開発に参画。",
    image: null,
    tags: ["React", "Python", "Git"],
    codeUrl: "https://github.com/arupakaniisan",
    demoUrl: null,
  },
  {
    title: "CAD モデリング",
    description: "先端ロボティクス専攻の授業・研究室での CAD 設計。機械設計の知識をソフトウェアと組み合わせ、ハードとソフトの両面から開発できる。",
    image: null,
    tags: ["CAD", "機械設計", "ロボティクス"],
    codeUrl: null,
    demoUrl: null,
  },
  // ← 作品を追加する場合はここにコピーして追加
];

/* ── History ページ ── */
export const HISTORY = [
  {
    date: "2005年",
    title: "生誕",
    description: "",
    type: "life",
  },
  {
    date: "2023年4月",
    title: "電気通信大学 入学",
    description: "先端ロボティクス専攻に入学。ロボット制御・機械設計・プログラミングを専門的に学び始める。",
    type: "education",
  },
  {
    date: "2024年",
    title: "ラズパイ IoT 開発",
    description: "授業でペット監視ロボットを開発。センサーから LINE 連携まで一貫したシステムを設計・実装。",
    type: "dev",
  },
  {
    date: "2025年（予定）",
    title: "ハッカソン参加",
    description: "IT系ハッカソンへ積極的に参加予定。チーム開発の経験を積む。",
    type: "hackathon",
  },
  // ← 経歴を追加する場合はここにコピーして追加
  // type: "life" | "education" | "dev" | "hackathon" | "work"
];
