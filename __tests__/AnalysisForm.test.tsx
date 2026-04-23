import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AnalysisForm } from "@/components/AnalysisForm"

describe("AnalysisForm", () => {
  it("テキストエリアとボタンが表示される", () => {
    render(<AnalysisForm onAnalyze={vi.fn()} isLoading={false} />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /文体を分析する/ })).toBeInTheDocument()
  })

  it("テキストが空のときボタンが無効化される", () => {
    render(<AnalysisForm onAnalyze={vi.fn()} isLoading={false} />)
    expect(screen.getByRole("button", { name: /文体を分析する/ })).toBeDisabled()
  })

  it("テキストを入力するとボタンが有効化される", async () => {
    const user = userEvent.setup()
    render(<AnalysisForm onAnalyze={vi.fn()} isLoading={false} />)
    await user.type(screen.getByRole("textbox"), "テスト文章を入力します")
    expect(screen.getByRole("button", { name: /文体を分析する/ })).not.toBeDisabled()
  })

  it("文字数カウンターが表示される", async () => {
    const user = userEvent.setup()
    render(<AnalysisForm onAnalyze={vi.fn()} isLoading={false} />)
    await user.type(screen.getByRole("textbox"), "abc")
    expect(screen.getByText(/3 \/ 2,000/)).toBeInTheDocument()
  })

  it("2000文字を超えるとエラーメッセージが表示される", async () => {
    const user = userEvent.setup()
    render(<AnalysisForm onAnalyze={vi.fn()} isLoading={false} />)
    await user.type(screen.getByRole("textbox"), "a".repeat(2001))
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("フォーム送信時にonAnalyzeが呼ばれる", async () => {
    const onAnalyze = vi.fn().mockResolvedValue(undefined)
    const user = userEvent.setup()
    render(<AnalysisForm onAnalyze={onAnalyze} isLoading={false} />)
    await user.type(screen.getByRole("textbox"), "テスト文章")
    fireEvent.submit(screen.getByRole("form", { hidden: true }) ?? screen.getByLabelText("文体分析フォーム"))
    expect(onAnalyze).toHaveBeenCalledWith("テスト文章")
  })

  it("ローディング中はボタンが無効化される", () => {
    render(<AnalysisForm onAnalyze={vi.fn()} isLoading={true} />)
    expect(screen.getByRole("button", { name: /分析中/ })).toBeDisabled()
  })
})
