# 개요

- Udemy 강의 중 데이터베이스 엔지니어링 마스터 강의를 듣고 정리한 내용
- [데이터베이스 엔지니어링](https://barogo.udemy.com/course/database-engineering-korean/learn/lecture/40778704#overview)
- Section2 ACID

# 강의 정리

1. ACID란?

- 데이터베이스를 구성하는 기본 네 가지 속성이다.
- 네 가지 속성은 Atomicity, Consistency, Isolation, Durability 이다.

2. Transaction 이란?

- 쿼리들의 집합으로 하나의 작업 단위를 의미한다.
- Transaction Lifespan
  - Transaction Begin
    - 새로운 Transaction의 시작
  - Transaction Commit
    - Transaction의 성공적인 완료
    - postgres는 많은 입출력을 수행하지만 commit을 가장 빠르게 싱행된다.
  - Transaction Rollback
    - Transaction의 실패로 인한 취소
  - Transaction unexpected ending = ROLLBACJ(ex crash)
- Nature of Transactions
  - Transaction은 데이터륿 변경하고 수정하는데 사용된다.
  - 하지만 읽기 전용 Transaction도 존재한다.
    - 특정 시점의 snapshot을 읽어올 때를 예로 들 수 있다. transaction중에 읽으려는 데이터에 어떤 변경이 일어나도 읽으려는 시점의 데이터를 읽어올 수 있어야한다.(일관성 유지)
- 정리겸 요약을 해보자
  Transaction은 하나의 단일 작업으로 여러 쿼리들의 집합이다. Transaction은 보통 데이터의 변경 및 수정에서 사용되지만 일관괸 읽기를 위해 읽기 전용 Transaction도 존재한다. Transaction의 lifecycle은 Transaction의 시작을 알리는 Begin, Transaction의 성공적인 완료 후 디스크에 저장을 알리는 Commit, Transaction의 실패로 인한 취소를 의미하는 Rollback이 있다.

3. Atomicity (원자성)

- 정의

  - 하나의 Transaction에 있는 모든 쿼리들은 성공하거나 실패해야한다.
  - 과거에는 원자는 나눌 수 없는 가장 작은 단위였다. 이 개념을 데이터베이스에 적용하여 하나의 나눌 수 없는 가장 작은 단위 라고 할 수 있다.
  - 만약 하나의 transaction에서 하나의 쿼리라도 실패하면 성곤한 모든 쿼리들은 rollback되어야 한다.
  - transaction commit전에 daabase가 다운된다면 모든 성공한 쿼리들은 rollback되어야 한다.

- 요약정리
  - 원자성은 하나의 나눌 수 없는 작업 단위이다.
  - 하나의 transaction에 있는 모든 쿼리들은 성공하거나 실패해야한다.
- 일관성을 보장하는데 중요하다

4. Isolation (고립성)

5. Consistancy (일관성)

6. Durability (지속성)
