import { Check } from 'lucide-react'
import type { Ad } from '../../lib/types'
import { Badge } from '../ui/Badge'
import { PlatformIcon } from './PlatformIcon'

type Props = {
  ad: Ad
  selected: boolean
  onClick: () => void
  onToggleSelect: (e: React.MouseEvent) => void
  delay?: number
}

/**
 * Ad ID hash → unique gradient placeholder for thumbnail
 * (실제 광고 이미지는 푸우가 /public/ads/에 추가)
 */
function gradientFor(adId: string): string {
  // 단순 hash → 인디고/핑크/라벤더 spectrum
  const palettes = [
    ['#E8E5FB', '#FBE4EF'], // 인디고-핑크
    ['#DCD7FA', '#F4ECFF'], // 라벤더 light
    ['#FBE4EF', '#FEF3C7'], // 핑크-amber
    ['#DEF5EB', '#E8E5FB'], // 그린-인디고
    ['#F4ECFF', '#FBE4E4'], // 라벤더-rose
    ['#FBEEDA', '#FBE4EF'], // amber-핑크
    ['#E8E5FB', '#DEF5EB'], // 인디고-그린
    ['#DCD7FA', '#FEF3C7'], // 라벤더-amber
  ]
  const hash = adId.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const [c1, c2] = palettes[hash % palettes.length]
  const angle = (hash * 47) % 360
  return `linear-gradient(${angle}deg, ${c1} 0%, ${c2} 100%)`
}

/**
 * Pinterest-style masonry ad card.
 * 썸네일 placeholder (gradient) + 메타 정보 + alignment_score pill.
 */
export function AdCard({ ad, selected, onClick, onToggleSelect, delay = 0 }: Props) {
  const scoreTone =
    ad.alignment_score >= 80
      ? 'success'
      : ad.alignment_score >= 60
      ? 'warning'
      : 'danger'

  // 썸네일 높이를 ad 길이에 따라 변동 (masonry 효과)
  const heightVariants = ['h-44', 'h-52', 'h-56', 'h-48', 'h-60']
  const hash = ad.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const heightClass = heightVariants[hash % heightVariants.length]

  return (
    <div
      onClick={onClick}
      className={`group relative bg-paper/85 border backdrop-blur-md rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer animate-fade-in-up break-inside-avoid mb-4 ${
        selected ? 'border-indigo ring-2 ring-indigo/40' : 'border-white/60 hover:border-white/80'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* 체크박스 (호버 또는 선택 상태에서 노출) */}
      <button
        onClick={onToggleSelect}
        aria-label={selected ? '선택 해제' : '선택'}
        className={`absolute top-3 right-3 z-10 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
          selected
            ? 'bg-indigo border-indigo text-white opacity-100'
            : 'bg-white/85 border-white text-transparent opacity-0 group-hover:opacity-100 hover:bg-paper'
        }`}
      >
        <Check size={14} strokeWidth={3} />
      </button>

      {/* 썸네일 (gradient placeholder) */}
      <div
        className={`relative w-full ${heightClass} overflow-hidden`}
        style={{ background: gradientFor(ad.id) }}
      >
        {/* 중앙 플랫폼 아이콘 (호버 시 강조) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center text-ink-2 group-hover:bg-white/70 group-hover:scale-110 transition-all">
            <PlatformIcon platform={ad.platform} size={20} />
          </div>
        </div>

        {/* 우상단: 운영 일수 */}
        <div className="absolute top-3 left-3">
          <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-2 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-md">
            {ad.metrics.running_days}일째
          </span>
        </div>

        {/* 좌하단: 카피 hook (이미지 위 오버레이) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/35 via-black/15 to-transparent">
          <p className="text-white text-[13px] font-semibold leading-snug line-clamp-2 drop-shadow-sm">
            {ad.copy_hook}
          </p>
        </div>
      </div>

      {/* 카드 하단 메타 */}
      <div className="p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-inter text-[10.5px] font-bold uppercase tracking-[0.5px] text-ink-2">
            {ad.brand}
          </span>
          <Badge tone={scoreTone}>
            <span className="tabular-nums">{ad.alignment_score}</span>
          </Badge>
        </div>

        <p className="text-[12px] text-ink-3 mb-2 line-clamp-1">{ad.product}</p>

        <p className="text-[12.5px] italic text-ink-2 leading-snug font-serif line-clamp-2 mb-3">
          {ad.concept}
        </p>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-bg-2 text-[10px] font-medium text-ink-3 font-inter">
            <PlatformIcon platform={ad.platform} size={9} />
            {ad.platform}
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-bg-2 text-[10px] font-medium text-ink-3 font-inter">
            {ad.channel}
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-bg-2 text-[10px] font-medium text-ink-3 font-inter tabular-nums">
            {ad.metrics.engagement_rate}
          </span>
        </div>
      </div>
    </div>
  )
}
