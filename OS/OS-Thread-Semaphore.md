# Computer Science-제로베이스-Thread-Semaphore

Category: Computer Science
Chapter: Operating System
강의: Zerobase
블로깅: No
유형: LESSON
작성일시: 2022년 2월 12일 오후 11:30

제로베이스 컴퓨터 공학자 따라잡기 온라인 완주반  강의를 듣고 정리한  포스팅

# Thread-Semaphore

동기화 이슈를 해결하기 위해 

- Mutual exclustion (상호 배제) 를 사용한다.
- 쓰레드는 프로세스 모든 데이터를 접근할 수 있으므로, 여러 쓰레드가 변경하는 공유 변수에 대해 Exclusive Access가 필요하다. 한 쓰레드가 공유 변수를 변경하는 동안 다른 쓰레드가 접근하지 못하도록 막아야 한다.

### Mutual exclusion (상호 배제)

- 아래의 코드를 임계 영역이라고 한다 (Critical section) 그리고 g_count를 증가시키는 code를 임계 자원(Critical resource)라고 한다.

```python
lock.acuire()
for i in range(100000):
	g_count+=1
lock.release()
```

### Mutex와 Semaphore (세마포어)

Critical Section에 대한 접근을 제한하기 위해 locking 메커니즘이 필요하다 (Locking 메커니즘은 상호배제 라고도 한다) 두 가지 방법이 있으며 아래와 같다.

1. Mutex(binary semaphore)
    1. 임계 구역에 “하나의 쓰레드" 만 즐어갈 수 있다
2. Semaphore
    1. 임계 구역에 “여러 쓰레드가” 들어갈 수 있다. 
    2. counter를 두어서 동시에 리소스에 접근할 수 있는 허용 가능한 쓰레드 수를 제어하는 방법을 사용한다.
    

### Semaphore : **[Semaphores in Process Synchronization](https://www.geeksforgeeks.org/semaphores-in-process-synchronization/)**

Semaphore는 이미 구현되어있는 함수이다. 논문으로도 나와있으며 수도코드를 통해 소개하고있다.

**[Semaphore pseudo code](https://courses.washington.edu/cp105/06_Synchronization/Semaphores.html#semaphore-pseudo-code)**

1. Semaphore - 바쁜 대기 (busy waiting)
    
    ```c
    P(S) : wait(Semaphore s) {
    
    					while(s==0) ; // wait until s==0
    				S--; // 다른 프로세스 접근 제한 
    			}
    
    V(S) : signal(Semaphore s) {
    				s++ ; // 다른 프로세스 접근 허용
    			}
    
    ```
    
- P : 검사
    - 임계 영역에 들어갈 때
    - S값이 1 이상일  경우 임계 영역 진입 후 S값이 1 차감된다.
    - S값이 0이면 대기한다.
    
- V : 증가
    - 임예 영역에서 나올 때
    - S값을 1 더하고, 임계 영역을 나온다.
- S : 세마포어 값 (초기 값만큼 여러 프로세스가 동시에 임계 영역에 접근 가능하다)

하지만 위의 방법은 대기할 때 계속 while문을 돌게된다. 이는 CPU의 자원을 계속 소모하게 되므로 성능을 저하시킨다.

1. Semaphore - 대기 큐 
    - OS의 기술로 보완한 것이 대기큐이다.
    - S가 음수인 경우 바쁜대기 대신 대기큐에 넣는다.
    
    ```c
    P(S) : wait(Semaphore s) {
    					s.count--; 
    					if(s<0){
    						add this process to queue;
    						block()
    					}
    					else retuen;			
    			}
    
    V(S) : signal(Semaphore s) {
    				s.count++ ; // 다른 프로세스 접근 허용
    				if(s >=0) {
    					remove a process P from queue;
    					wakeup(p) 
    			}
    
    ```
    
    - wait에서 count를 먼저 감소시킨다.
    - 만약 현재 세마포어가 0 이하라면 현 Thread를 block() 기다리게 한다.
    - 이후 세마포어를 먼저 획득한 쓰레드가 signal을 불러 count를 증가시키면
    - 기다리는 쓰레드를 wakeup으로 깨워준다.
    
    ### 주요 세마포어 함수 (POSIX 세마포어) - 리눅스
    
    - sem_open() : 세마포어 생성
    - sem_wait() : 임계영역 접근 전 , 세마포어를 잠그고 세마포어가 잠겨있다면 풀릴 때까지 대기한다.
    - sem_post() : 공유자원에 대한 접근이 끝났을 때 세마포어 잠금 해제