import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

type Step = {
  selector: string
  eyebrow: string
  title: string
  body: string
  cardPosition: 'top' | 'bottom'
}

const steps: Step[] = [
  {
    selector: '#tour-nav',
    eyebrow: 'STEP 1 · WORKSPACES',
    title: '한 화면에서 모든 마케팅 활동',
    body: '홈 · 갤러리 · 어시스턴트 · 대시보드 — 4개 모듈로 마케팅의 흐름을 한 화면에서 끝냅니다. 각 탭을 클릭해 들어가보세요.',
    cardPosition: 'bottom',
  },
  {
    selector: '#tour-kpi',
    eyebrow: 'STEP 2 · INDICATORS',
    title: '오늘 관심 가져야 할 지표',
    body: '데일리 모닝 브리핑처럼 핵심 4개 지표를 한눈에. 데이터를 따라 빠르게 의사결정하세요.',
    cardPosition: 'bottom',
  },
  {
    selector: '#tour-ai-button',
    eyebrow: 'STEP 3 · AI ASSISTANT',
    title: '회사의 맥락이 담긴 AI와 대화',
    body: '우하단 ✦ 버튼을 누르면 사내 콘텐츠 가이드와 타율 데이터를 학습한 AI와 자유롭게 대화할 수 있어요. 모든 페이지에서 항상 옆에 있습니다.',
    cardPosition: 'top',
  },
]

const STORAGE_KEY = 'prism_tour_seen_v1'

type Props = {
  onComplete: () => void
}

export function OnboardingTour({ onComplete }: Props) {
  const [stepIndex, setStepIndex] = useState(0)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const [windowSize, setWindowSize] = useState({ w: typeof window !== 'undefined' ? window.innerWidth : 1280, h: typeof window !== 'undefined' ? window.innerHeight : 800 })

  const step = steps[stepIndex]

  // step 변경 시 target 측정 + scroll
  useEffect(() => {
    const measure = () => {
      const el = document.querySelector(step.selector) as HTMLElement | null
      if (!el) {
        setRect(null)
        return
      }
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // scroll 끝나길 짧게 대기 후 측정
      window.setTimeout(() => {
        setRect(el.getBoundingClientRect())
      }, 350)
    }
    measure()
    const handler = () => {
      const el = document.querySelector(step.selector) as HTMLElement | null
      if (el) setRect(el.getBoundingClientRect())
      setWindowSize({ w: window.innerWidth, h: window.innerHeight })
    }
    window.addEventListener('resize', handler)
    window.addEventListener('scroll', handler, { passive: true })
    return () => {
      window.removeEventListener('resize', handler)
      window.removeEventListener('scroll', handler)
    }
  }, [step.selector])

  const next = () => {
    if (stepIndex < steps.length - 1) setStepIndex(stepIndex + 1)
    else complete()
  }

  const complete = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    onComplete()
  }

  const skip = () => complete()

  if (!rect) {
    // target이 아직 측정 안 된 상태에선 dim만 표시
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9990] bg-black/55 pointer-events-auto"
      />
    )
  }

  const PADDING = 12
  const spotlightTop = rect.top - PADDING
  const spotlightLeft = rect.left - PADDING
  const spotlightWidth = rect.width + PADDING * 2
  const spotlightHeight = rect.height + PADDING * 2

  // 가이드 카드 위치 계산
  const CARD_HEIGHT = 220
  const cardTop =
    step.cardPosition === 'top'
      ? Math.max(spotlightTop - CARD_HEIGHT - 16, 16)
      : Math.min(spotlightTop + spotlightHeight + 16, windowSize.h - CARD_HEIGHT - 16)

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] pointer-events-auto">
        {/* spotlight cutout — box-shadow 9999px로 외곽 어둡게 */}
        <motion.div
          key={`spot-${stepIndex}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            top: spotlightTop,
            left: spotlightLeft,
            width: spotlightWidth,
            height: spotlightHeight,
            boxShadow: '0 0 0 9999px rgba(20, 20, 18, 0.62)',
            borderRadius: 16,
            border: '2px solid #5B4FE5',
            pointerEvents: 'none',
            zIndex: 9991,
          }}
        />

        {/* 가이드 카드 */}
        <motion.div
          key={`card-${stepIndex}`}
          initial={{ opacity: 0, y: step.cardPosition === 'top' ? 20 : -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="fixed z-[9992] w-[min(440px,calc(100vw-2rem))]"
          style={{
            top: cardTop,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div className="bg-paper rounded-card border border-white/60 shadow-card-hover p-6">
            {/* 진행 indicator */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === stepIndex
                        ? 'w-6 bg-indigo'
                        : i < stepIndex
                        ? 'w-1.5 bg-indigo/40'
                        : 'w-1.5 bg-rule'
                    }`}
                  />
                ))}
              </div>
              <span className="font-inter text-[10.5px] tabular-nums uppercase tracking-[0.16em] text-ink-3">
                {stepIndex + 1} / {steps.length}
              </span>
            </div>

            {/* 콘텐츠 */}
            <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-indigo-deep mb-2">
              {step.eyebrow}
            </p>
            <h3 className="text-[18px] font-bold text-ink leading-tight mb-2">
              {step.title}
            </h3>
            <p className="text-[13.5px] text-ink-2 leading-[1.7] mb-5">
              {step.body}
            </p>

            {/* 버튼 */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={skip}
                className="text-[12.5px] font-medium text-ink-4 hover:text-ink-3 transition-colors"
              >
                건너뛰기
              </button>
              <button
                onClick={next}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-button bg-indigo text-paper font-medium text-[13px] hover:bg-indigo-deep transition-colors shadow-card"
              >
                {stepIndex === steps.length - 1 ? (
                  <>
                    <Sparkles size={13} />
                    <span>시작하기</span>
                  </>
                ) : (
                  <>
                    <span>다음</span>
                    <ArrowRight size={13} />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

/**
 * Hook — 첫 방문 여부 체크.
 */
export function useFirstVisit(): { active: boolean; close: () => void; reopen: () => void } {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY)
    if (!seen) {
      // 짧은 지연 후 시작 (페이지 그려진 후)
      const t = window.setTimeout(() => setActive(true), 700)
      return () => window.clearTimeout(t)
    }
  }, [])

  return {
    active,
    close: () => setActive(false),
    reopen: () => {
      localStorage.removeItem(STORAGE_KEY)
      setActive(true)
    },
  }
}
