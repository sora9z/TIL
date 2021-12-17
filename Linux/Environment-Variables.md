# [Linux] - 환경변수

Chapter: Linux
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2021년 12월 11일 오후 6:57

# 환경변수 (Environment Variable)

Linux 기반의 OS에서는 System 자체에 전역 변수를 설정할 수 있고, 이를 **환경변수** 라고한다. 환경변수를 사용하면 API key, DB Password와 같은 민감한 정보를 저장하고 관리할 수 있다. 또한 여러 .env 파일에서 같은 변수 이름에 다른 값을 할당할 수 있다. API key가 다른 경우 환경변수를 이용하여 환경을 구분하여 코드를 작성할 수 있는 이점이 있다.

### Achievement Goals

- PC에 저장하는 환경변수가 무엇인지 파악하고 사용한다.
  - export : PC에 저장된 환경변수 확인
  - dotenv : PC에 저장된 환경변수를 불러올 수 있다.
  - Node.js에서 환경변수를 영구적용 할 수 있다.

### export : 환경변수 확인 및 환경변수 임시 적용

- terminal 에 아래와 같이 export를 입력하면 현재 설정된 환경변수를 확인할 수 있다.

![Untitled](%5BLinux%5D%20-%20%E1%84%92%E1%85%AA%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%87%E1%85%A7%E1%86%AB%E1%84%89%E1%85%AE%201d56801f77de45e88116b7add65d45a6/Untitled.png)

- 새로운 환경변수 또한 추가할 수 있다. 아래와 같이 입력하면 새로운 환경변수가 추가된다.(\*\* 참고로 =앞,뒤에는 공백이 없어야 한다)
  ```bash
  export myclass="is good"
  ```
  이를 echo와 함께 환경변수를 입력하면 환경변수 값을 확이할 수 있다. (환경변수 앞에는 $를 넣는다)
  ```bash
  ecoh $myclass
  ```

### Javascript 에서 환경변수 사용 : dotenv

[npm 공식문서](https://www.npmjs.com/package/dotenv#Config)

dotenv 는 .env 파일에서 process.env로 환경 변수를 load하는 zero-dependency module 이다. 여기서, process.env는 Node.js의 내장 객체이다. dotenv module을 사용하면 환경변수를 객체로 사용할 수 있다. 즉, dotenv는 .env 파일을 node.js에서 환경변수로 사용할 수 있게 돕는다.

dotenv를 사용하기 위해서는 **npm i dotenv**로 설치를 하면 된다. 설치 후 console.log로 process.env를 출력하면 객체의 형태로 Linux 환경변수가 출력되는 것을 볼 수 있다.

![Untitled](%5BLinux%5D%20-%20%E1%84%92%E1%85%AA%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%87%E1%85%A7%E1%86%AB%E1%84%89%E1%85%AE%201d56801f77de45e88116b7add65d45a6/Untitled%201.png)

### .env : Node.js에서 환경변수를 영구적으로 적용

Node.js에서는 환경변수를 .env file을 만들어서 저장하는 방법을 사용한다.

- 아래의 예시는 사용하고자 하는 환경변수를 입력한 .env file을 만들고 dotenv를 사용하여 .env에 저장한 환경변수를 조회하는 코드이다.

```jsx
const dotenv=require("dotenv")
dotenv.config(); // config() method를 사용하여 .
// .env를 process.env에 적용한다
console.log(process.env.myname)ㄴ
```

![Untitled](%5BLinux%5D%20-%20%E1%84%92%E1%85%AA%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%87%E1%85%A7%E1%86%AB%E1%84%89%E1%85%AE%201d56801f77de45e88116b7add65d45a6/Untitled%202.png)
