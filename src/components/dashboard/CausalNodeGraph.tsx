import type { SankeyData } from '../../lib/types'

type Props = {
  data: SankeyData
  width?: number
  height?: number
}

/**
 * 노드 그래프 — 단순화된 left-to-right layered layout
 * (force layout 대신 layer 기반 정적 위치로 더 빠르고 가독성 ↑)
 */
export function CausalNodeGraph({ data, width = 720, height = 320 }: Props) {
  const layers = new Map<number, typeof data.nodes>()
  data.nodes.forEach((n) => {
    if (!layers.has(n.layer)) layers.set(n.layer, [])
    layers.get(n.layer)!.push(n)
  })

  const layerKeys = [...layers.keys()].sort((a, b) => a - b)
  const colWidth = (width - 80) / Math.max(1, layerKeys.length - 1)
  const positions = new Map<string, { x: number; y: number }>()

  layerKeys.forEach((layerKey, li) => {
    const nodes = layers.get(layerKey)!
    const x = 40 + li * colWidth
    nodes.forEach((n, ni) => {
      const y = ((ni + 1) * height) / (nodes.length + 1)
      positions.set(n.id, { x, y })
    })
  })

  const maxValue = Math.max(...data.links.map((l) => l.value))

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <defs>
        <marker
          id="arrow"
          viewBox="0 -5 10 10"
          refX="10"
          refY="0"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0,-5L10,0L0,5" fill="#5B4FE5" opacity="0.6" />
        </marker>
      </defs>

      {/* Edges */}
      {data.links.map((link, i) => {
        const s = positions.get(link.source)
        const t = positions.get(link.target)
        if (!s || !t) return null
        const strokeWidth = 1 + (link.value / maxValue) * 5
        const cx = (s.x + t.x) / 2
        const path = `M${s.x + 14},${s.y} C${cx},${s.y} ${cx},${t.y} ${t.x - 14},${t.y}`
        return (
          <path
            key={i}
            d={path}
            stroke="#5B4FE5"
            strokeWidth={strokeWidth}
            strokeOpacity={0.45}
            fill="none"
            markerEnd="url(#arrow)"
          >
            <title>
              {link.source} → {link.target}: {link.value.toLocaleString()}
            </title>
          </path>
        )
      })}

      {/* Nodes */}
      {data.nodes.map((n) => {
        const p = positions.get(n.id)
        if (!p) return null
        return (
          <g key={n.id}>
            <circle
              cx={p.x}
              cy={p.y}
              r={14}
              fill="#FFFFFF"
              stroke="#5B4FE5"
              strokeWidth={2.5}
            />
            <circle cx={p.x} cy={p.y} r={5} fill="#5B4FE5" />
            <text
              x={p.x}
              y={p.y + 28}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="#141412"
              style={{ fontFamily: 'Paperlogy, sans-serif' }}
            >
              {n.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
