export const MAX_CHARS = 2000
export const MAX_HISTORY = 5
export const HISTORY_STORAGE_KEY = "writing-analyzer-history"
export const GEMINI_MODEL = "gemini-2.5-flash-lite"

export const ANALYSIS_PROMPT = `
以下の文章を分析し、この人特有の文体・ライティングルール・特徴・雰囲気を抽出してください。
AIツールで文章を書く際のスタイルガイドとして活用しやすいマークダウン形式で出力してください。

分析する文章:
{text}

以下の観点で分析し、マークダウン形式で出力してください:

## 文体の特徴
（全体的な文体のトーン・雰囲気）

## 文章構造
（段落の長さ、文の長さ、構成パターン）

## 語彙・表現
（よく使う言葉、表現の特徴、専門用語の使い方）

## リズム・テンポ
（文のリズム、句読点の使い方、改行のパターン）

## ライティングルール
（この人が無意識に守っているルール・こだわり）

## AIへの指示文（コピー用）
（このスタイルで文章を書くためのAIへの指示文。具体的で再現性の高い形で）
`.trim()
