import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Card } from '../ui/Card'
import { Eyebrow } from '../ui/Eyebrow'

const modules = [
  {
    eyebrow: 'GALLERY',
    title: '갤러리',
    preview: '어제 새 광고 8건 · Before/After 트렌드',
    path: '/gallery',
  },
  {
    eyebrow: 'ASSISTANT',
    title: '어시스턴트',
    preview: '검수 대기 3건 · 평균 일치도 71%',
    path: '/assistant',
  },
  {
    eyebrow: 'DASHBOARD',
    title: '대시보드',
    preview: 'ROAS 3.8 +0.4 · D7 retention +12%p',
    path: '/dashboard',
  },
  {
    eyebrow: 'GUIDE',
    title: '가이드',
    preview: '콘텐츠 가이드 v3.3 업데이트',
    path: '/',
  },
]

export function ModuleCards() {
  const navigate = useNavigate()

  return (
    <section className="px-8 py-20">
      <Eyebrow className="mb-3">NOW · MARKETING</Eyebrow>
      <h2 className="font-serif italic text-h1 text-ink mb-10">지금의 마케팅</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((m) => (
          <Card
            key={m.title + m.path}
            onClick={() => navigate(m.path)}
            className="group min-h-[180px] flex flex-col justify-between"
          >
            <div>
              <Eyebrow>{m.eyebrow}</Eyebrow>
              <h3 className="mt-4 font-serif italic text-h2 text-ink">
                {m.title}
              </h3>
            </div>
            <div className="flex items-end justify-between mt-6 gap-3">
              <p className="text-body text-ink-2 max-w-sm leading-snug">
                {m.preview}
              </p>
              <ArrowUpRight
                size={20}
                className="text-ink-3 group-hover:text-indigo transition-colors shrink-0"
              />
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
