# Writing Analyzer

AI時代の個人らしさを守る文体分析ツール。文章を入力するだけで、あなた独自のライティングスタイルをGemini AIが抽出し、他のAIツールへの指示文として使える形式で出力します。

---

## 機能

- **文体分析** — 入力した文章（最大2,000文字）からライティングの特徴・ルール・雰囲気を自動抽出
- **マークダウン出力** — 文体の特徴・語彙・リズム・AIへの指示文などを構造化して表示
- **ワンクリックコピー** — 分析結果をそのままクリップボードにコピー
- **履歴保存** — 最新5件の分析結果をローカルストレージに自動保存

## 技術スタック

| カテゴリ | 使用技術 |
|---|---|
| フレームワーク | Next.js 16 (App Router) |
| UI | React 19 / Tailwind CSS v4 |
| AI | Gemini AI API (`gemini-2.5-flash-lite`) |
| テスト | Vitest + React Testing Library |
| 言語 | TypeScript |

## セットアップ

**1. 依存パッケージをインストール**

```bash
npm install
```

**2. 環境変数を設定**

`.env.local` を作成し、Gemini APIキーを記載します。

```
GEMINI_API_KEY=your_api_key_here
```

APIキーは [Google AI Studio](https://aistudio.google.com/apikey) で取得できます。

**3. 開発サーバーを起動**

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## コマンド

```bash
npm run dev       # 開発サーバー起動
npm run build     # 本番ビルド
npm run start     # 本番サーバー起動
npm run lint      # ESLint 実行
npm run test      # テスト（ウォッチモード）
npm run test:run  # テスト（1回実行）
```

## ディレクトリ構成

```
├── app/
│   ├── api/analyze/route.ts   # Gemini AI APIルート（サーバーサイド）
│   ├── layout.tsx
│   ├── page.tsx               # メインページ
│   └── globals.css
├── components/
│   ├── ui/                    # 汎用UIコンポーネント（Button, Badge）
│   ├── Header.tsx             # Glassmorphismヘッダー
│   ├── AnalysisForm.tsx       # テキスト入力フォーム
│   ├── AnalysisResult.tsx     # 分析結果表示 + コピーボタン
│   ├── HistoryPanel.tsx       # 履歴一覧パネル
│   ├── LoadingAnimation.tsx   # 分析中アニメーション
│   └── WelcomeScreen.tsx      # 初期表示画面
├── lib/
│   ├── hooks/
│   │   ├── useAnalyzer.ts     # 分析APIの状態管理
│   │   └── useHistory.ts      # localStorage履歴管理
│   ├── constants.ts           # 定数（モデル名・プロンプト・文字数上限）
│   ├── types.ts               # TypeScript型定義
│   └── utils.ts               # ユーティリティ（cn関数）
└── __tests__/                 # Vitestテスト
```

## Vercelへのデプロイ

### 方法1: GitHub 経由（推奨）

`git push` するだけで自動デプロイされる、最もシンプルな方法です。

**1. GitHubでリポジトリを作成**

1. [github.com](https://github.com) にログイン
2. 右上の "+" → "New repository" をクリック
3. リポジトリ名を入力（例: `writing-analyzer`）
4. "Create repository" をクリック（READMEの追加は不要）

**2. ローカルのコードをGitHubにプッシュ**

GitHubのリポジトリ作成後に表示されるURLを使って実行します。

```bash
git remote add origin https://github.com/ユーザー名/writing-analyzer.git
git add .
git commit -m "initial commit"
git push origin main
```

**3. Vercelと連携**

1. [vercel.com](https://vercel.com) にアクセスしてログイン（GitHubアカウントでOK）
2. "New Project" をクリック
3. 作成したリポジトリを選択
4. フレームワークが `Next.js` と自動検出されることを確認
5. "Deploy" をクリック

**4. 環境変数を設定**

デプロイ後、Project Settings → Environment Variables から `GEMINI_API_KEY` を追加します。

```
GEMINI_API_KEY=your_api_key_here
```

追加後に "Redeploy" を実行すると反映されます。

以降は `git push` するたびに自動でデプロイされます。

---

### 方法2: Vercel CLI

ターミナルだけでデプロイする方法です。

**1. Vercel CLIをインストール**

```bash
npm i -g vercel
```

**2. デプロイ**

プロジェクトのルートディレクトリで実行します。

```bash
vercel
```

初回はブラウザが開いてログインを求められます。その後、以下の質問に答えます。

```
? Set up and deploy? → Y
? Which scope? → 自分のアカウントを選択
? Link to existing project? → N（新規の場合）
? What's your project's name? → 任意の名前（例: writing-analyzer）
? In which directory is your code located? → ./ (そのままEnter)
```

**3. 環境変数を設定**

```bash
vercel env add GEMINI_API_KEY
```

**4. 本番デプロイ**

```bash
vercel --prod
```

---

### デプロイ前の確認

ローカルでビルドが通るか事前に確認しておくと安心です。

```bash
npm run build
```

## 注意事項

このサービスはGemini AI APIの**無料枠**を使用しています。入力された文章はGoogleのサービス改善に利用される場合があります。個人情報や機密情報は入力しないでください。
# writing_analyzer
