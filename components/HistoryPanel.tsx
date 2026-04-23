"use client"

import { Clock, Trash2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { AnalysisResult } from "@/lib/types"

interface Props {
  history: AnalysisResult[]
  onSelect: (item: AnalysisResult) => void
  onRemove: (id: string) => void
  onClear: () => void
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("ja-JP", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function truncate(text: string, max = 60) {
  return text.length > max ? text.slice(0, max) + "…" : text
}

export function HistoryPanel({ history, onSelect, onRemove, onClear }: Props) {
  if (history.length === 0) return null

  return (
    <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-md overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100/80">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">履歴（最大5件）</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          aria-label="履歴をすべて削除"
          className="text-xs text-gray-400 hover:text-red-500"
        >
          すべて削除
        </Button>
      </div>
      <ul className="divide-y divide-gray-100/60" role="list" aria-label="分析履歴">
        {history.map((item) => (
          <li key={item.id} className="flex items-center gap-2 group hover:bg-white/40 transition-colors duration-150">
            <button
              onClick={() => onSelect(item)}
              className="flex-1 text-left px-5 py-3 min-w-0"
              aria-label={`履歴を表示: ${truncate(item.text, 40)}`}
            >
              <p className="text-sm text-gray-700 truncate leading-snug">{truncate(item.text)}</p>
              <p className="text-xs text-gray-400 mt-0.5">{formatDate(item.createdAt)}</p>
            </button>
            <div className="flex items-center gap-1 pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <button
                onClick={() => onRemove(item.id)}
                className="p-1 rounded-lg hover:bg-red-50 hover:text-red-500 text-gray-400 transition-colors duration-150"
                aria-label="この履歴を削除"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
