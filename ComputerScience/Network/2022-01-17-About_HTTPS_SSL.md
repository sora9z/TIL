## 1.

[생화코딩 참고](https://opentutorials.org/course/228/4894)

### HTTPS VS HTTP

- Hypertext는 문서와 문서가 링크로 연결되어 있는 것을 말한다.
  ![http vs https](https://i.imgur.com/tq9mmGg.png)

### HTTPS vs SSL

![https vs SSL](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile3.uf.tistory.com%2Fimage%2F9945DB3359AF8F1B13FCA2)

- Web이 인터넷 위에서 돌아가는 서비스 중 하나인 것처럼 HTTPS도 SSL Protocol 위에서 돌아가는 Protocol이다.

- HTTPS는 7계층에서 TCP위에 놓인 보안계층(SSL)위의 HTTP 이다.

---

### SSL VS TLS

- SSL이 네스케이프에의해 발명이 되다가 표준화 되어 IETF의 관리로 변경되면서 TLS라는 이름으로 바뀐 것. TLS 1.0은 SSL 3.0을 계승한다. 하지만 SSL이라는 이름으로 많이 사용된다.

### SSL 디지털 인증서

- Client와 Server간 통신을 공인된 3자(CA) 업체가 보증해주는 전자화된 문서
- Client가 Server에 접속 직후 Server는 Client에 인증서 정보를 전달하면 Client는 이 인증 정보다 신뢰할 수 있는지 검증 후 다음 절차를 수행한다.
- SSL 인증서 사용 시 이점

  - 통신 내용이 공격자에게 노출되는 것을 막음
  - 신뢰할 수 있는 서버임을 인증할 수 있음

### SSL에서 사용하는 암호화의 종류

- SSL의 핵심은 암호화이다.
- 보안과 성능상의 이유로 두 가지 암호화 기법을 혼용해서 사용하고있다.
- SSL의 동작 방법을 이애하기 위해서는 암호화 기법을 알아야한다.

#### 대칭키

- 암호화를 할 때 사용하는 일좀의 비밀번호를 키(key)람고 함.
- 대칭키란 동일한 키로 암호,복호화를 같이 하는 방법을 의미한다.

openssl enc -e -des3 -salt -in plaintext.txt -out ciphertext.bin

- enc -e -des3 라는 방식으로 암호화를 하겠다. (des3는 대칭키 암호화 기법 중 하나이고 ssl암호화 기법이다.)
- -in plaintext.txt 를 가지고와서
- -out ciphertext.bin 라는 파일로 암호화를 한다.
  위의 명령어를 하면 비밀번호 (대칭 키 )를 입력하게 된다.
- 만약 key값이 노출되면 암호화되 것이 복호화가 될 수 있다 -> 대칭키 단점

#### 공개키 (비대칭키)

[생화코딩 참고](https://opentutorials.org/course/228/4894)

- 비대칭키 암호화

  - 대칭키는 유출 시 공격자는 복호화를 언제든 할 수 있기 때문에 암호를 주고 받는 경우 대칭키를 전달하는 것이 어렵다.
  - 공개키는 대칭키와 달리 암호화에 쓰이는 키와 복호화에 쓰이는 키가 다르다.
  - 공개키(public key)는 타인에게 제공하고 공개키를 받은 타인은 이를 사용하여 암호화를 한다. 공개키는 노출될 수 있다.
  - 비공개키 (Privatr key, 비밀키, 개인키)로만 복호화를 하며 자신만 갖고있는다.
  - 공개키를 사용하여 암호화를 한 것을 비공개키 소유자에게 보내면 이 키를 이용해서 복호화를 한다.
  - 복호화는 비공개키로만 하기 때문에 공개키가 유출되어도 복호화가 불가능 하므로 안전하다.

- 전자 서명 : 인증

  - 인증이란 예상한 사람이 (올바른 사람이) 전송한 정보가 맞는지 확인
  - 비공개키 소유자가 비공개키를 이용해서 정보를 암호화 하고 공개키와 함께 암호화된 정보를 전송하고 이를 받은 사람은 갖고있는 공개키를 사용하여 암호화된 정보를 복호화 한다.
  - 공개키가 데이터를 제공한 사람의 신원을 보장해주는 역할을 한다.

- 위의 두 방법을 복합적으로 사용한 것이 SSL 이다.

- RSA 라는 공개키를 사용해보자.

1. openssl로 비공개키 생성

```shell
# 이 키는 1024bit의 길이를 갖는다.
# 숫자가 높을수록 안전하다. 하지만 크만큼 메모리를 많이 잡는다.
openssl genrsa -out private.pem 1024;
```

2. 생성한 비공개키에 대한 public key 생성

```shell
openssl rsa -in private.pem -out public.pem -outfrom PEM -pubout;
# in private.pem을 가져와서 public.pem이라는 파일을 만든다.
```

3. text.file을 한 개 만들고 비공개키 소유자에게 공개키로 암호화하여 보낸다.

```shell
openssl rsautl -encrypt -inkey public.pem -pubin -in file.txt -out file.ssl
# encrypt inkey public.pem : 암호화를 하는데  key로 public.pem을 사용한다.
# -in file.txt -out file.ssl : file.txt 를 암호화 시키고 output으로 file.ssl을 출력하겠다는 의미
```

4. 비공개키 소유자는 비공개키로 복호화를 한다.

```shell
openssl rsautl -decrypt -inkey private.pem -in file.ssl -out decrypted.txt
# rsautl - decrypt -inkey private.pem : 복호화를 하는데 사용하는 키는 private.pem이다.
# -in file.ssl -out decrypted.txt :  복호화 하는 파일은 file.ssl이고 decrypted.txt로 저장한다.
```

---

### SSL 인증서

- 인증서의 기능

  1. Client가 접속한 서버가 신뢰할 수 있는 서버임을 보장한다.
  2. SSL 통신에 사용할 공개키를 Client에게 제공한다.

  #### CA (Certification Authority)

- 인증서는 Client가 접속한 서버가 Client가 의도한 서버가 맞는지 보장하는 역할을 한다.
- 대표 기업들(시장 점유율)
  - Symantec (VeriSign, Thawte, Geotrust) with 42.9% market share
  - Comodo with 26%
  - GoDaddy with 14%
  - GlobalSign with 7.7%
- SSL을 통해 암호화된 통신을 제공하려는 서비스는 CA를 통해서 인증서를 구입해야 한다.

#### 사설 인증기관

- 개발 또는 사적인 목적으로 SSL을 사용할 경우 직접 CA역할을 할 수 있지만 공인된 것은 아니기 때문에 브라우저는 경고를 출력함.

#### SSL 인증서의 내용

1. 서비서의 정보 (인증서를 발급한 CA , 서비스의 도메인 등 ) - 클라이언트가 의도한 서버가 맞는지.
2. 서버 측 공개키 (공개키의 내용, 공개키의 암호화 방법)

- 내가 사용하는 서비스의 인증서의 내용은 아래와 같이 볼 수 있다.

- 로그인과 같은 기능의 경우 https를 사용한다. SSL 프로토콜을 사용한다면 위와 같이 주소창에 자물쇠 모양이 생긴다. 저 자물쇠를 누르면 아래와 같이 인증 정보를 볼 수 있다.

![image](https://user-images.githubusercontent.com/70902065/151337513-72fb3a4b-62e5-40e6-a511-abf3f5785659.png)

![image](https://user-images.githubusercontent.com/70902065/151337556-4fdc36ca-cf56-41bb-8021-66d6c1c0c004.png)

자세히 보면 아래와 같이 도메인부터 공개키 등의 정보가 있는 것을 볼 수 있다

![image](https://user-images.githubusercontent.com/70902065/151337643-5b247af4-0ce0-4ff6-98f6-8299978c8e1b.png)

#### 인증서는 어떻게 Client에게 전달이 되는가?

- Web Browser가 SSL 프로토콜을 이용해서 어떤 service에 접속을 하게되면 , 서비스는 그 서비스의 인증서를 Client에게 전송해준다.

- 인증서는 CA에 의뢰하여 구매를 헤야하며 구매할 때 서비스 Domain , 공개키와 같은 정보를 CA에 제출한다.(CA는 자신의 CA 비공개키를 이용하여 서버가 제출한 인증서는 암호화한다)

- 브라우저에는 이미 공인된 CA의 공개키 리스트가 있다.

#### SSL 인증서가 서비스를 보증하는 방법

인증서가 서버의 신뢰성을 어떻게 보장할까?

- 웹 브라우저가 서버에 접 속하면, 서버는 인증서를 제공한다.
- 웹 브라우저는 서버의 인증서가 웹 브라우저에 있는 CA리스트에 있는지 확인한다.
- 있다면 해당 CA의 공개키를 이용해서 인증서를 복호화한다 -> 복호화가 되면 서버에서 제공한 인증서가 CA에서 발급된 것임이 입증된다(인증) -> 해당 서비스는 CA에 의해 컴토가 되었다는 것과 동시게 신뢰 가능함을 의미

---

### SSL의 동작 방법

- 실제로 SSL은 공개키 방식과 대칭키 방식을 혼합하여 사용한다.
- Client - Server 의 통신은 대칭키 방식으로 암호화한다.
- 대칭키 방식으로 암호화된 실제 정보를 복호화 할 때 사용할 대칭키는 공개키 방식으로 암호화를 해서 Client - Server가 주고 받는다.
  - 실제 데이터 : 대칭키 --> 양쪽 다 대칭키를 공유하고 있어야 한다.
  - 대칭키의 키 :공개키 --> 대칭키를 공유할 때의 암호화 방식은 공개키 사용
- Newwork를 이용하여 통신을 할 때 handshake -> Transmit -> Session 종료 3가지의 단계를 거친다.</br> 이 과정에서 SSL이 어떻게 데이터를 암호화해서 전달하는지 알아보자.

1. Handshake </br>

   - 이 과정을 통해 상대방이(서버와 브라우저) 존재하는지, 데이터 통신을 위해 어떤 방법을 사용하는지 등을 파악한다. **이 때 SSL인증서와 서로의 암호화 방식을 주고 받는다**
   - 공개키 방식은 안전하며 이상적인 방식이지만 컴퓨터 자원을 많이 사용하기 때문에 SSL에서는 이 방식을 사용하지 않는다.
   - 반면 대칭키의 경우 상대적으로 적은 자원이 들지만 송-수신측이 동일한 키를 보유해야하기 때문에 보안의 문제가 있다.
   - 이런 이유로 SSL은 공개키, 대칭키를 혼합하여 사용한다.
   - Handshake 에서 Client - Server의 통신 과정 순서대로 알아보면 아래와 같다.

   1. Client Hello : Client가 Server에 접속. 아래의 정보를 주고받는다.

      - Client에서 생성한 random data
      - Client가 지원하는 암호화 방식들 : 서로 암호화 방식 협상
      - Session ID : 이미 Handshake를 했다면 기존의 세션을 재활용 하기 위해 식별자를 서버에 전송.

   2. Server Hello : Client Hello에 대한 Response . 아래의 정보를 주고받는다.

      - Server에서 생성한 random data
      - Server가 선택한 Client의 암호화 방식 : Client가 지원하는 암호화 방식 중 서버에서도 사용 가능한 암호화 방식 (협상 완료)
      - 인증서

   3. Server의 인증서 확인

      - Client는 CA리스트를 확인하여 Server에서 보낸 인증서가 CA에 의해서 발급된 것인지 확인한다 -> 없다면 경고 메시지를 사용자에게 출력
      - Client에 내장된 CA의 공개키를 이용하여 인증서를 복호화 -> 성공 시 CA 개인키로 암호화된 인증서임을 입증하므로 서버 신뢰 가능 확인됨
      - 이 단계에서 Client는 인증서 안에 있는 server가 만든 공개키를 획득하게 된다.

      - Client는 서버의 random data와 client의 random data를 조합하여 **"pre master secret"**라는 키를 생성한다 (이 키는 session단계에서 데이터를 주고 받을 때 암호화 하기 위해 사용)
      - 이 때 사용할 암호화 기법은 대칭키 이므로 pre madter secret 값은 노출되어서는 안된다.
      - pre master secret은 server로부터 받은 인증서 안에 있는 공개키로 암호화 후 서버로 전송한다.

   4. Server는 Client가 전송한 pre master secret값을 server의 비공개키로 복호화를 한다.

      - Client와 Server가 pre master secret 값을 갖게되고, 각각 어떤 과정을 거쳐서 이 값을 master secret값으로 만든다.
      - master secret은 session key를 생성하는데, 이 session key 값을 이용하여 server- client는 대칭키 방식으로 데이터를 암호화 한 후 송-수신 한다. (세션키를 양 측에서 모두 공유하게 된다.)

   5. Client - Server 는 Handshake 단걔의 종료를 서로에게 알린다.

   - 핵심 : 인증서를 서버가 클라이언트에 전송 , 클라이언트는 random값을 서버의 공개키로 암호화후 전송 -> 서버는 전송된 random값을 이용하여 (복호화) 세션키를 생선 (쌍방이 똑같은 세션키 갖느다.)

2. Seession : 클라이언트와 서버가 데이터를 주고받는 단계

- 핵심 : 정보를 전달하기 전에 session key 값을 이용하여 대칭키 방식으로 암호화 하는 것 (대칭키 방식)

- 혼합하여 사용하는 이유 ?
  - 공개키 방식 : 컴츄터 자원 많이 필요 -> 접속이 많으면 큰 비용을 지불해야 하다.
  - 대칭키 : 노출 위험이 있다.
  - 결론적으로, 속도는 느리지만 안전한 공개키로 대쳉키를 암호화하고 실제 데이터를 주고 받을 때에는 대칭키를 이용한다.

3. 세션 종료

- 데이터의 전송이 끝나면 SSL 통신이 끝났음을 서로에게 알려준다.
- 통신에서 사용한 대칭키인 세션키를 폐기한다.

---

### CA를 통한 인증서 생성과 구입

- 구입을 끝냈다면 다음과 같은 정보를 얻느다

1. ssl.key : 서버쪽 비공개키
2. ssl.crt : 디지털 인증서
3. ca.pem : ROOT CA 인증서
4. sub.class1.server.ca.pem :중계자 인증서
