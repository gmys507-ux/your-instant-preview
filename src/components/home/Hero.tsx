/**
 * 홈 Hero — Amplitude 톤 다크 그라데이션 + Fraunces 이탤릭 디스플레이 + AI 브리핑
 * PRD §6.1 상단 영역, 마스터 §4 Round 1 step 9.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* Radial gradient mesh — indigo + magenta 18% opacity */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 18% 28%, rgba(91, 79, 229, 0.55) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 82% 72%, rgba(236, 72, 153, 0.35) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 50% 100%, rgba(46, 37, 128, 0.65) 0%, transparent 70%)
          `,
          opacity: 0.9,
        }}
      />
      {/* Subtle noise grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-8 py-24 md:py-32">
        <p className="font-mono text-eyebrow uppercase tracking-[0.16em] text-white/60 mb-8">
          PRISM · MARKETING CONTENT OS
        </p>

        <h1 className="font-serif italic text-5xl md:text-7xl leading-[1.05] tracking-tight text-white">
          안녕하세요, 푸우{' '}
          <span className="not-italic font-sans text-indigo">✦</span>
        </h1>

        <p className="mt-10 text-body-lg text-white/85 leading-relaxed max-w-2xl">
          어제 8개 새 경쟁사 광고가 추가됐어요. ROAS는 3.8 (+12%).
          <br />
          검수 대기중인 콘텐츠 3건. 화장솜 카테고리 콘텐츠 피로도 신호 감지됨.
        </p>
      </div>
    </section>
  )
}
