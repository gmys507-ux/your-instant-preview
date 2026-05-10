# Prism — Build Package v1.0

> **PRD v1.0 기준 빌드 패키지.** Layer 1(60분) → Layer 2(추가 60분) → Layer 3(옵션) 순서로 진행.
> 이 문서의 프롬프트를 Lovable·Claude Code에 그대로 붙여넣어 빌드.

## 패키지 구성

| 파일 | 용도 |
|---|---|
| `prism_build_package.md` (현재) | 마스터 인덱스 + Lovable 프롬프트 5종 |
| `prism_demo_data.json` | 갤러리 광고 30개 + 대시보드 데이터 |
| `prism_assistant_review.json` | 어시스턴트 검수 결과 풀패키지 1세트 |
| `prism_content_guide.md` | 사내 콘텐츠 가이드 더미 데이터 |
| `prism_claude_code_spec.md` | Layer 3 빌드 명세 |
| `prism_visual_tokens.css` | CSS 변수 토큰 |

---

## 빌드 순서 — 한눈에

```
[지금]                                                        [+1h]                            [+2h]                            [+3h · 옵션]
   │                                                            │                                │                                │
   ▼                                                            ▼                                ▼                                ▼
 Layer 0                                                    Layer 1                          Layer 2                          Layer 3
 PRD/패키지                                                   MVP                              Detail                            Polish
 (10분)                                                     (60분)                            (60분)                            (60분)
                                                                                                                                  
                                                          [Lovable]                        [Lovable]                        [Claude Code]
                                                          마스터 프롬프트                      모듈별 4개 프롬프트                  인과 4탭 D3/Recharts
                                                          → 4탭 + 홈 + AI 버튼              → 갤러리·어시·대시·홈 디테일        + 사이드뷰 슬라이드
                                                                                                                              + 컨텍스트 액션
```

---

## Layer 1 — Lovable 마스터 프롬프트

> **사용법**: Lovable 새 프로젝트 생성 → 아래 프롬프트 그대로 붙여넣기 → 첫 빌드 받기 (~5분 대기). 받은 결과에 비주얼 토큰을 박아 톤을 잡고, Layer 2 모듈별 프롬프트로 디테일 빌드.

### 프롬프트 본문

