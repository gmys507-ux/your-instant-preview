import { Eyebrow } from '../components/ui/Eyebrow'

export function AssistantPage() {
  return (
    <div className="px-8 py-32 text-center max-w-2xl mx-auto">
      <Eyebrow>ASSISTANT · ROUND 2</Eyebrow>
      <h1 className="font-serif italic text-display mt-6 text-ink">
        어시스턴트
      </h1>
      <p className="mt-6 text-body-lg text-ink-3 leading-relaxed">
        Round 2에서 채팅바 진입 + 좌측 기획서 풀본문 sticky + 우측 풀패키지 검수
        결과 6개 영역으로 구현됩니다.
      </p>
      <p className="mt-3 text-body-sm text-ink-4">
        사내 콘텐츠 가이드 + 타율 데이터를 컨텍스트로 가진 AI 검수 어시스턴트
      </p>
    </div>
  )
}
