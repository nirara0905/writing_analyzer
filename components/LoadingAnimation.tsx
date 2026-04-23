"use client"

export function LoadingAnimation() {
  return (
    <div
      className="rounded-2xl bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg p-8"
      aria-label="分析中"
      role="status"
    >
      <div className="flex flex-col items-center gap-6">
        {/* 波紋アニメーション */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-400/50 to-purple-400/50 animate-ping [animation-delay:0.2s]" />
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-2xl">✨</span>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-base font-semibold text-gray-800">文体を分析中...</p>
          <p className="text-sm text-gray-500">AIがあなたの文章の特徴を読み解いています</p>
        </div>

        {/* ドットローダー */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
