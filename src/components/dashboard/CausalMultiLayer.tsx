type Props = {
  layers: { name: string; items: string[] }[]
  width?: number
  height?: number
}

const LAYER_COLORS = ['#5B4FE5', '#10B981', '#D97706', '#EC4899']

/**
 * 멀티-레이어 차트 — 각 레이어를 가로 row로 표시,
 * 레이어 사이에 가중치 굵기 연결선.
 */
export function CausalMultiLayer({ layers, width = 720, height = 320 }: Props) {
  const padding = 40
  const rowHeight = (height - padding * 2) / layers.length

  type Pos = { x: number; y: number; layerIndex: number; itemIndex: number }
  const positions: Pos[] = []
  layers.forEach((layer, li) => {
    const itemSpacing = (width - padding * 2) / (layer.items.length + 1)
    layer.items.forEach((_, ii) => {
      positions.push({
        x: padding + (ii + 1) * itemSpacing,
        y: padding + li * rowHeight + rowHeight / 2,
        layerIndex: li,
        itemIndex: ii,
      })
    })
  })

  // 레이어 사이 연결선 — 각 레이어의 모든 노드와 다음 레이어의 모든 노드 (가중치 random for demo)
  const links: { from: Pos; to: Pos; weight: number }[] = []
  layers.forEach((_, li) => {
    if (li === layers.length - 1) return
    const fromNodes = positions.filter((p) => p.layerIndex === li)
    const toNodes = positions.filter((p) => p.layerIndex === li + 1)
    fromNodes.forEach((from, fi) => {
      toNodes.forEach((to, ti) => {
        // 가중치 — hash 기반 deterministic, 0.2~1.0
        const seed = (fi * 31 + ti * 17 + li * 7) % 100
        const weight = 0.2 + (seed / 100) * 0.8
        links.push({ from, to, weight })
      })
    })
  })

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      {/* 레이어 라벨 */}
      {layers.map((layer, li) => (
        <text
          key={layer.name}
          x={6}
          y={padding + li * rowHeight + rowHeight / 2}
          dy="0.35em"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1.5"
          fill={LAYER_COLORS[li]}
          style={{ fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' }}
        >
          {layer.name}
        </text>
      ))}

      {/* 연결선 */}
      {links.map((l, i) => (
        <line
          key={i}
          x1={l.from.x}
          y1={l.from.y}
          x2={l.to.x}
          y2={l.to.y}
          stroke="#5B4FE5"
          strokeWidth={l.weight * 3}
          strokeOpacity={l.weight * 0.4}
        />
      ))}

      {/* 노드 */}
      {positions.map((p, i) => {
        const item = layers[p.layerIndex].items[p.itemIndex]
        const color = LAYER_COLORS[p.layerIndex]
        return (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={11}
              fill="#FFFFFF"
              stroke={color}
              strokeWidth={2.5}
            />
            <circle cx={p.x} cy={p.y} r={4} fill={color} />
            <text
              x={p.x}
              y={p.y + 22}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="600"
              fill="#141412"
              style={{ fontFamily: 'Paperlogy, sans-serif' }}
            >
              {item}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
