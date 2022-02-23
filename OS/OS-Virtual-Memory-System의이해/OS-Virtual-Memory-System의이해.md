# Computer Science-제로베이스-Virtual-Memory-System의이해

Category: Computer Science
Chapter: Operating System
강의: Zerobase
블로깅: No
유형: LESSON
자료: Computer%20S%206eec6/Chapter*05.*%E1%84%80%E1%85%A1%E1%84%89%E1%85%A1%E1%86%BC*%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8B%E1%85%B4*%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2*-\_01.*%E1%84%80%E1%85%A1%E1%84%89%E1%85%A1%E1%86%BC*%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%E1%84%85%E1%85%B5*%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7.pdf
작성일시: 2022년 2월 17일 오후 11:20

제로베이스 컴퓨터 공학자 따라잡기 온라인 완주반 강의를 듣고 정리한 포스팅

# 가상메모리의이해(Virtual Memory System)

[참고사이트](https://www.techtarget.com/searchstorage/definition/virtual-memory)

### 가상 메모리란 무엇인가?

가상 메모리는 RAM의 용량부족 이슈를 해결하기 위해 고안된 기술이다.

가상메모리란 기술이란 secondary memory가 마치 main memory의 일부와 같은것 처럼 사용하는 것을 말한다. 즉, RAM으로부터 SSD나 HDD같은 Disk storage로 일시적으로 데이터를 보냄으로서 컴퓨터의 물리 메모리 공간을 보완하도록 하는 기술이다.

가상 메모리는 아직 사용되지 않은 데이터를 저장소에 저장 함으로써 RAM을 확보한다. 우리가 사용하는 노트북의 RAM은 8GB를 기본으로 16,32GB 정도를 갖는다. Linux의 경우 Process 생성 시 기본 4GB가 필요하며 폰노이만 구조 기반이므로 코드는 메모리에 꼭 있어야 한다.

단지 8GB의 RAM을 갖고도 여러 chrom 창을 띄우고 카톡을 하는 등 여러 프로세스를 사용할 수 있던 이유가 바로 이 가상메모리 기술이 있기 때문(다중 쓰레드, 다중 코어 등의 여러 기술도 물론 포함)

### How Virture Memoty works

![https://cdn.ttgtmedia.com/rms/onlineImages/enterprise_desktop-ram_after_os_organizes-f.png](https://cdn.ttgtmedia.com/rms/onlineImages/enterprise_desktop-ram_after_os_organizes-f.png)

- 가상메모리의 기본적인 작동 방식은 위의 그림에서 보듯이 물리 메모리를 한 개 또는 몇 개의 프로세스가 다 차지하는 것이 아니라, 실행되어야 하는 프로세스의 특정 공간만 메모리에 올려놓고 실행이 다 끝나고 더이상 사용하지 않으면 그 메모리를 해제하고 다른 프로세스를 넣는다.
- Process의 가상 메모리 주소와 물리 주소를 mapping하는 테이블을 사용하여 Process의 어떤 부분의 주소(가상주소)가 실제 물리 메모리의 어디에 있는지 알 수 있다.
  - virtual address (가상주소) : 프로세스가 참조하는 주소
  - phsycal address (물리 주소) : 실제 메모리 주소
- Application이 실행중 이라면, 프로그램의 DATA는 RAM을 사용하여 물리적 주소에 저장된다.
- 가상메모리는 System은 MMU(Memory Management Unit) 이라는 Hardware를 통해 가상 주소를 물리주소와 mapping한다.
- 컴퓨터의 Memory manager는 물리 메모리와 가상 메모리 사이의 전환을 추적하는 역할을 하면서 어떤 데이터가 긴급하게 RAM에서 필요로 할 때 data를 RAM에서 가상메모리로 Swap하고, 다시 이 데이터가 필요한 경우 컴퓨터의 MMU는 Context Switching을 하여 실행을 재개한다.
- MMU(Manages virture memory)는 대부분 컴퓨터에서 CPU에 통합되어있다.

이전에 CS50 강의에서 가상 메모리에 대래 큰 개념으로 들었던 기억이 있다. 그때는 아직 프로세스가 어떻게 실행 되는지, 컨텍스트 스위칭이 무엇인지 모른 상태에서 큰 개념만 들었기 때문에 "느낌" 정도만 알고 넘어갔었다.

지난번 길고 길었던 프로세스 강의를 통해 프로세스와 컨텍스트 스위칭에 대해 배우고나서 가상 메모리 강의를 들으니 머리속으로 여러 프로세스들의 실행과 컨텍스트 스위칭, 프로세스의 흐림이 그려졌다. 아직 완저하지는 않지만, 나중에 시스템 프로그래밍을 통해 실습을 해보면 더 명확해지지 않을까 싶다.

위의 참고 사이트를 참고하여 설명을 더 보충하였다.
