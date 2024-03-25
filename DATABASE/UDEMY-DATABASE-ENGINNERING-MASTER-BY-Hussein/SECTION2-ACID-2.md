# 개요

- Udemy 강의 중 데이터베이스 엔지니어링 마스터 강의를 듣고 정리한 내용
- [데이터베이스 엔지니어링](https://barogo.udemy.com/course/database-engineering-korean/learn/lecture/40778704#overview)
- Section2 ACID

# 강의 정리

1. Isolation (고립성)

- 고립성이란 동시에 발생하는 다른 트랜잭션과 완전히 고립된 상태에서 트랜잭션이 실행되는 것을 의미한다.
- 고립성의 필요성
  - 다수의 사용자에 의해 Database에 많은 TCP connection이 있고 각 connectoin이 transcation을 실행되어 동시에 동일한 데이터를 쓰거나 읽으려고 경합하는 동시성이 발생할 수 있다. 이럴 때 고립성이 필요하다.
  - 진행중이 transaction이 commit 전에 다른 transaction에 의해 변경된 내용을 볼 수 있어야 할까? - 이 물음에 대한 답은 사실상 상황에 따라 다르긴 하다.
- Read Phenomena(읽기 현상) 고립성 결여와 같은 문제로 발생하는 문제이다
- Isolation Levels (고립성 레벨)
  - 위와같은 읽기 현상을 해결하기 위해 고립 수준을 설정할 수 있다.

[1] Read phenomena

1. Dirty Reads

- 현재 실행중인 transaction에서 발생하는 읽기 현상
- 다른 transaction이 commit되지 않은 데이터를 읽는 현상
- rollback되면 읽은 데이터는 무의미해진다.
- not fully flushed or nott fully commited
- [예시]
  ![Dirty-Reads](Dirty-Reads.png)

  - transaction2에서 rollback된 데이터를 transaction1 에서는 dirty reads를 함

2. Non-Repeatable-Read(중복되지 않는 읽기)

- Transaction중에 값을 읽은 후 다시 읽었을 때 값이 달라지는 현상
- (예시) 값을 읽고나서 다음 쿼리에서 sum을 하는 경우 -> 다른 쿼리지만 동일한 항목에 접근한다는 점에서 같다.
- 다시 값을 읽으려고 할 때 다른 transaction에 의해 변동된 데이터를 읽는 현상이다.
- [예시]
  ![Non-Repeatable-Read](Non-Repeatable-Read.png)

  - TX2가 commit되었으므로 dirty reads는 아니다 하지만 TX1에서 두 번째로 동일한 데이터를 읽었을 떄 값이 다르다. 그렇다고 이 문제를 항상 피해야만 하는 것은 아니다.
  - 이 문제를 해결하는데 비용이 많이 든다고한다. -> 데이터에 대한 이력을 관리해야함을 의미하기때문
  - postgres는 업데이트시 항상 새 버전을 생성하고 동일한 값은 변경하지 않는다.
  - 반면 Mysql, Oravcle, SQO Servier는 값은 변경이 되지만 undo라는 다른 테이블을 유지한다. 여기에 디스크에 쓰여진 모든 이전의 값이 저장된다. undo 를 열어서 읽어야 하는데 이는 비용이 많이 든다.

3. Phantom-reads(유령 읽기)

- phantom reads는 아직 존재하지 않아서 실제로 읽을 수 없는 것들
- (ex) 특정 날짜 범위의 데이터를 읽는 쿼리를 실행하는데, 이 쿼리에서 새로운 행을 삽입하고 쿼리를 한다고 해을 때 추가된 phantom new row를 얻게 되고 그것으로 인해 문제가 생길 수 있다. 첫 번째 상황에서는 새로운 행이 없었지만 두 번째 상황에서는 새로운 행이 생기는 것.

- [예시]
  - ![Phantom-reads](Phantom-reads.png)
- 범위 쿼리의 경우 발생가능성이 높다
- 실제로 commit 되었기 때문에 dirty reads는 아니다
- 처음부터 product3을 읽지 않았기 때문에 중복되지 않은 읽기는 아니다
- 이렇게 구분을 하는 이유는 구현하는 것이 다르기 때문이다.
  - 잠금과 반복되지 않는 읽기와 연관이 있다. 무언가를 할 때 반복된 읽기를 보장받아야 한다. 트랜젝션이 읽는 모든 것에 공유 잠금을 거져야 한다. 이 읽기가 트랙젠션동안 변경되지 않아야 한다는 것을 보장받아야 한다.
    하지만 한 번도 읽지 않는 새로운 행의 경우 잠그는 것으로 변경을 방지할 수 없다 -> 이것이 유령읽기

4. Lost Update (읽어버린 업데이트)

- transaction중에 update를 했는데 다른 transaction이 내가 업데이트 한 것을 변경하는 경우

- [예시]
  ![Lost-Update](Lost-Update.png)
- TX1, TX2는 동일한 시점에 실행이 되었고 TX1이 먼저 업데이트 그 후 TX2에서 업데이트를 하고 TX2는 commit이 되었다.
- TX1의 변경사항이 TX2의 값으로 overwrite되었다.
- 그 후 TX1에서 sum을 하였고 TX1에서 의도한 업데이트 값은 손실된 채 쿼리가 된다.
- 이 것은 행을 잠그는 것으로 해결할 수 있긴하다.
  - 행을 잠근다는 것은 TX1이 업데이트를 하면 행을 잠그고 커밋이 되었을 때 잠금을 해제하는 것을 의미한다.

[2] Isolation Levels

[참고자료]

- [위키피디아](<https://en.wikipedia.org/wiki/Isolation_(database_systems)>)

  - 잘 설명해놓은듯하다.

- [Deeply understand Isolation levels and Read phenomena in MySQL & PostgreSQL](https://dev.to/techschoolguru/understand-isolation-levels-read-phenomena-in-mysql-postgres-c2e)

  - mySQL과 PostgreSQL로 직접 고립수준을 바꾸면서 설명을 해준다.

[Isolation levels VS Read phenomena]
![Isolation levels VS Read phenomena](Isolation_levels_VS_Read_phenomena.png)

- 고릭 수준이란 위에 소개한 Read phenomena를 해결하기 위해 개발되었다.
- SQL 명렁어에서는 transaction을 시작할 때 set isolation level을 사용하여 고립수준을 설정한다.
- 각 DBMS는 고립 수준을 서로 다르게 구현한다는 것을 알아두자.

(1) Read uncommited

- No Isolation 고립 수준이 없다.
- 커밋이 되든 안되든 상관 없이 다른 변경사항들을 읽을 수 있다.
- 외부에서 모든 변경사항은 커밋 여부와 상관없이 트랜잭션에게 보인다.

(2) Read commited

- 트랸젝션의 각 query는 커밋괸 변경사항만 볼 수 있다.
- 가장 인기있는 고립수준 중 하나라고 한다.
- 많은 데이터베이스가 이 고립 수준을 기본 고립수준으로 사용한다
  -> 하지만 이 고립수준은 일관성이 없을 수 있지 않을까?

(3) Repeatable Read

- 반복되지않는 읽기를 해결하기 위해 고안된 고립수준이다.
- 반복 간으하게 만드는 고립수준이다.
- 실행중인 하나의 Transaction 에서 어떤 row를 읽었을 때 transaction이 끝나기 전까지 row에 변경이 없는 것을 의미한다.
- 유령 읽기를 없애지 않는다.

(4) Snapshot

- 하나의 트랜젝션의 각 쿼리들은 그 transaction이 시작 시점까지 커밋된 변경사항만들 볼 수 있다.
- 마치 그 순간의 database의 snapshot과 같다.
- 모든 읽기 현상을 제거하는 것을 보장한다.
- postgres의 반복 가능한 읽기는 사실 스냅샷 고립이다.
  - transaction을 시작하면 어떤 버전에 있는지 타임스탬프로 표시한다.

(5) Serializable

- transaction들이 마치 직렬화 된 것 처럼 실행된다.
- 가장 느리다.
- 더이상 동시성은 없다.

[3] 정리

- 고립성이란 동시에 발생하는 여거 트랜젝션이 각 트랜젝션에 완전히 고립되어 실행되는 것을 의미한다.
- 고립성이 없다면 dirty read, non-repeatable read, phantom read, lost update 과 같은 읽기 현상 문제가 발생할 수 있다.
- 이를 해결하기 위해 고립 수준이 존재한다.
- 각 DBMS는 고립 수준을 서로 다르게 구현한다.
- Pessimistic - Row level locks, table locks, page locks 는 비용이 많이 든다.
  - 특히 row level의 경우 row가 많으면 비용이 많이 든다.
- Optimistic - lock이 없고 단지 change를 추적하고 transaction을 실패시킨다.
- Repeatable read는 row를 locking하기 때문에 row가 많으면 비용이 많이 든다. postgressms 이것을 snapshot으로 수현하기 때문에 phentom read가 발생하지 않는다.
