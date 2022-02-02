# Computer Science-Token기반인증

Category: WEB SERVER
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2022년 1월 29일 오후 3:00

# Authentication

## 0. Achievement Goals

- 세션,쿠키 / 토큰 / OAuth를 통해 인증 구현을 한다.
- Cliend, Server, DB의 전체 동작을 이해한다.
- 회원가입 , 로그인 등의 유저 인증에 대해 구현하고 이해한다.
- 서비스의 보안과 관련된 방법을 알아보고 원리 , 장점, 단점을 이해한다.

## 1. CSRF

[참고사이트](https://www.imperva.com/learn/application-security/csrf-cross-site-request-forgery)

![https://www.imperva.com/learn/wp-content/uploads/sites/13/2019/01/csrf-cross-site-request-forgery.png](https://www.imperva.com/learn/wp-content/uploads/sites/13/2019/01/csrf-cross-site-request-forgery.png)

여러가지 공격들이 있다.SQL Injection , XSS, CSRF .. 이 중 CSRF에 대해 알아보자.

Cross Site Request Forgery : 다른 오리진(Cross-site)에서 유저가 보내는 requst를 조작(forgery)하는 것이다.

ex ) email에 첨부된 링크를 누르면 내 은행 계좌에 돈이 빠져나간다.

해커가 직접 데이터를 접근할 수 있다. (다른 오리진이기 때문에 response에 직접 접근을 할 수는 없다)

### CSRF의 작동 조건

- cookie를 사용한 로그인
    - 유저가 로그인 시 쿠키로 어떤 유저인지 알 수 있어야 한다.
- 예측할 수 있는 요청 , parameter를 갖고있어야 한다
    - request에 해커가 모를 수 있는 정보가 담겨있으면 안된다.
    

### CSRF를 막는 방법

- CSRF 토큰 사용하기
    - 서버에서 CSRF 공격에 보호하기 위한 문자열을 유저의 브라우저와 웹 앱에만 제공한다.
- Same-site cookie를 사용한다
    - 같은 도메인에서만 세션 . 쿠키를 사용할 수 있다.

## 2. Token-based Authentication

### 토큰 기반 인증을 사용하는 이유?

- 세션기반인증 = 서버에 유저 정보를 담는 방식이다. → 매 요청마다 DB를 확인해야 하므로 서버에 부담이 된다. 이를 줄이기 위해 토큰 기반 방법이 생겼다.
- 대표적인 토큰기반 인증은 JWT(Json Web Token)이다.

### Token이란?

Client에서 인증 정보를 보관하는 방법이다.  Token은 유저 정보를 암호화한 상태로 담을 수 있고, 암호화 했기 때문에 클라이언트에 담을 수 있다.  

## Token 기반 인증 절차

### 1. Basic Token 기반 인증 절차

![https://content.breatheco.de/static/a86ef5d3b144550f69f23d26c6878c1f/50383/authentication-diagram.png](https://content.breatheco.de/static/a86ef5d3b144550f69f23d26c6878c1f/50383/authentication-diagram.png)

1. Token 기반 인증 절차는 위의 그림에서 보듯이, Client에서 login을 하면 DB에 저장되어있는 ID와 PW의 Validation을 진행한다.  
2. 그 후 DB에 새로운 Token을 생성하고 새로운 Token Object를 Server에 보낸다. 
3. Server는 Request Body에 Token Object를 같이 응답으로 보낸다.
4. client는 다음 요청을 보낸 때 header에 Token이 들어있는 “Authorization”을 추가하여 요청한다.
5. Server는 Token이 유효하고 db에 존재하는지 확인한다.
6. Token이 존재하고 유요하다면  성공적으로 응답을 보내고, 만약 유효하지 않다면 301(not authorized)를 보낸다.

Basic Token을 사용한 인증방법은 DB를 계속 확인해야 하기 때문에  관리하고 유지하기 어렵다.  

### 2. JWT 기반 인증 절차

[참고](https://content.breatheco.de/en/lesson/what-is-JWT-and-how-to-implement-with-Flask)

![https://content.breatheco.de/static/495400b0ab3443c68e11a8c4b30a7fed/afa26/jwt-vs-bearer-token.png](https://content.breatheco.de/static/495400b0ab3443c68e11a8c4b30a7fed/afa26/jwt-vs-bearer-token.png)

JWT인증의 경우 DB가 따로 필요하지 않으며 Token 자체에 필요한 모든 정보가 포함되어있다.

![https://metamug.com/article/images/security/jwt-authentication-flow.svg](https://metamug.com/article/images/security/jwt-authentication-flow.svg)

JWT의 인증은 아래와 같이 진행된다. (위의 그림과 번호는 상이함)

1. Client가 서버에 ID , PW를 담아 login 요청을 보낸다.
2. server는 ID, PW가 일치하는지 확인하고 Clienr에게 보낸 Signature된 JWT Token을 생성한다. 
    1. access/refresh token을 모두 생성한다. 
    2. token에 담길 payloadd는 유저를 식별할 정보, 권한이 부여된 카테고리 등이 될 수 있다.
    3. acees와 refresh token 
3. Client에 JWT를 보내주면 Client는 token을 저장한다. 
    1. 저장 위치는 local or cookie or react의 state등 다양하다.
4. Client는 매 요청마다 hesder(authrization header)에 token을 담아 보낸다.
    1. bearer authentication을  이용한다. [링크1(요약)](https://learning.postman.com/docs/sending-requests/authorization/#bearer-token), [링크2(상세)](https://tools.ietf.org/html/rfc6750)

5. Server는 Toekn을 해독하여 유효한 token인지 확인한 후 Client의 요청을 처리하고 응답한다.

### JWT의 종류

- Access Token
    - Acess Token은 보호된 정보들(email, 연락처 등)에 접근할 수 있는 권한부여에 사용한다.
    - Login시 acess , refresh token 두 가지를 다 받지만 실제 권한을 얻는데 사용하는 Token은 access Token이다.
- Refresh Token
    - Access Token에는 유횩시간이 있으며 refresh Token으로 새로운 Acess Token을 발급받는다.(이 때 다시 login 할 필요는 없다)
- JWT(Json Web Token)의 구조  [참고](https://research.securitum.com/jwt-json-web-token-security)
    
    ![https://research.securitum.com/wp-content/uploads/sites/2/2019/10/jwt_ng1_en.png](https://research.securitum.com/wp-content/uploads/sites/2/2019/10/jwt_ng1_en.png)
    
    - JWT는 JWT(Json Web Signiture) 또는 JWE(Json Web Enncryption)으로 인코딩된 JSON format의 문자 sequence이다.
    - JWT는 “.”으로 구분되는 세 개의 긴 문자열로 이루어져있다. 앞에 있는 것부터 Header , Payload, Signiture 로 구분된디.
    - 위의 세 부분은 각각 특정 알고리즘(BASE64URL , BASE64, SHA-256)등의 알고리즘으로 암호화된다. (여기서는 Base64로 한다 가정)
    - Header : 어떤 종류의 Token인지 (type), 어떤 알고리즘으로 Sign할지(alg)가 적혀있다. 이 JSON 객체를 base64로 인코딩한다.
    - Payload : 어떤 정보에 접근 가능한지에 대한 권한 또는 유저 이름 등의 필요한 데이터가 담겨있고 Sign시킨다. payload에는 민감한 정보는 담지 않는다. base64로 인코딩한다.
    - Signiture : base64로 인코딩된 첫 번째, 두 번째 부분이 완성되면 원하는 비밀키(암호화에 추가 할 salt)를 사용하여 암호화한다.
    
    암호화를 한다면 아래와 같은 방식으로 생성된다
    
    ```jsx
    HMACSHA256(base64UrlEncode(header) + '.' + base64UrlEncode(payload), secret);
    ```
    

### JWT Token 기반의 인증의 장점

1. Statelessness & Scalability (무상태성 , 확장성) 
    1. Token 해독이 되는지만 판단하므로 Server는 client에 대한 정보를 저장할 필요 없다.
    2. Client는 새로운 요청마다 header에 Token을 포함시키면 된다.
    3. 여러개의 서버가 있는 경우 같은 토큰으로 여러 서버에서 인증이 가능하므로 유리하다.
2. 안전하다 
    1. signature를 기반으로 Token을 사용하고, 암호화 키를 노출할 필요가 없으므로 안전하다.
3. 어디서나 생성 가능학다
    1. Token을 꼭 한 서버가 만들어야 하는 것은 아니다
    2. Token 생성용 서버를 만들거나 , 다른 회사에서 토큰 관련 작업을 맡기는 등 다양하게 생성이 가능하다.
4. 권한 부여에용이하다. 
    1. Token의 payload 안에 어떤 정보에 접근 가능한지 정할 수 있다.
    2. 예를 들면, 서비스의 사진과 연락처 사용 권한만 부여하는 등..