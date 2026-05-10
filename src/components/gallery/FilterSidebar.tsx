import { Search, X } from 'lucide-react'
import type { FilterState, Platform } from '../../lib/types'
import { PlatformIcon } from './PlatformIcon'

type Props = {
  filters: FilterState
  setFilters: (next: FilterState) => void
  facets: {
    brands: string[]
    platforms: Platform[]
    countries: string[]
    channels: string[]
    tags: string[]
  }
  totalCount: number
  filteredCount: number
}

export function FilterSidebar({ filters, setFilters, facets, totalCount, filteredCount }: Props) {
  const toggleSet = <T,>(key: keyof FilterState, value: T) => {
    const setVal = filters[key] as Set<T>
    const next = new Set(setVal)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    setFilters({ ...filters, [key]: next })
  }

  const clearAll = () => {
    setFilters({
      query: '',
      brands: new Set(),
      platforms: new Set(),
      countries: new Set(),
      channels: new Set(),
      tags: new Set(),
    })
  }

  const hasActive =
    filters.query ||
    filters.brands.size +
      filters.platforms.size +
      filters.countries.size +
      filters.channels.size +
      filters.tags.size >
      0

  return (
    <aside className="w-[260px] shrink-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="bg-paper/85 backdrop-blur-md border border-white/60 rounded-card shadow-card p-5 space-y-5">
        {/* 검색 */}
        <div>
          <label className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ink-3 leading-4 block mb-2">
            검색
          </label>
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-4 pointer-events-none"
            />
            <input
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              placeholder="브랜드 · 카피 · 컨셉"
              className="w-full pl-9 pr-3 py-2 rounded-button bg-white/60 border border-rule-light text-[13px] text-ink placeholder:text-ink-4 focus:outline-none focus:bg-paper focus:border-indigo transition-colors"
            />
          </div>
        </div>

        {/* 카운트 + 클리어 */}
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-inter text-ink-3 tabular-nums">
            {filteredCount === totalCount ? (
              <>{totalCount}개 광고</>
            ) : (
              <>
                <span className="font-semibold text-ink">{filteredCount}</span> / {totalCount}개
              </>
            )}
          </span>
          {hasActive && (
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-0.5 text-indigo hover:text-indigo-deep font-medium transition-colors"
            >
              <X size={12} />
              초기화
            </button>
          )}
        </div>

        {/* 플랫폼 */}
        <FilterGroup label="플랫폼">
          {facets.platforms.map((p) => (
            <FilterChip
              key={p}
              active={filters.platforms.has(p)}
              onClick={() => toggleSet('platforms', p)}
            >
              <PlatformIcon platform={p} size={11} />
              {p}
            </FilterChip>
          ))}
        </FilterGroup>

        {/* 브랜드 */}
        <FilterGroup label="브랜드">
          {facets.brands.map((b) => (
            <FilterChip
              key={b}
              active={filters.brands.has(b)}
              onClick={() => toggleSet('brands', b)}
            >
              {b}
            </FilterChip>
          ))}
        </FilterGroup>

        {/* 채널 */}
        <FilterGroup label="채널">
          {facets.channels.map((c) => (
            <FilterChip
              key={c}
              active={filters.channels.has(c)}
              onClick={() => toggleSet('channels', c)}
            >
              {c}
            </FilterChip>
          ))}
        </FilterGroup>

        {/* 국가 */}
        <FilterGroup label="국가">
          {facets.countries.map((c) => (
            <FilterChip
              key={c}
              active={filters.countries.has(c)}
              onClick={() => toggleSet('countries', c)}
            >
              {c}
            </FilterChip>
          ))}
        </FilterGroup>

        {/* 태그 (상위 8개만) */}
        <FilterGroup label="카테고리">
          {facets.tags.slice(0, 12).map((t) => (
            <FilterChip
              key={t}
              active={filters.tags.has(t)}
              onClick={() => toggleSet('tags', t)}
            >
              {t}
            </FilterChip>
          ))}
        </FilterGroup>
      </div>
    </aside>
  )
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ink-3 leading-4 mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] font-medium font-inter transition-all ${
        active
          ? 'bg-indigo text-paper border border-indigo shadow-card'
          : 'bg-white/60 text-ink-2 border border-rule-light hover:bg-paper hover:border-indigo/40'
      }`}
    >
      {children}
    </button>
  )
}
