import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CausalSankey } from './CausalSankey'
import { CausalNodeGraph } from './CausalNodeGraph'
import { CausalFunnel } from './CausalFunnel'
import { CausalMultiLayer } from './CausalMultiLayer'
import type { DashboardData } from '../../lib/types'

type TabKey = 'sankey' | 'node' | 'funnel' | 'multi'

const tabs: { key: TabKey; label: string; sub: string }[] = [
  { key: 'sankey', label: '가 · Sankey', sub: '흐름량 시각화' },
  { key: 'node', label: '나 · 노드 그래프', sub: '레이어드 노드' },
  { key: 'funnel', label: '다 · Funnel + 분기', sub: '단계별 전환' },
  { key: 'multi', label: '라 · 멀티-레이어', sub: '4 레이어 인과' },
]

type Props = {
  data: DashboardData['causal_decomposition']
}

export function CausalDecomposition({ data }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('sankey')

  return (
    <div className="bg-paper/85 backdrop-blur-md border border-white/60 rounded-card shadow-card p-6">
      {/* 헤더 */}
      <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
        <div>
          <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-indigo-deep mb-1.5">
            CAUSAL DECOMPOSITION
          </p>
          <h2 className="text-[18px] font-bold text-ink leading-tight">
            결과 → 선행 지표 인과 분해
          </h2>
        </div>

        {/* 탭 pill 그룹 */}
        <div className="flex items-center gap-1 p-1 bg-bg-2 rounded-full border border-rule-light">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                activeTab === t.key
                  ? 'bg-indigo text-paper shadow-card'
                  : 'text-ink-3 hover:text-ink hover:bg-paper/50'
              }`}
              title={t.sub}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 시각화 영역 */}
      <div className="bg-bg-2/40 border border-rule-light rounded-card overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full"
            style={{ height: 360 }}
          >
            {activeTab === 'sankey' && <CausalSankey data={data.sankey} />}
            {activeTab === 'node' && <CausalNodeGraph data={data.sankey} />}
            {activeTab === 'funnel' && <CausalFunnel stages={data.funnel.stages} />}
            {activeTab === 'multi' && <CausalMultiLayer layers={data.multi_layer.layers} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 탭 부제 */}
      <p className="text-[12px] text-ink-3 mt-3 text-center">
        {tabs.find((t) => t.key === activeTab)?.sub} · 모든 시각화는 같은 데이터 소스
      </p>
    </div>
  )
}
