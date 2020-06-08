<p>
  <img width="200" src="./front/public/images/logo_black.png">
  <br/>
  Learn English with TED talks
</p>

> Tedowing은 Ted 영상으로 쉐도잉을 하며 영어공부를 하는 서비스입니다.

<h4>
  <a href="https://vimeo.com/423093700" target="_blank">[시연 영상 보기]</a>
</h4>

<img width="640" alt="tedowing main" src="https://user-images.githubusercontent.com/11307469/83143884-95613f00-a12d-11ea-9806-286cb1387340.jpg" />
<br/>
<br/>
<br/>

## 사용 기술

- [Front-end] TypeScript, React(CSR), MobX(mobx-react-lite), styled-components
- [Back-end] Node.js(Express), MySQL(Sequelize), Google OAuth 2.0, TED Crawling
<br/>
<br/>

## Features

### 1. Login

구글 OAuth 로그인 2.0

- Passport.js

<br/>
<br/>

### 2. My Videos

**2-1. 비디오 리스트**

<img width="640" alt="tedowing my videos" src="https://user-images.githubusercontent.com/11307469/83146644-985e2e80-a131-11ea-91dd-4f4f1b3ab52d.jpg">

- 등록한 TED 영상 리스트
- Pagination, 반응형 고려
  <br/>

- [추가 개발 예정 기능]
  - 영상 즐겨찾기
  - 최근 본 영상 기록

<br/>
<br/>

**2-2. TED 영상 등록**

<img width="640" alt="tedowing new video" src="https://user-images.githubusercontent.com/11307469/83146978-00ad1000-a132-11ea-8394-5c8d0f2da929.png">

- [F/E]

  - TED url로 영상 등록

- [B/E]
  - DB에 해당 영상이 없는 경우, url로 크롤링 및 DB에 저장. (cheerio 이용)
  - 크롤링하는 데이터
    - TED 비디오 CDN url
    - 번역 데이터 (현재 한,중,일,영어만 지원)
    - 기타 메타데이터 (thumbnail, speaker, duration, tags, etc.)

<br/>
<br/>

### 3. 쉐도잉

<img alt="tedowing shadowing" src="https://user-images.githubusercontent.com/11307469/83150235-fee54b80-a135-11ea-919b-b9978916fa1c.gif">

- 비디오 영상 시간에 맞춰 영문/번역 동시에 확인.
- 스크립트 UI 클릭 시, 해당 시간으로 이동.
- 언어 on/off 기능.

- [추가 개발 예정 기능]
  - 특정 스크립트 저장
  - 특정 스크립트 반복
