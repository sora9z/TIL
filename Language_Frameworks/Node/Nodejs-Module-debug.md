# Nodejs-Module-debug 사용법

Category: JavaScript
Visibility: Public
강의: Self Study
블로깅: No
유형: library
작성일시: 2022년 1월 11일 오후 3:36

[GitHub - debug-js/debug: A tiny JavaScript debugging utility modelled after Node.js core's debugging technique. Works in Node.js and web browsers](https://github.com/debug-js/debug#readme)

## Node.js Debug Module

debug 모듈은 console.log()를 대신하는 로깅 모듈로 node.js에서와 web browser에서 동작한다. 

node에서 가장 많이 사용하는 모듈이라고 한다.  로그를 구조적으로 기록할 수 있다는 점에서 console.log보다 뛰어나다. 

이 모듈은 로그롤 구조화하여 기록할 수 있으며 특정 로그만을 볼 수 있도록 지정할 수 있다는 장점이 있다.

### HOW  TO USE

 

1. debug를 선언한다

```jsx
const debug=require('debug')
```

1. debug id를 정의한다.

```jsx
// debug를 선언할 때 하는 방법
const server=require('debug')("shortly:server");
const request=require('debug')("shortly:request");

//new를 사용하는 방법
const debug=require("debug");
const debugE=new debug('error:server');
const debugR=new debug('error:require');
```

1. 출력하는 방법

```jsx
// 출력 방법은 아래와 같다
request("Request is this")
debugR("Request Failure")
debugE("404 Not Found");

// 함수를 사용하여 워한는 부분에서 출력되도록 할 수 있음

const server = http.createServer(app);

// 함수 정의
function onListening() {
// This method return the bound address containing the family name, and port of the server.
  const addr = server.address();  
  const bind = typeof port === "string" ? "pipe" + addr : "port" + addr.port;
  server("Listening on " + bind);
}
// 함수 호출
server.on("listening", onListening);
 
```

함수를 사용하여 특적 event가 발생했을 때 debug 출력 또한 가능하다.

1. 실행

설정한 debug를 실행시키기 위해서는 npm start 시 debug를 선택해주어야 한다.

```jsx
// node 명 : bin/www.js   (npm start 시 실행되는 파일 경로)

모든 debug log 실행 : DEBUG=* node ./bin/www.js
/*모든 debu log를 실행한다. 
	위에서 설정한 4개 말도고 express에서 기본으로 설정되어있는 debug까지 출력이 된다.
	express:application set "etag" to 'weak' +0ms
  express:application set "etag fn" to [Function: generateETag] +0ms
  express:application set "env" to 'development' +1ms
  express:application set "query parser" to 'extended' +0ms
				.
				.
				.
 
  shortly:request Request is this +0ms
  error:require Request Failure +0ms
  error:server 404 Not Found +0ms
  shortly:server Listening on port3000 +0ms
*/

특정 debug 모두 실행 :  DEBUG=shortly:* node ./bin/www.js
/* shortly로 지정된 모등 debug가 출력된다.
		shortly:request Request is this +0ms
    shortly:server Listening on port3000 +0ms
*/

특정 debug 실행 - 소분류 :  DEBUG=shortly:server node ./bin/www.js
/*
	shortly:server만 출력된다
	shortly:server Listening on port3000 +0ms	
*/

여러 debug 실행 : DEBUG=shortly:server,error* node ./bin/www.js
/*
shortly:server , error debug전체가 출력
	error:require Request Failure +0ms
  error:server 404 Not Found +0ms
  shortly:server Listening on port3000 +0ms
*/
```

위에서 보듯이 debug 모듈은  logg를 구조화 (Error로 분류되는 것, server의 실행과 관련된 것 등) 하여 로그를 출력하도록 할 수 있고, 상황에 따른 로그만 볼 수 있어 편리하다. 추가적으로 시각적으로 구분이 명확하여 개발할 때 사용하기 매우 유용한 모듈이다.

그리고, npm package의 script에도 추가를 하면 더욱 편리하게 사용할 수 있다

더 자세한 사랑은 위에 링크로 걸어둔 git사이트를 참고해보자.