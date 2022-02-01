# WebServer-Session

Category: WEB SERVER
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2022년 1월 31일 오후 8:23

# Web Server Session

## 0. Achievement Goals

- Session란 무엇이고 무슨 역할을 하는지 이해한다.
- Express Framework Session Middleware의 기본 메서드들에 대해 알아본다
- Session Sprint 를 통해 적용해본다.

일부 내용과 예제들은 [생활코딩](https://opentutorials.org/course/3400) 강의와 [ExpressSession-git](https://github.com/expressjs/session) 의 내용을 참고하였다.

인증에 따라 리소스의 접근 권한(Authorization)이 달라진다.  인증에 성공하면 서버는 클라이언트가 인증에 성공했음을 알고 있어야 하고 , 클라이언트는 인증 성공을 증명할 수단을 갖고 있어야 한다. 

### 1. Session란?

사용자가 인증에 성공한 상태는 “session”이라고 한다.session을 통해 server는 client의 인증을 성공했음을 판단한다.  Session을 통해 로그인을 하는 과정과 로그아웃을 하는 과정은 아래와 같다.

- Session login
    1. Client가 ID와 PW로 로그인을 시도한다
    2. Server는 저장소(in-memory) 또는 Session Store(redis같은 트랜젝션이 빠른 DB)에 Session을 저장한다. 
    3. 세션이 만들어지면 이를 구분할 수 있는 session ID가 만들어지고, Client에 session 성공을 증명할 수 있는 수단으로 session ID를 전달한다.
    4. Server에서 발급한 session ID를 Cookie에 저장한다. 
    5. 로그인을 완료한 사용자가 다른 요청을 보낼 때 Cookie를 통해 유효한 Session ID가 전달이 되고 
    6. session Store에 해당 session이 존재 한다면
    7. Server는 해당 요청에 접근 가능하다고 판단한다.
    
- Session logout
    - Session ID가 담긴 쿠키는 Client에 저장되어 있고 Server는 Session을 저장한다.  Server는 session ID로만 Client의 인증을 여부를 판단한다.
    - Cookie는 session ID를 갖고있기 때문에 이 session ID가 탈취되는 경우에도 server는 해당 요청이 사용자의 요청이라고 판단한다
    - 그러므로 logout은 1. 서버의 세션 정보를 삭제하고 2. Client의 Cookie를 갱신해야 한다.(set-cookie로 세션 아이디의 키값을 무효한  값으로 갱신해야 한다)
    

### 2. Express Session Middleware

[GitHub: express-session](https://github.com/expressjs/session#reqsession)

express-session Middlewaer를 사용하여 Session을 다룰 수 있다. 

session ID를 Cookie에 저장하고, session 객체를 server memory에 저장한다.

- session(options) : session middleware를 생성한다.
    - options로는 express aip문서에 나와있는 옵션을 넣을 수 있다.
    
    ```jsx
    app.use(
      session({
        secret: "@seesionTest",
        resave: false,
        saveUninitialized: true,
        cookie: {
          domain: "localhost",
          path: "/",
          maxAge: 24 * 6 * 60 * 10000,
          sameSite: "none",
          httpOnly: true,
          secure: true,
        },
      })
    );
    ```
    
    위에서 사용된 옵션은 다음과 같은 의미를 갖는다.
    
    - secret :
        - 필수 옵션이며 Session ID를 암호화 하는데 사용된다.
        - 한 개 의 String 또는 다수의 경우 array가 온다. array로 받을 경우 첫 번째 element만이 session ID cookie로 사용된다.
        - 이 정보는 노출되어서는 안되므로, 자주 update를 하고 환경 변수로 저장하는 것이 제일 안전하다.
        
    - resave :
        - request마다 session을 계속 다시 저장한다.
        - false : session data가 바뀌기 전까지 session 저장소의 값을 저장하지 않는다.변경사항이 없어도 session이 매번 저장되는 것을 막아 작동 효율을 높인다. 또한 두 가지 request를 처리할 때 한 쪽에서의 session 변경과 다른 쪽 에서의 session 변경의 충돌을 막는다. 대부분 false로 설정.
        - true : session data가 바뀌지 않아도 session 저장소에 저장한다.
        - 만약 store가 touch method를 구현 했다면 false를 할 수 있다. touch method가 구현되어있지 않고 session에 expiration data가 지정되어있다면 true를 해야한다. (touch() method는 maxAge 옵션을 업데이트 해주는 기능이다. 세션이 유지되는 것을 도와준다. 대부분의 store가 구현되어있긴 하다)
        
    - saveUninitialized
        - 이 옵션은 초기화 되지 않은 session을 store에 저장한다.
        - true : 초기화되지 않은 상태의 session을 강제로 저장한다. 아무 내용이 없는 session이 계속 저장될 수 있다.
        - false : 빈 session 객체가 쌓이는 것을 방지하여 server storage를 아낄 수 있다. 또한 cookie 정책을 준수하기 위해 false를 사용하기도 한다.
        
    - Cookie : cookie object를 설정한다.
    
- req.session
    - session 객체이며 session data에 접근하고 저장하기 위해 사용한다.
    - req.session으로 session에 접근한다.
    
    ```jsx
    app.get("/", (req, res, next) => {
      // session middleware는 req 객체의 프로퍼티에 session 이라는 객체를 추가해 준다.
    
      if (req.session.num === undefined) {
    	// root로 get을 했을 때, 만약 session 객체에 num이 없다면 num을 추가하고 값으로 1을 넣는다.
        req.session.num = 1;
      } else {
    	// num이 key로 있다면 num으로 +1
        req.session.num += 1;
      }
      res.send(`Views : ${req.session.num}`);
    });
    ```
    
- req.session.destroy(cb)
    
    session을 삭제하고  callback을 실행한다. 
    
    ```jsx
    router.get("/logout", function (request, response) {
      request.session.destroy(function (err) {
        response.redirect("/");
      });
    });
    ```
    
     redirect의 경우 객체의 data를 store에서 삭제하는 작업이 끝나기 전에 redirect가 될 수 있으므로 , logout이 완료 된 후 redirect를 하기 위해  callback 함수안에 response를 넣는다.