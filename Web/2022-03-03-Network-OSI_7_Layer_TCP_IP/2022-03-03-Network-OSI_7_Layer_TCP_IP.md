# Computer Science-제로베이스-Network-OSI_7_Layesr_TPC_IP

Category: Computer Science
Chapter: Network
강의: Zerobase
블로깅: No
유형: LESSON
자료: Computer%20S%20fa3b1/1-1._%E1%84%82%E1%85%A6%E1%84%90%E1%85%B3%E1%84%8B%E1%85%AF%E1%84%8F%E1%85%B3_%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%8B%E1%85%AA_%E1%84%8B%E1%85%A7%E1%86%A8%E1%84%89%E1%85%A1.pdf, Computer%20S%20fa3b1/1-2._%E1%84%82%E1%85%A6%E1%84%90%E1%85%B3%E1%84%8B%E1%85%AF%E1%84%8F%E1%85%B3_%E1%84%80%E1%85%AE%E1%84%8C%E1%85%A9.pdf
작성일시: 2022년 3월 3일 오후 6:19

제로베이스 컴퓨터 공학자 따라잡기 온라인 완주반  강의를 듣고 정리한  포스팅 + 공룡책 참조

# Network-OSI_7_Layesr_TPC_IP

## 1. OSI 7 Layer

- 네트워크 프로토콜과 통신을 7계층으로 표현한 모델이다.
- 프로토콜을 기능별로 나누고 계층별로 구분한 것이다
- 벤더간 호환성을 위한 표준화된 모델이다.

### 각 Layer 소개

![Untitled](Computer%20S%20fa3b1/Untitled.png)

- 1계층 :  physical 계층 : 네트워므  하트웨어 전송 기술
    - 장치와 통신 매체 사이의 비정형 데이터를 전송
    - 디지털(bit)를 전기,무선 광신호로 변환한다.
    - 케이블, 인터페이스(usb , 220v , 110v 콘센트 등) , 허브, 리피터 등이 속한다.

- 2계층 : Data Link  layer
    - 동일 Network에서 데이터를 전송한다.
    - 링크를 통해서 연결을 설정하고 관리한다.
    - 물리계층에서 발생할 수 있는 오류를 감지하고 수정한다.
    - Frame 또는 고정된 길이의 Packet을 다룬다.
    - MAC(Media Access Control) , LLC(Logical Link Control) : 각 장비들의 고유의 일련번호를 통해 식별하고 통신한다.\
    - 모뎀, switch들이 이에 속한다.
- 3계층 : Network ⭐️⭐️
    - 다른 네트워크로 데이터를 전송한다.
    - IP(Internet Protocol) 주소로 통신한다
    - Routing 처리를 한다
    - 큰 데이터의 경우 packet사이즈로 분할하여 전송 후 목적지에서 재조립하여 메시지는 구현한다.
    - 논리적 주소 사이의 연결을 제공한다.
    - 들어오는 Packet을 디코딩한다.
    - IP통신, 라우팅, L2스위치, 라우터
- 4계층 : Transport  layer
    - Host간 데이터를 전송한다 (node간 message 전송을 담당한다)
    - 오류복구 및 흐름 제어를 담당한다.
    - 주 프로토콜로 TCP / UDP가있다.
    - L4 계층을 측정 하드웨어로 구분하기 모호함.
    - L4 load balancer로 제어한다.
- 5계층 : Session  layer
    - 로컬 , 원격 애플리케이션 간의 IP / Port연결을 관리한다.
- 6계층 : Presentation layer
    - 사용자 프로그램과 네크워크 형식간 데이터를 변환하여 독립성을 제공한다.
    - 인코딩, 디코딩, 암호화, 압축을 담당
- 7계층 : Application layer
    - 사용자와 가장 밀접한 Software
    - SMRP , FTP 등이 있다.
    

### OSI protocol stack

아래의 그림은 전반적인 OSI 7layer을 요약한 그림이다. (공룍책 그림)

![Untitled](Computer%20S%20fa3b1/Untitled%201.png)

- protocol stack에서 각 Layer는 논리적으로 전송을 주고 받는 상대 시스템에서 동등한 Layer와 통신하지만, 물리적으로는 메시지는 응용계층에서 시작하여 하위 layer를 통해 전달된다.
- 각 layer로 내려갈수록 message는 변형되고 수신 측의 동등한 걔층에 대한 메시지 header를 포함할 수 있다.
    
    ![Untitled](Computer%20S%20fa3b1/Untitled%202.png)
    
- message는 하나 이상의 packet으로 전송된다.
- 전송받은 수시측은 보내진 데이터를 수신하고 프로토콜 스택을 통해 위로 이동한다. 이동하면서 헤더가 분석되고 수정된다.

아래와같이 간략하게 정리 가능하다.

![Untitled](Computer%20S%20fa3b1/Untitled%203.png)

## 2. TCP / IP

관련 내용에 대해 이전에 정리한 적이 있다. 한번 참고해보자

- 네트워크 프로토콜의 모음으로 packet 통신 방식의 IP와 전송 조절 프로토콜인 TCP로 이루어져있다.
    
    

![https://media.fs.com/images/community/wp-content/uploads/2017/11/comparison-of-OSI-and-TCPIP.jpg](https://media.fs.com/images/community/wp-content/uploads/2017/11/comparison-of-OSI-and-TCPIP.jpg)

- Application Layer :
    - 응용프로그램간 표준화된 데이터를 교환
    - HTTP , SMTP, TFP, SNMP등 인터넷에 많이 쓰이는 프로토콜을 식별한다.
- Transport Layer :  TCP와 UDP 프로토콜을 식별한다.
    - TCP (Transmission Control Protocol)
        - 연결지향형 프로토콜
        - 전송 순서 보장
        - 데이터 수신 여부 확인
        - 신뢰성은 높지만 속도는 느리다
    - UDP (User Datagram Protocol) :
        - 비연결지향형 프로토콜
        - 전송 순서 보장하지 않음
        - 데이터 수신 여부를 확인하지 않음
        - 신뢰성은 낮지만 속도는 빠르다
- Internet Layer
    - Packet을 처리하고 IP Routing (다른 네트워크로 연결)
- Network Access Layer
    - 물리계층이다. 네트워크 노드들을 상호 연결한다.

### 캡슐화를 통해 네트워크는 통신한다.

[https://pbs.twimg.com/media/DWdg2e6WsAAMzxw?format=jpg&name=900x900](https://pbs.twimg.com/media/DWdg2e6WsAAMzxw?format=jpg&name=900x900)

- Applicatoin 계층에서 생성된 HOST DATA는 Transport 계층에서 Port 정보가(등등) 있는 header를 캡슐화를 하여 다음 계틍으로 보낸다
- Network 계층에서 IP header와 함께 캡슐화가 되어 다시 밑으로 보내진다.
- Data link 계층에서 MAC 주소가 포함된 Header와 함께 다시 캡슐화를 통해 보내지고
- 물리계층에서 디지털 signal로 변환 후 보내진.
- 반대로 수신측 에서는 캡슐화된 데이터를 각 계층에서 디캡슐레이션을 하면서  Application 계층까지 전달한다.