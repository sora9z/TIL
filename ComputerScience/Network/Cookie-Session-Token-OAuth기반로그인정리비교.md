# Cookie-Session-Token-OAuth기반로그인정리비교

Category: WEB SERVER
Chapter: Web Server
강의: Study
블로깅: No
유형: LESSON
작성일시: 2022년 2월 4일 오전 11:45

# Cookie-Session-Token-OAuth기반로그인정리비교

## 0. Achievement Goals

1. Cookie , Session, Token, OAuth 기반 로그인 간략하게 정리한다
2. Session VS Token을 간략하게 비교한다.

## Cookie-Session based Authorization

### 1. Cookie 간략 정리

- 참고
  - Cookie 정리 : [WebServer-Cookie](https://www.notion.so/WebServer-Cookie-b294b3dbfba742eeafe41419db2a2b29),
  - Cookie MDN : [Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
  - Cookie setting options MDN : [Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)

Cookie를 사용하여 사용자의 Session을 관리한다. 또한 User의 행동 Tracking , User setting 정보 저장하여 Personalization에 사용된다. 이런 Cookie를 사용하여 인증 정보를 담을 수 있지만 탈취되기 쉽기 때문에 Cookie를 이용하여 상태를 유지하는 것은 적절하지 않다.

### 2. Sesison-Cookie Based Authoriaztion

- 참고
  - Session 정리 : [WebServer-Session](https://www.notion.so/WebServer-Session-b6f477e361ef4f63bb22708ec9092202)
  - Expression githbu : https://github.com/expressjs/session
- Session 기반 Login
  Session기반 인증은 Client가 Header로 같이 보내는 Session ID를 통해 인증 여부를 판단한다. 대략적인 과정은 아래와 같다

![dd](https://techbriefers.com/wp-content/uploads/2019/10/cookie-and-session-management-process-in-codeigniter.jpg)

**Login**

1. Client가 ID와 PW으로 Login을 시도한다.
2. Server는 DB에 userInfo가 있는지 확인한다 (Validation Check)
3. 유효한 사용자라면 , 이를 구분항 수 있는 Session ID를 생성하고 Session을 Session Store에 저장한 후 Cookie로 sessionID를 Client에게 보낸다.

**Request**

1. Client는 Cookie를 통해 SessionID가 전달된다.
2. Session Store에 해당 session이 존재한다면 Server는 해당 요청에 접근 가능하다고 판단하고 요청에 대한 응답을 진행한다.

**Logout**

Session 방싱의 인증은 cookie에 SessionID를 저장하기 때문에 Logout시 cookie를 갱신해야 한다.

1. Client가 logout을 하면 Server의 Session정보를 삭제한다.
2. Client의 Cookie를 삭제할 수 없기때문에 Cookie를 갱신하는 방법을 사용한다. set-cookie로 session 아이디의 key값을 무효한 값으로 갱신한다.

## Token-based Authorization

- 참고
  - [Computer Science-Token기반인증](https://www.notion.so/Computer-Science-Token-c41f4a87fbbb429ea5903a8bed6a1a8c)
  - **[Cross site request forgery (CSRF) attack](https://www.imperva.com/learn/application-security/csrf-cross-site-request-forgery/)**
  - [JWT](https://content.breatheco.de/en/lesson/what-is-JWT-and-how-to-implement-with-Flask)
- Token 기반 인증
  세션기반 인증은 server에 유저의 정보를 담는 방식이다. 매 요청마다 Session ID를 DB에서 확인하여 하므로 서버에 부담이 된다. 이런 단점을 보완하기 위해 Token 기반 인증이 생겼다.
  Token 기반의 방법은 Store에 User의 세부 사항을 저장하는 Sesison과 달리 Client에 Token을 저장한다. Client는 요청마다 Header에 Token을 포함시키고 Server는 이 Token을 해독하여 유효한지만 확인하는 작업을 한다.
- JWT(Json Web Token) : 대표정인 Token 기반
  - JWT인증은 Token자체에 필요한 모든 정보가 포함되어있다.
    ![https://research.securitum.com/wp-content/uploads/sites/2/2019/10/jwt_ng1_en.png](https://research.securitum.com/wp-content/uploads/sites/2/2019/10/jwt_ng1_en.png)
    ![https://metamug.com/article/images/security/jwt-authentication-flow.svg](https://metamug.com/article/images/security/jwt-authentication-flow.svg)

## **Session vs Token Based Authentication**

- 참고
  - [Geeks fo Geeks](https://www.geeksforgeeks.org/session-vs-token-based-authentication/#:~:text=The%20main%20difference%20is%20session,one%20the%20client%20stores%20them.)

위의 사이트를 참고하여 표로 정리하였다. (그냥 해석한 것)

| Criteria                                                           | Session Authentication method                                          | Token-Based Authentication method                      |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------ |
| 인증정보 저장 주체                                                 | Server                                                                 | User                                                   |
| Client가 인증을 위해 보내는 것                                     | Cookie에 Session Id                                                    | Header에 Token                                         |
| client의 인증을 위해 server에서 하는 작업                          | client가 Cookie를 통해 보냔 session ID를 DB에서 찾아서 Validation 진행 | client가 보낸 token을 해독하고 확인                    |
| Server가 로그아웃, 세부 정보 변경 과 같은 작업을 수행할 수 있는가? | session이 server에 들어있기 때문에 가능학다                            | Token이 사용자에게 저장되어있으므로 불가능하다.        |
| 어떤 공격에 취약한가?                                              | Man-in-middle, CSRF                                                    | Man-in-middle, Token steal, breaches of the secret key |
| 선호되는 method application                                        | User-to-server connction                                               | Server-to-Server connection                            |

## OAuth 2.0

- 참고 :
  - **[Workflow of OAuth 2.0](https://www.geeksforgeeks.org/workflow-of-oauth-2-0/?ref=gcse)**
  - [WebServer-OAuth](https://www.notion.so/WebServer-OAuth-62c3416540904fbd8e9d0068ee78d66a)

![https://media.geeksforgeeks.org/wp-content/uploads/20210916230536/ApplicationClient1.png](https://media.geeksforgeeks.org/wp-content/uploads/20210916230536/ApplicationClient1.png)

OAuth2.0은 인증을 중개해 주는 메커니즘이다. 이미 사용자의 정보는 갖고있는 웹서비스 등에서 사용자의 인증을 대신 해주고 접근 권한에 대한 Token을 발급받은 후 이를 이용하여 서버 내에서 인증이 가능하게 한다.
