/**
 * =============================================
 *  data.js — ここを書き換えるだけで全ページ更新！
 * =============================================
 */

export const PROFILE = {
  name: "arupakani-san",
  displayName: "arupakani-san",
  university: "電気通信大学",
  department: "先端ロボティクス専攻",
  tagline: "Robotics × SW",
  description:
    "ロボティクスとソフトウェアを掛け合わせるエンジニア志望。ハードウェア制御から Web アプリまで、幅広いレイヤーで開発できるのが強みです。",
  // 顔写真を追加する場合: "/avatar.jpg" のようにpublicフォルダに入れてパスを指定
  avatar: null,
  github: "https://github.com/arupakaniisan",
  twitter: null,   // 例: "https://twitter.com/yourhandle"
  zenn: null,      // 例: "https://zenn.dev/yourhandle"
  email: null,     // 例: "your@email.com"
};

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

export const PROJECTS = [
  {
    id: "01",
    title: "ペット監視ロボット",
    description:
      "Raspberry Pi 5 を脳とする IoT ペット監視システム。赤外線センサーで異変を検知するとカメラが自動起動。ロードセルで食事量を計測し、LINE から「餌」と送るだけでサーボモーターが即回転して給餌。Flask + ngrok で外部からの LINE Webhook を安全に受信する。",
    tags: ["Python", "Raspberry Pi 5", "Flask", "LINE API", "ngrok", "lgpio", "OpenCV"],
    // プロジェクト画像を追加する場合: "/projects/pet-robot.jpg" のようにpublicに入れて指定
    image: null,
    codeUrl: null,
    demoUrl: null,
    isHardware: true,
  },
  {
    id: "02",
    title: "Webアプリケーション",
    description:
      "チームで開発した Web アプリケーション。フロントエンドからバックエンドまで一貫して開発に参画。",
    tags: ["React", "Python", "Git"],
    image: null,
    codeUrl: "https://github.com/arupakaniisan",
    demoUrl: null,
    isHardware: false,
  },
  {
    id: "03",
    title: "CAD モデリング",
    description:
      "先端ロボティクス専攻の授業・研究室での CAD 設計経験。機械設計の知識をソフトウェア開発と組み合わせ、ハードとソフトの両面から開発できる。",
    tags: ["CAD", "機械設計", "ロボティクス"],
    image: null,
    codeUrl: null,
    demoUrl: null,
    isHardware: true,
  },
];

export const ABOUT_CARDS = [
  {
    badge: "UEC",
    variant: "green",
    title: "電気通信大学",
    sub: "先端ロボティクス専攻 — ロボット制御・機械設計・プログラミングを専門的に学ぶ",
  },
  {
    badge: "HW",
    variant: "blue",
    title: "ハードウェア × ソフトウェア",
    sub: "CAD設計・ラズパイ制御・センサー実装をコードと組み合わせて開発",
  },
  {
    badge: "ACT",
    variant: "green",
    title: "ハッカソン参加予定",
    sub: "今年積極的に参戦予定。短期間でアイデアを形にする実行力を磨く",
  },
  {
    badge: "IT",
    variant: "blue",
    title: "IT系インターン志望",
    sub: "バックエンド / Web / IoT 系ポジションを中心に探しています",
  },
];
