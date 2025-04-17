# 📊 Feple 상담사 대시보드

LG U+ 브랜드 테마에 맞춰 제작된 **상담사 성과 피드백 대시보드**입니다.  
React + Vite + TailwindCSS 기반이며, GitHub Actions로 자동 배포됩니다.

---

## 🚀 배포 주소

👉 [https://RJ-Stony.github.io/Feple](https://RJ-Stony.github.io/Feple)

---

## 📦 기술 스택

- **React** (with Vite)
- **TypeScript**
- **TailwindCSS** (with 커스텀 컬러: LG U+ 테마)
- **Framer Motion** – 부드러운 탭 전환 애니메이션
- **Recharts** – 점수 추이, 상담 유형 파이 차트
- **GitHub Actions + gh-pages** – 자동 빌드 & 배포

---

## 🖥️ 대시보드 구성

| 영역 | 설명 |
|------|------|
| 📓 코칭 다이어리 | 상담사별 피드백을 일기 형태로 시각화 |
| 🔮 예측 피드백 | 다음 주 예상 상담 유형 및 개선점 제공 |
| 🎮 게이미피케이션 | 주간 미션 진행률 + 보상 시스템 |

> 모든 영역은 탭으로 구분되어 있으며, 반응형 UI를 지원합니다.

---

## 🛠️ 로컬 실행 방법

```bash
# 1. 설치
npm install

# 2. 개발 서버 실행
npm run dev
```

---

## 📡 GitHub Pages 자동 배포

이 프로젝트는 `main` 브랜치에 push 시 **GitHub Actions**로 자동 배포됩니다.

### 👉 `.github/workflows/deploy.yml` 설정 포함
- 빌드 완료 시 `gh-pages` 브랜치에 정적 배포
- `vite.config.ts`의 `base` 경로 확인 필요 (`/Feple/`)

---

## 💖 커스텀 테마

```ts
// tailwind.config.cjs
colors: {
  primary: "#EB008B", // LG U+ 메인 핑크
  accent: "#1C1C1C",
  secondary: "#FAFAFA",
  card: "#FFFFFF",
  border: "#E0E0E0",
}
```

---

## ✨ 기여

이 프로젝트는 LG U+ Why Not SW 캠프 팀 프로젝트로 제작되었습니다.  
기여나 개선 제안은 언제든지 환영입니다!

---
