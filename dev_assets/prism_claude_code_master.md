# Prism — Claude Code 마스터 빌드 프롬프트

> **이 문서를 Claude Code에 통째로 컨텍스트로 던진 다음, 라운드별 명령을 순서대로 실행.**
> Stitch 스킵. PRD + 디자인 토큰 + Amplitude 레퍼런스 기반 풀 빌드.
> 라운드 끝날 때마다 GitHub push → Lovable 자동 sync → 미리보기 확인.

---

## 사용법

1. **프로젝트 디렉토리 준비** (예: `~/projects/prism`) → `cd` 진입
2. **Claude Code 실행** (`claude` 명령) → 이 문서 전체를 첫 메시지로 붙여넣기
3. **Claude Code가 컨텍스트 인지 후**, 라운드 1 명령부터 순서대로 실행
4. **각 라운드 끝나면** GitHub push → Lovable 동기화 → 미리보기 확인 → 다음 라운드

---

## 0. 프로젝트 컨텍스트

**제품명**: Prism (가칭)
**무엇**: 마케팅 콘텐츠 OS — 경쟁사 리서치 + AI 콘텐츠 검수 + 인과 분해 분석
**도메인**: D2C 뷰티/건기식 (이삼오구 가공)
**오너**: 푸우 · 2026 Lovable × Amplitude 해커톤 출품작
**기간**: 1일 프로토타입
**시연**: 90초, 4개 모듈 워크플로우 흐름

### 함께 제공되는 자료 (모두 같은 디렉토리에 위치)

| 파일 | 용도 |
|---|---|
| `prism_prd_v1.md` | 제품 기획서 (참조용 진실의 원천) |
| `prism_visual_tokens.css` | CSS 변수 토큰 (그대로 import) |
| `prism_demo_data.json` | 갤러리 광고 30개 + 대시보드 KPI/차트 데이터 |
| `prism_assistant_review.json` | 어시스턴트 검수 결과 1세트 |
| `prism_content_guide.md` | 사내 콘텐츠 가이드 더미 (참조용) |

### 비주얼 레퍼런스 (텍스트로 전달, 핵심 키)

- **Amplitude 홈페이지 톤** — 다크 그라데이션 hero + 흰색 floating 카드 + 큰 serif italic 디스플레이
- **Notion AI 채팅 톤** — 미니멀 화이트, 큰 한글 헤딩, paperclip 통합 채팅바
- **에디토리얼 출판물 톤** — Wired 매거진 같은 전문성, 일반 SaaS 회피
- **모듈별 무드** — 홈은 다크 그라데이션 / 갤러리는 라이트 매거진 / 어시스턴트는 라이트 작업실 / 대시보드는 라이트 브리핑

---

## 1. 기술 스택 결정

**Vite + React 18 + TypeScript + Tailwind CSS**.

이유:
- Lovable의 기본 스택 — GitHub import 시 100% 호환
- 빠른 핫리로드, 가벼운 번들
- TypeScript로 데이터 타입 명확

추가 라이브러리:
- `framer-motion` — 사이드뷰 슬라이드, 스트리밍 reveal 애니메이션
- `recharts` — 기본 차트 (Funnel, line, bar)
- `d3` + `d3-sankey` — 인과 분해 4탭 시각화
- `lucide-react` — 아이콘
- `react-router-dom` — 4탭 라우팅

---

## 2. 파일 구조 (Round 1에서 생성)

