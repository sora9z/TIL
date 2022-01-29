# WebServer-Cookie

Category: WEB SERVER
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2022년 1월 23일 오전 1:02

# Web Server Cookie

## 0. Achievement Goals

- Cookie란 무엇이고 무슨 역할을 하는지 이해한다.
- Cookie의 OPtion들을 알아본다.
- Node.js에서 Cookie를 사용하는 방법에 대해 이해하고 사용해본다.

일부 내용과 예제들은 [생활코딩](https://opentutorials.org/course/3387) 강의와 [MDN-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)의 내용을 참고하였다.

### 1. Cookie란?

HTTP Cookie는 Server가 User(browser)에게 보내는 작은 data 조각이다. Browser는 다른 요청 시 server로부터 받은 쿠키를 요청 헤더에 포함하여 같이 보낸다.  

Cookie에는 사용자의 다양한 정보를 저장하여 Session 을 관리하는데 주로 사용된다. HTTP는 stateless 프로토콜로 어떠한 State도 저장하지 않는다. Cookie를 사용하면 예를 들면  Login 요청과 shopping cart에 물건을 넣는 요청은 다른 end point를 통하는 아예 다른 요청이다.  쿠키를 사용하여 login을 했다는 정보를 쿠키에 저장하고 다른 요청을 보낼 때마다 이 쿠키를 headera에 넣어 서버에 전송하면 , 서버는 사용자의 session이 유효하다는 것을 확인하여 로그인을 유지시킨다. 이렇듯,  Cookie의 주 목적은 Session Management 이다. 

또한, Cookie는 User의 행동을 저장하고 문석하여 Tracking 하고, User의 선호도, setting등의 정보를 저장하여 Personalization에 사용된다.

### 2. Cooke의 options

[Set-Cookie MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)

- Domain  & Path : Domain와 path option은 Cookie가 보내져야 할 범위를 정의한다.
    - Domain : Cookie를 보낼 수 있는 host를 지정한다. 만약 이 옵션이 지정되지 않는다면 default로 same host가 된다. Domain이 지정되면 subdomain까지 포함이 되므로 지정하는 것이 덜 제한적이다.
    - Path : Requersted url에 반드시 존재해야 하는 Path를 지정한다.  ( Path=/docs 인 경우 /docs , /docs/Web/ , /docs/Web/HTTP ... 하위 path까지 가능하다.
    
- MaxAge & Expires : *cookie를 언제까지 지속되게 할 것인가*
    
    
    - *휘발설 쿠키 : Session Cookie*
        
        *Session cookies are deleted when the current session ends. The browser defines when the "current session" ends, and some browsers use session restoring when restarting. This can cause session cookies to last indefinitely.*
        
    - *바휘발성 쿠키  : Permanent Cookie*
        
        *Permanent cookies are deleted at a date specified by the Expires attribute, or after a period of time specified by the Max-Age attri*
        
    
    Cookie의 유효기간을 설정한다.
    
    - MaxAge : 앞으로 몇 초동안 쿠키가 유효한지 설정
    - Expires : 유효기간 설정 (Date) , Client 의 시간을 기준으로 한다.
        
        두 옵션 모두 지정되지 않는다면 Browser가 닫히면 삭제된다.
        
- Secure
    
    이 옵셤이 true인 경우에는 HTTPS 프로토콜을 이용하여 통신하는 경우에만 쿠키를 전송할 수 있다.
    
- HttpOnly
    
    이 옵션이 true인 경우 Javascript에서는 쿠키에 접근이 불가능하다( document.cookie 사용이 불가능하다)
    
- SameSite
    
    Cross-Origin 요청의 경우 사용한 메소드와 해당 옵션의 조합으로 서버의 쿠키 전송 여부 결정한다. 이 옵션은 CSRF에 대한 일부 보안을  제공해준다.
    
    - Lax : Cross-Origin 요청의 경우 GET method에 대해서만 쿠키를 전송할 수 있다.
    - None : 항상 Cookie를 보낸다. 이 옵션을 선택할 경우 Cookie option 중 Secure 옵션이 필요하다.
    - Strict : same-site인 경우에만 쿠키를 전송할 수 있다.
    
    이 옵션이 지정되지 않는다면, Lax가 default가 된다.
    

### 3. Node.js에서의 Cookie 사용

1. Cookie module
    
    cookie는 header에 들어있으므로 request.headers.cookie 를 통해 cookie정보를 볼 수 있다. 
    
    하지만 아래와 같이 module로 제공을 하면 더 깔끔하게 cookie정보를 받을 수 있다.
    
    1. Node module : [cookie](https://github.com/jshttp/cookie#readme)
        
        ```jsx
        const cookie = require('cookie');
        
        const cookies = cookie.parse(request.headers.cookie)
        
        const setCookie = cookie.serialize(name,value,options)
        ```
        
        - cookie.parse(str,options)
            
            request의 header의 cookie를 parse하여 Cookie를 Obect로 출력한다.
            
            option은 cookie를 decode를 하는 function이 들어간다. default function은 decodeURICompoment이다.
            
        - cookie.serialize(name, value, options)
            
            cookie name-value 쌍을 Set-Cookie header string으로 직렬화한다.
            
            options는 cookie의 options, encode function등이 들어간다.
            
        
    2. Express middleware :  [cookie-parser](https://github.com/expressjs/cookie-parser)
    
    ```jsx
    const cookieParser=require('cookie-parser')
    
    const express = require("express");
    const cookieParser = require("cookie-parser");
    
    const app = express();
    app.use(cookieParser());
    
    app.get("/", (req, res) => {
      // sined X cookie
      const cookiesUnsigned = req.cookies;
      //  unsigned cookies
      const cookieSigned = req.signedCookies;
    
      console.log("cookieSigned :", cookieSigned);
      console.log("cookisUnSigned :", cookiesUnsigned);
    
      res.send("Cookie Express Module").end();
    });
    
    app.listen(8080);
    
    ```
    

1. Cookie의 생성

간단한 Node Server를 만들고 cookie를 생성해보자.

```jsx
onst http = require("http");
const cookie = require("cookie");
http
  .createServer((req, res) => {
    let coookie = {};

	// Client에 이미 Cookie가 header에 있있는 경우 
    if (req.headers.cookie) {
      const cookies = cookie.parse(req.headers.cookie);
    }

    // 1. serHearder 사용
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("cookie_name1", "Chocolate cookie", {
        MaxAge: 60 * 60,
        Domain: "localhost",
        path: "/",
      })
    );

    // 2. writeHead 사용 
    res.writeHead(200, {
      "Set-Cookie": [`cookie1=cooke1 Value; Max-Age=${60 * 60} ; Domain='/'`],
    });

    res.end("Set Cookie By Node module");
  })
  .listen(3000);
```