type Props = {
  data: number[]
  color?: string
  width?: number
  height?: number
  isAlert?: boolean
}

/**
 * SVG mini sparkline. 1.5px stroke, smooth, fade-in.
 */
export function Sparkline({
  data,
  color = '#5B4FE5',
  width = 70,
  height = 22,
  isAlert = false,
}: Props) {
  if (!data || data.length === 0) return null

  const padding = 2
  const w = width - padding * 2
  const h = height - padding * 2
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data
    .map((v, i) => {
      const x = padding + (i / (data.length - 1)) * w
      const y = padding + h - ((v - min) / range) * h
      return `${x},${y}`
    })
    .join(' ')

  const lineColor = isAlert ? '#DC2626' : color

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: 'block' }}
    >
      <polyline
        points={points}
        fill="none"
        stroke={lineColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
