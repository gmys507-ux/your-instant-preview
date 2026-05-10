import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export function Eyebrow({ children, className = '' }: Props) {
  return (
    <p
      className={`font-mono text-eyebrow uppercase tracking-[0.16em] text-ink-3 ${className}`}
    >
      {children}
    </p>
  )
}