```
src/
  components/
    layout/
      AppShell.tsx          # 톱 nav + AI floating 버튼 + 사이드패널
      AISidePanel.tsx
    home/
      Hero.tsx
      ModuleCards.tsx
      ActionStrip.tsx
    gallery/
      AdCard.tsx
      FilterSidebar.tsx
      MasonryGrid.tsx
      DetailPanel.tsx
      PatternAnalysisModal.tsx
    assistant/
      ChatEntry.tsx
      ResultWorkspace.tsx
      sections/
        ScoreSection.tsx
        ImprovedCopySection.tsx
        SceneStructureSection.tsx
        CompetitorComparisonSection.tsx
        InternalTopSection.tsx
        ActionChipsSection.tsx
    dashboard/
      KPIRow.tsx
      KPISideView.tsx
      CausalDecomposition/
        index.tsx
        SankeyChart.tsx
        NodeGraph.tsx
        FunnelView.tsx
        MultiLayerChart.tsx
      UserDataSection.tsx
      BridgeInsight.tsx
      AIInsightCards.tsx
    ui/
      Card.tsx
      Pill.tsx
      Button.tsx
      Eyebrow.tsx
  pages/
    HomePage.tsx
    GalleryPage.tsx
    AssistantPage.tsx
    DashboardPage.tsx
  contexts/
    ModuleContext.tsx       # 모듈 간 컨텍스트 전달
  data/
    ads.json               # ← prism_demo_data.json의 gallery_ads 추출
    dashboard.json         # ← prism_demo_data.json의 dashboard 추출
    review.json            # ← prism_assistant_review.json 그대로
  hooks/
    useStreamingReveal.ts
  lib/
    types.ts               # Ad, KPI 등 타입 정의
  styles/
    tokens.css             # ← prism_visual_tokens.css 그대로
    globals.css
  App.tsx
  main.tsx
public/
  ads/                     # 푸우가 캡처한 광고 이미지 위치
```

---

## 3. 디자인 시스템 (반드시 지킬 것)

### 컬러 토큰 (`tokens.css`로 import — `prism_visual_tokens.css` 그대로 사용)

핵심 변수:
- `--bg: #FAFAF7` (페이퍼 베이스)
- `--bg-2: #F2F0E8` (보조 영역)
- `--paper: #FFFFFF` (떠 있는 카드)
- `--ink: #141412` (메인 텍스트, 다크 hero 배경)
- `--ink-3: #5C5A52` (메타 라벨)
- `--rule: #D8D2C2` (보더)
- `--indigo: #5B4FE5` / `--indigo-bg: #E8E5FB` / `--indigo-deep: #2E2580`
- `--pink: #EC4899`
- `--green: #10B981`, `--amber: #D97706`, `--red: #DC2626`

### 타이포그래피

- **Pretendard** — 한국어 본문/UI (모든 한글)
- **Fraunces** — 영문 디스플레이 헤딩 (이탤릭 적극 사용)
- **JetBrains Mono** — 라벨/메타/코드 (uppercase letter-spacing 0.16em)

`index.html`에 폰트 link 또는 `tokens.css`의 @import로 로드.

### 컴포넌트 규칙

- **카드**: 흰색 bg, 0.5px 보더 `--rule`, 16px 라운드, 24px 패딩, 호버 시 `translateY(-2px)`
- **버튼**: 8px 라운드, 10px 16px 패딩, 500 weight
- **Eyebrow**: 11px JetBrains Mono uppercase, 0.16em letter-spacing, color `--ink-3`
- **Pill**: 라운드 full, 4px 10px 패딩
- **그라데이션**: 다크 hero에만 사용 (radial gradient indigo + magenta 18% opacity)
- **그림자**: 카드 호버 시에만 부드럽게 (`0 8px 24px rgba(20,20,18,0.08)`)
- **트랜지션**: 200ms ease-out (호버), 300ms (상태 변화)

### 절대 금지

- ❌ 일반 SaaS 룩 (Material UI, Bootstrap 디폴트)
- ❌ 박스 그림자 진하게
- ❌ 인디고 외 다른 강한 컬러 액센트 (semantic 제외)
- ❌ 한글 폰트로 system-ui (반드시 Pretendard)
- ❌ 영어 디스플레이로 다른 serif (반드시 Fraunces 이탤릭)

---

## 4. 라운드별 빌드 명령

### 🟢 Round 1 — Foundation + Home

**목표**: 4탭 라우팅 + 디자인 시스템 + 홈 화면 + AI 사이드패널 구조. Lovable에 import해서 미리보기 가능한 상태.

**Claude Code에 입력할 명령:**

