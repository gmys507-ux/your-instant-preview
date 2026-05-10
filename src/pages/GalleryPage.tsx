import { Eyebrow } from '../components/ui/Eyebrow'

export function GalleryPage() {
  return (
    <div className="px-8 py-32 text-center max-w-2xl mx-auto">
      <Eyebrow>GALLERY · ROUND 2</Eyebrow>
      <h1 className="font-serif italic text-display mt-6 text-ink">갤러리</h1>
      <p className="mt-6 text-body-lg text-ink-3 leading-relaxed">
        Round 2에서 30개 광고 카드 + 필터 5종 + 카드 디테일 패널 + AI 패턴 분석
        모달로 구현됩니다.
      </p>
      <p className="mt-3 text-body-sm text-ink-4">
        경쟁사 IG · YouTube · TikTok · Meta 광고를 한 곳에서 갤러리뷰로 탐색
      </p>
    </div>
  )
}
