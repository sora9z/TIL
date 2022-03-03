# Codestates-Network-HTTP-Header

강의: codestates
블로깅: No
유형: LESSON
작성일시: 2022년 2월 12일 오후 12:08

# Codestates-Network-HTTP-Header

## 0. Achievement Goals

- HTTP 헤더의 역할에 대해 이해한다
- Content negotiation에 대해 이해한다.

## 1. Representation Header

- HTTP header는 표현 데이터를 해석할 수 있는 정보를 제공한다. 응답,요청 둘 다 사용한다.
- HTTP header는 representation header라고도 불리며 아래의 내용들을 포함한다.
  - [Content-Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) :
    - 현 데이터의 형식
    - 리소스의 타입을 나타내기 위해 사용된다.
  - [Content-Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding) :
    - 표현 데이터의 압축 방식
    - 데이터를 전달하는 곳에서 압축 후 인코딩 헤더를 추가한다.
    - 데이터를 읽는 쪽에서 인코딩 헤더의 정보로 압축을 해제한다.
  - [Content-Language](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Language) :
    - 표현 데이터의 자연 언어
  - [Content-Length](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Content-Length) :
    - 표현 데이터의 길이
    - 수신자에게 보내지는 바이트 단위를 가지는 개체 본문의 크기
    - [Transfer-Encoding](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Transfer-Encoding) 을 사용하면 Content-Length를 사용하면 안 된다.
      - 사용자에게 entity를 안전하게 전송하기 위해 사용하는 인코딩 형식을 지정한다.
      - 요즘에는 Content-Encoding을 사용하며 Transfer-Encoding을 사용하는 경우는 chenked 방식으로 사용한다.
      - chunked 방식의 인코딩은 많은 양의 데이터를 분활하여 보내기 때문에 전체 데이터의 크기를 알 수 없다. 이때문에 표현 데이터의 길이를 명식하는 Content-Length 헤더와 함께 사용할 수 없다.
- header 형식은field-name : field-value 의 형식을 사용한다.
- header field에는 HTTP 전송에 필요한 모든 부가정보를 담기 위해 사용한다 header에 들어가는 field는 **[List of HTTP header fields](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields) 에서와 같이 다양하다**

## 2. HTTP 주요 Header

Request header와 Response header에서 자주 사용되는 header의 종류를 알아보자.

- 참고
  - **[HTTP Messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)**
  - **[HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)**
  - **[List of HTTP header fields](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields)**

![https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages/httpmsgstructure2.png](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages/httpmsgstructure2.png)

### 1. Request Header

| Header Name   | Description                                                                                                                                                                                                                                                                                                          | Example                                                                                                                                |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| From          | - 요청을 하는 user의 email , 일반적으로 잘 사용하지 않는다, 검색 엔진에 주로 사용한다.                                                                                                                                                                                                                               | From : sora@email.com                                                                                                                  |
| Refere        | - 현재 요청된 페이지의 이전 웨 페이지 주소 , A → B로 이동하는 경우 Refere : A를 포함하여 요청한다. 이 Header를 이용하면 유입 경로 수집이 가능하다.                                                                                                                                                                   | Referer : http:// en.wikipedia.org                                                                                                     |
| User-Agent    | - User-Agent 애플리케이션 정보 , 클라이언트 애플리케이션 정보 (웹 브라우저 정보 등), 어떤 종류의 브라우저에서 장해가 발생하는지 파악 가능하다                                                                                                                                                                        | user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/ 537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36 |
| Host          | - server의 Domain name, 서버가 수신하는 TCP port number, 필수 헤더이다, 하나의 서버가 여러 도메인을 처리해야 할 때 호스트 정보를 명시하기 위해 사용한다. 하나의 IP주소에 여러 도메인이 적용되어 있을 떄 호스트 정보를 명시하기 위해 사용한다. HTTP/1.1 부터 필수이며 HTTP/2에서 직접 생성된 경우 사용해서는 안 된다. | Host: en.wikipedia.org:8080, Host: en.wikipedia.org → port 번호가 standart port 번호라면 생략                                          |
| Origin        | Server호 post 요청을 보낼 때 , 요청을 시작한 주소를 나타낸다. 요청을 보낸 주소와 받는 주소가 다르면 CORS err, 응답 헤더의 Access-Control-Allow-Origin과 괂련된다. 서버에 Access-Cotrol-\*응답 필드 요청)                                                                                                             | Origin: http://www.example-social-network.com                                                                                          |
| Authorization | - 인증 토큰(JWT같은)을 서버로 보낸 때 사용 , 토큰의 종류 + 실제 토큰 문자를 전송한다                                                                                                                                                                                                                                 | Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==                                                                                      |