```
Build "Prism" — a marketing content OS for a Korean D2C beauty/health brand team.
Single-page React + Tailwind app. Korean-language UI throughout (use 'Pretendard' font for Korean,
'Fraunces' for English display headings with italic flair, 'JetBrains Mono' for labels/code).

═══════════════════════════════════════════
GLOBAL LAYOUT (every page shares this shell)
═══════════════════════════════════════════
- Top nav bar (height 56px):
  - Left: logo "Prism" in Fraunces italic, indigo (#5B4FE5)
  - Center: 4 tab links — 홈 / 갤러리 / 어시스턴트 / 대시보드
  - Right: small green-dot pill "● Connected to Amplitude"
- Main content area below the nav, full width
- Floating button (bottom-left, fixed): 44px circle, dark (#141412),
  white sparkle icon (✦). Clicking opens a right-side panel (380px wide)
  that slides in — this is the "AI sidepanel". For now show a header
  "AI Assistant" + a placeholder textarea + close (X) button.

═══════════════════════════════════════════
DESIGN TOKENS (CSS variables, paste in :root)
═══════════════════════════════════════════
--bg: #FAFAF7;          --paper: #FFFFFF;
--bg-2: #F2F0E8;        --bg-3: #ECE9DD;
--ink: #141412;         --ink-2: #2C2C28;
--ink-3: #5C5A52;       --ink-4: #8E8B7E;
--rule: #D8D2C2;        --rule-light: #E8E3D5;
--indigo: #5B4FE5;      --indigo-bg: #E8E5FB;
--pink: #EC4899;        --pink-bg: #FBE4EF;
--green: #10B981;       --green-bg: #DEF5EB;
--amber: #D97706;       --amber-bg: #FBEEDA;
--red: #DC2626;
Typography sizes — display 48-88px Fraunces, h2 28-32px, body 15px,
meta/eyebrow 11px JetBrains Mono uppercase letter-spacing 0.16em.

═══════════════════════════════════════════
TAB 1 — HOME (default landing)
═══════════════════════════════════════════
Use a darker hero section at the top with subtle gradient
(radial gradient: indigo + magenta, 18% opacity max, on top of #141412).
Inside hero: large white serif italic display "안녕하세요, 푸우 ✦"
plus AI briefing paragraph (white, 18px):
"어제 8개 새 경쟁사 광고가 추가됐어요. ROAS는 3.8 (+12%).
검수 대기중인 콘텐츠 3건. 화장솜 카테고리 콘텐츠 피로도 신호 감지됨."

Below hero, on the paper background (--bg):
- Section title "지금의 마케팅" (Fraunces 32px)
- 4-card grid (2x2 on desktop, stack on mobile) — each card 280px tall:
  - Card 1: 갤러리 — "어제 새 광고 8건 · Before/After 트렌드"
  - Card 2: 어시스턴트 — "검수 대기 3건 · 평균 일치도 71%"
  - Card 3: 대시보드 — "ROAS 3.8 +0.4 · D7 retention +12%p"
  - Card 4: 가이드 — "콘텐츠 가이드 v3.3 업데이트"
  Each card: white bg, border 1px solid --rule, padding 24px,
  rounded 16px, hover lift (translateY -2px), JetBrains Mono eyebrow
  + Fraunces serif title + Pretendard body.

Then a "지금 해야 할 일" action strip (3 horizontal cards):
- "3건 검수 대기 — 지금 처리하기" → links to /assistant
- "ROAS 하락 신호 — 원인 분석" → links to /dashboard
- "새 경쟁사 광고 8건 — 갤러리 보기" → links to /gallery
Each is a horizontal card with arrow icon on the right.

═══════════════════════════════════════════
TAB 2 — GALLERY (placeholder for now)
═══════════════════════════════════════════
Placeholder page:
- Page header "경쟁사 광고 갤러리" (Fraunces 40px)
- Subtitle "Meta · Instagram · YouTube · TikTok 광고를 한 곳에서"
- Grid of 6 placeholder card boxes (3x2), each with gray bg, rounded 12px,
  height 240px, holding text "광고 #N" centered.
- Left sidebar (240px) with filter labels: 브랜드 · 제품 · 국가 · 채널 · 플랫폼
  (just labels for now, no functionality)
- Real grid will be built in Layer 2

═══════════════════════════════════════════
TAB 3 — ASSISTANT (placeholder for now)
═══════════════════════════════════════════
Placeholder entry state:
- Centered on white background
- Small avatar circle (40px) with sparkle icon
- Heading "무엇을 도와드릴까요?" (Pretendard 24px medium)
- Chat input bar (max-width 480px): rounded 12px, light border,
  paperclip icon on left, "↑ 보내기" button on right
- Below: 5 suggestion chips: 기획서 검수 · 대본 작성 · 컨셉 제안 · 소구점 분석 · 타사 광고 비교

═══════════════════════════════════════════
TAB 4 — DASHBOARD (placeholder for now)
═══════════════════════════════════════════
Placeholder dashboard:
- Top: 6 KPI cards in horizontal row — 매출 / ROAS / 광고비 / CTR / CVR / 신규가입
  Each card: small label + big number + tiny change indicator
- Below: a wide gray placeholder rectangle (height 200px) with text
  "인과 분해 시각화 — Layer 3에서 구현"
- Below: 3 user-data cards in a row — Funnel · Retention · Segment
  (placeholder rectangles for now)
- Bottom: 3 AI insight cards in a row, each white bg with indigo border,
  small "AI INSIGHT 0N" eyebrow + body text

═══════════════════════════════════════════
RESPONSIVE
═══════════════════════════════════════════
Desktop-first (1280px+). Tablet (768-1279): collapse left sidebars
to drawer. Mobile (<767px): stack everything vertically, hide AI
sidepanel button (out of scope).

═══════════════════════════════════════════
QUALITY BAR
═══════════════════════════════════════════
Reference: amplitude.com homepage tone. Use generous whitespace,
subtle gradient meshes (no harsh colors), serif italic accents
in headings. Avoid generic SaaS look. Every page should feel like
a thoughtful editorial product.
```

