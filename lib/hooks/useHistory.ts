"use client"

import { useState, useCallback, useEffect } from "react"
import type { AnalysisResult } from "@/lib/types"
import { HISTORY_STORAGE_KEY, MAX_HISTORY } from "@/lib/constants"

function loadHistory(): AnalysisResult[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveHistory(history: AnalysisResult[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
}

export function useHistory() {
  const [history, setHistory] = useState<AnalysisResult[]>([])

  useEffect(() => {
    setHistory(loadHistory())
  }, [])

  const addToHistory = useCallback((text: string, result: string) => {
    const entry: AnalysisResult = {
      id: crypto.randomUUID(),
      text,
      result,
      createdAt: new Date().toISOString(),
    }
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, MAX_HISTORY)
      saveHistory(next)
      return next
    })
    return entry
  }, [])

  const removeFromHistory = useCallback((id: string) => {
    setHistory((prev) => {
      const next = prev.filter((item) => item.id !== id)
      saveHistory(next)
      return next
    })
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
    saveHistory([])
  }, [])

  return { history, addToHistory, removeFromHistory, clearHistory }
}
