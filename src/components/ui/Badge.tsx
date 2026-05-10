import type { ReactNode } from 'react'

type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'indigo'

const toneClass: Record<Tone, string> = {
  neutral: 'text-ink-3 bg-bg-2',
  success: 'text-success-deep bg-success-bg',
  warning: 'text-warning-deep bg-warning-bg',
  danger: 'text-danger-deep bg-danger-bg',
  indigo: 'text-indigo-deep bg-indigo-bg',
}

type Props = {
  tone?: Tone
  children: ReactNode
  className?: string
}

/**
 * Production-grade small status badge.
 * 11px Inter tabular-nums, 12px radius, semantic tone.
 * 사용 예: <Badge tone="success">↑ 12%</Badge>
 */
export function Badge({ tone = 'neutral', children, className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-badge font-inter text-[11px] font-semibold leading-4 tabular-nums ${toneClass[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
