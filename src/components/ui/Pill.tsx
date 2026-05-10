import type { ReactNode } from 'react'

type Variant = 'default' | 'success' | 'indigo' | 'warning' | 'danger'

const variants: Record<Variant, string> = {
  default: 'bg-bg-2 text-ink-3 border-rule',
  success: 'bg-success-bg text-success-deep border-rule',
  indigo: 'bg-indigo-bg text-indigo-deep border-rule',
  warning: 'bg-warning-bg text-warning-deep border-rule',
  danger: 'bg-danger-bg text-danger-deep border-rule',
}

type Props = {
  children: ReactNode
  variant?: Variant
  className?: string
}

export function Pill({ children, variant = 'default', className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-meta font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
