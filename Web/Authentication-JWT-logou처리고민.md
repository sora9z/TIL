# Authentication-JWT-logou처리고민

Category: WEB SERVER
Chapter: Web Server
강의: Study
블로깅: No
유형: Self Study
작성일시: 2022년 3월 21일 오후 9:45

# Authentication-JWT-logou처리고민

팀 프로젝트 진행을 위해 오랜 회의 끝에 완성된 API를 문서로 정리하고 있었다. JWT 토큰 기반의 로그인 구현은 지난 Sprint에서 다뤄봤기 때문에 이번 프로젝트에서 그리 어려운 일이 아니라 생각하였다.</br> 그러다 Sign-out 요청을 정리하던 중 문제를 발견했다. 생각해보니 sign-out 요청을 한 번도 구현해 본적이 없다는 것(...바보같이 왜 해볼 생각을 안했는지... )

처음엔 accessToken을 httpOnly cookie에 암호화하여 넣기 때문에 client의 cookie를 다른 값으로 바꿔줌으로써 삭제하면 되지 않을가 싶었다. (httpOnly cookie에 저장하면 js로는 접근이 불가능 하기 때문에 안전하다)

하지만 만약 누군가가 Token을 이미 탈취를 하여 로그인을 시도한다면 서버는 access token만을 확인하기 때문에 로그인이 될것이다.

물론 access token을 발행할 때 expiration time을 추가하지만 로그아웃 후 exp가 끝날 때까지 기다리는 것은 뭔가 찝찌입-한 구석이 있다.

그래서 검색을 하다 [이 사이트](https://blog.logrocket.com/jwt-authentication-best-practices/#:~:text=A%20JWT%20needs%20to%20be,any%20script%20inside%20your%20page.)에서 힌트를 얻었다. 이곳에서 추천하는 방법으로는

1. Database에 iat속성을 추가하여 token을 invalidate하는 방법이다.

   무슨 말이냐 하면, token은 생성되었을 때 자동으로 issued at(iat)이라는 속성에 발급시점을 값으로 저장한다. 토큰이 생성되었을 때 DB에도 iat를 user의 속성으로 저장하고 token을 check할 때마다 DB의 iat와 비교를 하는 방식이다. </br>logout을 했을 때 DB의 iat를 수정게되면 client에서 동인 토큰으로 인증을 시도해도 거정하게 된다. 하지만 이 방법은 DB 쿼리를 통해 계속 확인해야 한다는 단점이 있다.

2. 두 번째 방법은, 로그아웃을 한 Token을 Blacklist에 넣고 인증이 필요한 요청마다 이 블랙리스트를 확인하는 방법이다. DB를 통하지 않고 In momory방식의 DB(Redis같은)를 사용하여 빠르게 접근이 가능한 방법을 사용하는 것이다.

   참고로, Redis란 케시 시스템으로 In-Memory 데이터베이스이다. NoSql의 key-value 타입을 사용하여 매우 빠르게 데이더에 접근할 수 있다는 장점이 있어서 JWT 방식의 로그아웃 구현에 많이 쓰이는 것 같다.

조금 더 검색을 해보았지만 결국 나와있는 방법은 위의 두 가지 방법이 대부분 이었다. [참고한 사이트2](https://medium.com/@tutorialswebsite/how-to-expire-jwt-token-on-logout-85f5c810a09d)

이 사이트에도 나와있지만, 대부분 stric한 Logout을 위해서 아래 네 가지 방법을 제시하였다.

1. 적절항 expiration time을 설정한다.
2. logout시 cline-side의 token을 삭제한다.
3. Blaclist를 만들어 아직 보존 기간이 남아있는 token을 저장한다.
4. 승인이 필요한 모든 요청에 대해서 blacklist의 토큰이 있는지 쿼리한다.

아직 어떤 방식으로 진행을 할지 팀원들과 이야기를 해보아야 하지만, Redis를 지금 당장 배워서 사용할 시기는 아니기 때문에 아무래도 1번의 방법을 사용하지 않을까 싶다.
