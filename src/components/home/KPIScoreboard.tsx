import { Section } from '../ui/Section'
import { ScoreCard } from '../ui/ScoreCard'

/**
 * 홈 KPI 스코어보드 — 어제 기준 핵심 4개 지표.
 * GLOW:UP 패턴 차용: label uppercase + 32px Inter tabular-nums + delta badge + sparkline.
 */
export function KPIScoreboard() {
  return (
    <Section
      eyebrow="VITAL SIGNS · YESTERDAY"
      title="오늘 알아야 할 4가지"
      className="px-8 mt-10"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ScoreCard
          label="NEW COMPETITOR ADS"
          value="8"
          unit="건"
          delta={{ value: '+33%', direction: 'up', tone: 'success' }}
          sparkline={[3, 4, 5, 4, 6, 5, 7, 8]}
          delay={0}
        />
        <ScoreCard
          label="ROAS"
          value="3.8"
          unit="x"
          delta={{ value: '+12%', direction: 'up', tone: 'success' }}
          sparkline={[3.2, 3.3, 3.4, 3.6, 3.5, 3.7, 3.8, 3.8]}
          delay={80}
        />
        <ScoreCard
          label="REVIEW QUEUE"
          value="3"
          unit="건"
          delta={{ value: '+2', direction: 'up', tone: 'warning' }}
          sparkline={[1, 1, 2, 1, 2, 2, 3, 3]}
          delay={160}
        />
        <ScoreCard
          label="GUIDE ALIGNMENT"
          value="71"
          unit="%"
          delta={{ value: '-4%', direction: 'down', tone: 'danger' }}
          sparkline={[78, 76, 74, 75, 73, 72, 71, 71]}
          delay={240}
        />
      </div>
    </Section>
  )
}
