import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
}

export function Card({ children, className = '', onClick, hover = true }: Props) {
  const hoverClass = hover
    ? 'hover:-translate-y-0.5 hover:shadow-card transition-all duration-200 ease-out-soft'
    : ''
  const clickable = onClick ? 'cursor-pointer' : ''
  return (
    <div
      onClick={onClick}
      className={`bg-paper border border-rule rounded-card p-6 ${hoverClass} ${clickable} ${className}`}
    >
      {children}
    </div>
  )
}
