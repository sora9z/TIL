# WEB-Express Web Server 만들기

Category: Computer Science
Chapter: Web Server
강의: codestates
블로깅: No
유형: SPRINT
작성일시: 2021년 10월 15일 오후 11:44

# Express로 간단한 Web Server 구현하기

Express와 http module을 사용하여 간단한 Web Sever를 구현해 보았다.

이번 server는 http 모듈을 사용하여 server를 구축하였다. express를 사용하여 listen() 하는 것과

http.createServer 를 통해 listen 하는 것의 차이도 같이 알아보았다.

## 1. packge.json

기본적인 서버를 구축하기 위해 사용한 모듈이다.

```json
"dependencies": {
    "express":"^4.17.2",
    "nodemon":"^2.0.15",
    "morgan":"^1.10.0",
    "debug":"^4.3.3"
  },
```

- express를 사용할 것이므로 express를 필수이다.
- [nodemon](https://www.npmjs.com/package/nodemon)은 서버 코드가 변경될 때마다 자돌으로 restart를 해주는 module이다. script start에 node대신 nodemon을넣어주면 서버를 다시 끄지 않아도 되어 편리하다.
- [morgan](https://github.com/expressjs/morgan) : 로그를 관리하기 위해 HTTP request logger middleware를 사용하였다. 이 모듈에 대한 사용 법은 [이곳](https://www.notion.so/Nodejs-Module-debug-e5bec35bc0cf4eb5b3eee351b1b4881e) 에 정리를 해두었다.
- [debug](https://www.npmjs.com/package/debug) : node 실행 시 지정한 log만을 선택하여 볼 수 있다. decorated version의 console.error라고 한다. 이 모듈에 대해 사용법은 [이곳](..//Node/Nodejs-Module-debug.md)에 정리를 해두었다.

## 2. Http Server 구조를 살펴보자 ( http server main)

### 1) server를 구축하기 위해 필요한 dependencies를 불러온다.

```jsx
const app = require("../app"); // Middleware를 설정해두었다.
const debug = require("debug")("shortly:server");
const http = require("http");
```

### 2) Port를 설정한다.

process.env에 Port가 없다면 기본으로 3000을 사용한다. app.set 함수를 통해 express에 port를 지정한다.

app.set(name,value)로 데이터를 저장할 수 있다 app.set은 이미 setting된 nam을 값에 할당할 때 사용한다.

[참고](https://www.geeksforgeeks.org/express-js-app-set-function/)

```jsx
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
```

[normalizPort](https://www.npmjs.com/package/normalize-port)는 portrk number , sring, false인 경우 port를 숫자로 변경하여 return 한다.

nomrlizPort의 내부코드는 아래와 같다.

```jsx
function normalizePort(val) {
  var port = parseInt(val, 10); // 인자로 받은 val을 정수로 변환한다. string인 경우 10진수로 반환

  if (isNaN(port)) {
    // port가 Nan인지 확인하고 Nan이라면 val을 return 한다.
    // named pipe
    return val;
  }

  if (port >= 0) {
    // 정수라면 port를 return 한다.
    // port number
    return port;
  }

  return false;
}
```

### 3) HTTP server 생성과 Listen

http.createServer()는 HTTP Server Object를 생성한다. http.createServer(_requestListener_);

관련된 내용은 [이곳](https://www.notion.so/Web-Server-Node-js-Node-js-Anatomy-of-an-HTTP-Transaction-8a2c1ff0d65d449d990709d683e4d37a) 에 정리해두었다. requestListener는 request가 오면 자동으로 실행이 되는 함수이다.

```jsx
const server = http.createServer(app);
// app또한 request listener 함수이므로 인자로 들어간다 (콜백함수)
```

app은 express framework로 만들어진 request listener 함수이다. app을 callback 함수로 전달하여 server를 생성한다.

```jsx
//! Listen on provided port, on all network interfaces.
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
```

server.listen은 client의 요청을 받아들일 수 있는 연결 대기 상태로, 인자로 받은 port에 서버를 오픈한다.

server.on으로 등록한 named event는(err와 listening) Error Handler이다 .

위에서 정의한 Event Handler함수이다.

- err는 [err.syscall](https://www.notion.so/WEB-Express-Web-Server-60b5f2c6c44746579fc29287503fa5b1) 을 사용한다.

```jsx
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe" + port : "Port" + port;

  // Handle specific listen errors
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privilages");
      //EACCES (Permission denied): An attempt was made to access a file in a way forbidden by its file access permissions
      process.exit(1);
      break;

    case "EADDRIMUSE":
      console.error(bind + " is already in use");
      //EADDRINUSE (Address already in use): An attempt to bind a server (net, http, or https) to a local address failed due to another server on the local system already occupying that address.
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * ? Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  // This method return the bound address containing the family name, and port of the server.
  const bind = typeof port === "string" ? "pipe" + addr : "port" + addr.port;
  // console.log("Listening on " + bind);
  debug("Listening on " + bind);
}
```

## 3. Middleware - app.js

요청-응답 사이에 존재하는 request의 공통된 처리를 담당한다.

```jsx
// Middleware
const express = require("express");
const logger = require("morgan");

const app = express();

app.use(logger("dev")); // dev는 color로 로그를 표시해줌

module.exports = app;
```

morgan은 log를 관리하는 middleware이다. 사용 진자로 dev를 사용하였는데, 개발 시에는 dev, short를 사용하는 것이 좋고 배포시에는 common, combined를 많이 사용한다고 한다.

기본적인 server를 구현하였다. 여기에 Router를 연결하여 request에 대한 처리를 해주면 된다.

Router부터는 다음 posting에서 진행하겠다.
