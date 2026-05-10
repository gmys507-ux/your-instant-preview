import { useEffect, useRef } from 'react'
import { sankey, sankeyLinkHorizontal } from 'd3-sankey'
import type { SankeyData } from '../../lib/types'

type Props = {
  data: SankeyData
  width?: number
  height?: number
}

export function CausalSankey({ data, width = 720, height = 320 }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // d3-sankey는 mutates input. deep clone 필요
    const nodes = data.nodes.map((n) => ({ ...n }))
    const idIndex = new Map(nodes.map((n, i) => [n.id, i]))
    const links = data.links.map((l) => ({
      source: idIndex.get(l.source)!,
      target: idIndex.get(l.target)!,
      value: l.value,
    }))

    const svg = svgRef.current
    svg.innerHTML = ''

    const sankeyLayout = sankey<{ id: string; label: string; layer: number }, { value: number }>()
      .nodeWidth(14)
      .nodePadding(18)
      .extent([
        [10, 10],
        [width - 10, height - 10],
      ])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const graph = sankeyLayout({ nodes: nodes as any, links: links as any })

    // 링크 path
    const linkPath = sankeyLinkHorizontal()

    const ns = 'http://www.w3.org/2000/svg'

    // Gradient defs
    const defs = document.createElementNS(ns, 'defs')
    const grad = document.createElementNS(ns, 'linearGradient')
    grad.setAttribute('id', 'sankey-grad')
    grad.setAttribute('x1', '0%')
    grad.setAttribute('y1', '0%')
    grad.setAttribute('x2', '100%')
    grad.setAttribute('y2', '0%')
    const stop1 = document.createElementNS(ns, 'stop')
    stop1.setAttribute('offset', '0%')
    stop1.setAttribute('stop-color', '#5B4FE5')
    stop1.setAttribute('stop-opacity', '0.35')
    const stop2 = document.createElementNS(ns, 'stop')
    stop2.setAttribute('offset', '100%')
    stop2.setAttribute('stop-color', '#EC4899')
    stop2.setAttribute('stop-opacity', '0.35')
    grad.appendChild(stop1)
    grad.appendChild(stop2)
    defs.appendChild(grad)
    svg.appendChild(defs)

    // 링크 그리기
    graph.links.forEach((link) => {
      const path = document.createElementNS(ns, 'path')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const d = linkPath(link as any) as string | null
      if (!d) return
      path.setAttribute('d', d)
      path.setAttribute('fill', 'none')
      path.setAttribute('stroke', 'url(#sankey-grad)')
      path.setAttribute('stroke-width', `${Math.max(1, link.width ?? 1)}`)
      path.setAttribute('stroke-opacity', '0.85')
      path.style.transition = 'stroke-opacity 0.2s'
      path.addEventListener('mouseenter', () => path.setAttribute('stroke-opacity', '1'))
      path.addEventListener('mouseleave', () => path.setAttribute('stroke-opacity', '0.85'))

      const title = document.createElementNS(ns, 'title')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sourceLabel = (link.source as any).label
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const targetLabel = (link.target as any).label
      title.textContent = `${sourceLabel} → ${targetLabel}: ${link.value.toLocaleString()}`
      path.appendChild(title)

      svg.appendChild(path)
    })

    // 노드 그리기
    graph.nodes.forEach((n) => {
      const x0 = n.x0 ?? 0
      const y0 = n.y0 ?? 0
      const x1 = n.x1 ?? 0
      const y1 = n.y1 ?? 0
      const rect = document.createElementNS(ns, 'rect')
      rect.setAttribute('x', String(x0))
      rect.setAttribute('y', String(y0))
      rect.setAttribute('width', String(x1 - x0))
      rect.setAttribute('height', String(y1 - y0))
      rect.setAttribute('fill', '#5B4FE5')
      rect.setAttribute('rx', '3')
      svg.appendChild(rect)

      const text = document.createElementNS(ns, 'text')
      const isLeft = x0 < width / 2
      text.setAttribute('x', String(isLeft ? x1 + 6 : x0 - 6))
      text.setAttribute('y', String((y0 + y1) / 2))
      text.setAttribute('dy', '0.35em')
      text.setAttribute('text-anchor', isLeft ? 'start' : 'end')
      text.setAttribute('fill', '#141412')
      text.setAttribute('font-family', 'Paperlogy, sans-serif')
      text.setAttribute('font-size', '11.5')
      text.setAttribute('font-weight', '600')
      text.textContent = n.label
      svg.appendChild(text)
    })
  }, [data, width, height])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
    />
  )
}
