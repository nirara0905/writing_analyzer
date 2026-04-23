"use client"

import { useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MAX_CHARS } from "@/lib/constants"

interface Props {
  onAnalyze: (text: string) => Promise<void>
  isLoading: boolean
}

export function AnalysisForm({ onAnalyze, isLoading }: Props) {
  const [text, setText] = useState("")
  const charCount = text.length
  const isOverLimit = charCount > MAX_CHARS
  const canSubmit = text.trim().length > 0 && !isOverLimit && !isLoading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    await onAnalyze(text)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="文体分析フォーム">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="分析したい文章をここに入力してください（最大2000文字）&#10;&#10;ブログの記事、SNSの投稿、メール、日記など、あなたが書いた文章なら何でも構いません。"
          className="w-full h-52 md:h-64 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 focus:border-blue-300/60 focus:ring-2 focus:ring-blue-200/50 resize-none text-gray-800 placeholder:text-gray-400 text-sm leading-relaxed outline-none transition-all duration-200 shadow-inner"
          aria-label="分析テキスト入力"
          disabled={isLoading}
        />
        <div
          className={`absolute bottom-3 right-4 text-xs font-medium transition-colors ${
            isOverLimit ? "text-red-500" : charCount > MAX_CHARS * 0.9 ? "text-amber-500" : "text-gray-400"
          }`}
          aria-live="polite"
          aria-label={`文字数: ${charCount}/${MAX_CHARS}`}
        >
          {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
        </div>
      </div>

      {isOverLimit && (
        <p className="text-xs text-red-500 font-medium" role="alert">
          文字数が上限を超えています。{MAX_CHARS}文字以内にしてください。
        </p>
      )}

      <Button
        type="submit"
        disabled={!canSubmit}
        size="lg"
        className="w-full"
        aria-label={isLoading ? "分析中..." : "文体を分析する"}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            分析中...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            文体を分析する
          </>
        )}
      </Button>
    </form>
  )
}
