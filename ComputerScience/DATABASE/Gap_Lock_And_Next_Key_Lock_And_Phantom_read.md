### Phantom Read란?

phantom read란, 트랜젝션 내에서 동일한 조건의 쿼리를 반복 실행할 때, 나중에 실행된 쿼리에서 처음에는 존재하지 않았던 행이 추가되는 현상을 의미한다.

예를 들명 아래와 같다.

```bash
# transaction A
START TRANSACTION;
SELECT * FROM orders WHERE amount >150;

# transactionB
START TRANSACTION;
# 새로운 생 삽입
INSERT INTO orders (product_id, amount) VALUES (10,300);
# transactionB 커밋
COMMIT;

# transactionA에서 동일 조건의 쿼리 실행
SELECT * FROM orders WHERE amount >150;
# 위의 결과에는 기존에 없던 10,300 이 추가되어 나온다
```

위와 같이 다른 트랜잭션에 의한 데이터의 삽입, 삭제가 발생할 때 phantom read가 발생할 수 있다.

My SQL을 기준으로

### 갭락(Gap Lock)이란?

- 갭 락이란 인덱스 값 사이의 공간을 잠그는 락이다. 기존 레코드간의 간격에 락을 걸어 새로운 삽입을 방지한다.
- `아직 존재하지 않지만, 지정된 범위에 해당하는 인덱스 테이블 공간을 대상으로 거는 잠금`이다. 따라서 값이 꼭 존재해야하는 pk나 unique key에는 사용되지 않는다.즉 아직 존재하지 않는 갭에 잠금을 거는 것이다.
- FPR UPDATE를 사용하여 잠금할 수 있다
- 아래의 예시를 보자

```bash
# transaction A
START TRANSACTION;
# transaction A 1-3과 3-5사이의 겝과 3레코드락 설정
SELECT * FROM orders WHERE order_id BETWEEN 2 AND 4 FOR UPDATE;

# transaction B
START TRANSACTION
# transaaction B id 4 에 데이터 삽입 시도
# 겝락에 의해 차단되어 대기한다
INSERT INTO orders (order_id,orders_amount) VALUES (4,20);

```

### 넥스트키 락(Next Key Lock)이란?

넥스트락은 `레코드 락과` `갭락을 결합`한 것이다. 특정 인덱스 레코드와 그 주변의 갭을 동시에 잠그는 락이다.

```bash
# transaction A
START TRANSACTION
# transaction A amount = 200,order_id = 2 레코드에 대한 락
# 그리고 1-2, 2-3에 대한 갭락을 통해 잠금
SELECT * FROM orders WHERE orders_amount = 200 FOR UPDATE;

# transaction B
START TRANSACTION
# 대기
INSERT INTO orders (order_id, order_amount) VALUES (4,200)

```
