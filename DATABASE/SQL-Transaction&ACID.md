# SQL - Transaction & ACID

Category: Computer Science
Chapter: Database
강의: Self Study
블로깅: No
유형: Refer
작성일시: 2022년 1월 3일 오후 3:24

# SQL - Transaction & ACID

### 1. Transaction의 정의

[SQL | TRANSACTIONS - GeeksforGeeks](https://www.geeksforgeeks.org/sql-transactions/?ref=gcse)

어떤 Tranaction이 얼마나 자주 방생하는지 분석하고 그에 따라서 Transaction 처리 방법 또는 데이터베이스 구조 등을 설계해야 한다.

- Transaction이란 여러 작업을 하나로 묶은 실행 유닛이라고 한다. 한 개의 단일 작업(task)는 더이상 나눌 수 없는 최소 단위의 processing unit이다.
- 한 개의 Transcation은 특정 작업으로 시작하여 그 그룹에 있는 task가 모두 성공적으로 완료 되어야 정상적으로 종료되며 한 개의 task라도 실패하게되면 이 Transaction을 실패로 간주한다.
- 즉, Transaction은 성공 또는 실패라는 두 개의 결과만이 존재한다.

### 2. Transaction의 특성

[ACID Properties in DBMS - GeeksforGeeks](https://www.geeksforgeeks.org/acid-properties-in-dbms/?ref=gcse)

![https://media.geeksforgeeks.org/wp-content/cdn-uploads/20191121102921/ACID-Properties.jpg](https://media.geeksforgeeks.org/wp-content/cdn-uploads/20191121102921/ACID-Properties.jpg)

Transaction은 데이터의 무결성(Integrity)을 위하여 Aotomic-원자성, Consistene-일관성, Isolated-독립성,격리성,순차성 , Durable-영속성,지속성. 줄여서 ACID라는 특성을 갖고있다. 각 특성에 대해 알아보자.

### Atomicity(원자성)

- 전체 Transaction은 한 번 발생하거나 전부 실행되지 않는 것을 의미한다. 어느 한 개의 작업이라도 실패하면 전부가 취소되어 기존의 데이터를 보존한다. SQL에서도 특정 쿼리문이 부분적으로 실패한다면 전부 실패하도록 구현되어있다.
- Transaction의 연산은 아래 두 가지로 나뉠 수 있다
  - Abort : Transaction이 abort되면 (중단되면) database에 변화는 없음을 의미
  - Commit : Transaction이 commit 되면 변경사항이 표시된다.
- 예시
  Transaction T 는 T1과 T2로 구성되어있다고 할 때 100을 X계좌에서 Y계좌로 각각 보낸다고 가정한다. X에서 Y로 돈을 보내도 X,Y의 총 합은 전과 후가 같아야 한다. (800)

![https://media.geeksforgeeks.org/wp-content/uploads/11-6.jpg](https://media.geeksforgeeks.org/wp-content/uploads/11-6.jpg)

하지만 만약 T1의 Write(X) 까지 다 끝난 후 T2가 끝나기 전에 transaction 에서 fail이 된 상태에서 완료가 된다면 X에서는 금액이 사라지지만 Y에서는 더해지지 않게 된다. 따라서 Database의 정확성을 보장하기 위해 Transaction의 전체가 실행되어야 한다.

### Consistancy(일관성)

- 데이터베이스의 상태는 일관되어야 한다는 성질
- 하나의 Transaction 이전과 이후 데이터베이스의 상태는 이전과 같이 유효해야 한다.
- 무결정 제약조건을 만족하여 transaction으 전과 후가 일관되어야 한다.
- 예시
  위의 예시에서 T가 발생되기 전에는 500+200=700 이이며 후의 금액 또한 400+300=700이어야 한다.

### Isolation(독립성)

- Isolation이란 Transaction은 다튼 Transaction 으로부터 독립되어야 한다는 의미이다.
- 특정 Transaction의 변경사항은 이 Transaction이 commit 되거나 memmory에 기록되기 전까지 다른 Transaction에서 볼 수 없다는 것을 의미한다.
- 동시에 여러 개의 Transaction이 수행될 때 각 Transaction이 격리되어있어 연속으로 실행된 것과 동일한 결과를 나타낸다.
- 예시
  ![https://media.geeksforgeeks.org/wp-content/uploads/20210402015259/isolation.jpg](https://media.geeksforgeeks.org/wp-content/uploads/20210402015259/isolation.jpg)

  위의 그림처럼 두 개의 Transaction T와 T’’이 있고, T가 Read(Y)을 실행된 다음 T’’가 실행된다로 할 떄
  T’’에서 Read(X)는 올바른 값이 들어오지만 T’’의 Read(Y)는 T에서 아직 Write(Y)를 실행하지 않았기 때문에 정확한 값이 들어오지 않는다. 따라서 Transaction은 독립적이여야 하며 memmory에 기록된 후 변화가 보여야 한다.

### Durability(영속성)

- 한 개의 Transaction이 성공적으로 수행되었다면 해당 Transaction에 대하 log가 남아야 한다.
- 어떠한 오류가 발생하더라고 해당 기록은 영구적이여야 한다.
- database는 system에 장애가 발생하거나 또는 restart 되더라도 최신 업데이트 내용을 보관할 수 있을 정도로 영속적이여야 한다.
