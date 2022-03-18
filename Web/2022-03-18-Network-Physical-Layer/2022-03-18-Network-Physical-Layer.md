# Network - Physical layer

Category: Computer Science

제로베이스 컴퓨터 공학자 따라잡기 온라인 완주반 강의를 듣고 정리한 포스팅

# Network - Physical layer

네트워크 7계층 중 물리 계층에 대한 정리이다.

## 1. 물리계층의 전반적인 역할과 기능

![https://miro.medium.com/max/1168/1*af3ii0IPdc3LumBg-1uKiw.jpeg](https://miro.medium.com/max/1168/1*af3ii0IPdc3LumBg-1uKiw.jpeg)

- 물리계층은 Data Link 계층의 Frame을 전기적인 신호로 인코딩하여 Network 장비로 전송한다.
- 물리계층을 구성하는 요소로는 통신장비, 커넥터, 인코딩(비트를 Signal로 인코딩), 송-수신 회로가 있다.
- Data LInk의 Frame이 bit단위로 인코딩된 후 신호로 변환되어 전송되는 방식이다.
- Signaling의 종류 [참고사이트](https://ironduck.tistory.com/17)

  - Cable

    - 전기 : Copper cable을 사용한다. UTP, 동축케이블, 전화선 등이 해당된다.
    - 광 : Optocal 케이블을 사용한다. 전기적 신호와 달리 빛의 패턴을 신호로 사용한다.
    - IEEE 802.3 : CSMA/CD 라는 Access method를 사용하는 표준이다. 동축 케이블, UTP Calbe, 광케이블을 사용한다. 이더넷에서 물리계층과 데이터 림크 계층의 매체 접근 제어를 정의한다.

    |              | UTP        | STP         | Fiber       |
    | ------------ | ---------- | ----------- | ----------- |
    | IEEE 표준 명 | 802.3ab    | 802.3z      | 802.3z      |
    | 약칭         | 1000BASE-T | 1000BASE-CS | 1000BASE-SX |
    | Max Length   | 100m       | 25m         | 500m        |

    - 약칭
      - 1000: 전송 속도 : 1000Mbps
      - BASE : 전송방식 : 베이스밴드방식
      - 세 번째 : 숫자인 경우 - 전송거리 , 문자인 경우 케이블 종류 또는 광 타입 : T (Twisted Pair Cable)

  - 전파 : 무선와이파이가 이에 속한다. 마이크로파 패턴을 신호로 사용한다.
    - IEEE802.11 : 무선랜의 규격이다. [이곳](https://www.linkedin.com/pulse/internet-things-part-12-mahendra-bhatia) 에 설명이 자세하게 되어있다.
      이 규격 또한 802.11b, 802.11a, 802.11등의 규격이 존재한다. (그림은 위의 사이트의 그림)

![https://media-exp1.licdn.com/dms/image/C4E12AQFxRN0icT9p0g/article-inline_image-shrink_1000_1488/0/1520558721478?e=1652918400&v=beta&t=T_X2K0rJKH38ixDEhVxZithUtgHXVGs_sXM7ocx7ufU](https://media-exp1.licdn.com/dms/image/C4E12AQFxRN0icT9p0g/article-inline_image-shrink_1000_1488/0/1520558721478?e=1652918400&v=beta&t=T_X2K0rJKH38ixDEhVxZithUtgHXVGs_sXM7ocx7ufU)

그 차이는 위와 같으며 향상된 속도로 릴리즈가 되어왔다.
속도차이만 봐도 1000Base Ethernet보다 빠르다.
정리 >

- 물리계층은 상위 계층인 Data Link Layer의 Frame을 인코딩하여 전기적 신호로 전달한다.
- 전송하는 수단으로는 (Signaling) 전기,광,무선 등의 방식이 있다.
- 표준 규격으로는 IEEE 802.3 Ethernet , IEEE 802.11 무선 표준 이 있다.
