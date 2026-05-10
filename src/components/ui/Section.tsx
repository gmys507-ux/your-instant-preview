import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title?: string
  rightSlot?: ReactNode
  children: ReactNode
  className?: string
  id?: string
}

/**
 * Standard dashboard section block.
 * Eyebrow (mono uppercase) + Title (Pretendard or Fraunces) + content
 */
export function Section({ eyebrow, title, rightSlot, children, className = '', id }: Props) {
  return (
    <section id={id} className={`mb-10 ${className}`}>
      {(eyebrow || title || rightSlot) && (
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            {eyebrow && (
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 leading-4 mb-2">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-[18px] font-semibold text-ink leading-tight">
                {title}
              </h2>
            )}
          </div>
          {rightSlot && <div className="shrink-0">{rightSlot}</div>}
        </div>
      )}
      {children}
    </section>
  )
}
