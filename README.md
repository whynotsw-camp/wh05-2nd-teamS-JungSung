# 📜 '유플피플' 프로젝트 기획서

## 🔨 프로젝트 정의
- **목표**: 상담 품질을 향상시키고 고객 만족도를 높이며, 상담사의 역량을 강화하는 것
- **주요 기능**
  - 데이터 기반 코칭 시스템
  - 상담 성과 구조화
  - 상담사 맞춤형 대시보드 및 피드백 제공

## ✨ 주요 내용

### 😃 현재까지 구현된 대시보드
👉🏻 [https://RJ-Stony.github.io/Feple](https://RJ-Stony.github.io/Feple)

### 📅 프로젝트 기간
- 2025-05-12 ~ 2025-05-16

### 🦹‍ Team
|김기훈|노준석|오정우|오현서|
|:---:|:---:|:---:|:---:|
|[<img src="https://img.shields.io/badge/GitHub_link-181717?style=for-the-badge&logo=github&logoColor=white"/>](https://github.com/kimgihoon-99)|[<img src="https://img.shields.io/badge/GitHub_link-181717?style=for-the-badge&logo=github&logoColor=white"/>](https://github.com/RJ-Stony)|[<img src="https://img.shields.io/badge/GitHub_link-181717?style=for-the-badge&logo=github&logoColor=white"/>](https://github.com/jungwoo898)|[<img src="https://img.shields.io/badge/GitHub_link-181717?style=for-the-badge&logo=github&logoColor=white"/>](https://github.com/OhHyunSeo)|
|![image](https://github.com/user-attachments/assets/fc95c797-0f56-4570-a5cb-a172f9d12eae)|![image](https://github.com/user-attachments/assets/8706ca13-ffff-4350-8e21-aa88153f1c47)|![image](https://github.com/user-attachments/assets/63557dd7-a3cf-485f-bf59-d2debf9b2b0b)|![image](https://github.com/user-attachments/assets/1adda3df-74ed-48b2-93ee-c4bf7cfa1ecd)|

### 🗂️ 데이터 현황

> 필요 데이터
- **데이터 개요:** 1건당 500글자 이상, 최소 3턴 이상의 질의·답변으로 구성된 민간 민원 상담 텍스트 데이터
- **데이터 출처:** [AIHub](https://www.aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&dataSetSn=71844)
- **데이터 특징:** 총 세션 수 약 3,500개, 20개의 수치형 피처와 1개의 범주형 피처로 구성
- **데이터 크기:** 1GB 미만
- **제공 포맷:** JSON

> 보조 데이터
- 상담 음성 데이터 등 추가 예정

## 🕖 일정 계획
![image](https://github.com/user-attachments/assets/f155f2c9-41f7-4300-b2f2-eb53b6580dff)

| 작업 항목                  | 시작 날짜   | 종료 날짜   | 기간(일) |
|:---:|:---:|:---:|:---:|
| KPI 및 지표 정의  | 2025-05-13 | 2025-05-13 | 1       |
| 사용자 시나리오 정의       | 2025-05-13 | 2025-05-15 | 3       |
| 평가 구조 설계 | 2025-05-13 | 2025-05-15 | 3       |
| 기술 구조 설계   | 2025-05-13 | 2025-05-16 | 4       |
| 데이터 파이프라인 구축     | 2025-05-13 | 2025-05-14 | 2       |
| 모델 아키텍처 설계     | 2025-05-13 | 2025-05-15 | 3       |
| 학습 및 검증              | 2025-05-13 | 2025-05-16 | 4      |
| UI/UX 디자인 & 스타일링              | 2025-05-13 | 2025-05-15 | 3      |
| 컴포넌트 라이브러리 구현              | 2025-05-13 | 2025-05-15 | 3      |
| 2차 프로젝트 발표 자료 준비 및 발표             | 2025-05-13 | 2025-05-16 | 4      |

-----------------------------

# ⚙️ 작업 분할 구조 (WBS)

## 🪜 단계별 작업 내용
### 💡 0. 요구사항 분석 및 설계
- 0.1. KPI 및 지표 정의
  - 0.1.1. 시스템 구조도 작성
  - 0.1.2. 기존 지표 검토 및 KPI 초안
- 0.2. 사용자 시나리오 정의
  - 0.2.1. 페르소나 정리
  - 0.2.2. 시나리오 흐름도 작성
- 0.3. 평가 구조 설계
  - 0.3.1. 4대 평가축 지표 설계
  - 0.3.2. Percentile 구조 설계
- 0.4. 기술 구조 설계
  - 0.4.1. 기술 스택 선정
  - 0.4.2. API 흐름 정리
  - 0.4.3. 시스템 흐름 재검토 및 발표자료 준비

### 💡 1. AI 모델 개발
- 1.1. 데이터 파이프라인 구축
  - 1.1.1. STT용 오디오 수집·저장 프로세스 개발 
  - 1.1.2. 텍스트 전처리 스크립트 구현 (토크나이징·정제) 
- 1.2. 모델 아키텍처 설계
  - 1.2.1. STT 엔진 비교·선정
  - 1.2.2. 감정분석 모델(LightGBM 등) 검토·선정
- 1.3. 학습 및 검증
  - 1.3.1. 학습 스크립트 및 데이터셋 구축
  - 1.3.2. 하이퍼파라미터 튜닝 및 교차검증
  - 1.3.3. 성능 평가(정확도·F1·RCurve)

### 💡 2. Front-end 개발
- 2.1. UI/UX 디자인 & 스타일링
  - 2.1.1. 대시보드 가안(와이어프레임) 작성
  - 2.1.2. 화면 설계도 작성 (Figma)
  - 2.1.3. 디자인 시스템 정의 (Atomic Design)
  - 2.1.4. 스타일 가이드 설계
  - 2.1.5. Figma 프로토타입 검증 및 사용자 피드백 반영
- 2.2. 컴포넌트 라이브러리 구현
  - 2.2.1. 공통, 레이아웃 컴포넌트 개발
  - 2.2.2. 아이콘 및 일러스트 관리 컴포넌트 작성

### 🫢 시각 자료
![image](https://github.com/user-attachments/assets/c53da36c-2933-4e9b-88da-df7c7e85e81a)

---------------------------

# 🛠️ 프로젝트 설계서

## 🌊 데이터 아키텍처
![image](https://github.com/user-attachments/assets/9cc91e19-6834-48fc-90e4-5ad99e3a0211)

## 📚 기술 스택

### 💻 Front-end
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/><img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white">

### 🖥 Back-end
<img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white"><img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"/>

### 🗄 Database
<img src="https://img.shields.io/badge/Redis-FF4438?style=for-the-badge&logo=redis&logoColor=white"/><img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white"/>

### 🎨 Design
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/>

### 🛳️ Release
<img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white"/>

### 🤖 AI
<img src="https://img.shields.io/badge/Scikit_learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white"/><img src="https://img.shields.io/badge/Pytorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white"/>

-------------------------

## 📈 대시보드

### 💡 메인 페이지
![image](https://github.com/user-attachments/assets/e9319551-a670-4c71-b8d4-025df3a7f09e)

### 💡 상담 주요 내용 페이지
![image](https://github.com/user-attachments/assets/dd43ab39-1557-4318-9194-7fe7142d91fe)

### 💡 친절도 분석 페이지
![image](https://github.com/user-attachments/assets/12c9741b-c9ed-4fda-99e6-20a62e2ebf1c)

---

## 🤔 향후 보완점

### 💡 데이터 불균형 및 부족
- **현황**  
  - ‘만족’ 클래스에 비해 ‘미흡’, ‘추가 상담 필요’, ‘해결 불가’ 샘플이 매우 적음  
- **개선 방안**  
  - **다양한 채널**에서 **고객군별(**기업/개인 등**) 맞춤 데이터 수집**  

### 💡 추가적인 모델 보완 필요
- **현황**  
  - LightGBM 단일 모델만 사용 중  
- **개선 방안**  
  - XGBoost, CatBoost 등 **여러 트리 부스팅 모델 앙상블**  
  - Optuna·Ray Tune 활용한 **하이퍼파라미터 최적화**  

---
