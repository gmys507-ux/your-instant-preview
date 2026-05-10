import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import reviewData from '../data/review.json'
import type { ReviewResult } from '../lib/types'
import { ChatEntry } from '../components/assistant/ChatEntry'
import { ResultWorkspace } from '../components/assistant/ResultWorkspace'

const review = reviewData as ReviewResult

type State = 'entry' | 'loading' | 'result'

export function AssistantPage() {
  const [state, setState] = useState<State>('entry')

  const startReview = () => {
    setState('loading')
    // 시연용 — 0.6초 후 결과 reveal
    window.setTimeout(() => setState('result'), 600)
  }

  const reset = () => setState('entry')

  return (
    <AnimatePresence mode="wait">
      {state === 'entry' && (
        <motion.div
          key="entry"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChatEntry onStartReview={startReview} />
        </motion.div>
      )}

      {state === 'loading' && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center min-h-[60vh]"
        >
          <div className="text-center">
            <div className="inline-block w-10 h-10 rounded-full border-2 border-indigo border-t-transparent animate-spin mb-4" />
            <p className="text-[14px] text-ink-3">검수 중...</p>
            <p className="text-[12px] text-ink-4 mt-1">사내 가이드 + 타율 패턴과 대조</p>
          </div>
        </motion.div>
      )}

      {state === 'result' && (
        <motion.div
          key="result"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ResultWorkspace data={review} onReset={reset} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