→ 여기까지 받으면 **Layer 1 완료**. 다음은 모듈별 디테일 빌드.

---

## Layer 2 — 모듈별 Lovable 프롬프트 (4개)

> **사용법**: Lovable 채팅에서 모듈별로 추가 요청. 한 번에 한 모듈씩.

### 프롬프트 ① 갤러리 디테일

```
Build out the Gallery tab with full detail.

Data source: import 30 ads from /public/data/ads.json
(structure: array of {id, brand, product, platform, country, channel,
thumbnail, copy_hook, concept, conti[], appeal_points[],
metrics{}, alignment_score, tags[]}).

LAYOUT
- Left sidebar (260px): filter section
  - Search input at top
  - Filter groups: 브랜드 (checkboxes), 제품 (checkboxes),
    국가 (checkboxes), 채널 (checkboxes), 플랫폼 (checkboxes)
  - Each filter group title in JetBrains Mono uppercase 11px,
    items in Pretendard 14px
- Top bar: count "30개 광고" + sort dropdown (최신/타율 점수/인기)
- Main: Pinterest-style masonry grid (3 columns desktop, 2 tablet)
  using CSS grid auto-rows: minmax(180px, auto). Cards have varying heights.

CARD COMPONENT
- White bg, rounded 12px, border 0.5px --rule
- Top: thumbnail (use placeholder gradient or unsplash random per card)
  with hover effect — slight zoom + show platform icon overlay
- Bottom padding 16px:
  - Brand name (JetBrains Mono uppercase 10px, --ink-3)
  - Copy hook (Pretendard 14px medium, 2-line clamp)
  - Concept (Pretendard 12px, --ink-3, italic)
  - Bottom row: small badge for platform, alignment_score as colored pill
    (>80 green, 60-80 amber, <60 red), running_days
- Card click → opens right-side detail panel (overlay, 480px wide)

DETAIL PANEL (slide in from right when card clicked)
Sections, top to bottom:
1. Large thumbnail
2. Brand + product + platform badges
3. Full copy_hook
4. Concept analysis
5. Conti list — each scene as a numbered item with timestamp
6. Appeal points as chips
7. Metrics block — 4 small cells (impressions, spend, days, CTR)
8. Alignment score as a circular ring (large, indigo)
9. Bottom CTA: "이 광고로 우리 콘텐츠 만들기" — primary button,
   indigo bg, white text, rounded 8px

MULTI-SELECT + AI PATTERN ANALYSIS
- Cards have a subtle checkbox in top-right (visible on hover)
- When 2+ selected, floating action bar appears at bottom center:
  "{N}개 선택 · ✦ AI 패턴 분석"
- Click → modal overlay shows fake analysis result:
  "공통 후크: 첫 3초 Before 비주얼 강조 (5/5)"
  "공통 소구점: 즉각 효과 + 사용자 검증 (4/5)"
  "공통 CTA: 한정 할인 + 카운트다운 (3/5)"
  Then bottom button "어시스턴트로 보내기" (primary).

QUALITY
- Hover states everywhere
- Smooth transitions on filter changes (fade or list animation)
- Use the existing design tokens
```

### 프롬프트 ② 어시스턴트 디테일