```
Round 1을 시작합니다.

1. Vite + React 18 + TypeScript 프로젝트 초기화
2. Tailwind CSS 설정 + 위 prism_visual_tokens.css를 src/styles/tokens.css로 복사하고 globals.css에 @import
3. index.html에 Pretendard, Fraunces, JetBrains Mono 폰트 link 추가
4. 라이브러리 설치: react-router-dom, framer-motion, lucide-react
5. 위 §2 파일 구조의 layout, ui, home 폴더만 우선 생성 (나머지는 빈 폴더)
6. App.tsx에 BrowserRouter + 4개 라우트 (/, /gallery, /assistant, /dashboard)
7. AppShell 컴포넌트 — 톱 네비게이션 (Prism 로고 Fraunces italic + 4탭 + Connected pill) + 메인 영역 + 좌하단 floating ✦ 버튼
8. AISidePanel — 우측 슬라이드인 패널 (Framer Motion), 헤더 + 빈 상태 (4개 추천 질문 카드 + 채팅 입력)
9. HomePage 빌드:
   - Hero (다크 #141412 bg, radial 그라데이션, Fraunces 이탤릭 "안녕하세요, 푸우 ✦", AI 브리핑 paragraph)
   - ModuleCards (2x2 그리드, 4개 카드: 갤러리/어시스턴트/대시보드/가이드, 각각 eyebrow + 제목 + 활동 미리보기)
   - ActionStrip (3개 horizontal 카드 + 화살표 아이콘)
10. GalleryPage, AssistantPage, DashboardPage는 placeholder만 (제목 + 'Round 2/3에서 구현' 텍스트)
11. ui/Card, Pill, Button, Eyebrow 컴포넌트 — 디자인 토큰 사용
12. 빌드 후 npm run dev로 미리보기 확인

모든 한글 텍스트는 Pretendard, 영어 디스플레이는 Fraunces italic, 라벨은 JetBrains Mono uppercase.
Amplitude 홈페이지 톤 — 다크 hero + 흰색 floating 카드 + 큰 serif italic 디스플레이.
일반 SaaS 룩 절대 금지.
```

**완료 기준**:
- 4탭 클릭 시 화면 전환 동작
- 홈에 hero (다크 그라데이션) + 4개 모듈 카드 + 액션 스트립 표시
- 좌하단 ✦ 버튼 클릭 시 우측 사이드패널 슬라이드
- 사이드패널 내부 — 헤더 + 4개 추천 질문 + 채팅 입력
- 비주얼 톤 — 한글 Pretendard / 영어 Fraunces 이탤릭 / 라벨 JetBrains Mono

**라운드 1 완료 시 동작**:
1. `git add . && git commit -m "Round 1: Foundation + Home"`
2. `git push origin main`
3. Lovable에서 GitHub import 또는 sync 확인 → 미리보기

---

### 🟡 Round 2 — Gallery + Assistant Detail

**목표**: 갤러리 30개 카드 + 필터 + 디테일 패널. 어시스턴트 채팅바 진입 + 풀패키지 검수 결과 6개 영역.

**Claude Code에 입력할 명령:**

