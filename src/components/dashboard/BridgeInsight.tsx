import { Link2 } from 'lucide-react'

type Props = {
  text: string
}

export function BridgeInsight({ text }: Props) {
  return (
    <div
      className="rounded-card p-5 border"
      style={{
        background:
          'linear-gradient(135deg, #E8E5FB 0%, #F4ECFF 50%, #FBE4EF 100%)',
        borderColor: 'rgba(91, 79, 229, 0.18)',
      }}
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-paper/70 backdrop-blur-sm border border-white/60 flex items-center justify-center shrink-0 mt-0.5">
          <Link2 size={16} className="text-indigo" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-indigo-deep mb-1.5">
            BRIDGE INSIGHT · 인과 ↔ 유저 데이터
          </p>
          <p className="text-[14.5px] text-ink leading-[1.7] font-medium">{text}</p>
        </div>
      </div>
    </div>
  )
}
