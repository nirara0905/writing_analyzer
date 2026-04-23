"use client"

import { useState, useCallback } from "react"
import type { AnalysisState } from "@/lib/types"

export function useAnalyzer() {
  const [state, setState] = useState<AnalysisState>({
    isLoading: false,
    error: null,
    result: null,
  })

  const analyze = useCallback(async (text: string): Promise<string | null> => {
    setState({ isLoading: true, error: null, result: null })
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "分析に失敗しました")
      }
      setState({ isLoading: false, error: null, result: data.result })
      return data.result as string
    } catch (err) {
      const message = err instanceof Error ? err.message : "分析に失敗しました"
      setState({ isLoading: false, error: message, result: null })
      return null
    }
  }, [])

  const reset = useCallback(() => {
    setState({ isLoading: false, error: null, result: null })
  }, [])

  return { ...state, analyze, reset }
}
