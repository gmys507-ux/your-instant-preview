/**
 * Round 0 — Foundation 확인용 placeholder.
 * Round 1에서 AppShell + 4탭 라우팅 + HomePage로 교체됨.
 */
function App() {
  return (
    <main className="min-h-screen bg-bg text-ink flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full space-y-8">
        <p className="font-mono-eyebrow">PRISM · ROUND 0 / 4</p>
        <h1 className="font-display text-display text-ink">
          Marketing <em>Content OS</em>
        </h1>
        <p className="text-body-lg text-ink-2 leading-relaxed">
          마케팅 팀의 콘텐츠 OS. 경쟁사 리서치 · AI 콘텐츠 검수 · 인과 분해 분석을
          한 화면에서 — 분리된 도구들 사이에서 흩어지던 마케팅 컨텍스트를 하나로 잇는
          통합 워크스페이스.
        </p>

        <div className="grid grid-cols-2 gap-3 pt-4">
          <TokenSwatch label="BG" value="--bg" varName="bg" />
          <TokenSwatch label="INK" value="--ink" varName="ink" />
          <TokenSwatch label="INDIGO" value="--indigo" varName="indigo" />
          <TokenSwatch label="PINK" value="--pink" varName="pink" />
        </div>

        <div className="pt-6 border-t border-rule">
          <p className="font-mono-eyebrow">NEXT</p>
          <p className="text-body text-ink-3 mt-2">
            Round 1 — AppShell · 4탭 라우팅 · HomePage · AI 사이드패널 floating 버튼
          </p>
        </div>
      </div>
    </main>
  )
}

function TokenSwatch({ label, value, varName }: { label: string; value: string; varName: 'bg' | 'ink' | 'indigo' | 'pink' }) {
  const bgClass = {
    bg: 'bg-bg-2',
    ink: 'bg-ink',
    indigo: 'bg-indigo',
    pink: 'bg-pink',
  }[varName]
  const textClass = varName === 'bg' ? 'text-ink' : 'text-paper'
  return (
    <div className={`${bgClass} ${textClass} rounded-card p-4 border border-rule`}>
      <p className="font-mono text-eyebrow">{label}</p>
      <p className="font-mono text-meta opacity-70 mt-1">{value}</p>
    </div>
  )
}

export default App
