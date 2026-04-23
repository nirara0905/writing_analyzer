import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { AnalysisResult } from "@/components/AnalysisResult"

const sampleResult = `## 文体の特徴
簡潔でダイレクトな表現を好む。

## ライティングルール
- 短い文章を好む
- 箇条書きを多用する`

describe("AnalysisResult", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  it("分析結果が表示される", () => {
    render(<AnalysisResult result={sampleResult} />)
    expect(screen.getByTestId("analysis-result")).toBeInTheDocument()
  })

  it("見出しが正しくレンダリングされる", () => {
    render(<AnalysisResult result={sampleResult} />)
    expect(screen.getByText("文体の特徴")).toBeInTheDocument()
    expect(screen.getByText("ライティングルール")).toBeInTheDocument()
  })

  it("リスト項目が表示される", () => {
    render(<AnalysisResult result={sampleResult} />)
    expect(screen.getByText("短い文章を好む")).toBeInTheDocument()
  })

  it("コピーボタンが表示される", () => {
    render(<AnalysisResult result={sampleResult} />)
    expect(screen.getByRole("button", { name: /コピー/ })).toBeInTheDocument()
  })

  it("コピーボタンをクリックするとclipboard.writeTextが呼ばれる", async () => {
    render(<AnalysisResult result={sampleResult} />)
    fireEvent.click(screen.getByRole("button", { name: /コピー/ }))
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(sampleResult)
  })
})
