"use client"

import { useState } from "react"
import { Copy, Check, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  result: string
}

export function AnalysisResult({ result }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = result.split("\n")
  const rendered = lines.map((line, i) => {
    if (line.startsWith("## ")) {
      return (
        <h2 key={i} className="text-base font-bold text-gray-900 mt-6 mb-2 flex items-center gap-2">
          <span className="w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
          {line.replace("## ", "")}
        </h2>
      )
    }
    if (line.startsWith("### ")) {
      return (
        <h3 key={i} className="text-sm font-semibold text-gray-800 mt-3 mb-1">
          {line.replace("### ", "")}
        </h3>
      )
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      return (
        <li key={i} className="text-sm text-gray-700 ml-4 list-disc leading-relaxed">
          {line.replace(/^[-*] /, "")}
        </li>
      )
    }
    if (line.trim() === "") {
      return <div key={i} className="h-1" />
    }
    return (
      <p key={i} className="text-sm text-gray-700 leading-relaxed">
        {line}
      </p>
    )
  })

  return (
    <div
      className="relative rounded-2xl bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg overflow-hidden"
      data-testid="analysis-result"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-800">分析結果</span>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopy}
          aria-label="分析結果をコピー"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-600">コピー済み</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              コピー
            </>
          )}
        </Button>
      </div>
      <div className="p-5 space-y-0.5 max-h-[500px] overflow-y-auto">
        {rendered}
      </div>
    </div>
  )
}
