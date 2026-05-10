import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import adsData from '../data/ads.json'
import type { Ad, FilterState, Platform } from '../lib/types'
import { initialFilterState } from '../lib/types'
import { Section } from '../components/ui/Section'
import { FilterSidebar } from '../components/gallery/FilterSidebar'
import { MasonryGrid } from '../components/gallery/MasonryGrid'
import { AdCard } from '../components/gallery/AdCard'
import { DetailPanel } from '../components/gallery/DetailPanel'
import { PatternAnalysisModal } from '../components/gallery/PatternAnalysisModal'

const ads = adsData as Ad[]

export function GalleryPage() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<FilterState>(initialFilterState())
  const [detailAd, setDetailAd] = useState<Ad | null>(null)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [patternOpen, setPatternOpen] = useState(false)

  // facets — 데이터에서 자동 추출 + 정렬
  const facets = useMemo(() => {
    const brands = [...new Set(ads.map((a) => a.brand))].sort()
    const platforms = [...new Set(ads.map((a) => a.platform))] as Platform[]
    const countries = [...new Set(ads.map((a) => a.country))].sort()
    const channels = [...new Set(ads.map((a) => a.channel))].sort()
    const tagFreq = new Map<string, number>()
    ads.forEach((a) => a.tags.forEach((t) => tagFreq.set(t, (tagFreq.get(t) ?? 0) + 1)))
    const tags = [...tagFreq.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([t]) => t)
    return { brands, platforms, countries, channels, tags }
  }, [])

  // 필터링
  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    return ads.filter((ad) => {
      if (q) {
        const haystack = `${ad.brand} ${ad.product} ${ad.copy_hook} ${ad.concept} ${ad.tags.join(
          ' ',
        )}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      if (filters.brands.size > 0 && !filters.brands.has(ad.brand)) return false
      if (filters.platforms.size > 0 && !filters.platforms.has(ad.platform)) return false
      if (filters.countries.size > 0 && !filters.countries.has(ad.country)) return false
      if (filters.channels.size > 0 && !filters.channels.has(ad.channel)) return false
      if (filters.tags.size > 0 && !ad.tags.some((t) => filters.tags.has(t))) return false
      return true
    })
  }, [filters])

  const selectedAds = ads.filter((a) => selected.has(a.id))

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  const clearSelection = () => setSelected(new Set())

  const sendToAssistant = (label: string) => {
    // 시연용 — 실제 컨텍스트 전달은 Round 3 ModuleContext에서 구현
    alert(
      `${label}\n\n어시스턴트로 컨텍스트 전달 (시연용 placeholder).\n\n선택된 광고: ${selectedAds
        .map((a) => `${a.brand} - ${a.product}`)
        .join(', ') || (detailAd ? `${detailAd.brand} - ${detailAd.product}` : '')}`,
    )
    setPatternOpen(false)
    setDetailAd(null)
    navigate('/assistant')
  }

  return (
    <div className="px-8 mt-8 pb-20">
      {/* 헤더 */}
      <Section
        eyebrow="GALLERY · COMPETITOR FEED"
        title="경쟁사 광고 갤러리"
        rightSlot={
          <span className="font-inter text-[12px] text-ink-3 tabular-nums">
            {filtered.length}/{ads.length}개
          </span>
        }
      >
        <p className="text-[14px] text-ink-3 leading-relaxed -mt-3 mb-6 max-w-3xl">
          Instagram · TikTok · YouTube · Meta의 D2C 뷰티/건기식 광고를 한 곳에서 탐색.
          카드를 다중 선택하면 AI가 공통 패턴을 분석합니다.
        </p>
      </Section>

      {/* 좌 사이드바 + 우 그리드 */}
      <div className="flex gap-6 items-start">
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          facets={facets}
          totalCount={ads.length}
          filteredCount={filtered.length}
        />

        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="bg-paper/85 backdrop-blur-md border border-white/60 rounded-card p-16 text-center shadow-card">
              <p className="text-[14px] text-ink-3">
                필터 조건에 맞는 광고가 없어요.
                <br />
                좌측 필터를 초기화해보세요.
              </p>
            </div>
          ) : (
            <MasonryGrid>
              {filtered.map((ad, i) => (
                <AdCard
                  key={ad.id}
                  ad={ad}
                  selected={selected.has(ad.id)}
                  onClick={() => setDetailAd(ad)}
                  onToggleSelect={(e) => toggleSelect(ad.id, e)}
                  delay={Math.min(i * 30, 600)}
                />
              ))}
            </MasonryGrid>
          )}
        </div>
      </div>

      {/* 하단 floating 액션바 — 선택 1개+ 시 노출 */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 24, stiffness: 220 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-2 rounded-full bg-ink/95 backdrop-blur-md text-paper shadow-card-hover border border-white/10"
          >
            <span className="font-inter text-[12.5px] font-medium pl-2 tabular-nums">
              {selected.size}개 선택됨
            </span>
            <button
              onClick={clearSelection}
              aria-label="선택 해제"
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={14} />
            </button>
            <div className="w-px h-5 bg-white/15 mx-1" />
            <button
              onClick={() => setPatternOpen(true)}
              disabled={selected.size < 2}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo text-paper text-[13px] font-medium hover:bg-indigo-deep disabled:opacity-50 disabled:hover:bg-indigo transition-colors"
            >
              <Sparkles size={13} />
              <span>AI 패턴 분석</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 디테일 패널 */}
      <DetailPanel
        ad={detailAd}
        onClose={() => setDetailAd(null)}
        onSendToAssistant={() => sendToAssistant('이 광고로 우리 콘텐츠 만들기')}
      />

      {/* 패턴 분석 모달 */}
      <PatternAnalysisModal
        open={patternOpen}
        ads={selectedAds}
        onClose={() => setPatternOpen(false)}
        onSendToAssistant={() => sendToAssistant('패턴 기반 어시스턴트 기획')}
      />
    </div>
  )
}
