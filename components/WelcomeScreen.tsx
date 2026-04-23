"use client"

import { PenLine, Sparkles, Copy, Clock } from "lucide-react"

const features = [
  {
    id: "feature-card-analyze",
    icon: PenLine,
    title: "文体を分析",
    desc: "あなたが書いた文章からライティングの特徴を自動抽出",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
    ringColor: "hover:ring-2 hover:ring-blue-400/60",
  },
  {
    id: "feature-card-generate",
    icon: Sparkles,
    title: "AIへの指示文を生成",
    desc: "分析結果をそのままAIへのプロンプトとして活用できる形式で出力",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500",
    ringColor: "hover:ring-2 hover:ring-purple-400/60",
  },
  {
    id: "feature-card-copy",
    icon: Copy,
    title: "ワンクリックコピー",
    desc: "生成されたスタイルガイドをコピーしてAIツールにすぐ使える",
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",
    ringColor: "hover:ring-2 hover:ring-emerald-400/60",
  },
  {
    id: "feature-card-history",
    icon: Clock,
    title: "履歴を保存",
    desc: "最新5件の分析履歴をローカルに保存。いつでも見直せる",
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
    ringColor: "hover:ring-2 hover:ring-amber-400/60",
  },
]

export function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center py-8 relative z-10">
      <div className="text-center max-w-3xl mx-auto px-4">
        <div className="mb-8 relative inline-block">
          <div className="w-28 h-28 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-xl">
            <PenLine className="w-14 h-14 text-blue-500" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
          あなたの「文体」を守る
        </h2>
        <p className="text-gray-500 text-base mb-8 max-w-lg mx-auto">
          文章を入力するだけで、あなた独自のライティングスタイルをAIが抽出します
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
          {features.map((f) => (
            <div
              key={f.title}
              id={f.id}
              data-name={f.id}
              className={`p-4 rounded-2xl bg-gradient-to-br ${f.color} border border-white/40 backdrop-blur-sm shadow-md transition-all duration-200 ${f.ringColor}`}
            >
              <f.icon className={`w-6 h-6 ${f.iconColor} mb-2`} />
              <p className="text-sm font-semibold text-gray-800">{f.title}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