```
Round 2를 시작합니다.

1. data/ads.json 생성 — prism_demo_data.json의 gallery_ads 배열 그대로 사용
2. data/review.json 생성 — prism_assistant_review.json 그대로 사용
3. lib/types.ts에 Ad, ReviewResult 타입 정의

GALLERY 빌드:
4. FilterSidebar (260px, 고정 좌측):
   - 검색 input (top)
   - 필터 그룹: 브랜드 / 제품 / 국가 / 채널 / 플랫폼
   - 각 그룹 헤더 JetBrains Mono uppercase
   - 체크박스로 다중 선택, 선택 시 그리드 즉시 필터링
5. AdCard 컴포넌트:
   - 썸네일 (placeholder gradient 사용 — 실제 이미지는 푸우가 /public/ads/ 에 추가)
   - 호버 시 platform 아이콘 오버레이
   - 카드 하단: brand mono uppercase + copy_hook 2줄 + concept italic + 플랫폼 배지 + alignment_score 색상 pill (>80 green, 60-80 amber, <60 red) + 운영 일수
   - 호버 시 살짝 들림 (translateY -2px)
   - 호버 시 우상단에 체크박스 노출
6. MasonryGrid (3 columns):
   - CSS columns 또는 grid auto-rows로 masonry
   - ads.json의 30개 카드 렌더
   - 카드 클릭 시 우측 DetailPanel 슬라이드 (Framer Motion)
7. DetailPanel (480px wide, 우측 슬라이드):
   - 큰 썸네일 + 브랜드/제품/플랫폼 배지
   - 풀 copy_hook
   - concept 분석
   - conti 리스트 (씬별 + 시간)
   - appeal_points 칩들
   - 메트릭 4셀 (impressions/spend/days/CTR)
   - alignment_score 큰 원형 링
   - 하단 CTA "이 광고로 우리 콘텐츠 만들기" (indigo primary)
8. PatternAnalysisModal:
   - 카드 2+개 선택 시 하단 floating 액션바 등장 ("{N}개 선택 · ✦ AI 패턴 분석")
   - 클릭 시 모달:
     · 공통 후크 / 공통 소구점 / 공통 CTA / 추천 적용 방향
     · 하단 "어시스턴트로 보내기" 버튼

ASSISTANT 빌드:
9. ChatEntry (state 1):
   - 중앙 정렬, max-width 720px
   - 작은 sparkle 원형 아바타
   - "무엇을 도와드릴까요?" Fraunces serif 32px
   - 채팅바: 라운드 16px, paperclip + photo + link 아이콘 + "↑ 보내기" indigo 버튼
   - 하단 5개 시작 카드 (기획서 검수 / 대본 작성 / 컨셉 제안 / 소구점 분석 / 타사 광고 비교)
10. State 전환: "Mock 검수 시작" 버튼 클릭 또는 자동 → state 2
11. ResultWorkspace (state 2):
    - 좌측 320px sticky — review.json의 input_planning_document 풀 본문 (제목/컨셉/타겟/채널/소구점/콘티/대본 전문/이미지 배치/CTA), Pretendard 12.5px line-height 1.85, bg #F2F0E8
    - 우측 flex scrollable — 6개 섹션 카드 stagger 애니메이션으로 등장:
      · ScoreSection — review.json의 review_result.section_1_score, 73% 큰 숫자 + 원형 progress ring (indigo) + 3개 status 라인 (✓⚠✗)
      · ImprovedCopySection — section_2_improved_copy, 기존/개선안 블록 + reasoning + uplift pill
      · SceneStructureSection — section_3_scene_structure, 5컬럼 타임라인 (0-3-6-10-13-15s)
      · CompetitorComparisonSection — section_4, 3개 카드 (썸네일 + 브랜드 + 유사도 %)
      · InternalTopSection — section_5, 분석 paragraph + 큰 ROAS 변화 숫자 (그린)
      · ActionChipsSection — section_6, 4개 칩 (갤러리로 / 대시보드 시뮬레이션 / 다운로드 / 팀 공유)
12. 사용자 채팅 입력 또는 검수 시작 → state 1 → state 2 전환 시 stagger reveal (sections 단계적 등장)

데이터는 모두 import된 JSON에서. 모든 카드 호버 인터랙션. 한글 Pretendard 유지. 모듈별 무드 — 갤러리는 라이트 매거진톤, 어시스턴트는 라이트 작업실톤.
```

**완료 기준**:
- 갤러리 30개 카드 표시 + 필터 5종 동작
- 카드 클릭 시 디테일 패널 슬라이드
- 카드 다중 선택 + AI 패턴 분석 모달
- 어시스턴트 채팅바 진입 + 시작 카드 5개
- 검수 시작 시 좌측 풀본문 sticky + 우측 6개 영역 (stagger 등장)
- review.json의 모든 데이터 정확히 매핑

**라운드 2 완료 시**:
- `git commit -m "Round 2: Gallery + Assistant detail"`
- `git push`
- Lovable sync → 미리보기 확인

---

### 🔴 Round 3 — Dashboard + Causal Viz + AI Sidepanel

**목표**: 대시보드 풀 빌드 + 인과 분해 4탭 시각화 (Sankey/노드/Funnel/멀티레이어) + AI 사이드패널 답변 흐름 + 모듈 컨텍스트 전달.

**Claude Code에 입력할 명령:**

