import { Sparkles } from 'lucide-react'

/**
 * 홈 Hero — Compact dark gradient briefing.
 * GLOW:UP 정보 밀도 + Amplitude 톤 (다크 그라데이션) 융합.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper rounded-card mt-6 mx-8">
      {/* Radial gradient mesh */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 15% 20%, rgba(91, 79, 229, 0.5) 0%, transparent 60%),
            radial-gradient(ellipse 55% 65% at 85% 80%, rgba(236, 72, 153, 0.32) 0%, transparent 65%),
            radial-gradient(ellipse 45% 45% at 50% 100%, rgba(46, 37, 128, 0.55) 0%, transparent 70%)
          `,
        }}
      />
      {/* Noise grain (subtle) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative px-10 py-12 md:py-14">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 items-end">
          {/* LEFT — 메시지 */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                MORNING BRIEFING · 2026.05.10 (월)
              </span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                09:00 KST
              </span>
            </div>

            <h1 className="font-serif italic text-[44px] md:text-[56px] leading-[1.05] tracking-tight text-white">
              안녕하세요, 푸우{' '}
              <span className="not-italic font-sans text-indigo">✦</span>
            </h1>

            <p className="mt-6 text-[16px] md:text-[17px] text-white/85 leading-relaxed max-w-2xl">
              어제 <span className="font-inter font-semibold text-white tabular-nums">8개</span> 새 경쟁사 광고가 추가됐어요.
              ROAS는 <span className="font-inter font-semibold text-white tabular-nums">3.8</span>{' '}
              <span className="font-inter font-semibold text-success-bg tabular-nums">(+12%)</span>.
              <br />
              검수 대기 <span className="font-inter font-semibold text-white tabular-nums">3건</span>,
              화장솜 카테고리 콘텐츠 피로도 신호 감지됨.
            </p>
          </div>

          {/* RIGHT — AI 핸드오프 카드 */}
          <div className="bg-white/8 border border-white/14 rounded-card p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-indigo" />
              <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                AI Today
              </span>
            </div>
            <p className="text-[14px] text-white/85 leading-relaxed">
              "ROAS 3.8을 만든 핵심은 <span className="font-medium text-white">30대 여성 화장솜 콘텐츠</span>.
              하지만 같은 카테고리 피로도가 <span className="font-medium text-white">+18%</span> 누적 —
              <span className="text-white"> 신규 후크 변형이 필요해요.</span>"
            </p>
            <button className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-medium text-white/85 hover:text-white transition-colors">
              <span>자세히 분석하기</span>
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
