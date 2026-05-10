import { useNavigate } from 'react-router-dom'
import { Image as ImageIcon, BarChart3, Download, Send, ArrowRight } from 'lucide-react'
import type { ReviewSection6 } from '../../../lib/types'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  image: ImageIcon,
  'chart-bar': BarChart3,
  download: Download,
  send: Send,
}

export function ActionChipsSection({ data, delay = 0 }: { data: ReviewSection6; delay?: number }) {
  const navigate = useNavigate()

  const handleAction = (type: string, label: string) => {
    if (type === 'navigate_to_gallery') navigate('/gallery')
    else if (type === 'navigate_to_dashboard') navigate('/dashboard')
    else alert(`${label}\n\n시연용 placeholder — 실제 연동은 추후.`)
  }

  return (
    <section
      className="bg-paper/85 backdrop-blur-md border border-white/60 rounded-card shadow-card p-6 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-indigo-deep mb-1.5">
        {data.label}
      </p>
      <h3 className="text-[18px] font-bold text-ink leading-tight mb-5">
        다음 액션
      </h3>

      <div className="grid grid-cols-2 gap-2">
        {data.actions.map((a, i) => {
          const Icon = iconMap[a.icon] ?? ArrowRight
          const isPrimary = a.type === 'navigate_to_gallery' || a.type === 'navigate_to_dashboard'
          return (
            <button
              key={i}
              onClick={() => handleAction(a.type, a.label)}
              className={`group text-left p-4 rounded-card border transition-all duration-200 ${
                isPrimary
                  ? 'bg-indigo-bg/60 border-indigo/20 hover:bg-indigo-bg hover:border-indigo/40 hover:-translate-y-0.5'
                  : 'bg-bg-2/60 border-rule-light hover:bg-bg-2 hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isPrimary
                        ? 'bg-indigo text-paper'
                        : 'bg-paper text-ink-2 border border-rule-light'
                    }`}
                  >
                    <Icon size={14} />
                  </div>
                  <span className={`text-[13px] font-medium ${isPrimary ? 'text-indigo-deep' : 'text-ink-2'}`}>
                    {a.label}
                  </span>
                </div>
                <ArrowRight
                  size={13}
                  className={`shrink-0 group-hover:translate-x-0.5 transition-transform ${
                    isPrimary ? 'text-indigo' : 'text-ink-4'
                  }`}
                />
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