```
Round 3을 시작합니다.

1. data/dashboard.json 생성 — prism_demo_data.json의 dashboard 객체 그대로
2. d3, d3-sankey, recharts 설치

DASHBOARD 빌드:
3. KPIRow — 6개 카드 single row, dashboard.json.kpis 매핑
   - bg #F2F0E8, mono uppercase 라벨, Pretendard 22px medium 숫자, 델타 표시 (그린 ↑ / 레드 ↓)
   - 카드 클릭 시 setSelectedKPI → KPISideView 슬라이드
4. KPISideView (480px right slide-in, Framer Motion):
   - 헤더: 라벨 + 큰 숫자 + 델타
   - 시계열 차트 (Recharts LineChart, 30일 fake data)
   - 연결된 지표 섹션 (작은 카드 3개)
   - 세그먼트 분해 (horizontal bars)

5. CausalDecomposition (4탭 컨테이너):
   - 헤더 "결과 → 선행 지표 인과 분해" Fraunces 22px
   - 4개 탭 pill: 가 Sankey (default active) / 나 노드 그래프 / 다 Funnel + 분기 / 라 멀티-레이어
   - 활성 탭 indigo bg white text, 비활성 gray
   - 시각화 영역 height 320px, bg #F2F0E8, 12px rounded
   
6. SankeyChart (d3-sankey):
   - dashboard.json.causal_decomposition.sankey의 nodes/links 사용
   - 흐름의 굵기로 양 표현
   - 노드 indigo, 링크 indigo opacity 0.3
   - 노드/링크 클릭 시 사이드뷰 트리거 (옵션)

7. NodeGraph (d3 force layout):
   - dashboard.json.causal_decomposition.node_graph 또는 sankey nodes 재사용
   - circle 노드 + line 엣지
   - hover 시 highlight

8. FunnelView (Recharts FunnelChart 또는 직접 SVG):
   - dashboard.json.causal_decomposition.funnel.stages 매핑
   - 상단에 채널 분기 라벨 (Meta / YouTube / TikTok)

9. MultiLayerChart (직접 SVG):
   - dashboard.json.causal_decomposition.multi_layer.layers 매핑
   - 4 레이어 (광고/행동/전환/결과), 각각 색상 다르게 (indigo/teal/amber/pink)
   - 레이어 간 연결선 가중치 굵기 (랜덤 또는 데이터 기반)

10. UserDataSection:
    - 헤더 "유저 데이터 분석" + via AMPLITUDE pill
    - 3컬럼 그리드:
      · 유저 행동 Funnel (recharts FunnelChart, dashboard.json.user_data.funnel.stages)
      · 코호트 리텐션 (recharts LineChart, 3개 cohort lines, D1/D7/D30)
      · 세그먼트별 전환 (recharts BarChart, horizontal, dashboard.json.user_data.segments)

11. BridgeInsight:
    - 풀 폭 카드 indigo-bg #E8E5FB, 14px padding, 12px rounded
    - 🔗 link 아이콘 좌측
    - 텍스트 indigo-deep #2E2580: dashboard.json.bridge_insight 그대로

12. AIInsightCards (3개):
    - 흰 bg + indigo 보더, 12px rounded
    - eyebrow "AI INSIGHT 0N" mono indigo
    - body Pretendard 14px
    - severity별 액센트 (warning amber / success green / info indigo)
    - 카드 클릭 시 setIsAISidePanelOpen(true) + insight를 컨텍스트로 전달

AI SIDEPANEL 답변 흐름:
13. AISidePanel 확장:
    - 빈 상태: 4개 추천 질문 카드 (현재 탭에 따라 다름 — useLocation으로 분기)
    - 추천 질문 클릭 또는 사용자 입력 → 답변 모드
    - 답변 모드 컨텐츠 (4가지 종합):
      · INSIGHT TEXT (Pretendard 14px paragraph)
      · INLINE TREND CHART (mini line chart, Recharts, 280×80)
      · TOP CONTENT CARDS (2개 카드, 썸네일 + 브랜드 + 메트릭)
      · MODULE NAV CHIPS (3개 horizontal: 어시스턴트로 / 갤러리에서 / 대시보드 시뮬레이션)
    - 답변은 미리 작성된 1~3세트 (예: "지난주 대비 ROAS 떨어진 원인?" 답변, "이 광고들의 공통 패턴?" 답변)
    - stagger reveal 애니메이션

14. ModuleContext:
    - createContext + useState로 transferData 관리
    - transferTo(targetModule, data) 함수
    - 갤러리에서 "어시스턴트로 보내기" 클릭 → useNavigate로 /assistant 이동 + transferData 설정
    - 어시스턴트 페이지에서 useEffect로 transferData 감지 → toast 표시 + 채팅바 자동 채우기
    - 시연용 1개 흐름만 동작하면 OK

폴리싱:
15. 모든 카드 호버 마이크로 인터랙션 통일
16. 페이지 전환 시 부드러운 fade
17. 갤러리 카드 호버 시 영상 자동 재생 — video_url이 있으면 hover 시 play (현재는 thumbnail로 충분, 영상은 푸우가 추후 추가)
18. 다크모드는 미지원 (시연용)

GitHub push 후 Lovable에서 최종 확인.
```

