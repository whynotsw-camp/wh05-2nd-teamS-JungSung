# 📊 Feple(Feedback + Platform) 상담사 대시보드

LG U+ 브랜드 테마에 맞춰 제작된 **상담사 성과 피드백 대시보드**입니다.  
React + Vite + TailwindCSS 기반이며, GitHub Actions로 자동 배포됩니다.

---

## 목차

* [배포 주소](#배포-주소)
* [주요 기능](#주요-기능)
* [데이터 & 분석 지표](#데이터--분석-지표)
* [페이지 구성](#페이지-구성)
* [기술 스택](#기술-스택)
* [설치 및 실행 방법](#설치-및-실행-방법)
* [폴더 구조](#폴더-구조)

---

## 배포 주소

👉🏻 [https://RJ-Stony.github.io/Feple](https://RJ-Stony.github.io/Feple)

---

## 주요 기능

* **성과 대시보드**

  * 전체 상담 세션 수, 평균 감정 점수, 스크립트 준수율, 갈등 비율, 평균 침묵 비율, 평균 발화 속도, 존댓말 사용율, 공감 표현율 KPI 카드
  * 상담 중분류 및 콘텐츠 분류별 파이 차트 시각화
  * 상위 5개 키워드 추출 및 리스트 표시
* **세션 목록 페이지**

  * 상담 세션 검색, 필터링, 카드 형태 리스트 제공
  * 카드에서 고객·상담사 감정 상태, 주요 지표 확인
* **친절도 분석 페이지**

  * 요청 빈도, 부드러운 단어, 긍정 단어, 존댓말 사용 비율을 Radar 차트로 시각화

---

## 데이터 & 분석 지표

* **데이터 원본**: `src/data/text_features_all_training.csv` (약 3,500개 세션, 20여 개 피처)
* **전처리**: PapaParse로 CSV 로드, 라벨 인코딩 및 불필요 피처 제거
* **산출 지표**:

  * `silence_ratio` (침묵 비율)
  * `고객_sent_score` (고객 감정 점수)
  * `script_phrase_ratio` (스크립트 준수 비율)
  * `conflict_flag` 기반 갈등 비율
  * `speed_ratio` (발화 속도, WPM)
  * `honorific_ratio` (존댓말 비율)
  * `euphonious_word_ratio` (부드러운 단어 비율)
  * `positive_word_ratio` (긍정 단어 비율)
  * `request_ratio` (요청 단어 빈도)

---

## 페이지 구성

| 페이지        | 경로            | 설명                                   |
| ---------- | ------------- | ------------------------------------ |
| 성과 대시보드    | `/`           | KPI 카드, 중분류/콘텐츠 분포 파이 차트, 키워드 리스트 표시 |
| 세션 목록 페이지  | `/sessions`   | 상담 세션 검색 및 리스트, SessionCard 컴포넌트 활용  |
| 친절도 분석 페이지 | `/politeness` | Radar 차트를 활용한 친절도 지표 비교              |

---

## 기술 스택

* **프론트엔드**: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Recharts
* **데이터 처리**: PapaParse (CSV 로드)
* **협업 & 배포**: GitHub Actions, GitHub Pages

---

## 설치 및 실행 방법

```bash
git clone https://github.com/RJ-Stony/Feple.git
cd Feple
npm install
npm run dev   # 개발 서버: http://localhost:5173
```

---

## 폴더 구조

```
Feple/
├─ public/                # 정적 자산 (logo, 폰트 등)
├─ src/
│  ├─ data/               # 분석용 CSV 데이터
│  ├─ hooks/              # useDashboardData, useSessionData
│  ├─ components/         # KPIGrid, PieDistribution, SessionCard, TopKeywords
│  │   └─ common/         # Header, Layout, Sidebar
│  ├─ pages/              # Dashboard.tsx, Sessions.tsx, Politeness.tsx
│  └─ main.tsx            # 애플리케이션 진입점
├─ README.md
├─ tailwind.config.cjs
├─ tsconfig.json
├─ vite.config.ts
└─ package.json
```

---