```
Build out the Assistant tab with full detail. Two states.

═══ STATE 1: ENTRY (no upload yet) ═══
- Centered layout, max-width 720px
- Top: small avatar circle (sparkle icon) + heading
  "무엇을 도와드릴까요?" (Fraunces serif 32px)
- Subtitle (Pretendard 15px, --ink-3):
  "기획서를 던져 주세요. 가이드 일치도, 개선 카피, 콘티 제안까지 한 번에."
- Chat input bar (full max-width):
  - Padding 14px 16px, border 1px --rule, rounded 16px
  - Top row: "기획서를 붙여넣거나 업로드하세요…" placeholder
  - Bottom row: paperclip icon + photo icon + link icon (left)
                + "↑ 보내기" indigo button (right)
- Below: 5 suggestion chips (Pretendard 12px, light bg --bg-2,
  rounded full, padding 6px 12px):
  기획서 검수 · 대본 작성 · 컨셉 제안 · 소구점 분석 · 타사 광고 비교

When user types or uploads → transition to State 2 (use a button
"Mock 검수 시작" that switches state for demo purposes).

═══ STATE 2: RESULT WORKSPACE ═══
Layout: 2-column grid, left 320px sticky / right flex (scrollable).

LEFT (sticky position, 320px wide, --bg-2 background, padding 20px):
- Eyebrow: "내가 올린 기획서"
- Show the FULL planning document (not a summary):
  - 제목 / 컨셉 / 타겟 / 채널 / 소구점 (each as a short labeled paragraph)
  - 콘티 (numbered list of 5 scenes with timestamps)
  - 대본 (FULL text, multi-paragraph, with timestamps)
  - 이미지 배치 계획 (5 scenes with what visual goes in each)
  - CTA copy
  Use Pretendard 12.5px, line-height 1.85.
  Sticky position so it stays visible while right side scrolls.

RIGHT (scrollable, flex-1):
6 sections stacked vertically with 16px gap. Each is a card.

Section 1 — SCORE + COMMENTS
- Eyebrow "01 · SCORE" (indigo bg pill)
- Big "가이드 일치도 73%" with circular progress ring (indigo)
- Below: 3 line items with icons:
  ✓ green: 콘티 · 후크 임팩트 양호 (가이드 4.2 충족)
  ⚠ amber: 카피 · CTA 톤이 가이드 6.1과 어긋남 (명령형 → 권유형)
  ✗ red: 소구점 · 가이드 핵심 "사용자 검증 요소" 누락

Section 2 — IMPROVED COPY + REASONING
- Eyebrow "02 · 개선 카피"
- Two stacked blocks:
  - "기존" block: gray bg, original copy
  - "개선안" block: white bg with green left border, improved copy
- Reasoning box below (small, --ink-3):
  "근거: 가이드 6.1 + 사내 ROAS 상위 콘텐츠 12개 공통 패턴"

Section 3 — SCENE STRUCTURE
- Eyebrow "03 · 씬 구성"
- 5-column grid, each cell:
  - Time stamp at top (0-3s, 3-6s, 6-10s, 10-13s, 13-15s)
  - Visual description below
- Each cell has light bg, rounded 8px, padding 8px

Section 4 — COMPETITOR COMPARISON
- Eyebrow "04 · 타사 비교"
- 3-column grid, each card:
  - Thumbnail placeholder (gradient)
  - Brand name (bold)
  - Similarity %
  - Running days

Section 5 — INTERNAL TOP PERFORMERS
- Eyebrow "05 · 사내 타율 상위 비교"
- One paragraph: "상위 콘텐츠와 가장 큰 차이점 — 첫 3초 후크에 사용자 인터뷰 인용 부재."
- Big number: "예상 ROAS 3.8 → 4.6 (+21%)" — ROAS up indicator

Section 6 — MODULE NAVIGATION CHIPS
- 3 chips horizontal:
  🖼 갤러리에서 유사 광고 보기
  📊 대시보드에서 시뮬레이션
  ⬇ 개선안 다운로드

DATA: import the result content from /public/data/review_result.json
(structure described in PRD §6.3)

QUALITY
- Reveal sections one-by-one with stagger animation when result loads
- All text in Pretendard, all eyebrows in JetBrains Mono uppercase
```

### 프롬프트 ③ 대시보드 디테일

