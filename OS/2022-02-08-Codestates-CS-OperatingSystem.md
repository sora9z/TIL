# Codestates-CS-OperatingSystem

강의: codestates
블로깅: No
유형: LESSON
작성일시: 2022년 2월 7일 오후 2:55

# Computer Science 기초

## 0. Achievement Goals

- 프로그램, 프로세스, 스레드에 대해 기본적인 개념을 이해한다.
  - 동시성과 병렬성의 차이를 이해한다.
  - 자바스크립트 엔진(V8)이 어떤 특징을 갖고있는지 이해할 수 있다.
- 프로그래밍에서 문자열을 다루는 방법과 유니코드 및 인코딩에 대해 이해할 수 있다.
- 비트맵 이미지와 백터 이미지의 차이를 이해할 수 있다.

## 1. 문자열

### 유니코드

- 유니코드(Unicode)는 유니코드 협회(Unicode Consortium)가 제정하는 산업 표준이다. 이 표준에는 ISO 10646 문자, 문자 인코딩, 문자 정보 데이터베이스, 문자를 다루기 위한 알고리즘 등을 포함하고 있다. 유니코드의 기본적인 목적은 현존하는 문자 인코딩 방법을 모두 유니코드로 교체하는 것이다.
- 인코딩(부호화)은 어떤 문자나 기호를 컴퓨터가 이용할 수 있는 신호로 만드는 것이다.이를 위해서는 미리 정해진 기준으로 입력과 해동이 처리되어야 한다. 이 기준을 문자셋 (charset)이라고 한다. 이 charset의 국제 표쥰이 유니코드이다.

### ASCII 문자

- ASCII 문자는 영문 알파벳을 사용하는 대표적인 문자 인코딩이다. 7비트로 모든 영어 알파벳을 표현할 수 있다. 52개의 영문 알파벳 대소문자 , 10개의 숫자, 32개의 특수문자, 공백문자 한 개를 포함하여 표현할 수 있다.
- 유니코드는 ASCII 문자를 확장한 형태이다.

### UTF-8 VS UTF-16

- 인코딩 방식의 차이를 의미한다.
- UTF-8 (Universal Coded Character Set + Transformation Format -8 bit)

  - 유니코드 한 문자를 나타내기 위해 1 byte(=8 bits)에서 4bytpes까지 사용한다.
  - 1-4bytes를 갖는 인코딩 방식이다.
  - Network로 전송되는 텍스트는 주로 UTF-8로 인코딩 된다.
  - UtF-8은 ASCII 코드의 경우 1byte를 차지하고 영어 외의 글자는 2byte, 3byte, 보조글자는 4bytes를 차지한다 (이모지는 4bytes)
  - 바이트 순서가 고정된다는 특징이 있다. (순서가 정해져있다)
  - 한글은 3Bytes를 차지한다.
  - Javascript에서 utf-8로 인코딩

  ```jsx
  let encoder=new TextEncoder();

  // encoder를 출력하면 아래와 같이 기본으로 utf-8되 되어있는 것을 볼 수 있다.
  TextEncoder {encoding: 'utf-8'}encoding: "utf-8"[[Prototype]]: TextEncoder

  // utf-8로 "라" 인코딩
  encoder.encode("라")
  // [235,157,188]로 인코딩 된다.
  -> Uint8Array(3) [235, 157, 188, buffer: ArrayBuffer(3), byteLength: 3, byteOffset: 0, length: 3, Symbol(Symbol.toStringTag): 'Uint8Array']

  // 2진수로 변환
  // 한글은 3byte로 표현 된다.
  (235).toString(2) // 이진수로 변환
  // '11101011'
  (157).toString(2) // 이진수로 변환
  // '10011101'
  (188).toString(2) // 이진수로 변환
  // '10111100'

  // ASCII 코드는 7bits로 표현이 된다. UTF-8에서는 1byte로 표현된다.
  encoder.encode('b')
  Uint8Array [98, buffer: ArrayBuffer(1), byteLength: 1, byteOffset: 0, length: 1, Symbol(Symbol.toStringTag): 'Uint8Array']
  ```

