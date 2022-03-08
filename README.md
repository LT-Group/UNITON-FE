# 마춤뻡에서 살아남기

<br />

## 🚀&nbsp;&nbsp;배포 주소

👉 [배포링크 바로가기](https://grammer-survive.netlify.app/)

<br/>

## 👩&nbsp;&nbsp;팀원소개 및 담당페이지

- 상세 구현 사항은 아래에 정리해두었습니다.

|                                          이선재                                           |                                          변우진                                           |                                          김지은                                          |
| :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/63578094?v=4" width=100 alt="seonjae"/> | <img src="https://avatars.githubusercontent.com/u/68841691?v=4" width=100 alt="woojin" /> | <img src="https://avatars.githubusercontent.com/u/19404865?v=4" width=100 alt="jieun" /> |
|                                 시험지 제출, 보기 페이지                                  |                               로그인, 회원가입, 랭킹 페이지 메인, 마이 페이지                              |                                    메인, 마이 페이지                                     |
|                           [Github](https://github.com/Sunjae95)                           |                          [Github](https://github.com/Byunwoojin)                          |                           [Github](https://github.com/oranjik)                           |

<br />

## 📌&nbsp;&nbsp;사용한 기술 스택

- NextJS
- recoil
- MUI
- Emotion

<br/>

## 🎮&nbsp;&nbsp;구현 사항

- 로그인, 회원가입 페이지
  - 조건에 맞는 아이디, 비밀번호 입력 시 로그인 및 회원가입 기능
- 메인페이지
  - 로그인 유무에 따라 보여주는 출력화면 구현
  - 네비게이션바를 사용하여 랭킹페이지, 마이페이지로 이동
  - 시험보기 버튼을 눌러 시험보기 페이지로 이동
- 시험지 제출, 보기 페이지
  - 음성 자동 재생, 중지 기능
  - 시험지 제출 및 체점 결과 출력
- 마이 페이지
  - 시험회수에 따른 학년 출력
  - 맞은 점수에 따른 도장 출력
  - 지금까지 시험 본 시험지 출력
- 랭킹 페이지
  - 틀린 순위가 높은 문제명 출력

<br />

## 🧗‍&nbsp;&nbsp;프로젝트 과정 소개

### 👉 협업 툴

- 노션 : [아이디에이션 / 회의록 작성](https://probable-taxi-bb6.notion.site/6ceaaae2dcfd40d4a16aa7bf35659f72)
- Discord

<br />

### 👉 Branch 전략

- main - 배포
- develop - 배포 전 workplace
- option/content
  - option: feat, fix, docs 등...
  - content: 내용 ex) lazyImage 와 같은 camelcase로 작성

### 👉 Git 커밋 컨벤션

> Option: 내용(상세 내용)

- Feat - 새로운 기능 추가
- Fix - 버그 수정
- Docs - 제품 코드 수정 없음
- Style - 코드 형식, 정렬, 주석 등의 변경
- Refactor - 코드 리팩토링
- Test - 테스트 코드 추가
- Chore - 환경설정, 빌드 업무, 패키지 매니저 설정등..

<br />
