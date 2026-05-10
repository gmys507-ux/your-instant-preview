import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const variants: Record<Variant, string> = {
  primary: 'bg-indigo text-paper hover:bg-indigo-deep',
  secondary: 'bg-paper text-ink border border-rule hover:bg-bg-2',
  ghost: 'bg-transparent text-ink-2 hover:bg-bg-2',
}

type Props = {
  children: ReactNode
  variant?: Variant
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
}

export function Button({ children, variant = 'primary', onClick, className = '', type = 'button' }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg font-medium text-body-sm transition-colors duration-200 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
