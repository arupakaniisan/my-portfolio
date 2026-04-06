---
title: このポートフォリオの構成メモ
date: 2026-04-07
excerpt: my-portfolio ディレクトリの構成と、今後の記事運用ルールをまとめたメモです。
---

# このポートフォリオの構成メモ

このブログは、`src/content/blog/` に Markdown ファイルを追加するだけで記事を増やせます。

## 主要ディレクトリ

- `src/pages/`: 各ページコンポーネント
- `src/components/`: 共通UI
- `src/content/blog/`: ブログ記事（Markdown）
- `src/lib/blog.js`: 記事の読み込みと変換ロジック

## 今後の運用

1. 新規記事は `YYYY-MM-DD-slug.md` で作る
2. 先頭の front matter に `title` と `date` を入れる
3. 保存すると開発サーバーで自動反映される

## 例: コードブロック

```bash
npm run dev
```

この形式で、開発ログや学習メモを追加していく予定です。
