# [Distrubution][Codestates] - Static Web Sice VS Dynamic Web Site

Chapter: Distribution
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2021년 12월 9일 오후 10:49

# Build

### 정적 웹사이트의 빌드

- Bundling
    
    ![https://webpack.github.io/assets/what-is-webpack.png](https://webpack.github.io/assets/what-is-webpack.png)
    
    SPA와 AJAX, React 등의 client 기술의 고도화로 현대의 Web App은 수많은 모듈로 이뤄져 있다. Building은 이러한 모듈을 하나로 묶어주는 작업을 한다.  
    

- Software Build
    
    JSX와 같이 브라우저세어 자체적으로 해석이 불가능한 다양한 보조 기술들을 브라우저가 해석할 수 있도록 하는 과정을 Software Build라고 한다. 소프트웨어 빌드는 소스코드를 실행 가능한 결과물로 변환하는 작업을 의미한다. 
    
    모듈들은 정적 파일로 결과가 만들어져야 하므로 빌드과정은 소프트웨어 배포에 필수 과정이다. 
    

### Build Tools

- Project Creat Tool
    - Create Reat App - react-scripts module 사용
    - Next.js  - next Module 사용

- Build Tool
    
    Build Tool의 종류는 다양하다. 각각의 설정 파일을 수정해야 할 때는 공식문서 등을 통해 문제를 해결할 수 있어야 한다. 
    
    - webpack : Module Bundler
    - Bable : TypeScript , JSX 등과 같이 브라우저가 지원하지 않는 언어를 JavaScript로 바꿔주는 컴파일러
    - ESLint : 자바스크립트 code convention 및 문법 검사기
    - Sass, less : Css Preprocessor
    
    ### 클라이언트 웹 앱 배포
    
    - 배포란 빌드를 통해 생성된 정적 파일을 웹 앱에 제공(serve)하는 과정이다.
    - 정적 파일을 배포하려면 웹 서버가 필요하다.
    - **호스팅** 서비스란, 정적 파일을 제공할 수 있도록 서버의 공간을 대여해 주는 서비스를 말한다.  파일을 웹에서 접근 가능하게 하며, 동적 웹사이트나 API 서버를 제공하려면 별도의 클라우딩 컴퓨팅 서비스가 필요하다.
    
    ### 웹 호스팅 종류
    
    - Amazon Web Service (AWS) S3
    - Google Cloud Storage
    - Vercel
    - GitHhub Pages
    - Netify
    - Heroku
    
    AWS의 경우 Infrasctucture 자체를 제공하는 다소 복잡한 서비스들의 집합니다.