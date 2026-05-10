import { AnimatePresence, motion } from 'framer-motion'
import { X, Send, Sparkles } from 'lucide-react'
import { Eyebrow } from '../ui/Eyebrow'

const suggestionsByPath: Record<string, string[]> = {
  '/': [
    '오늘 마케팅팀이 알아야 할 것은?',
    '어제 대비 ROAS 변화 요약',
    '검수 대기 중 가장 시급한 것',
    '이번 주 트렌드 키워드 3개',
  ],
  '/gallery': [
    '이 광고들의 공통 패턴은?',
    'Before/After 컨셉 변형 5개',
    '30대 여성 타겟 후크 추천',
    '경쟁사 GLOWTH 최근 동향',
  ],
  '/assistant': [
    '이 카피, 우리 가이드와 얼마나 일치해?',
    '타율 상위 콘텐츠 패턴 비교',
    '소구점 보강 방향 제안',
    'CTA 권유형 변형 3개',
  ],
  '/dashboard': [
    '지난주 대비 ROAS 떨어진 원인?',
    'D7 retention 개선 코호트',
    '광고비 효율 가장 좋은 채널',
    '신규 가입자 세그먼트 분해',
  ],
}

const labelByPath: Record<string, string> = {
  '/': '홈',
  '/gallery': '갤러리',
  '/assistant': '어시스턴트',
  '/dashboard': '대시보드',
}

type Props = {
  open: boolean
  onClose: () => void
  currentPath: string
}

export function AISidePanel({ open, onClose, currentPath }: Props) {
  const suggestions = suggestionsByPath[currentPath] ?? suggestionsByPath['/']
  const contextLabel = labelByPath[currentPath] ?? '홈'

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
          />

          {/* 우측 슬라이드인 패널 */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 h-screen w-[400px] bg-paper border-l border-rule z-50 flex flex-col shadow-card"
          >
            {/* 헤더 */}
            <header className="h-14 border-b border-rule px-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-indigo" />
                <span className="font-serif italic text-body-lg text-ink">
                  AI Assistant
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="닫기"
                className="text-ink-3 hover:text-ink p-1 rounded-md hover:bg-bg-2 transition-colors"
              >
                <X size={18} />
              </button>
            </header>

            {/* 추천 질문 영역 */}
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <Eyebrow>Suggested · {contextLabel}</Eyebrow>
              <div className="mt-4 space-y-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    className="w-full text-left p-4 rounded-card border border-rule hover:border-indigo hover:bg-indigo-bg transition-colors duration-200"
                  >
                    <span className="text-body-sm text-ink-2 leading-snug">
                      {s}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 채팅 입력 영역 */}
            <footer className="border-t border-rule p-3 shrink-0">
              <div className="flex items-end gap-2 bg-bg-2 rounded-card p-3 border border-rule">
                <textarea
                  rows={2}
                  placeholder="자유롭게 물어보세요"
                  className="flex-1 bg-transparent text-body-sm placeholder:text-ink-4 resize-none outline-none text-ink"
                />
                <button
                  className="w-8 h-8 rounded-lg bg-indigo text-paper flex items-center justify-center shrink-0 hover:bg-indigo-deep transition-colors"
                  aria-label="보내기"
                >
                  <Send size={14} />
                </button>
              </div>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
