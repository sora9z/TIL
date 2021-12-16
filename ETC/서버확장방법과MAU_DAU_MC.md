# [Computer Science][서버 확장 방법과 MAU DAU MCU 용어 정리, shell script]

강의: codestates
블로깅: No
유형: LESSON
작성일시: 2021년 12월 16일 오후 1:37

### 1. MAU , DAU , MCU에 관한 정리

수업 중간에 언급했던 용어 (리눅스 명령어와는 관련이 없지만 ) 정리 [(참고사이트)](https://brunch.co.kr/@supims/165)

- MAU : Monthly Acivity User 월별 활동한 유저를 의미하며 한 달에 몇 명이나 이 서비스를 이용했는지에 대해 구분할 때 사용된다. 보통 사용자 키가 있는 경우에 그 기준으로 구성됨.

- DAU : Daily Activity User : 일별 활동 이용자에 대한 수치. 하루에 몇 명이나 이 서비스를 이용하는가에 대해 구분할 때 사용된다. 한명이 여러 번 접속해도 한 명으로 집계된다.

- MCU : Maximum  Current User . 순간 동시 접속자를 의미하며 보통 실시간으로 수치를 해석한다. ACU (Average Current User)라는 숫자로 평균 동시 접속 유저수를 의미한다.

조금 더 알아봐서 정리를 해보자면, MAU는 보통 해당 서비스가 확보하고 있는 사용자의 총 수를 의미하고, DAU는 ARPU(Average Revenue Per User) 가입자 당 평균 수익같은 것을 계산할 때 참고할 수 있는 숫자라고 한다.

 이러한 자료를 얻기 위해 로그를 분석하고 해당 내용들을 추적 및 분석하는 방법을 사용하는데, 대표적인 것이 GA(Google Analytics) 서비스라고 한다.  GA로도 분명 부족한 부분이 있을 것이다. 이런 것들은 서버쪽에서  로그를 분석할 수 있는 자동화 기능이 필요할 것이고 이런 것들을 하기 위해서는 CLI 를 잘 활용하는 것이 필수적이라 생각한다.

### 2. Server 확장의 두 가지 방법

Scale up (수직 확장)  VS Scale out ( 수평확장) [참고사이트](https://tecoble.techcourse.co.kr/post/2021-10-12-scale-up-scale-out/)

서버에 부하가 생겼을 때는 서버를 확장해야 한다. 서버를 확장하는 방법은 Scale up 과 Scale out 두 가지가 있다. 

- Scale up ( 수직 확장) : 부족한 자원 (CPU Memory 등)을 늘려서 서버를 확장하는 방법. 기족의 서버보다 높은 사양으로 업그레이드를 하는 방법이다.(vertical scailing)이라고도 한다.
    
    ![https://user-images.githubusercontent.com/50273712/136900399-b4615b3a-8afa-4950-9513-9ce35748588f.png](https://user-images.githubusercontent.com/50273712/136900399-b4615b3a-8afa-4950-9513-9ce35748588f.png)
    
- Scale out ( 수평 확장) : 접속된 서버의 대수를 늘려 처리 능역을 향상시키는 방법. 즉, 장비를 추가하여 확장하는 방법을 말한다. 처리할 수 있는 데이터 용량 증가 + 기존 서버의 부하를 분담 하여 성능 향상이 가능하다.
    
    ![https://user-images.githubusercontent.com/50273712/136903171-2fa97983-a678-4fda-8128-ff007ab95c84.png](https://user-images.githubusercontent.com/50273712/136903171-2fa97983-a678-4fda-8128-ff007ab95c84.png)
    

두 방법의 차이는 아래와 같다.

- Scale up 의 경우 추가적인 네트워크의 연결 없이 비교적 쉽게 성능을 향상시킬 수 있지만 성능 향상에 항계가 있으며 서버 한 대가 받는 부하가 크다는 단점이 있다.
- Scale out 은 확장의 유연성이 큰 장점이다. 그때 그때 서버를 추가하여 용량과 성능을 확장(pay-as-you-grow)할 수 있지만 서버의 수가 늘어나 관리하기 어려워지고 아키텍쳐의 설계 단계에서부터 고려되어야 할 필 요가 있다는 단점이 있다. 또한 부하를 균등하게 분산시키기 위해 load balancing이 필요하게 된다.

![https://user-images.githubusercontent.com/50273712/136903809-d755fb78-678f-4c70-a5ed-90099fb37882.png](https://user-images.githubusercontent.com/50273712/136903809-d755fb78-678f-4c70-a5ed-90099fb37882.png)

---

### 3. Shell Script?

shell script를 알기 전에 먼저 script란 무엇인가 알아보자. [참고사이트](https://vallhalla-edition.tistory.com/28)

![https://rohitlakhotia.com/content/images/size/w1000/2021/07/interpreter_and_compiler_flow.png](https://rohitlakhotia.com/content/images/size/w1000/2021/07/interpreter_and_compiler_flow.png)

Python, JavaScript Perl Script, Ruby 등의 Script언어는 C, C++, Java 등의 프로그래밍 언어와 비슷하다. 이들의 차이점은 Script 언어는 Compile이 되지 않고 Interpret 된다. 

C,C++,Java와 같은 Compile언어는 프로그래밍을 하면 Compiler를 통해 CPU가 실행시킬 수 있는 기계어로 변환이 되고 Kernel에 의해 실행된다. 반면 Interpreter언어는 interpreter가 직접 명령어가 담긴 Script를 실행하면서 기계어 반환까지 하며 각 script 언어마다 있는 Interpret Engine에 의해 실행된다. 

또한 전자는 명령어를 수정하면 컴파일을 통해 다시 실행 가능한 파일을 생성해야 한다. 하지만 Script는 코드를 변경해도 과정을 반복할 필요가 없다. 

Python, Perl, Ruby등의 Script 언어는 각각의 고유한 Interpreter가 있어서 따로 설치가 필요하다. Shell Script는 Interpreter가 Shell 자체이며 이미 포함되어 있어서 Shell에서 Interpret 과정을 진행한다.

이 Shell Script는 Script 언어로 만든 프로그램으로 OS의 Shell과 연동시키는 데에 사용된다. shell script는 프로그래밍 언어로 분류되지는 않지만 다른 언어와 매우 유사한 기능을 한다. 

---