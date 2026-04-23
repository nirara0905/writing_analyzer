# CLAUDE.md

このファイルはリポジトリ内のコードを扱う際に Claude Code (claude.ai/code) へのガイダンスを提供します。
**回答・コメント・コードの説明はすべて日本語で行ってください。**

@AGENTS.md

## コマンド

```bash
npm run dev       # 開発サーバー起動（Turbopack、v16からデフォルト）
npm run build     # 本番ビルド（Turbopack、v16からデフォルト）
npm run start     # 本番サーバー起動
npm run lint      # ESLint 実行（next lint ではなく eslint CLI を直接使用）
```

テストランナーは未設定。

## アーキテクチャ

Next.js 16 App Router プロジェクト。主なエントリーポイント：

- `app/layout.tsx` — ルートレイアウト。Geist フォント設定、`<html>` に `h-full`、`<body>` に flex-column を適用
- `app/page.tsx` — ホームページ（デフォルトで Server Component）
- `app/globals.css` — グローバルスタイル（Tailwind v4 via PostCSS）

## Next.js 16 の破壊的変更

このプロジェクトは **Next.js 16** を使用しており、以前のバージョンから大きな破壊的変更があります。コードを書く前に `node_modules/next/dist/docs/` を参照してください。

**非同期 Request API** — ページ・レイアウトの `params` と `searchParams` は Promise になり、必ず await が必要です。同期アクセスは完全に廃止されました。

```tsx
// page.tsx
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
}
```

`PageProps` / `LayoutProps` 型ヘルパーの自動生成は `npx next typegen` で行えます。

**キャッシュ** — `revalidateTag` は第2引数に `cacheLife` プロファイルが必須になりました。即時無効化には Server Actions 内で `updateTag` を使います。

```ts
revalidateTag('posts', 'max')  // 第2引数が必須
```

**ESLint** — フラット設定（`eslint.config.mjs`）を使用。`next lint` コマンドは廃止され、`eslint` を直接使います（`package.json` 設定済み）。

**Turbopack** — `dev` と `build` 両方でデフォルトのバンドラーになりました。`next.config.ts` にカスタム `webpack` 設定があるとビルドが失敗します。Sass の `node_modules` インポートでチルダ（`~`）プレフィックスは非対応です。

**スクロール挙動** — ナビゲーション時に `scroll-behavior: smooth` を上書きしなくなりました。従来の挙動が必要な場合は `<html>` に `data-scroll-behavior="smooth"` を追加してください。

**インスタントナビゲーション** — 動的ルートでクライアントサイドナビゲーションを即時にするには、Suspense に加えてルートから `unstable_instant` をエクスポートしてください。詳細は `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.mdx` を参照。

## スタイリング

Tailwind CSS v4（`@tailwindcss/postcss` 経由）。`tailwind.config.*` ファイルは不要で、v4 は CSS ベースの設定を使用します。