```
Build out the Dashboard tab with full detail. Layout A (top-down).

DATA: import from /public/data/dashboard.json with kpis, causal,
user_funnel, retention, segments, insights.

═══ TOP — KPI ROW (6 cards) ═══
Single horizontal row, equal-width cards, gap 8px.
Each card (--bg-2 background, padding 14px, rounded 8px):
- Label (JetBrains Mono uppercase 10px, --ink-3): 매출 / ROAS / 광고비 / CTR / CVR / 신규가입
- Big number (Pretendard 22px medium): ₩2.4억 / 3.8 / ₩63M / 2.1% / 4.3% / 1,284
- Tiny delta indicator below (green +12% / red -3% / etc.)
- Click → opens right-side detail drawer (slide-in panel, 420px wide)
  with placeholder content: time series chart + connected metrics

═══ MIDDLE — CAUSAL DECOMPOSITION (4 TABS) ═══
- Section header: "결과 → 선행 지표 인과 분해" (Fraunces 22px)
- Tab bar with 4 tabs: 가 · Sankey / 나 · 노드 그래프 / 다 · Funnel + 분기 / 라 · 멀티-레이어
- Active tab: indigo bg, white text. Default = 가 (Sankey).
- Below tabs: large visualization area (height 320px, --bg-2 background, rounded 12px)
- For now show placeholder text per tab (Layer 3 will build actual D3 viz):
  "가 — Sankey 다이어그램 (Layer 3에서 D3로 구현)"

═══ NEXT — USER DATA SECTION (Amplitude badge) ═══
- Section header row: "유저 데이터 분석" + small pill badge "via AMPLITUDE" (indigo-bg)
- 3-column grid, each card (--bg-2, padding 14px, rounded 12px, height 180px):
  - Card 1: "유저 행동 Funnel" — placeholder bar chart
    (4 horizontal bars getting smaller: 100% → 64% → 38% → 21%)
  - Card 2: "코호트 리텐션" — placeholder line chart with 3 lines
  - Card 3: "세그먼트별 전환율" — placeholder horizontal bars

═══ BRIDGE — CONNECTION INSIGHT (the key visual) ═══
- One full-width card with --indigo-bg background, padding 14px,
  rounded 12px, with a 🔗 link icon on the left
- Text: "ROAS 3.8을 만든 핵심 코호트는 30대 여성 세그먼트 — 화장솜 카테고리
  콘텐츠에 가장 높은 전환"
- Color: --indigo-deep on indigo-bg

═══ BOTTOM — AI INSIGHT CARDS (3) ═══
- 3-column grid, each card:
  - White bg, 1px solid --indigo border, rounded 12px, padding 14px
  - Eyebrow "AI INSIGHT 0N" (JetBrains Mono indigo)
  - Insight text (Pretendard 14px):
    01 — "ROAS 18% 하락 — 화장솜 콘텐츠 피로도 원인"
    02 — "신규 가입 코호트 D7 retention +12%p"
    03 — "YouTube 광고 비용 효율 +24%, 비중 확대 권장"
  - Click → opens AI sidepanel with that insight as context
    (just open the sidepanel for now, no real AI)

═══ TOP-RIGHT — Amplitude Badge ═══
- Already in global nav: "● Connected to Amplitude"
- Reinforce within dashboard with one small note near top:
  "All data via Amplitude Web Analytics" (small, --ink-3)

QUALITY
- All numbers in tabular format
- KPI cards all same height
- Use the existing design tokens
```

### 프롬프트 ④ AI 사이드패널 디테일

