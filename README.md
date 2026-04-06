# arupakani-san ポートフォリオ — 完全ガイド

> このガイドはプログラミングの知識がなくても読めるように書かれています。
> コードを「直接書き換える」必要はなく、決まったファイルの決まった場所を編集するだけです。

---

## 目次

1. [最初にやること（初回セットアップ）](#1-最初にやること)
2. [情報を更新する（一番よく使う）](#2-情報を更新する)
3. [作品（Works）を追加する](#3-作品worksを追加する)
4. [経歴（History）を追加する](#4-経歴historyを追加する)
5. [About ページを更新する](#5-aboutページを更新する)
6. [写真・画像を追加する](#6-写真画像を追加する)
7. [SNS・リンクを追加する](#7-snsリンクを追加する)
8. [新しいページを追加する（上級）](#8-新しいページを追加する上級)
9. [Vercel にデプロイする（公開する）](#9-vercel-にデプロイする)
10. [お名前.com でドメインを設定する](#10-お名前comでドメインを設定する)
11. [コンタクトフォームを動くようにする](#11-コンタクトフォームを動くようにする)
12. [よくあるトラブル](#12-よくあるトラブル)
13. [ファイル構成の説明](#13-ファイル構成の説明)
14. [ブログをMarkdownで追加する](#14-ブログをmarkdownで追加する)

---

## 1. 最初にやること

### 必要なもの
- **Node.js**（https://nodejs.org → 「LTS」と書かれた方をダウンロード）
- **VS Code**（https://code.visualstudio.com → 無料のコードエディタ）
- **Git**（https://git-scm.com → すでに入っていることが多い）

### 手順

```
1. GitHubからクローンしたフォルダをVS Codeで開く
2. VS Codeのメニュー「ターミナル」→「新しいターミナル」をクリック
3. 以下を1行ずつ入力してEnterを押す
```

```bash
npm install
npm run dev
```

4. ターミナルに `http://localhost:5173` と表示されたら成功
5. ブラウザでそのURLを開くとサイトが確認できる
6. **保存するたびにブラウザが自動更新される**

---

## 2. 情報を更新する

### ✅ 編集するファイルは `src/data.js` だけ！

VS Code の左側のファイル一覧から `src` → `data.js` を開く。

### 自分の名前・プロフィールを変える

```js
export const PROFILE = {
  displayName: "arupakani-san",   // ← サイトに表示される名前
  university: "電気通信大学",      // ← 大学名
  department: "先端ロボティクス専攻", // ← 学部・専攻
  tagline: "Robotics × SW",       // ← ヒーローに出る一行キャッチ
  description: "説明文...",        // ← 自己紹介文
```

**編集のルール：**
- `"` と `"` の間の文字だけ書き換える
- `"` 自体は消さない
- 日本語でも英語でもOK

---

## 3. 作品（Works）を追加する

`src/data.js` の `WORKS` の部分に追加する。

### 現在の形（1作品のブロック）

```js
{
  title: "作品のタイトル",
  description: "作品の説明文。どんなものか、どんな技術を使ったか書く。",
  image: null,
  tags: ["Python", "React"],
  codeUrl: null,
  demoUrl: null,
},
```

### 追加する手順

1. `src/data.js` を開く
2. `export const WORKS = [` を探す
3. 既存の最後の `},` の後ろに、上のブロックをコピーして貼り付ける
4. 内容を書き換えて保存

### 各項目の説明

| 項目 | 説明 | 例 |
|---|---|---|
| `title` | 作品名 | `"ペット監視ロボット"` |
| `description` | 説明文 | `"Raspberry Pi を使った..."` |
| `image` | 画像パス（後述） | `"/works/robot.jpg"` または `null` |
| `tags` | 使用技術タグ | `["Python", "Flask"]` |
| `codeUrl` | GitHubのURL | `"https://github.com/..."` または `null` |
| `demoUrl` | デモサイトのURL | `"https://..."` または `null` |

> **注意：** `null` と書くとその項目は表示されない。URLがない場合はそのまま `null` にしておく。

### 完成例

```js
export const WORKS = [
  {
    title: "ペット監視ロボット",        // ← 既存の作品
    description: "...",
    image: null,
    tags: ["Python", "Raspberry Pi 5"],
    codeUrl: null,
    demoUrl: null,
  },
  {
    title: "ハッカソン作品",             // ← ここに新しく追加
    description: "〇〇ハッカソンで作ったアプリ。チームで開発した。",
    image: "/works/hackathon.jpg",
    tags: ["React", "Node.js", "Supabase"],
    codeUrl: "https://github.com/arupakaniisan/...",
    demoUrl: "https://my-app.vercel.app",
  },
  // ↑ カンマ忘れずに！
];
```

---

## 4. 経歴（History）を追加する

`src/data.js` の `HISTORY` の部分に追加する。

### 1件のブロック

```js
{
  date: "2025年7月",
  title: "〇〇ハッカソン 参加",
  description: "チームで〇〇を開発。△△賞を受賞。",
  type: "hackathon",
},
```

### `type` の種類と色

| type | 意味 | 色 |
|---|---|---|
| `"life"` | 生活・個人的なこと | グレー |
| `"education"` | 学業・入学など | 青 |
| `"dev"` | 開発・制作 | 緑 |
| `"hackathon"` | ハッカソン参加 | 黄色 |
| `"work"` | アルバイト・インターン | 紫 |

### 追加する手順

1. `src/data.js` を開く
2. `export const HISTORY = [` を探す
3. **時系列順**（古い順）に、追加したい位置に貼り付ける
4. `type` を上の表から選んで入力する
5. 保存

---

## 5. About ページを更新する

`src/data.js` の `ABOUT` の部分を編集する。

### プロフィール表

```js
profile: [
  { label: "名前",  value: "山田 太郎" },
  { label: "所属",  value: "電気通信大学 先端ロボティクス専攻" },
  { label: "学年",  value: "3年生" },
  { label: "居住",  value: "東京都" },
  // ↓ 行を追加することもできる
  { label: "生年月日", value: "2004年〇月〇日" },
],
```

### 資格・受賞を追加する

```js
qualifications: [
  { title: "基本情報技術者試験 合格",    date: "2024-06" },
  { title: "〇〇ハッカソン △△賞 受賞",  date: "2025-07" },
  // ↑ この形式でどんどん追加できる
],
```

### 趣味タグを変える

```js
hobbies: ["プログラミング", "ロボット製作", "ランニング", "CAD設計"],
//         ↑ "〇〇" の形式で追加・削除できる
```

---

## 6. 写真・画像を追加する

### 手順

1. **`public` フォルダの中に `works` フォルダを作る**
   - VS Code の左側で `public` を右クリック → 「新しいフォルダー」→ `works` と入力
2. **画像ファイルを入れる**
   - ドラッグ＆ドロップで `public/works/` の中に画像を入れる
   - ファイル名は **英語・数字のみ**（日本語は使わない）
   - 例：`robot.jpg`、`hackathon.png`
3. **`data.js` でパスを指定する**

```js
image: "/works/robot.jpg",    // ← public/works/ の中のファイル名
```

### プロフィール写真（アバター）

1. `public/` フォルダに `avatar.jpg` という名前で写真を入れる
2. `src/data.js` の `PROFILE` を編集する

```js
avatar: "/avatar.jpg",    // null から変更する
```

### 推奨する画像サイズ

| 用途 | 推奨サイズ |
|---|---|
| 作品画像 | 横800px × 縦500px 程度 |
| アバター（顔写真） | 正方形 400px × 400px 程度 |
| ファイルサイズ | 1枚あたり500KB以下推奨 |

> **容量を小さくする方法：** [Squoosh](https://squoosh.app)（無料のWebサービス）で圧縮できる

---

## 7. SNS・リンクを追加する

`src/data.js` の `PROFILE` の下部を編集する。

```js
github:   "https://github.com/arupakaniisan",  // ← あなたのURL
linkedin: null,      // LinkedInがあれば "https://linkedin.com/in/yourID"
zenn:     null,      // Zennがあれば "https://zenn.dev/yourID"
note:     null,      // noteがあれば "https://note.com/yourID"
twitter:  null,      // Xがあれば "https://twitter.com/yourID"
email:    null,      // メールを載せる場合 "your@email.com"
```

- URLを入れると → スプラッシュ画面とContactページにボタンが表示される
- `null` のまま → 表示されない

---

## 8. 新しいページを追加する（上級）

> ⚠️ この作業はファイルを2つ編集する必要があります。少し難しいですが、手順通りにやれば大丈夫です。

### 例：「Blog」ページを追加する場合

#### ステップ1：`src/App.jsx` にページコンポーネントを追加

`src/App.jsx` を開いて、`function HistoryPage()` の下あたりに以下を追加する：

```jsx
function BlogPage() {
  return (
    <>
      <div className="page">
        <div className="page-eye">// blog</div>
        <h1 className="page-title">Blog</h1>
        <p style={{ color: "var(--muted2)" }}>記事を書いたらここに追加します。</p>
      </div>
      <Footer />
    </>
  );
}
```

#### ステップ2：ナビゲーションにリンクを追加

同じ `src/App.jsx` の `Nav` 関数の中にある `links` 配列を探す：

```jsx
const links = [
  { to: "/",        label: "Home" },
  { to: "/about",   label: "About" },
  { to: "/works",   label: "Works" },
  { to: "/history", label: "History" },
  { to: "/blog",    label: "Blog" },   // ← これを追加
];
```

#### ステップ3：ルーティングを追加

同じファイルの下の方にある `<Routes>` の中を探す：

```jsx
<Routes>
  <Route path="/"        element={<HomePage />} />
  <Route path="/about"   element={<AboutPage />} />
  <Route path="/works"   element={<WorksPage />} />
  <Route path="/history" element={<HistoryPage />} />
  <Route path="/blog"    element={<BlogPage />} />   {/* ← これを追加 */}
</Routes>
```

---

## 9. Vercel にデプロイする

**デプロイ = インターネットに公開すること**

### 初回の設定

1. [vercel.com](https://vercel.com) にアクセス
2. 「Sign Up」→ 「Continue with GitHub」でGitHubアカウントでログイン
3. 「Add New Project」→ あなたのリポジトリを選択
4. 設定はそのままで「Deploy」をクリック
5. 数分後に `https://your-project.vercel.app` というURLでサイトが公開される

### 2回目以降の更新手順

```bash
git add .
git commit -m "作品を追加した"
git push
```

これだけで **Vercel が自動的に最新版に更新**してくれる。

---

## 10. お名前.com でドメインを設定する

ドメインとは `https://yourname.com` のような自分だけのURLのこと。

### 手順

1. お名前.com でドメインを購入（年間1,000円〜）
2. Vercel のプロジェクトページ → 「Settings」→「Domains」→ドメインを入力して「Add」
3. Vercel が表示する設定情報をメモする（AレコードまたはCNAMEレコード）
4. お名前.com の管理画面 →「DNS設定」→ メモした情報を入力して保存
5. 数時間〜最大48時間後に反映される

---

## 11. コンタクトフォームを動くようにする

現在の ContactForm は **EmailJS** を使って `aruni.san.tech@gmail.com` に送信するようにしています。

### 手順

1. [emailjs.com](https://www.emailjs.com) でアカウント作成
2. Email Service を作成する
3. Email Template を作成し、送信先に `aruni.san.tech@gmail.com` を指定する
4. 取得した `Service ID` / `Template ID` / `Public Key` を `.env` に入れる

### `.env` の例

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### テンプレートで使う変数

- `to_email`: 送信先メールアドレス
- `from_name`: お名前
- `from_email`: メールアドレス
- `message`: 本文
- `reply_to`: 返信先

---

## 12. よくあるトラブル

### 「保存したのにブラウザに反映されない」
→ ブラウザをリロード（Ctrl+R）する。それでもダメなら `npm run dev` を再実行。

### 「`npm run dev` がエラーになる」
→ `npm install` を先に実行したか確認する。

### 「カンマを忘れた・括弧が合わない」
→ VS Code がエラー箇所に赤い波線を表示してくれる。その行を確認する。
→ `data.js` を編集中にエラーが出たら、**編集前の状態に戻す（Ctrl+Z）** のが一番早い。

### 「画像が表示されない」
→ ファイル名に日本語・スペースが入っていないか確認する。
→ `public/works/` フォルダの中に入っているか確認する。
→ `data.js` のパスが `/works/ファイル名.jpg` になっているか確認する。

### 「Vercelにデプロイしたら画面が白くなった」
→ ローカル（自分のPC）でエラーが出ていないか確認する。エラーがなければデプロイできる。
→ Vercelの「Deployments」タブでエラーログを確認できる。

---

## 13. ファイル構成の説明

```
my_portfolio/
│
├── public/                    ← 画像などを入れるフォルダ
│   ├── favicon.svg            ← ブラウザのタブに出るアイコン
│   └── works/                 ← 作品の画像（自分で作成して入れる）
│
├── src/                       ← サイトの中身
│   │
│   ├── data.js                ← ★ ここだけ編集すればOK（コンテンツ管理）
│   │
│   ├── App.jsx                ← ページの構造（基本触らなくてOK）
│   ├── styles.js              ← デザイン・色・フォント（基本触らなくてOK）
│   ├── main.jsx               ← 起動ファイル（触らない）
│   └── index.css              ← 基本スタイル（触らない）
│
├── index.html                 ← HTMLの土台（触らない）
├── vite.config.js             ← 設定ファイル（触らない）
├── package.json               ← 使用ライブラリ一覧（触らない）
└── README.md                  ← このファイル
```

### まとめ

| 何をしたいか | どのファイルを編集するか |
|---|---|
| 名前・自己紹介を変える | `src/data.js` の `PROFILE` |
| 作品を追加・削除する | `src/data.js` の `WORKS` |
| 経歴を追加・削除する | `src/data.js` の `HISTORY` |
| Aboutページの内容を変える | `src/data.js` の `ABOUT` |
| スキルを追加・削除する | `src/data.js` の `SKILLS` |
| 写真を追加する | `public/works/` に画像を入れて `data.js` でパス指定 |
| SNSリンクを追加する | `src/data.js` の `PROFILE` |
| 新しいページを追加する | `src/App.jsx`（上級・このREADMEの8章を参照） |
| デザインを変える | `src/styles.js` |

---

## 14. ブログをMarkdownで追加する

このプロジェクトでは、`src/content/blog/` に `.md` ファイルを追加するだけでブログ記事を増やせます。

### 使い方

1. `src/content/blog/` に新しいファイルを作る
2. ファイル名は `YYYY-MM-DD-slug.md` 形式にする
3. 先頭に front matter を書く

```md
---
title: 記事タイトル
date: 2026-04-07
excerpt: 記事一覧に表示する短い説明文
published: true
---

# 記事タイトル

本文を Markdown で書く。
```

### 反映先

- 一覧ページ: `/blog`
- 詳細ページ: `/blog/ファイル名（拡張子なし）`

### 実装ファイル

- `src/lib/blog.js`: Markdown読み込み・front matter解析・HTML変換
- `src/pages/BlogList.jsx`: 記事一覧
- `src/pages/BlogPost.jsx`: 記事詳細
- `src/content/blog/*.md`: 記事本体

### Markdownサニタイズ（任意）

MarkdownをHTML表示するときのサニタイズはデフォルトで有効です。

- デフォルト: 有効（`VITE_SANITIZE_MARKDOWN` 未設定）
- 無効化したい場合のみ: `.env` に `VITE_SANITIZE_MARKDOWN=false` を設定

> 設定変更後は `npm run dev` を再起動してください。

---

*最終更新: 2026年*
