# Computer Science-제로베이스-Thread개념

Category: Computer Science
Chapter: Operating System
강의: Zerobase
블로깅: No
유형: LESSON
작성일시: 2022년 1월 9일 오후 7:47

제로베이스 컴퓨터 공학자 따라잡기 온라인 완주반  강의를 듣고 정리한  포스팅

# Thread(스레드)개념

## 2. Thread란?

- Thread란 Light Weight Process라고도 한다. process 처럼 동작하지만 구조가 더 작다.
- 하나의 process에는 여러 개의 Thread를 생성할 수 있고 이 Thread 들은 동시에 실행이 가능하다.

![https://media.vlpt.us/images/underlier12/post/dcad3344-9871-4ad7-81fb-3b94e0b7152e/image.png](https://media.vlpt.us/images/underlier12/post/dcad3344-9871-4ad7-81fb-3b94e0b7152e/image.png)

- 위의 그림에서 왼쪽은 한 개의 process에서 한 개의 Thread를 보여주고 오른 쪽 그림은 한 개의 process에 있는 3개의 thread를 보여준다.
- Process는 크게 STACK, HEAP, DATA, BSS, CODE 영역으로 나눌 수 있다. Thread는 process의 Stack 영역에서 각각의 Stack 영역을 갖고있는 “함수" 의 개념이라고 간단하게 정의할 수 있다
- Thread 들의 Stack 영역들은 Stack과 Heap 공간 사이에 위치하며 위의 그림에서와 같이 각 Thread는 SP, PC등의 정보를 저장하고있는 Registor도 갖고있다.
- Stack 영역 외의 공간을 그 process의 Threads가 공유한다.
- Multi Thread
    
    ![https://media.vlpt.us/images/underlier12/post/e5d5bf5d-d1fc-4253-aa5b-f625934c9026/image.png](https://media.vlpt.us/images/underlier12/post/e5d5bf5d-d1fc-4253-aa5b-f625934c9026/image.png)
    
    - Software 병행 작업 처리를 위해 Multi Thread를 사용한다.
    

## 2. process VS Thread

|  | Thread | Process |
| --- | --- | --- |
| 특징 | 단일 프로세스의 Subset이다.  | 각 프로세스는 독립적이다. |
| 주소 | Thread는 주소 영역을 공유한다 | Process는 자신만의 주소 영역을 갖는다. |
| 자원 | Process의 자원을 Thread끼리 공유한다 | 독립적인 자원을 갖는다. |
| 통신 | IPC 기법이 필요 없다 | IPC 기법이 필요하다 |

위의 표에서 보듯 프로세스는 독립적인 공간을 갖기 때문에 process간 데이터를 주고 받을 수 있는 통심 기법이 필요한 반면 (IPC) Thread는 단일 Process에 여러 Thread가 존재할 수 있으며 DATA 영역, Head 영역 등 공간을 서로 공유하기 때문에 IPC 기법은 필요하지 않다. 

## 3. Multi Tasking & Multi Processing

[참고](https://donghoson.tistory.com/15)

![https://media.vlpt.us/images/underlier12/post/81145e2e-2563-4e67-bf3d-ed908887eecc/image.png](https://media.vlpt.us/images/underlier12/post/81145e2e-2563-4e67-bf3d-ed908887eecc/image.png)

- Multi Tasking은 Task가 OS의 스케줄링 방식에 따라 Process를 번갈아가면서 수행되는 것이다.
    - Multi Tasking의 스케줄링 방식으로는 Multi programming , Time-sharing, Reral-Time 방식이 있다.
- Multi processing은 여러 개의 프로세서가(CPU) 작업을 병렬적으로 처리하는 것을 말한다.
    - 한 개의 프로세스를 처리할 때에도 여러 프로세서에서 작업을 처리한다.
    - 이 방식을 사용하면 하나의 프로세스에서 진행되는 작업도 병렬적으로 처리가 가능하기 때문에 실행 속도를 증가시킬 수 있다.
    - 여러 개의 Thread를 생성하고 여러 프로세서를 실행하는 구조로 사용된다.

![https://media.vlpt.us/images/underlier12/post/114a28aa-c7b1-46c2-87ec-47a223edd134/image.png](https://media.vlpt.us/images/underlier12/post/114a28aa-c7b1-46c2-87ec-47a223edd134/image.png)

- 위의 그림에서 첫 번째 그림은 한 개의 프로세스와 한 개의 Thread만을 사용한다. Batch Processing과 비슷한 구조이다.
- 두 번째 그림은 한 개의 Process와 다중 Thread이다.
- 세 번째 그림와 네 번째 그림은 Multi processing  구조이며 왼쪽은 한 개의 process에 한 개의 Thread만 사용하는 구조이며 두 번째 그림은 다수의 Thread를 사용한다. 우리가 사용하는 대부분의 PC는 다중 프로세서와 멀티 쓰레드 구조를 사용한다.

## 4. Thread의 장점과 단점

### 1. 장점

- 사용자에 대한 **응답성** 향상
    
    ![https://media.vlpt.us/images/underlier12/post/d8475183-0e30-4e97-a94c-482bae01c722/image.png](https://media.vlpt.us/images/underlier12/post/d8475183-0e30-4e97-a94c-482bae01c722/image.png)
    
    - 위의 그림에서 처럼 Thread A는 특정 작업 (계산을 하는 작업 등)을 하게하고 Thread B는 이 결과를 사용자에게 전달하는 작업을 실행하게 하여 사용자의 요청에 대해 더 빠른 응답을 가능하게 한다.
    - 또한 한 개의 Server와 다수의 Client가 있다고 했을 때  client마다 Thread를 사용한다면 사용자에게 짧은 대기시간으로 빠른 응답을 줄 수 있는 장점이 있다.

- 자원 공유 효율성 증대
    - IPC 기법응 사용해서 자원을 공유하는 프로세스와는 다르게 자원을 서로 공유하므로 상대적으로 공간 효율성이 더 좋다
    - 예를 들어, process는 (linux) 생성 시 4GB를 차지한다. Process를 여러 개 만들면 그만큼 공간을 배로 차지하게 된다. 하지만 Thread는 한 개의 process에 있으므로 4GB의 공간만이 필요하게 되므로 자원 효율이 좋다.
- 어떻게 작성하느냐에 따라 다르겠지만, Thread를 사용하면 작업을 분리할 수 있으므로 코드를 간결하게 만들 수 있다.
- CPU 활용도를 높인다.

### 2. 단점

- 한 개의 Thread에 문제가 생기면 전체 process가 영향을 받는다.
    
    ![https://media.vlpt.us/images/underlier12/post/cd8cf4e6-bd7c-43cb-a81b-d8a1e9948e3e/image.png](https://media.vlpt.us/images/underlier12/post/cd8cf4e6-bd7c-43cb-a81b-d8a1e9948e3e/image.png)
    
    - 멀티 프로세스의 경우 각각 독립적이기 때문에 한 개의 process에 문제가 생겨도 다른 process에는 문제가 되지 않는다. 하지마느 Thread의 경우 자원을 공유하므로 한 개의 Thread에 문제가 생기면 전체적으로 문젝가 생기는 단점이 있다.
- Thread를 많이 생성하게 되면 Contrxt Switching을 많이 하게되서 성능을 저하시킬 수 있다.
    - linux의 경우 Thread를 process와 같이 다룬다. 그러므로 Thread를 많이 생성하면 모든 Thread를 스케줄링 해야하므로 Context Switching이 빈번할 수 밖에 없다.
- 자원을 서로 공유하기 때문에 동기화 문제가 발생한다.