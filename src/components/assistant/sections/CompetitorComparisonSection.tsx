import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { ReviewSection4 } from '../../../lib/types'
import { Badge } from '../../ui/Badge'
import { PlatformIcon } from '../../gallery/PlatformIcon'

function gradientFor(adId: string): string {
  const palettes = [
    ['#E8E5FB', '#FBE4EF'],
    ['#DCD7FA', '#F4ECFF'],
    ['#FBE4EF', '#FEF3C7'],
    ['#DEF5EB', '#E8E5FB'],
    ['#F4ECFF', '#FBE4E4'],
    ['#FBEEDA', '#FBE4EF'],
    ['#E8E5FB', '#DEF5EB'],
    ['#DCD7FA', '#FEF3C7'],
  ]
  const hash = adId.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const [c1, c2] = palettes[hash % palettes.length]
  const angle = (hash * 47) % 360
  return `linear-gradient(${angle}deg, ${c1} 0%, ${c2} 100%)`
}

export function CompetitorComparisonSection({
  data,
  delay = 0,
}: {
  data: ReviewSection4
  delay?: number
}) {
  const navigate = useNavigate()

  return (
    <section
      className="bg-paper/85 backdrop-blur-md border border-white/60 rounded-card shadow-card p-6 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-indigo-deep mb-1.5">
        {data.label}
      </p>
      <h3 className="text-[18px] font-bold text-ink leading-tight mb-1">
        타사 콘텐츠 비교
      </h3>
      <p className="text-[12.5px] text-ink-3 leading-relaxed mb-5">{data.subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {data.items.map((item, i) => (
          <div
            key={i}
            className="group bg-paper border border-rule-light rounded-lg overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            onClick={() => navigate('/gallery')}
          >
            <div
              className="relative h-32 flex items-center justify-center"
              style={{ background: gradientFor(item.ad_id) }}
            >
              <div className="w-12 h-12 rounded-full bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center text-ink-2 group-hover:bg-white/70 transition-colors">
                <PlatformIcon platform={item.platform} size={20} />
              </div>
              <span className="absolute top-2 right-2 font-inter text-[10px] font-semibold uppercase tracking-wide text-ink-2 bg-white/85 px-2 py-0.5 rounded-md backdrop-blur-sm tabular-nums">
                유사도 {item.similarity_score}%
              </span>
            </div>

            <div className="p-3">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-inter text-[10.5px] font-bold uppercase tracking-[0.5px] text-ink-2">
                  {item.brand}
                </span>
                <span className="font-inter text-[10px] text-ink-3 tabular-nums">
                  {item.running_days}일
                </span>
              </div>
              <p className="text-[12px] font-medium text-ink mb-2 line-clamp-1">
                {item.product}
              </p>
              <p className="text-[11.5px] text-ink-3 leading-relaxed mb-2 line-clamp-2">
                {item.key_pattern}
              </p>
              <div className="pt-2 border-t border-rule-light flex items-center justify-between gap-2">
                <Badge tone="indigo">
                  <span className="text-[9.5px] uppercase">차별화</span>
                </Badge>
                <ArrowUpRight
                  size={12}
                  className="text-ink-4 group-hover:text-indigo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0"
                />
              </div>
              <p className="text-[11px] text-ink-2 italic font-serif leading-snug mt-1.5">
                {item.differentiator}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
