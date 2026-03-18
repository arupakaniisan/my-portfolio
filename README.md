# arupakani-san Portfolio

電気通信大学 先端ロボティクス専攻のポートフォリオサイト

## セットアップ

```bash
npm install
npm run dev
```

ブラウザで http://localhost:5173 を開く

## ビルド & デプロイ

```bash
npm run build
```

Vercel に GitHub リポジトリを連携すれば自動でデプロイされます。

---

## ページ構成

| URL | 内容 |
|---|---|
| `/` | メインポートフォリオ（Hero / About / Projects / Skills / Contact）|
| `/about` | プロフィール・資格・趣味・リンク |
| `/works` | 全作品一覧 |
| `/history` | 経歴年表 |

入口に**スプラッシュ画面**があり、ボタンを押すとメインサイトへ遷移します。

---

## カスタマイズ方法

### `src/data.js` を書き換えるだけで全ページ更新！

#### プロフィール（PROFILE）
```js
export const PROFILE = {
  displayName: "arupakani-san",
  github:   "https://github.com/arupakaniisan",
  linkedin: null,   // URLを入れると表示される
  zenn:     null,
  note:     null,
  twitter:  null,
  email:    null,
};
```

#### About ページ（ABOUT）
```js
export const ABOUT = {
  profile: [
    { label: "名前", value: "本名を入力" },
    ...
  ],
  qualifications: [
    { title: "資格名", date: "2024-xx" },
  ],
  hobbies: ["プログラミング", "ロボット製作", ...],
};
```

#### 作品（WORKS）
```js
export const WORKS = [
  {
    title: "作品タイトル",
    description: "説明文",
    image: "/works/image.jpg",  // publicフォルダに入れてパス指定
    tags: ["Python", "React"],
    codeUrl: "https://github.com/...",
    demoUrl: "https://...",
  },
];
```

#### 経歴（HISTORY）
```js
export const HISTORY = [
  {
    date: "2025年4月",
    title: "〇〇に入学",
    description: "説明文",
    type: "education",  // "life" | "education" | "dev" | "hackathon" | "work"
  },
];
```

---

## フォルダ構成

```
portfolio/
├── public/
│   ├── favicon.svg
│   └── works/         # 作品画像を入れる（自分で作成）
├── src/
│   ├── main.jsx       # エントリーポイント（変更不要）
│   ├── index.css      # グローバルリセット（変更不要）
│   ├── data.js        # ★ コンテンツはここを書き換える
│   ├── styles.js      # CSS（デザイン変更したい場合）
│   └── App.jsx        # 全ページのコンポーネント
├── index.html
├── vite.config.js
└── package.json
```

## 技術スタック

- React 18
- React Router v6
- Vite 5
- Space Grotesk / Space Mono (Google Fonts)
- Vercel（デプロイ）