```
Enhance the AI sidepanel (right slide-in, 380px wide).

═══ HEADER ═══
- Top bar (height 56px): 
  - Left: sparkle icon + "Prism AI" (Pretendard 14px medium)
  - Right: close (X) icon
- Below: tab indicator showing context
  ("현재 컨텍스트: 대시보드" — JetBrains Mono uppercase 10px --ink-3)

═══ EMPTY STATE ═══
When opened with no message yet, show:
- 4 suggested questions as cards (full width, stacked):
  Each card: --bg-2 bg, rounded 8px, padding 12px,
  small ✦ icon + question text, hover bg darker.
  Questions vary by current tab:
    홈: "오늘 마케팅팀이 알아야 할 것?"
    갤러리: "이 광고들의 공통 패턴은?"
    어시스턴트: "이 카피, 우리 가이드와 얼마나 일치해?"
    대시보드: "지난주 대비 ROAS 떨어진 원인?"
- Below cards: chat input (small, similar to assistant entry)

═══ ANSWER STATE ═══
When user clicks a question, show this answer flow:

For "지난주 대비 ROAS 떨어진 원인?" demo answer:

1. INSIGHT TEXT (one paragraph, Pretendard 14px):
   "지난주 대비 ROAS 18% 하락. 가장 큰 원인은 화장솜 카테고리 콘텐츠 피로도 — 
    동일 컨셉의 광고가 21일 이상 운영되며 CTR 4.2% → 2.1%로 절반 감소."

2. INLINE TREND CHART (mini line chart, 280×80px):
   Show ROAS trend over 14 days, declining curve.
   Use --indigo for line, light fill below.

3. TOP CONTENT CARDS (2 cards stacked):
   Each card has thumbnail + brand + metric.
   "가장 영향 큰 콘텐츠 2건"

4. MODULE NAV CHIPS (3 horizontal):
   🎨 어시스턴트로 새 콘텐츠 기획
   🖼 갤러리에서 비슷한 광고
   📊 대시보드에서 시뮬레이션

QUALITY
- Sidepanel uses backdrop-blur effect for slight glass feel
- All elements appear with smooth stagger animation
- Sidepanel can be closed by clicking X or overlay outside
```

---

## Visual Direction — Lovable에 추가로 박을 컨텍스트

> Lovable이 비주얼 톤을 이해 못 할 때 추가로 던질 수 있는 보강 프롬프트.

```
DESIGN REFERENCE TONE
- Reference: amplitude.com homepage (the dark hero with floating cards
  and serif italic display fonts, soft gradient meshes)
- Avoid: generic SaaS dashboard look (no Material UI, no Bootstrap defaults,
  no boxy cards with heavy shadows)
- Spirit: editorial publication meets modern analytics tool — like a
  Wired magazine that happens to be a software product
- Korean typography is hero — Pretendard at all weights, generous line-height (1.7)
- English headings use Fraunces with italic accents (the italic 'i' is a signature)
- All meta/labels use JetBrains Mono in uppercase with letter-spacing

COMPONENT POLISH
- Buttons: rounded 8px, padding 10px 16px, weight 500, slight hover lift
- Cards: rounded 12px, border 0.5px --rule (very subtle), white bg,
  hover translateY(-2px) with smoother shadow
- Inputs: rounded 12px, light bg, focus ring indigo
- Pills: rounded full, padding 4px 10px, small uppercase text
- Animations: 200ms ease-out for hovers, 300ms for state transitions
```

---

## Layer 1 빌드 완료 체크리스트

Layer 1 빌드 결과를 받았을 때 확인할 항목:

- [ ] 4개 탭 클릭 시 화면 전환 동작
- [ ] 홈 hero에 다크 그라데이션 + 큰 한글 헤딩 + AI 브리핑
- [ ] 홈 모듈 카드 4개 (갤러리·어시스턴트·대시보드·가이드)
- [ ] 홈 액션 카드 3개
- [ ] 갤러리/어시스턴트/대시보드 — placeholder 화면
- [ ] 좌하단 floating ✦ 버튼 → 클릭 시 우측 패널 슬라이드
- [ ] Pretendard·Fraunces·JetBrains Mono 적용
- [ ] 컬러 토큰 적용 (인디고·핑크·그린·앰버)
- [ ] 반응형 (데스크톱·태블릿)

→ 통과하면 Layer 2로. 부분만 통과하면 그 부분만 Lovable에 다시 요청.

---

## Layer 2 → Layer 3 전환

Layer 2 디테일 빌드 완료 후 Layer 3로 가려면 `prism_claude_code_spec.md` 참조.

핵심 작업:
1. 인과 분해 4탭의 실제 시각화 (D3.js / Recharts)
2. KPI 클릭 시 사이드뷰 슬라이드 애니메이션
3. 모듈 컨텍스트 전달 액션 (갤러리 선택 → 어시스턴트로 데이터 전달 등)
4. 어시스턴트 답변 스트리밍 효과
5. 갤러리 카드 호버 시 영상 자동 재생

---

**Build Package · v1.0 · 2026.05.10**
**Next file: `prism_demo_data.json`**
