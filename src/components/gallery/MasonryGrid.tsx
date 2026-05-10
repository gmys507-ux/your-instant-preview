import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

/**
 * Pinterest-style masonry — CSS columns 기반 (가벼움, lib 불필요).
 * 각 자식 컴포넌트는 break-inside-avoid 클래스 사용 권장.
 */
export function MasonryGrid({ children }: Props) {
  return (
    <div
      className="columns-1 sm:columns-2 xl:columns-3 gap-4"
      style={{ columnFill: 'balance' }}
    >
      {children}
    </div>
  )
}
