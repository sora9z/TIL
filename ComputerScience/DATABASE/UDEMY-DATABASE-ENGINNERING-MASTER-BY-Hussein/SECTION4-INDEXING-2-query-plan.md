# 개요

- Udemy 강의 중 데이터베이스 엔지니어링 마스터 강의를 듣고 정리한 내용
- [데이터베이스 엔지니어링](https://barogo.udemy.com/course/database-engineering-korean/learn/lecture/40778704#overview)
- Section4 DATABASE INDEXING

- 현업에 있을 때에도 많이 했지만 postgresql에서는 explain으로 쿼리 플랜을 한다
- 쿼리 플랜을 통해 쿼리를 실행하는데 드는 비용과 시간을 볼 수 있고 어떻게 쿼리를 했는지 확인할 수 있다.

- 아래와 같이 쿼리 플랜을 실행해본 결과.\

```bash
mydatabase=# explain select * from chat_chatroom;
                          QUERY PLAN
---------------------------------------------------------------
 Seq Scan on chat_chatroom  (cost=0.00..1.51 rows=51 width=62)
(1 row)

```

- 첫 번째 부분 `Seq Scan on message_message` 이 부분은 쿼리 계획이다.

  - seq scan은 sequence 스캠으로 순차스캔이다. 전체 테이블 스캔과 동등하다
  - 힙으로 바로 이동하여 모든 것을 가져온다는 뜻임
  - 가끔 postgres는 스레딩을 이용한 병렬 순차 스캔을 수행하기도 한다고 한다.

- 두 번째 부분 `(cost=0.00..1.51 rows=51 width=62)`

  - cost는 쿼리를 실행하는데 드는 비용이다.

    - cost는 두 개의 숫자로 이루어져있으며 두 개의 점으로 구분된다
    - 이 숫자는 database가 미리 예상하는 총 소요시간이다. 실제 시간은 아니다.
    - 첫 번째 숫자는 첫 번째 page를 가져오는데 걸린 시간(밀리초)을 의미
      - 0.00은 0밀리초임. 이렇게 걸린 이유는 결과를 가져오는데 걸리는 시간이 아주 짧기 때문이다.
      - 만약 집계나 order by와 같은 실제 데이터를 가져오는 결과와 무관한 실제 작업 전에 선행하는 작업이 있다면 첫 번째 숫자가 높을 수 있다. 만약 이 숫자가 늘어난다면 실행 전에 어떤 많은 작업을 한다는 의미이다.
    - 두 번째 숫자는 총 소요시간을 의미한다.

  - row

    - 자체 통계에 기반한 대량적인 가져올 행의 수를 의미한다
    - select count보다 이걸로 확인하는 것이 더 나음 실제로 모든 행에 대한 카운트를 수행한다. 성능이 좋지 않다.
    - 만약 10먹 개의 데에터가 있다면 진짜로 10억개를 세개 된다.

  - width

    - width는 행의 폭이다
    - 모든 열의 바이트 합계이다.

- 아래의 쿼리 플랜을 확인해보자

  ```bash
     postgres=# explain select * from grades order by name;
     QUERY PLAN

     Gather Merge  (cost=1024586.74..2205065.16 rows=10117680 width=31)
       Workers Planned: 2
       ->  Sort  (cost=1023586.72..1036233.82 rows=5058840 width=31)
             Sort Key: name
             ->  Parallel Seq Scan on grades  (cost=0.00..218201.40 rows=5058840 width=31)
     (5 rows)

     postgres=#
  ```

  - query plan을 읽을 때에는 내부부터 시작해서 밑에 있는 내용을 먼저 읽는다.
  - name은 index가 아니기 때문에 seq scan을 수행한 것을 볼 수 있다.
  - 위의 쿼리 플랜을 보면 병렬 순차 스캔을 수행했다. `Parallel Seq Scan on grades (cost=0.00..218201.40 rows=5058840 width=31)`
    - 약 218초 가 걸린 것으로 추정
    - 핸은 5058840개
  - name으로 Sort `Sort  (cost=1023586.72..1036233.82 rows=5058840 width=31)`
    - cost를 보면 정렬을 시작하는 데까지 1023586.72가 걸린 것으로 추정. 약 1000초가 걸림
  - Workers Planned: 2

    - 병렬로 2개의 워커를 사용했다는 의미

  - `Gather Merge  (cost=1024586.74..2205065.16 rows=10117680 width=31)`
    - 두 개의 worker가 사용되었고 그 결과를 merge하는 것을 볼 수 있다.

- 또다른 쿼리 플랜을 확인해보자

  ```bash
      postgres=# explain select id from grades;
      QUERY PLAN

      Seq Scan on grades  (cost=0.00..289025.15 rows=12141215 width=4)
      JIT:
        Functions: 2
        Options: Inlining false, Optimization false, Expressions true, Deforming true
      (4 rows)

      postgres=#

  ```

  - pk인 id인데도 순차 스켄을 한 이유는 쿼리 결과가 테이블의 대부분의 행을 포한하는 경우 Postgresql은 순차 스캔이 더욱 효율적이라고 판단하기 때문이다.
  - 비용이 0이다. 첫 번째 페이지를 가져오기 위해 테이블로 이동하는 비용이 들지 않았다
  - width가 4이다. id는 정수이기 때문에 4바이트이다.
  - JIU(Just-In-Time Compliation)은 쿼리를 실행하기 전에 컴파일하는 것이다. 이것은 쿼리를 더 빠르게 실행할 수 있게 해준다.
    - Functions: 2: 실행계획에 포함된 JIT 기능의 수를 이미
    - Options
      - Inlinig flase : JIT 최적화가 비활성화 되어있음을 의미
      - Optimization false : 최적화가 비활성화 되어있음을 의미
      - Deforming true: 튜플을 분해하는 작업에 JIT최적화를 사용하고 있음을 의미한다.

- width가 크면 클수록 네트워크 비용이 많아지게 된다. TCP 패킷이 거 많아지게 된다. select \* 을 최대한 하지 말자

  - 필요한 컬럼만 보는 것이 좋다.
  - grade만 필요하면 grade만 하자

- 다른 쿼리 플랜

  ```bash
  postgres=# explain select * from grades where id = 10;
  QUERY PLAN

  Index Scan using id_idx on grades  (cost=0.43..8.45 rows=1 width=31)

    Index Cond: (id = 10)
  (2 rows)

  ```

  - Index scan을 하고 heap으로 이동하여 몇 개의 행 값을 가져옴

- 또다른 쿼리

  ```bash
  postgres=# explain select id from grades where id = 10;
  QUERY PLAN

  Index Only Scan using id_idx on grades  (cost=0.43..4.45 rows=1 width=4)

    Index Cond: (id = 10)
  (2 rows)

  ```

  - index only scan을 수행했다. index만으로 결과를 가져옴
  - id만 select 했으므로 힙으로 이동할 필요가 없다.
