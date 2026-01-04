# モダンエンジニアポートフォリオサイト

Astro + Tailwind CSSで構築された、白を基調としたミニマルでモダンなエンジニア向けポートフォリオサイトです。

## 🎨 デザインコンセプト

- **カラースキーム**: 白ベース（#ffffff）+ アクセントカラー（#007bff）
- **スタイル**: ミニマルで清潔感のあるデザイン
- **質感**: 適切な余白、繊細なシャドウ、角の丸みを活用
- **フォント**: Noto Sans JP（日本語に最適化されたサンセリフ体）

## 🚀 実装済み機能

### ✅ 完成したセクション

1. **Navigation（ナビゲーション）**
   - 固定ヘッダー（Sticky）で常に上部に表示
   - ロゴとメニュー項目（About, Skills, Works, Contact）
   - レスポンシブ対応のモバイルメニュー
   - スムーズスクロール機能

2. **Hero Section（ヒーローセクション）**
   - 2カラムレイアウト（左：テキスト、右：イラスト）
   - キャッチコピーと自己紹介
   - CTAボタン（作品を見る、お問い合わせ）
   - グラデーション背景と装飾的なサークル

3. **About Section（自己紹介セクション）**
   - 自己紹介文
   - 経歴を箇条書きで表示
   - 背景カード with シャドウ

4. **Skills Section（スキルセクション）**
   - スキルをカード形式で表示
   - グリッドレイアウト（レスポンシブ対応）
   - ホバー時の浮き上がりエフェクト
   - 12種類のスキル表示（HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Vue.js, Astro, Node.js, Tailwind CSS, Git, Figma）

5. **Works Section（制作実績セクション）**
   - 3つのプロジェクトカード
   - 各カードに画像エリア、使用技術タグ、タイトル、説明文
   - ホバー時のシャドウと移動エフェクト
   - レスポンシブグリッドレイアウト

6. **Contact Section（お問い合わせセクション）**
   - メールアドレス表示
   - SNSアイコンリンク（GitHub, Twitter, LinkedIn）
   - ホバー時のカラー変更とアニメーション

7. **Footer（フッター）**
   - シンプルなコピーライト表示

### 🎯 実装済みの技術要素

- **レスポンシブデザイン**: Tailwind CSSのブレークポイントを活用
- **ホバーエフェクト**: カード要素の浮き上がり、色変更、移動
- **スムーズスクロール**: アンカーリンクによるページ内移動
- **モバイル対応**: ハンバーガーメニューとモバイル最適化レイアウト
- **アニメーション**: pulseアニメーション、トランジション効果
- **アクセシビリティ**: セマンティックHTML、適切なコントラスト

## 📁 プロジェクト構造

```
/
├── public/
│   └── favicon.svg          # ファビコン
├── src/
│   ├── layouts/
│   │   └── Layout.astro     # 共通レイアウト（ナビゲーション、フッター含む）
│   └── pages/
│       └── index.astro      # メインページ（全セクション）
├── astro.config.mjs         # Astro設定
├── package.json             # 依存関係
├── tsconfig.json            # TypeScript設定
└── README.md                # このファイル
```

## 🛠 使用技術

- **Astro** v5.16.6 - 静的サイトジェネレーター
- **Tailwind CSS** (CDN) - ユーティリティファーストCSSフレームワーク
- **Noto Sans JP** (Google Fonts) - 日本語Webフォント
- **TypeScript** - 型安全性の確保

## 💻 ローカル開発

### 前提条件
- Node.js 18.14.1 以上

### セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

開発サーバーは `http://localhost:4321` で起動します。

## 🎨 カスタマイズガイド

### 色の変更
`src/layouts/Layout.astro` の Tailwind設定を編集：
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#007bff',  // アクセントカラー
        secondary: '#f8f9fa', // セカンダリカラー
      }
    }
  }
}
```

### コンテンツの編集
`src/pages/index.astro` の各セクションを直接編集してください：
- Hero Section: 名前とキャッチコピー
- About Section: 自己紹介と経歴
- Skills Section: スキル一覧（配列を編集）
- Works Section: プロジェクトカード（3つのカード要素を編集）
- Contact Section: メールアドレスとSNSリンク

### プロジェクトカードの追加
Works Sectionの `<div class="grid...">` 内に新しいカード要素を追加できます。

## 📝 未実装の機能

現時点では基本的なポートフォリオサイトとして完成していますが、以下の機能を追加できます：

1. **ダークモード**: ライト/ダークテーマの切り替え
2. **多言語対応**: 日本語/英語の言語切り替え
3. **お問い合わせフォーム**: 実際に機能するコンタクトフォーム
4. **ブログセクション**: Markdown/MDXを使用した記事管理
5. **アニメーションライブラリ**: Framer Motion や GSAP による高度なアニメーション
6. **CMSとの統合**: HeadlessCMS（Contentful, Microなど）との連携
7. **実際のプロジェクト画像**: プレースホルダーの代わりに実際のプロジェクト画像
8. **詳細ページ**: 各プロジェクトの詳細ページ

## 🔄 推奨される次のステップ

1. **コンテンツのカスタマイズ**: 自分の情報に書き換え
2. **画像の追加**: プロジェクトの実際のスクリーンショットを追加
3. **SNSリンクの更新**: 実際のSNSアカウントURLに変更
4. **メールアドレスの更新**: 実際のメールアドレスに変更
5. **favicon.svgのカスタマイズ**: 自分のロゴやイニシャルに変更
6. **デプロイ**: Vercel, Netlify, Cloudflare Pages などにデプロイ

## 📮 コンタクト

このポートフォリオサイトについてのお問い合わせは、以下までお願いします：
- Email: your.email@example.com
- GitHub: https://github.com
- Twitter: https://twitter.com

## 📄 ライセンス

このプロジェクトは自由にカスタマイズしてご利用いただけます。

---

**Built with ❤️ using Astro & Tailwind CSS**s