- UTF-16
  - 코드 그대로를 바이느로 표현이 가능하다. 바이트 순서가 다양하다.
  - 유니코드 대부분(U+0000 부터 U+FFFF)을 16bits로 표현한다.
  - 한글은 2Bytes를 차지한다

## 2. Graphic

[참고](https://www.educba.com/bitmap-vs-vector/)

![bimapVSVector](https://cdn.educba.com/academy/wp-content/uploads/2020/07/Bitmap-vs-Vector-info.jpg.webp)

## 3. Operating System

### 개요

Operating System에 대해서 이전에 정리한 글이 있다. 이 글을 다시 읽어보고 복습을 하였다.

- [운영체제-System Call & Kernal](https://sora9z.tistory.com/94?category=1040523)

![OS](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F27yFd%2FbtriCEfgHyp%2Fi8wgf4e7BOHoA8NWOdou6K%2Fimg.png)

- OS의 기능은 1. H/W와 응용프로그램을 관리하고 2. 사용자 Interface를 제공하기 위해 shell 프로그램을 제공한다. 또한 3. 응용프로그램이 OS의 기능을 사용할 수 있도록 Interface를 API로 제공한다.
- System Call은 OS의 기능을 사용할 수 있는 명령어 이다. API 내부는 이 System Call을 통해서 Os의 기능을 요청하도록 되어있다.
- Application이 API를 이용하여 System Call을 통해 OS에 요청을 하면, OS는 OS만 들어갈 수 있는 kernal 모드에서 해당 명령어와 자원을 application에 전달해준다

### 프로세스, 스레드, 멀티 스레드

[Process Scheduling-Multitasking,Multiprocessing](https://sora9z.tistory.com/98?category=1040523)

[OS-Thread개념.md](OS-Thread개념.md)

![](https://diffzi.com/wp-content/webp-express/webp-images/uploads/2019/01/multitasking-vs-multiprocessing-870x435.jpg.webp)

- Multitasking : 여러 프로그램이 동시에 실행되는 것처럼 보이도록 하는 system이다. Cpu가 빠르게 프로그램을 바꿔가면서 실행하기 때문에 user가 보기에 마치 동시에 실행되는 것 처럼 보인다.
- Multiprocessing : 여러 CPU에서 하나의 프로그램을 병렬로 실행하는 것을 말한다. 실행 속도를 극대화 하는 시스템이다.
- 시분할 (Concurrency) : 동시성, 병행성 으로 여러 개의 스레드가 시분할 방식으로 동시에 수행되는 것처럼 착각을 불러일으키
- Parallelism(병렬성) : 멀티 코어 환경에서 여러 개의 스레드가 실제로 동시에 수행됨.

## 4. Context Switching

[따로 정리해 둔 글](https://sora9z.tistory.com/104?category=1040523)

![https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/684074/0f1e8498-9405-95aa-e2b9-7ef1f3d0e6e9.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/684074/0f1e8498-9405-95aa-e2b9-7ef1f3d0e6e9.png)

- Context Switching은 간단하게 말해서 Process A 실행 중 Process B로 바꿔주는데, 이 바꿔주는 메커니즘을 Context Switching이라고 한다.
- 현재 실행중인 process 또는 registor의 값(Context)을 저장하고 새로운 process 또는 registor값(Context)으로 변경하여 CPU가 다음 process를 실행한다.
- Context란 CPU가 process를 실행하기 위한 process의 imformation이다. Process의 PCB(Process Control Block)에 저장되고 Context Switching 중에 PCB information을 읽어서 CPU가 이전 process가 하던 작업을 할 수 있게 한다.
- Context Switching은 I/O request , Time Slice expired(CPU 사용 기간 만료)
