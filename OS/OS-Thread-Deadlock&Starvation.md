# Computer Science-제로베이스-Thread-Deadlock&Starvation

Category: Computer Science
Chapter: Operating System
강의: Zerobase
블로깅: No
유형: LESSON
작성일시: 2022년 2월 15일 오후 9:51

제로베이스 컴퓨터 공학자 따라잡기 온라인 완주반  강의를 듣고 정리한  포스팅

# Deadlock&Starvation(교착상태 와 기아상태)

참고 사이트 GeeksforGeeks

**[Introduction of Deadlock in Operating System](https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/)**

**[Difference between Deadlock and Starvation in OS](https://www.geeksforgeeks.org/difference-between-deadlock-and-starvation-in-os/?ref=gcse)**

## 1. 교착상태(Deadlock)

![https://media.geeksforgeeks.org/wp-content/cdn-uploads/gq/2015/06/deadlock.png](https://media.geeksforgeeks.org/wp-content/cdn-uploads/gq/2015/06/deadlock.png)

- Deadlock이란 무한 대기상태를 의미한다. 각 프로세스가 resource를 보유하고있고 다른 process가 획득한 다른 resource를 기다리기 때문에 다음 단계로 진행하지 못하는 상태를 말한다.
- 위의 다이어그램은 Process1이 resource1을 갖고있으며 process2가 갖고있는 resource2를 기다리고있다. 그와 동시게 process2는 process1이 갖고있는 resource1을 기다리고있는 상태이다. 이를 교착상채(Deadlock)이라고 한다.
- 만약 아래와 같은 상황일 경우 TheadA는 자원 b를 aquire해야만 자원 a를 release하고 Thread B는 자원 a를 획득 후 b를 release한다. 이런 경우 무한대기가 발생한다.
    
    ```jsx
    // Thread A 
    lock.acuire(a) // lock.aquire(resource)는 임계 자원은 lock 하는 함수(라고 가정)
    use(a) // 자원 a를 사용하고
    lock.aquire(b) // resource b를 획득
    lock.release(a) // 자원 a를 release
    
    // Thread B 
    lock.acuire(b) 
    use(b) // 자원 b를 사용하고
    lock.aquire(a) // resource b를 획득
    lock.release(b) // 자원 a를 release
    ```
    
- 이런 현상은 배치처리 시스템에서는 일어나지 않고 프로세스, 스레드 둘 다 이와 같은 상태가 발생할 수 있다.
- 교착상태는 여러 프로세스가 동일 자원 점유를 요청할 때 발생한다.

### 교착상태의 발생 Condition

다음 4가지의 조건이 동시에 만족되면 발생한다

1. Mutual Exclusion (상호 배제) :  한 개 이상의 resource를 공유할 수 없다. 한 버넹 한 개의 프로세스만이 사용할 수 있다.
2. Hold and Wait : 한 개의 프로세스가 한 개 이상의 resource를 갖고있고, 다음 자원이 할당되기를 기다리는 상태
3. No Preemption : 다른 프로세스가 자원을 release하기 전까지 process를 뺏을 수 없다
4. Circular Wait : 순환적으로 각 프로세스가 상대 프로세스를 기다리고 있다. 

### Handling deadlock

이래처럼 조치 방법? 들이 있지만 핵심은 위의 조건 중 일부를 빼는 것..!

1. Deadlock prevention or avoidance 
2. Deadlock detection and recovery
3. Ignore the problem altogether

## 2. 기아상태 (starvation)

- 기아상태는 프로세스의 우선순위가 놓은 프로세스만 계속 실행이 되어 상대적으로 우선운쉬가 낮은 프로세스가 blocked되는 상태이다.
- 기아상태는 여러 프로세스가 부족한 자원을 점유하기 위해 경쟁할 때, 특정 프로세스는 영원히 자원 할당이 되지 않는 경우를 말한다

### starvation Handling

우선순위를 변경하는 방법을 사용한다.

- 프로세스의 우선운위를 수식로 변경 → 각 프로세스가 높은 우선순위를 가질 수 있게 한다.
- 오래 기다린 프로세스에 우선순위를 준다
- FIFO기반의 요청큐를 사용하여 우선순위가 아닌 순서대로 처리