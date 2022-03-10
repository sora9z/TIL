# Express-cookie-parser

Category: JavaScript
Visibility: Public
강의: Self Study
블로깅: No
유형: Self Study
작성일시: 2022년 3월 10일 오후 10:17

곧 있을 HA3 시험을 위해 지금까지 했던 스프린트를 다시 하면서 정리한 내용

## [Cookie-parser](https://www.npmjs.com/package/cookie)

- Cookie를 사용하여 클라이언트에 보내야 할 때가 있다. session인증 방식을 사용하거나 사용자의 다양한 정보를 저장하는데 사용된다.
- cookie-parser는 Cookie를 쉽게 추출할 수 있게 해주는 express middleware이다.
- **Cookie header**를 파싱하고, Cookie의 이름을 key로 , Cookie값을 value로 지정딘 객체를 제공한다.  (req,cookies)
- ****cookieParser.signedCookie(str, secret)****
    - secret Cookie를 사용하는 이유는 데이터의 보안이 필요한 경우이다.
- **Secret**  문자열 또는 배열을 타입으로 갖는다. 문자열인 경우 secret으로 사용이 되고 배열인 경우 secret을 순서대로 사용하여 cookie에 사용한다.
    - signed 옵션에 true를 표기하면 된다.
    - secret이 사용되면 unsigned cookie는 req.signedCookie객체를 통해 접근할 수 있다.
    - signed cookie는 접두어로 s:를 갖는다.
- 예시 코드
    
    ```jsx
    const express = require("express");
    const cookieParser = require("cookie-parser");
    const { application } = require("express");
    
    const app = express();
    
    app.use(cookieParser());
    
    // Cookie를 생성하여 client에 보낸다.
    app.get("/set", (req, res) => {
      res.cookie("cookie_name", "cookie_value", {
        httpOnly: true,
        path: "/",
        maxAge: 60,
      });
    });
    
    app.get("/get", (req, res) => {
      console.log(req.cookies);
    });
    
    app.listen(3000, () => {
      console.log("listen on 3000");
    });
    
    // url http://127.0.0.1:3000/get --cookie "Name=mango;Age=25"
    // --> { Name: 'mango', Age: '25' }
    ```
    
- res.cookie("cookie_name", "cookie_value", option..)
    
    client에 Cookie를 보낼 때 사용한다. 예를 들면 암호화된 token을 cookie에 넣을 때 아래와 같이 쓸 수 있다. option을 cookie를 보낼 때 넣을 옵션을 의미한다. option에 대한 내용은 지난번 정리를 해두었으니 까먹었으면 [참고하자](https://github.com/sora9z/TIL/blob/master/Web/2022-01-29-WebServer-Cookie.md)
    
    ```jsx
    res.cookie("refreshToken", rToken, {
        sameSite: "strict",
        secure: true,
        httpOnly: true,
      });
    ```
    
- req.cookies
    
    요청 cookie를 Key로 접근할 수 있다.