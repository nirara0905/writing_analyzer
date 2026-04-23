"use client"

import { useState } from "react"
import { AnalysisForm } from "@/components/AnalysisForm"
import { AnalysisResult } from "@/components/AnalysisResult"
import { HistoryPanel } from "@/components/HistoryPanel"
import { LoadingAnimation } from "@/components/LoadingAnimation"
import { WelcomeScreen } from "@/components/WelcomeScreen"
import { useAnalyzer } from "@/lib/hooks/useAnalyzer"
import { useHistory } from "@/lib/hooks/useHistory"
import type { AnalysisResult as AnalysisResultType } from "@/lib/types"

export default function Home() {
  const { isLoading, error, result, analyze, reset } = useAnalyzer()
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory()
  const [selectedResult, setSelectedResult] = useState<string | null>(null)

  const displayResult = selectedResult ?? result

  const handleAnalyze = async (text: string) => {
    setSelectedResult(null)
    const r = await analyze(text)
    if (r) {
      addToHistory(text, r)
    }
  }

  const handleSelectHistory = (item: AnalysisResultType) => {
    setSelectedResult(item.result)
    reset()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* 装飾レイヤー */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* コンテンツ */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左カラム：入力フォーム + 履歴 */}
          <section className="space-y-5" aria-label="文章入力エリア">
            <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg p-6">
              <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                文章を入力
              </h2>
              <AnalysisForm onAnalyze={handleAnalyze} isLoading={isLoading} />
            </div>

            <HistoryPanel
              history={history}
              onSelect={handleSelectHistory}
              onRemove={removeFromHistory}
              onClear={clearHistory}
            />

            {/* 無料枠の免責表示 */}
            <p className="text-xs text-gray-400 leading-relaxed px-1">
              ※ このサービスはGemini AI APIの無料枠を使用しています。入力された文章はGoogleのサービス改善に利用される場合があります。
              個人情報や機密情報は入力しないでください。
            </p>
          </section>

          {/* 右カラム：結果表示 */}
          <section aria-label="分析結果エリア">
            {isLoading ? (
              <LoadingAnimation />
            ) : error ? (
              <div
                className="rounded-2xl bg-red-50/80 backdrop-blur-sm border border-red-200/50 p-6 text-center"
                role="alert"
              >
                <p className="text-sm font-semibold text-red-600 mb-1">エラーが発生しました</p>
                <p className="text-xs text-red-500">{error}</p>
              </div>
            ) : displayResult ? (
              <AnalysisResult result={displayResult} />
            ) : (
              <WelcomeScreen />
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