### 2. Response Header

| Header Name    | Description                                                                                                                                                                                                                                                      | Example                                                                     |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Server         | - 요청을 처리하는 Origin 서버의 소프트웨어 정보                                                                                                                                                                                                                  | • Server: Apache/2.2.22 (Debian)                                            |
| - erver: nginx |
| Data           | - 메세지가 발생한 날짜와 시간                                                                                                                                                                                                                                    | • Date: Tue, 15 Nov 1994 08:12:31 GMT                                       |
| Location       | - 페이지 리디렉션 , 웹브라우저는 staus 300번대의 응답의 결과에 Location header가 있으면 location 위치로 redirect 한다. 201(Creatrd) Location 값은 요청에 의해 생성된 리소스 URI , 3XX : Location 값은 요청을 자동으로 리디렉션 하기 위한 대상 리소스를 가리킨다. | Location: http://www.w3.org/pub/WWW/People.html                             |
| Allow          | 허용 가능한 HTTP 메서드                                                                                                                                                                                                                                          | • Allow: GET, HEAD, PUT                                                     |
| Retry-After    | - 유저 에이전트가 당므 요청을 하기까지 기다려야 하는 시간 , 503 (Servece Unavailable) : 서비스가 언제까지 불능인지 알려줄 수 있다                                                                                                                                | • Retry-After: Fri, 31 Dec 2020 23:59:59 GMT(날짜 표기) , Retry-After:120초 |

## 3. **Content negotiation**

**[Content negotiation wiki](https://en.wikipedia.org/wiki/Content_negotiation)**

[Content negotiation MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Content_negotiation)

HTTP에서 Content ngotiation이란 동일한 URI에서 리소스의 서로 다른 버전을 서버하기 위해 사용되는 메커니즘이다. 사용자가 사용자에게 제일 잘 맞는 것이 무엇인지 (문서의 언어, 포멧 인코딩,,)를 명시활 수 있다.

협상 헤더는 요청 시에만 사용한다.

- Accept : 클라이언트가 선호하는 미디어 타입 전달
- Accept-Charset : 클라이언트가 선호하는 문자 인코딩
- Accept-Encoding : 클라이언트가 선호하는 압축 인코딩
- Accept-Language : 클라이언트가 선호하는 자연 언어

위의 헤더 중 Accept-Language 헤더를 통해 클라이언트가 원하는 언어를 어떻게 서버에 요청하는지 일아보자.

만약 한국어 브라우저에서 특정 웹 사이트에 접속했을 때 Accept-Language가 적용되지 않았다면 서버는 요청으로 받은 우선순위가 없으므로 기본 언어인 영어로 응답한다.

만약 서버에서 한국어를 지원하지 않는다면 협상 헤더에서 1부터 0까지 우선순위를 부여할 수 있다.

**[Language localisation](https://en.wikipedia.org/wiki/Language_localisation)**

- Accept-Language:ko-KR,ko;q=0.9,en=US;q=0.8,en;q=0.7 (ko-KR에서 q=1 생략)
  - ko-KR;q=1(q생략)
  - ko;q=0.9
  - en-US;q=0.8
  - en;q=0.7
