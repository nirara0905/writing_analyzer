import { NextRequest, NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"
import { GEMINI_MODEL, ANALYSIS_PROMPT, MAX_CHARS } from "@/lib/constants"

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "APIキーが設定されていません" }, { status: 500 })
  }

  let text: string
  try {
    const body = await req.json()
    text = body.text
  } catch {
    return NextResponse.json({ error: "リクエストの形式が正しくありません" }, { status: 400 })
  }

  if (!text || typeof text !== "string") {
    return NextResponse.json({ error: "文章を入力してください" }, { status: 400 })
  }

  if (text.length > MAX_CHARS) {
    return NextResponse.json({ error: `文章は${MAX_CHARS}文字以内で入力してください` }, { status: 400 })
  }

  const ai = new GoogleGenAI({ apiKey })
  const prompt = ANALYSIS_PROMPT.replace("{text}", text)

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
  })

  return NextResponse.json({ result: response.text })
}
