# Prism — 마케팅 콘텐츠 OS

> 마케팅 팀의 콘텐츠 OS. 경쟁사 리서치 · AI 콘텐츠 검수 · 인과 분해 분석을 한 화면에서 — 분리된 도구들 사이에서 흩어지던 마케팅 컨텍스트를 하나로 잇는 통합 워크스페이스.

**2026 Lovable × Amplitude 해커톤 출품작** · 1-Day Prototype · Owner 푸우

---

## 빠른 시작

```bash
npm install
npm run dev
```

브라우저: <http://localhost:5173>

---

## 기술 스택

- **Vite + React 18 + TypeScript** — Lovable 기본 스택과 100% 호환
- **Tailwind CSS v3** — 유틸리티 + CSS 변수 토큰 매핑
- **react-router-dom** — 4탭 라우팅 (홈/갤러리/어시스턴트/대시보드)
- **framer-motion** — 사이드뷰 슬라이드, stagger reveal
- **lucide-react** — 아이콘
- **(추가 예정) recharts + d3 + d3-sankey** — Round 3 인과 분해 4탭 시각화

---

## 폴더 구조

```
prism-marketing-os/
├── src/
│   ├── styles/
│   │   └── tokens.css        # Prism 디자인 토큰 (CSS 변수)
│   ├── App.tsx               # Round 0: foundation placeholder
│   ├── main.tsx
│   └── index.css             # @import tokens + Tailwind directives
├── public/
│   ├── favicon.svg
│   └── ads/                  # 광고 캡처 이미지 (Round 2~)
├── dev_assets/               # 빌드 입력 자료 (Lovable·Claude Code 컨텍스트)
│   ├── prism_prd_v1.md
│   ├── prism_claude_code_master.md
│   ├── prism_build_package.md
│   ├── prism_demo_data.json
│   ├── prism_assistant_review.json
│   ├── prism_content_guide.md
│   └── prism_visual_tokens.css
├── index.html                # Pretendard / Fraunces / JetBrains Mono 폰트 link
├── tailwind.config.js        # 토큰 → Tailwind 매핑
├── package.json
└── README.md (이 파일)
```

---

## 디자인 시스템 (요약)

- **컬러**: bg `#FAFAF7` / ink `#141412` / indigo `#5B4FE5` / pink `#EC4899` / semantic green·amber·red
- **타이포**: 한글 Pretendard / 영문 디스플레이 Fraunces 이탤릭 / 라벨 JetBrains Mono uppercase
- **카드**: 흰색 bg, 0.5px 보더 `--rule`, 16px 라운드, 호버 시 translateY(-2px)
- **그라데이션**: 다크 hero에만 (radial indigo + magenta 18%)
- **절대 금지**: Material UI 룩, 진한 박스 그림자, 인디고 외 강한 액센트, system-ui 폰트

상세는 `src/styles/tokens.css` 참조.

---

## 라운드별 빌드 진행 상황

| 라운드 | 내용 | 상태 |
|---|---|---|
| Round 0 | Foundation: Vite + Tailwind + 토큰 + 폰트 + 라이브러리 | ✅ 완료 |
| Round 1 | AppShell · 4탭 라우팅 · HomePage · AI 사이드패널 | ⏳ 다음 |
| Round 2 | Gallery 30개 카드 · Assistant 풀패키지 검수 | 대기 |
| Round 3 | Dashboard · 인과 분해 4탭 · AI 사이드패널 답변 흐름 | 대기 |
| Round 4 | Polish · 시연 안정성 · 배포 | 옵션 |

라운드별 명령은 `dev_assets/prism_claude_code_master.md` §4 참조.

---

## 시연 시나리오 (90초)

1. **0~15s · 홈** — "마케터의 아침. AI 브리핑이 어제 일을 한 단락으로 정리"
2. **15~35s · 갤러리** — "새 광고 8개 → 5개 선택 → AI 패턴 분석 → 어시스턴트로 보내기"
3. **35~65s · 어시스턴트** — "기획서 던지고 검수 시작 → 좌측 본문 / 우측 6개 영역 풀패키지"
4. **65~90s · 대시보드** — "ROAS 인과 분해 → 유저 데이터 → AI 인사이트 → 마케터가 직접 만들고 측정한다"

---

## Lovable + GitHub 연동

매 라운드 완료 후:
```bash
git add .
git commit -m "Round N: <설명>"
git push origin main
```
→ Lovable이 자동 sync (수초 내) → 미리보기 URL 갱신

---

## Out of Scope (오늘 만들지 않는다)

- 실제 백엔드 API · DB 연동
- 실제 Amplitude 데이터 통합
- 실제 LLM (Claude Opus) 연결 — 모든 답변은 더미
- 사용자 인증 / 계정 / 권한
- 데이터 영속성 (새로고침 리셋 OK)
- 모바일 최적화 (~767px)
- 다국어

---

## 시연 URL

Lovable Publish 후 여기에 추가 예정.

---

**Master Build Prompt** · `dev_assets/prism_claude_code_master.md` v1.0 · 2026.05.10
