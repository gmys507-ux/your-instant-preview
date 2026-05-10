import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

const paddingClass = {
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
} as const

/**
 * Production-grade card. 12px radius, subtle baseline shadow,
 * stronger shadow + lift on hover (when interactive).
 */
export function Card({ children, className = '', onClick, hover = true, padding = 'lg' }: Props) {
  const interactive = onClick && hover
  const hoverClass = interactive
    ? 'hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer'
    : ''
  return (
    <div
      onClick={onClick}
      className={`bg-paper border border-rule rounded-card ${paddingClass[padding]} shadow-card transition-all duration-200 ease-out-soft ${hoverClass} ${className}`}
    >
      {children}
    </div>
  )
}
