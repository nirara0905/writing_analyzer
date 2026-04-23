import { describe, it, expect, beforeEach, vi } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useHistory } from "@/lib/hooks/useHistory"

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

beforeEach(() => {
  vi.stubGlobal("localStorage", localStorageMock)
  localStorageMock.clear()
  vi.stubGlobal("crypto", { randomUUID: () => Math.random().toString(36).slice(2) })
})

describe("useHistory", () => {
  it("初期状態は空の配列", () => {
    const { result } = renderHook(() => useHistory())
    expect(result.current.history).toEqual([])
  })

  it("分析結果を追加できる", () => {
    const { result } = renderHook(() => useHistory())
    act(() => {
      result.current.addToHistory("テスト文章", "分析結果テキスト")
    })
    expect(result.current.history).toHaveLength(1)
    expect(result.current.history[0].text).toBe("テスト文章")
    expect(result.current.history[0].result).toBe("分析結果テキスト")
  })

  it("最大5件まで保存される", () => {
    const { result } = renderHook(() => useHistory())
    act(() => {
      for (let i = 0; i < 7; i++) {
        result.current.addToHistory(`文章${i}`, `結果${i}`)
      }
    })
    expect(result.current.history).toHaveLength(5)
  })

  it("新しい履歴が先頭に追加される", () => {
    const { result } = renderHook(() => useHistory())
    act(() => {
      result.current.addToHistory("最初の文章", "結果1")
    })
    act(() => {
      result.current.addToHistory("次の文章", "結果2")
    })
    expect(result.current.history[0].text).toBe("次の文章")
  })

  it("IDで履歴を削除できる", () => {
    const { result } = renderHook(() => useHistory())
    act(() => {
      result.current.addToHistory("テスト", "結果")
    })
    const id = result.current.history[0].id
    act(() => {
      result.current.removeFromHistory(id)
    })
    expect(result.current.history).toHaveLength(0)
  })

  it("履歴をすべて削除できる", () => {
    const { result } = renderHook(() => useHistory())
    act(() => {
      result.current.addToHistory("テスト1", "結果1")
      result.current.addToHistory("テスト2", "結果2")
    })
    act(() => {
      result.current.clearHistory()
    })
    expect(result.current.history).toHaveLength(0)
  })

  it("localStorageに保存される", () => {
    const { result } = renderHook(() => useHistory())
    act(() => {
      result.current.addToHistory("テスト", "結果")
    })
    const stored = JSON.parse(localStorageMock.getItem("writing-analyzer-history") ?? "[]")
    expect(stored).toHaveLength(1)
  })
})
