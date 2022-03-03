# WebServer-OAuth-Process

Category: WEB SERVER
Chapter: Web Server
강의: Study
블로깅: No
유형: LESSON
작성일시: 2022년 2월 3일 오후 2:27

# 필기

## OAuth?

1. oAuth를 통해서 Access Token을 가져올 수 있다.
2. ID와 PW를 일일히 기억하지 않아도 된다
3. 이러한 기술을 **Federated Identity**라고 한다.

OAuth 2.0을 사용하는 궁극의 목적은 API를 제어하기 위함이다. 대부분의 API는 RESTful 스타일로 설계되고 있으며 , JSON , XML과 같은 정보 형태 포멧을 이용하는 경우가 많다.

## 용어

Resource server : 자원 서버 . Data를 갖고있는 서버 Authorization Server : 인증과 관련된 serever
Resource Owner : Resource의 소유자. User

## AOuth 를 등록하는 절차

- Registor : client가 resource server의 데이터를 사용하기 위해서 사전에 승인을 받는 행위를 registor라고 한다.
- 등록은 서버마다 다르지만, 아래의 세가지 요소를 공통저으로 같는다.
    1. Client ID : 우리가 만들고 있는 app의 식별자. 노출되어도 상관 없다
    2. Client Secret : client ID에 대한 PW 노출되면 안 된다
    3. Authorized redirect URIs : resource server가 authorization code를 보내야 하는 uri이다. 다른 곳에서 요청하면 보내지 않는다.
- Facebook for developers : create app
- Google Cloud Platform : select project

## Resource Owner의 승인

- Client가 resource server에 등록하고 나면 resource server는 그 정보를 갖고있는다.
- Client가 필요한 기능만 권한을 부여받으려고 한다.
- 만약 RO가 RO의 Facebook 또는 Twitter의 기능을 사용하고자 한다.
- Client는 RO에게 RS에 대한 권한 부여 화면을 보여준다. (redirect)
- 이 Button은 Resource server에 접근하는 요청 코드가 들어있다.
    - 예를 들어 https://resource.server/?client_id=1&scope=B,C&redirect_uri=https://client/callback
- 위의 링크를 통해 RO가 RS에 접근하고 만약 로그인이 안 되어있다면 RS는 RO에게 로그인을 하라고 보내준다.
- RO가 로그인에 성공하면, 요청 바디에 client ID 값과 같은 ID가 있는지 확인하고, Redirect URL도 같은지 확인해서 다르면 작업을 끝낸다.같다면 RO에게 이 Scope에 해당하는 권한을 Client에게 부여 할 것인지에 대한 메세지를 보낸다.
- 허용을 하면 헝요 했다는 것이 RS에 전송이 되고 RS는 userID와 scope 정보를 저장하게 된다.(User 1은 scope 에 대해 권한을 부여하는 것을 동의 하였다는 정보)

## Resource Server의 승인

- RS가 승인을 하기 위해서 바로 Token을 발행하지 않고 임시 비밀번호를 발급한다 이를 Authorization code라고 한다.
- RS는 RO의 웹 브라우저에게 이 코드를 전송한다 (Location:https://client/callback?code=3 이 주소는 Location Header를 전송한다. redirection)
- RO의 웹 브라우저는 이 주소로 이동을 하고, Client는 Authorization code=3이라는 정보를 얻게 된다.
- 위의 단계는 Client가 Server에게 Acees Token을 발급 요청 하기 전 단계까지의 단계이다.
- client는 Resource Owner에세 직접 접속하지 않고 RS에게 아래와 같은 주소로 직접 접속한다
    - https://resource/server/token?grant_type=authorization_code&code=3&redirect_uri=https://client/callback&client_id=1&client_secret=2
    - grant type : 이 티입을 통해 삼가 간의 인증을 진행
    - Authorization code=3 : Authorization code 값
    - client_id , client_secret 도 넣어서 전송
- RS는 이 주소를 보고 Authorization code 3을 보고 RS가 갖고있는 code와 일치하늕 확인을 한다.
- client_id , client secret, redirect url이 모두 일치하는지 확인하고 다음 단계로 이동한다.
- A다음 단계는 Aaccess token을 발급하는 것.

## Accaess Token 발급

- RS는 이미 Authorization code 값을 통해 이미 인증을 했기 때문에 이 코드 값을 지운다.
- RS는 Access token을 발급하고 client에게 응답을 하고 client는 내부적으로 저장한다.
- Client가 Access token으로 접근을 하게 되면 RS는 Token을 보고 유효한 기능에 대한 권한을 허용한다.

## API 호출

- RS가 Client에게 제공하는 API가 있다. (Application proframming interface)
- 만약 google calinder api를 사용하고 싶다면 google에 google calindar api라고 검색하면 나옴 -> 참조를 보면 여러 api를 볼 수 있다.
- Manual을 보고 해야한다.
- Header 로 접근 하는 방식
    - Authorization:Bearer는 표준화된 방식임

## refresh token

- rfc는 인터넷 기술 관련 표준 문서이다. [참고](https://datatracker.ietf.org/doc/html//rfc6749#section-1.5)
    
    ![https://user-images.githubusercontent.com/70902065/152285409-789989de-fb52-476c-b2c1-151bc8cd0c68.png](https://user-images.githubusercontent.com/70902065/152285409-789989de-fb52-476c-b2c1-151bc8cd0c68.png)
    
    Refresh Token
    
- access token은 수명이 있다 길어오 60일 90일 ..
- refresh token을 통해서 access token을 다시 발급 받을 수 있다.
- 대부분 access token과 함께 refresh token을 같이 발급받아 저장한다.
- 유효기간이 지나서 invalied token error가 발생하면 refresh token을 server에 다시 전달 하면서 access token을 다시 발급 받는다.
- google 문서에서는 rereshing an access token 이라는 다시 발급 받는 방법이 있다. (RS마다 다르므로 꼭 메뉴얼을 보자)