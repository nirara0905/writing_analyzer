import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/Header"

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Writing Analyzer — あなたの文体をAIが分析",
  description:
    "入力した文章からあなた独自のライティングスタイルをAIが抽出。AIツールで活用できる文体ガイドを自動生成します。",
  openGraph: {
    title: "Writing Analyzer",
    description: "あなたの文体をAIが分析してスタイルガイドを生成",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        {children}
      </body>
    </html>
  )
}
