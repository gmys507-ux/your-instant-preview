import { Sparkles, ArrowRight } from 'lucide-react'

/**
 * 홈 Hero — 다크 그라데이션 모닝 브리핑.
 * 인사말 없이 product-grade 정보 카드로 압축.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper rounded-card mt-6 mx-8 border border-white/8">
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
      {/* Subtle noise grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative px-10 py-10 md:py-12">
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-10 items-stretch">
          {/* LEFT — 모닝 브리핑 */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                MORNING BRIEFING
              </span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 tabular-nums">
                2026.05.10 · 09:00 KST
              </span>
            </div>

            <h1 className="font-sans text-[32px] md:text-[40px] leading-[1.2] tracking-tight text-white font-medium">
              어제, 마케팅에서 일어난 일을<br />
              <span className="text-white/70">한 단락으로 정리했어요.</span>
            </h1>

            <p className="mt-7 text-[15px] md:text-[16px] text-white/80 leading-[1.85] max-w-2xl">
              <span className="font-inter font-semibold text-white tabular-nums">8개</span> 새 경쟁사 광고가 추가됐고,
              ROAS는 <span className="font-inter font-semibold text-white tabular-nums">3.8x</span>{' '}
              <span className="font-inter font-semibold text-success-bg tabular-nums">(+12%)</span>.
              <br />
              검수 대기 <span className="font-inter font-semibold text-white tabular-nums">3건</span>,
              화장솜 카테고리 콘텐츠 피로도{' '}
              <span className="font-inter font-semibold text-warning-bg tabular-nums">+18%</span> 누적 — 신규 후크 변형이 필요해요.
            </p>
          </div>

          {/* RIGHT — AI 핸드오프 카드 */}
          <div
            className="rounded-card p-5 backdrop-blur-sm flex flex-col justify-between"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-indigo" />
                <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                  AI Insight · Today
                </span>
              </div>
              <p className="text-[14px] text-white/85 leading-[1.7]">
                "ROAS 3.8을 만든 핵심 — <span className="text-white">30대 여성 화장솜 콘텐츠</span>.
                같은 카테고리 피로도 누적 중. 사용자 검증 후크
                <span className="text-white">(GUIDE-2.3)</span> 변형이 시급."
              </p>
            </div>
            <button className="mt-5 inline-flex items-center justify-between gap-2 px-3 py-2 -mx-1 rounded-lg text-[13px] font-medium text-white/85 hover:text-white hover:bg-white/8 transition-colors">
              <span>인사이트 자세히 분석</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
