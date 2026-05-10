import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'glass'
}

const paddingClass = {
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
} as const

/**
 * Production-grade card with two variants:
 * - solid: opaque white, traditional
 * - glass: semi-transparent + backdrop-blur (over gradient bg)
 */
export function Card({
  children,
  className = '',
  onClick,
  hover = true,
  padding = 'lg',
  variant = 'glass',
}: Props) {
  const interactive = onClick && hover
  const hoverClass = interactive
    ? 'hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer hover:bg-paper'
    : ''

  const variantClass =
    variant === 'glass'
      ? 'bg-paper/85 border border-white/60 backdrop-blur-md'
      : 'bg-paper border border-rule'

  return (
    <div
      onClick={onClick}
      className={`${variantClass} rounded-card ${paddingClass[padding]} shadow-card transition-all duration-200 ease-out-soft ${hoverClass} ${className}`}
    >
      {children}
    </div>
  )
}