**완료 기준**:
- 인과 분해 4탭 모두 시각화 동작 (탭 전환 부드럽게)
- KPI 카드 클릭 시 사이드뷰 슬라이드
- 유저 데이터 3개 차트 표시
- 연결점 인사이트 박스 표시
- AI 인사이트 카드 3개 + 클릭 시 사이드패널 열림
- AI 사이드패널 답변 흐름 1세트 이상 동작
- 모듈 컨텍스트 전달 1개 흐름 동작 (갤러리 → 어시스턴트)

**라운드 3 완료 시**:
- `git commit -m "Round 3: Dashboard + Causal Viz + AI sidepanel"`
- `git push`
- Lovable sync 후 원클릭 배포 → 시연 URL

---

### ⚪ Round 4 (옵션) — Polish & Deploy

**목표**: 마이크로 인터랙션 폴리싱, 시연 안정성 확보, 배포.

**Claude Code에 입력할 명령:**

```
Round 4 — 시연 폴리싱.

1. 모든 페이지 transition 부드럽게 (Framer Motion AnimatePresence)
2. 카드 hover 시 그림자 통일
3. 어시스턴트 stagger reveal 타이밍 조정 (각 섹션 600ms 간격)
4. KPI 사이드뷰 spring 애니메이션 강도 조정
5. 갤러리 필터 변경 시 그리드 fade 트랜지션
6. AI 사이드패널 backdrop blur 효과
7. 시연 시나리오 90초 따라 클릭 통과 — 모든 모듈 1번씩 동작 확인
8. 콘솔 에러 0
9. README.md 업데이트 — 시연 시나리오 + 데모 URL

배포:
10. Lovable에서 "Publish" 클릭 (또는 Vercel 연동)
11. 시연 URL 메모
12. 발표 직전 모든 모듈 1회 클릭 통과 시켜 캐시 워밍
```

---

## 5. GitHub + Lovable 연동 셋업 (Round 1 시작 전 또는 동시)

### GitHub 레포 생성

```bash
# 푸우가 직접 GitHub 웹에서 생성: prism-marketing-os (또는 원하는 이름)
# Public 추천 (시연 URL 공유 용이)
# README + .gitignore (Node) 초기화

# 로컬에서 클론
cd ~/projects
git clone https://github.com/YOUR_USERNAME/prism-marketing-os.git
cd prism-marketing-os
```

### Lovable 연동

1. Lovable 가서 새 프로젝트 → "Import from GitHub" 선택
2. 위 레포 선택
3. Lovable이 자동으로 빌드 + 미리보기

이후 매 라운드:
- Claude Code가 작업 → push → Lovable이 자동 sync (수초 내)
- Lovable 미리보기 화면에서 변경 확인

---

## 6. 시연 시나리오 (90초)

라운드 3 완료 후 이 흐름으로 발표:

