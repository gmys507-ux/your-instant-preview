import { Paperclip, Image as ImageIcon, Link as LinkIcon, ArrowUp, FileText, PenLine, Lightbulb, Target, GitCompare } from 'lucide-react'

type Props = {
  onStartReview: () => void
}

const startCards = [
  {
    icon: FileText,
    title: '기획서 검수',
    body: '작성한 기획서를 던지면 가이드 일치도 + 6개 영역 풀패키지 분석',
  },
  {
    icon: PenLine,
    title: '대본 작성',
    body: '컨셉만 알려주면 시나리오 · 자막 · 보이스오버 초안 작성',
  },
  {
    icon: Lightbulb,
    title: '컨셉 제안',
    body: '제품 + 타겟 + 채널 입력 → 사내 타율 패턴 기반 컨셉 5개',
  },
  {
    icon: Target,
    title: '소구점 분석',
    body: '제품 카테고리 + 페르소나 → 효과 검증된 소구점 우선순위',
  },
  {
    icon: GitCompare,
    title: '타사 광고 비교',
    body: '갤러리에서 선택한 광고와 우리 기획서 차이 분석',
  },
]

export function ChatEntry({ onStartReview }: Props) {
  return (
    <div className="px-8 mt-12 pb-20 max-w-[840px] mx-auto">
      {/* 중앙 헤딩 */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-badge bg-paper/70 border border-white/60 backdrop-blur-sm mb-6 shadow-card">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-indigo animate-ping opacity-50" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-indigo" />
          </span>
          <span className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.18em] text-indigo-deep">
            ASSISTANT · 사내 가이드 v3.3 학습 완료
          </span>
        </div>

        <h1 className="font-sans text-[32px] md:text-[44px] leading-[1.15] tracking-[-0.02em] text-ink font-bold mb-4">
          무엇을 도와드릴까요?
        </h1>
        <p className="text-[14.5px] text-ink-3 leading-[1.7] max-w-xl mx-auto">
          사내 콘텐츠 가이드 + 타율 상위 12개 패턴을 학습한 어시스턴트가
          기획서 · 카피 · 콘티를 한 번에 검수합니다.
        </p>
      </div>

      {/* 채팅 입력 박스 */}
      <div className="bg-paper/85 backdrop-blur-md border border-white/60 rounded-card shadow-card-hover p-4 mb-3">
        <textarea
          rows={3}
          placeholder="기획서를 붙여넣거나, 무엇이든 물어보세요. (예: '비타민C 세럼 광고 검수해주세요')"
          className="w-full bg-transparent text-[14.5px] text-ink placeholder:text-ink-4 leading-relaxed resize-none outline-none mb-3"
        />
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-rule-light">
          <div className="flex items-center gap-1">
            <button
              className="w-8 h-8 rounded-md text-ink-3 hover:bg-bg-2 hover:text-ink flex items-center justify-center transition-colors"
              aria-label="파일 첨부"
              title="파일 첨부"
            >
              <Paperclip size={15} />
            </button>
            <button
              className="w-8 h-8 rounded-md text-ink-3 hover:bg-bg-2 hover:text-ink flex items-center justify-center transition-colors"
              aria-label="이미지 첨부"
              title="이미지 첨부"
            >
              <ImageIcon size={15} />
            </button>
            <button
              className="w-8 h-8 rounded-md text-ink-3 hover:bg-bg-2 hover:text-ink flex items-center justify-center transition-colors"
              aria-label="링크 첨부"
              title="링크 첨부"
            >
              <LinkIcon size={15} />
            </button>
          </div>
          <button
            onClick={onStartReview}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-button bg-indigo text-paper font-medium text-[13px] hover:bg-indigo-deep transition-colors shadow-card"
          >
            <span>검수 시작</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      <p className="text-center text-[12px] text-ink-4 mb-10">
        시연용 · "검수 시작" 버튼을 누르면 미리 작성된 풀패키지 답변이 단계적으로 reveal됩니다.
      </p>

      {/* 시작 카드 5개 */}
      <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-3">
        SUGGESTED · 빠른 시작
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {startCards.map((c, i) => {
          const Icon = c.icon
          return (
            <button
              key={c.title}
              onClick={onStartReview}
              className="group text-left bg-paper/85 backdrop-blur-md border border-white/60 rounded-card p-4 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 hover:bg-paper transition-all duration-200 animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 shadow-card"
                style={{
                  background: 'linear-gradient(135deg, #E8E5FB 0%, #DCD7FA 100%)',
                }}
              >
                <Icon size={16} className="text-indigo" />
              </div>
              <p className="text-[14px] font-bold text-ink mb-1">{c.title}</p>
              <p className="text-[12px] text-ink-3 leading-relaxed">{c.body}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
