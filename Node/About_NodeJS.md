# [JS/Node] 비동기 - Node.js 에 대해 알아보자!

Category: JavaScript
Visibility: Public
강의: CodeStates
블로깅: Yes
유형: LESSON
작성일시: 2021년 10월 7일 오후 7:58

이번 포스팅은 Node.js란 무엇이고 모듈을 사용하는 방법에 대한 공부한 내용에 대한 정리 포스팅이다.

## 1. Node.js란??

1.  **Node.js 의 정의**
    Node.js는 로컬 환경에서 JavaScript를 실행할 수 있는 자바스크립트 런타임 이다.
    **런타임이란?**

        Wikipedia에 따르면 , "In computer science, runtime, run time, or execution time is the final phase of a computer program's life cycle, in which the **code is being executed** on the computer's central processing unit as machine code." 이라고 한다.  간단하게 해석을 해보면 CPU 에서 기계어 코드가 실행되고 있는 단계하고 보면 될 것 같다. 이해하기 어렵지만, 간단히 말해서 프로그래밍 언어가 구동되는 환경 이라고 이해를 하면 된다. JavaScript에서 Web Browser에서 구동되는 경우가 있고 로컬에서 Node.js로 구동되는 경우가 있는데, 여기서 Browser와 Node.js를 런타임 이라고 한다.

Node.js에 대해 알아보기 위해 Node.js 공식 사이트를 방문해보았다.

[About | Node.js](https://nodejs.org/en/about/)

**"As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications."**

**"Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine."**

공식문서에서 정의하고있는 Node.js는 ""an asynchronous event-driven JavaScript runtime," 즉, 비동기 기반의 자바스크립트 런타임이고, Chrome V8 Javascript 엔진으로 빌드된 Javascript 런타임 이라고 소개를 한다.

이를 통해 Node.js는 자바스크립트를 실행하게 해주는 **실행환경** 이라고 이해할 수 있겠다.

**2. 그럼 왜 Node.js를 사용하는가?**

Javascript 런타임은 위에서 언급 했듯이 Node.js 말고도 Browser도 있다. 하지만 Node.js의 다양한 장점을 통해 알아보자

- **비동기 I / O 처리 :**

"Almost no function in Node.js directly performs I/O, so the process never blocks except when the I/O is performed using synchronous methods of Node.js standard library."

공식문서에도 설명이 되어있듯이, Node.js의 모든 API는 Asynchronous 이다. Non-Blocking 이라는 큰 특징은 Sever가 요청에 대한 응답을 보낼 때까지 기다리지않고 바로 다음 API를 실행하게 한다.

- **Google V8 엔진을 사용한다는 점** : 확장성이 좋고 빠른 처리 속도를 제공한다. 구글 V8 엔진은 계속해서 성능 업그레이드를 하고있다
- **npm을 통해 다양한 모듈을 제공한다 :** npm을 사용하여 필요한 라이브러리와 패키지를 설치할 수 있으므로 효율성이 좋다.

- \*\*서버를 만들 수 있다 :

" Node.js is designed to build scalable network applications."\*\*
공식문서에 나와있듯이, Node.js는 확장성 있는 Notwork appications 설계를 위해 개발되었다고 한다. 즉, 서버 개발을 위해 만들어졌다. 이 특징 때문에 Node.js를 많은 회사에서 사용하고 있다.

참고 블로그들

[Node.js란...?](https://perfectacle.github.io/2017/06/18/what-is-node-js/)

[Node.js 에 대해 자세히 알아보자](https://pstudio411.tistory.com/entry/Nodejs-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0?category=918554)

Node.js에 대한 정의와 특징들에 대해 간단하게 정리를 하였으니, 이제 사용하는 방법에 대해 간단하게 알아보자.

## 2. Node.js 사용법

1. **Node.js 내장 모듈 목록**

[Node.js v14.17.0 Documentation](https://www.notion.so/JS-Node-Node-js-ea5d03ab1a8844a281de8c474cca6f06)

Node.js의 내장 모듈에 대해 알아보려면 위의 문서를 확인하자.

1. **Node.js 내장 모듈을 사용하는 방법?**

- Node 내장모듈을 사용하려면 모듈을 불러오는 과정이 필요한다.
  브라우저에서 파일을 불러올 때에는 <script> 태그를 사용했다면, Node.js에서는 코드 상단에 **require** 구분을 사용하여 파일을 불러온다.

  ```js
  const fs = require("fs"); // 파일 시스템 모듈을 불러온다.
  const dns = require("dns"); // DNS 모듈을 불러온다.
  ```

  파일을 불러온 후 파일을 읽을때 사용하는 fs.readFile 또는 파일을 저장할 때 사용하는 fs.writeFile 등을 사용할 수 있다.

- 3rd party module 사용
  Node.js 내장 모듈이 아닌 Node.js 공식문서에는 없는 모듈을 말한다. 이를 사용하기 위해서는 npm을 사용하여 설치를 해야한다.

  ```js

  npm install underscore // npm install 후 코드에서 require 구문을 사용하여 underscore를 사용 할 수 있다
  const unscore=require('underscore')

  ```

  npm 으로 설치하면 node_modules에 underscore가 설치된다.

Node.js를 사용하는 방법 뿐 아니라 모듈을 이해하고 활용하는 방법 또한 익히는 것이 더 중요하므로 라이브러리를 배울 때마다 블로깅을 통해 정리해야겠다.