1. **0~15s · 홈** — "마케터의 아침. AI 브리핑이 어제 일을 한 단락으로 정리"
2. **15~35s · 갤러리** — "새 광고 8개 → 5개 선택 → AI 패턴 분석 → 어시스턴트로 보내기"
3. **35~65s · 어시스턴트** — "기획서 던지고 검수 시작 → 좌측 본문 / 우측 6개 영역 풀패키지 분석"
4. **65~90s · 대시보드** — "ROAS 인과 분해 → 유저 데이터 → AI 인사이트 → '마케터가 직접 만들고 측정한다'"

---

## 7. 자주 마주칠 이슈와 해결

| 이슈 | 해결 |
|---|---|
| Pretendard 폰트 안 뜸 | `index.html`에 `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">` 직접 추가 |
| Tailwind와 CSS 변수 충돌 | `tailwind.config.js`에 `theme.extend.colors`로 var(--xxx) 매핑 |
| Sankey가 안 그려짐 | d3-sankey의 nodes/links가 객체 참조 사용 — JSON copy 시 deep clone 필요 |
| Framer Motion 사이드패널 깜빡임 | AnimatePresence의 `mode="wait"` 사용 |
| Lovable sync 안 됨 | Lovable 대시보드에서 수동 "Refresh from GitHub" |
| 한글이 깨짐 | UTF-8 인코딩 확인, JSON 파일 저장 시 BOM 없이 |

---

## 8. Out of Scope (오늘 만들지 않는다)

- 실제 백엔드 API · DB 연동
- 실제 Amplitude 데이터 통합
- 실제 LLM (Claude Opus) 연결 — 모든 답변은 더미
- 사용자 인증 / 계정
- 데이터 영속성 (새로고침 시 리셋 OK)
- 모바일 최적화 (~767px)
- 다국어

---

## 9. 완료 후 체크리스트

라운드 3 완료 시점에 모두 ✓이면 시연 가능:

- [ ] 4탭 모두 동작 + 화면 전환 부드러움
- [ ] 홈 hero 다크 그라데이션 + AI 브리핑 + 모듈 카드 4개
- [ ] 갤러리 30개 카드 + 필터 5종 + 카드 디테일 패널 + AI 패턴 분석
- [ ] 어시스턴트 채팅바 진입 + 좌측 풀본문 + 우측 6개 영역
- [ ] 대시보드 KPI 6 + 인과 분해 4탭 시각화 + 유저 데이터 3차트 + 연결점 + AI 인사이트 3
- [ ] AI 사이드패널 floating 버튼 + 컨텍스트 인지 추천 질문 + 답변 흐름 1세트
- [ ] 모듈 컨텍스트 전달 1개 흐름 (갤러리 → 어시스턴트)
- [ ] 한글 Pretendard / 영문 Fraunces 이탤릭 / 라벨 JetBrains Mono 일관성
- [ ] Amplitude 톤 (다크 그라데이션 + 흰색 floating 카드 + 큰 serif italic)
- [ ] 시연 90초 안에 모든 핵심 기능 보여주기 가능

---

## 10. 시간 시나리오별 도달 가능 수준

| 작업 시간 | 도달 라운드 | 시연 가능성 |
|---|---|---|
| 1시간 | Round 1 | 구조와 톤 보여주기 |
| 2시간 | Round 1+2 | **실제 발표 가능** |
| 2.5시간 | Round 1+2+3 | 풀 임팩트 |
| 3시간 | + Round 4 폴리싱 | 우승권 |

---

## 11. 시작 명령

Claude Code에 이 문서 전체를 컨텍스트로 던진 다음, 다음 메시지 입력:

```
이 문서를 컨텍스트로 인지했어요.
지금 ~/projects/prism-marketing-os 디렉토리에 있고, GitHub 레포 클론 완료.
prism_visual_tokens.css, prism_demo_data.json, prism_assistant_review.json, prism_content_guide.md, prism_prd_v1.md 모두 같은 디렉토리에 있어요.

Round 1 시작해주세요.
```

Claude Code가 라운드 1 명령을 실행합니다. 끝나면 직접 push, Lovable에서 미리보기 확인 후 라운드 2로.

---

**Master Build Prompt · v1.0 · 2026.05.10**
**For Claude Code execution · Prism marketing content OS**
