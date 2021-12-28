# [Database] SQL 기본 - DML

Category: Computer Science
Chapter: Database
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2021년 12월 27일 오전 10:57

저번 포스칭에서는 데이터 정의어인 DDL (Data Difinition Language)에 대한 간단한 명령여를 알아보았다.

이번 포스팅에서는 데이터 조작어인 DML(Data Manipulstion Language)에 대한 간단한 명령어를 알아보도록 한다.

## DML (Data Manipulation Language) 데이터 조작어

- 데이터베이스를 저장할 때 사용하는 언어이다.
- DBMS와 데이터베이스 사용자와의 interface를 제공한다.

| 명령어 | 기능                                          |
| ------ | --------------------------------------------- |
| SELECT | Table에서 조건에 맞는 튜플을 검색한다.        |
| INSERT | Table에 새로운 튜플을 삽입한다.               |
| DELETE | Table에 조건에 맞는 튜플을 삭제한다.          |
| UPDATE | Table에서 조건에 맞는 튜플의 내용을 변경한다. |

### 1. INSERT INTO ~ VALUES ~

삽입 명령어는 데이터를 삽입하기 위한 명령어이다. 형태는 두 가지로 나타낼 수 있다.

```sql
INSERT INTO table_name([속성명1,속성명2..]) VALUES (value1,value2...)
// <사원> 테이블에 이름 - 강라탱 부서 - 백엔드 를 삽입하면 아래와 같다.
INSERT INTO 사원(이름,부서) VALUES ('강소라','밴엑드')

INSERT INTO table_name VALUES (value1,value2..)
// <사원> 테이블에 어탱이 메인작가 89/12/07 개포동 90 을 삽입하라
INSERT INTO 사원 VALUES('어탱이','메인작가',#89/12/07#,'개포동',90)
// 날짜의 경우 ## 또는 ''로 묶어준다.
```

- 속성의 데이터(value)는 개수와 데이터의 유형이 같아야 한다.
- 두 번째 방법과 같이 테이블의 모든 속성을 사용할 경우에는 속성명이 생략 가능하다.
- SELECT 문을 사용하여 다른 테이블의 검색 결과를 삽입할 수도 있다.

### 2. DELETE FROM ~ WHERE ~

조건에 맞는 데이터를 삭제하는 명령어이다.

```sql
DELETE FROM table_name
[WHERE 조건]; // 모든 records를 삭제할 경우 생략

```

- 모든 레코드를 삭제할 경우 where 생략한다.
- DDL인 DROP과 다른 점은 데이터를 제거하더라도 테이블의 구조는 남아있다.

```sql
DELETE FROM 사원
WHERE 이름 = '김나랑';
```

### 3. UPDATE ~ SET ~ WHERE~

기본 테이블에 있는 튜플 중 특정 튜플의 내용을 변경할 떄 사용한다.

```sql
UPDATE table_name
SET 속성명 = 데이터,속성명=데이터...
[WHERE 조건];

// 사원 테이블에서 "강라탱"의 주소를 도곡동 으로 수정하시오
UPDATE 사원
SET 주소 = '도곡동'
WHERE 이름 = '강라탱'
```

### 4. SELECT - 기본 검색

데이터의 내용을 조회할 때 사용하는 명령어. 가장 많이 사용되는 명령어이다.

- 기본검색

  ```sql
  SELECT [OPTION] 속성들 FROM table
  [WHERE]
  [ORDER BY 속성명 [ASC | DEC]
  ```

  - OPTION
    - ALL : 모든 튜플을 검색할 때 지정 (주로 생략)
    - DISTINCT : 중복된 튜플이 있으면 그 중 첫 번째 한 개만 검색
    - DISTINCTROW : 중복된 튜플을 제거하고 한 개만 검색하지만 선택된 속성의 값이 아닌 튜플 전체를 대상으로 한다.
  - 속성들
    - 기본 테이블의 모든 속성을 지정할 때에는 \* (와일트카드) 사용
    - 두 개 이상의 테이블을 대상으로 하는 경우 테이블명.속성명 , 테이블명.속성명 으로 표기한다.
  - ORDER BY : 특정 속성을 기준으로 정렬하여 검색할 때 사용한다.
    - 속성명 : 정렬의 기준
    - ASC , DES : 오름차순, 내림차순
      기본 검색에 대한 몇 가지 예제를 보면 아래와 같다.

  ```sql
  // 사원 테이블의 모든 튜츨 검색 (여러 방법으로 검색 가능)
  SELECT * FROM 사원;
  SELECT 사원.* FROM 사원;
  SELECT 이름,부서,생일,주소,기본급 FROM 사원;

  // 사원 테이블에서 주소만 검색하되 같은 주소는 한 번만 출력
  SELECT DISTINCT 주소 FROM 사원

  // 사원 테이블에서 기본급에 특별수당을 10을 더한 월급을 IT 부서의 강라탱의 월급 XXX의 형태로 출력
  SELECT 부서 + '부서의' AS 부서2, 이름 + '의 월급' AS 이름2, 기본급+10 AS 기본급2
  FROM 사원
  ```

- 조건 지정 검색 WHERE
  SQL에서도 연산자, 조건 연산자를 사용하여 질의를 할 수 있다.

  - 비교연산자 : =, <> (같지 않다) > < ≥ ≤
  - 논리 연산자 : AND NOT OR
  - LIKE 연산자 : 아래의 대표 문자를 이용하여 문자열에서 특정 값과 비슷한 값들을 필터할 때 사용한다.
    - % : 모든 문자를 대표한다 , \_ 문자 하나를 대표한다 , # 숫자 하나를 대표한다.
  - 연산자 우선순위 산술연산자 > 관계 연산자 > 논리 연산자
    WHERE는 필터 역할을 하는 쿼리문이다. 조건을 지정하여 조건에 만족하는 튜플만 검색한다.

  ```sql
  // 사원 테이블에서 기획 부의 모든 튜플을 검색한다
  SELECT * FROM 사원
  WHERE 부서='기획';

  // 사원 테이블에서 "기획" 부서에서 근무하면서 "대흥동"에 사는 사람의 튜플을 검색
  SELECT * FROM 사원
  WHERE 부서="기획" AND 주소="대흥동";

  // 사원의 테이블에서 성이 '김'인 사람의 튜플을 검색
  SELECT * FROM 사원
  WHERE 이름 LIKE "김%";

  // 사원 테이블에서 '생일'이 01/01/69에서 12/31/73 사이인 튜플을 검색
  SELECT * FROM 사원
  WHERE '생일' BETWEEN #01/01/69# AND #12/31/73#;

  // 사원 테이블에서 주소가 NULL인 튜플 검색
  SELECt * FROM 사원
  WHERE 주소 IS NULL;  // NULL이 아닌 값을 검색할 때에는 IS NOT NULL
  ```

- 정렬 검색 ORDER BY
  ODERBY는 동려받는 데이터 결과를 어떤 기준으로 정렬하여 출력할지 결정한다.

  ```sql
  // 사원 테이블에서 '주소'를 기준으로 내림차순 정렬시켜 상위 2개의 튜플만 검색
  SELECT TOP 2* FROM 사원
  ORDER BY DESC;

  // 사원 테이블에서 '부서'를 기준으로 오름차순으로 정렬하고, 같은 '부서'에 대해서는 '이름'을 기준으로 정렬하여 검색
  SELECT * FROM 사원
  ORDER BY 부서 ASC, 이름 DESC;
  ```

- 데이터 개수 지정 LIMT
  결과로 출력할 데이터의 개수를 정한다. 쿼리문에서 사용할 때에는 가장 마지막에 추가한다.
  ```sql
  SELECT * FROM 사원
  LIMIT 100;
  ```
- 하위 질의

  하위 질의란, 조건절에서 주어진 질의를 먼저 수행하여 그 결과를 조건절의 피연산자로 사용한다.

  ```sql
  // 취미가 '코딩'인 사원의 이름과 주소를 검색한다.
  SELECT 이름,주소 FROM 사원
  WHERE 이름=(SELECT 이름 FROM 여가활동 WHERE 취미='코딩');
  // 이름이 '강라탱'일 떄 위의 질의문은 아래와 같이 쓸 수 있다.

  SELECT 이름,주소 FROM 사원
  WHERE 이름='강라탱';

  // 취미활동을 하지 않는 사람들을 검색
  SELECT * FROM 사원
  WHERE 이름 NOT IN (SELECT 이름 FROM 여가활동);
  ```

  - NOT IN은 포함되지 않은 데이터를 의미한다.

- 여러 테이블 검색
  여러 테이블을 대상으로한 검색도 가능하다.
  ```sql
  // 경력이 10년 이상인 사원의 이름,부서,취미,경력을 검새
  SELECT 사원.이름,사원.부서,여가활동.취미,여가뢍동.경력
  FROM 사원,여가활동
  WHERE 여가활동.경력>=10 AND 사원.이름 = 여가활동.이름
  ```

### 5. SELECT 2

WINDOW 함수 이용, 그룹 지정, 집합 연산자를 이용한 질의에 대해 학습한다.

- WINDOW 함수 = Group

  - DB를 사용한 분석처리 용도로 사용하기 위한 기능이다.
  - GROUP BY절을 이용하지 않고 함수의 인수로 지정한 속성을 범위로 하여 속성의 값을 집계한다.
  - 함수의 인수로 지정한 속성이 레코드의 범위가 되는데, 이를 윈도우라고 부른다.
  - 윈도우 함수의 종류
    - ROW_NUMBER() : 윈도우별로 각 레코드에 대한 일련 번호를 반환한다.
    - RANK() : 윈도우별로 순위를 반환하며 공동 순위를 반영한다.
    - DENSE_RANK() : 윈도우별로 순위를 반환한다. 공동순위를 무시하고 순위를 부여함
  - WINDOW 함수의 구문은 아래와 같다.

  ```sql
  SELECT WINDOW_FUNCTION [ARGUMENTS] OVER
  	(PARTITION BY 속성명1,속성명2....
  	 ORDER BY 속성명3,속성명4,,) [AS 별칠]
  FROM table_name;
  ```

  - PARTITON BY : 선택사항으로, WINDOW 함수가 적용될 범위로 사용할 속성을 지정한다.
    PARTITION BY를 통해 구분된 레코드 집합을 윈도우라고 한다. 쓰지 않으면 table의 내용이 다 들어간다.
  - ORDER BY : PARTITION 안에서의 정렬 기준을 정한다.
    | 부서 | 이름 | 상여내역 | 상여금 |
    | ------ | ------ | -------- | ------ |
    | 기획 | 영순이 | 연장근무 | 100 |
    | 인터넷 | 영심이 | 특별근무 | 200 |

  ```sql
  // 상여금 테이블에서 '상여내역'별로 '상여금'에 대한 일련 번호를 구하라.(순서는 내림차순, 송성명은 'NO')
  SELECT 상여내역, 상여금 ,ROW_NUMBER() OVER
  	(PARTITION BY '상여내역' ORDER BY '상여금' DESC) AS NO
  FROM 상여금;
  ```

  결과는 아래와 같다
  | 상여내역 | 상여금 | NO |
  | -------- | ------ | --- |
  | 특별근무 | 200 | 1 |
  | 야간근무 | 100 | 2 |

  ```sql
  //상여금 테이블에서 '상여내역'별로 '상여금'에 대한 순위를 구하시오.
  // 순서는 내림차순이며, 속성명은'상여금순위'로 하고 RANK 사용
  SELECT 상여내역,상여금,RANK() OVER (PARTITION BY '상여금' ORDER BY '상여금' DESC)
  AS '상여금순위'
  FROM 상여금;

  ```

  - 윈도우 함수 종류
    - 집계함수 : COUNT(), SUM(), MAX(), MIN(), AVG(), STDDEV(), VARIAN()
    - 순위함수
      - RANK() : 레코드 순위, 동일순위 존재시 후순위는 넘어간다
      - DENSE_RANK() : 레코드 순위, 동일순위 존재시 후순위는 넘어가지 않음
      - ROW_NUMBER() : 레코드 순위, 동일 순위 값이 존재해도 무관하게 일련번로 부여.

- 그룹합수

  - 검색된 여러 행을 이용하여 통계정보를 도출하는 함수
  - GROUP BY 절에 지정한 속성을 기준으로 그룹화하여 검색
  - 그룹함수의 종류
    | 그룹함수 | 기능 | 입력에 따른 출력 |
    | ----------------------------------------------------- | --------------------------------------- | ------------------------------------- |
    | COUNT(입력) | 그룹별 튜플 수 (행의 줄 ROW) | - \*이나 상수 : NULL이 포함된 행의 수 |
    | - 속성명 적용 시 : 입력값 내의 NULL이 아닌 ROW수 산출 |
    | SUM(입력) | 그룹별 합계를 구하는 함수 |
    | 복수 행의 해당 속성간의 합계 | - 상수 : 해당 ROW 수 x 상수의 값 SUM(2) |

    - 상수가 1인 경우 ROW COUNT를 얻음
    - 커럼 : 해당 입력값 내의 NULL이 아닌 값의 합계 |
      | AVG(입력) | 복수 행의 해당 컬럼 간의 평균 | 해당 입력값 내의 NULL이 아닌 값의 평균 |
      | MAX(입력),MIN(입력) | 복수 행의 해당 컬럼 중 최대,최솟값 | 문자열,날짜 데이터 형식에도 적용이 가능. |
      | STDDEV(입력) | 복수 행의 해당 컬럼 간의 표준편차 | |
      | VARIAN(입력) | 복수 행의 해당 컬럼 간의 분산 | |

    ```sql
    // 상여금 테이블에서 '부서'별 '상여금'의 평균을 구하시오
    SELECT 부서,AVG(상여금) AS 평균
    FROM 상여금;
    GROUP BY 부서; // 부서 별

    // 상여금 테이블에서 상여금이 100 이상인 사원 2명 이상인 '부서'의 튜플 수를 구하시오
    SELECT 부서,COUNT(*) AS 사원수
    FROM 상여금
    WHERE 상여금>=100
    GROUP BY 부서
    HAVING COUNT(*)>=2;

    // 상여금 테이블의 '부서', '상여내역', '상여금'에 대해 부서별 상여내역별 소계와 전체 합계를 검색
    // 속성명은 '상여금합계'로 하고 CUBE함수 사용.

    SELECT 부서,상여내역,SUM(상여금) AS 상여금합계
    FROM 상여금
    GROUP BY CUBE(부서,상여내역);

    ```

    - HAVING 구문은 GBOUP BY와 함께 사용되며 그룹에 대한 조건을 지정하는 구문이다.
      - HAVING은 GROUP BY 절 뒤에 기술한다.
      - HAVING 절의 조건은 그룹 함수를 포함해야 한다.
    - CUBE 함수는 인수로 주어진 속성을 대상으로 결합 가능한 모든 집계를 표시한다.

- Group By 구문

  - 복수개의 제이터 분석 시 그룹핑 대상이 되는 부분을 선별할 필요가 있을 때 사용
  - NULL값을 가지는 ROW는 제외 후 산출
  - SELECT에서와 같이 ALIAS 사용 불가능
  - WHERE 구문 안에 포함되지 않는다.
  - WHERE 구문이 GROUP BY보다 먼저 실행되고, 대상이 되는 단일 행을 먼저 식별한다.

- 집합 연산자 이용

  - 집합연산자를 사용하여 2개 이상의 table의 데이터를 하나로 통합한다.
  - 표기형식은 아래와 같다

  ```sql
  SELECT 속성명,속성명..
  FROM 테이블이름
  UNION | UNION ALL | INTERSECT | EXCEPT
  SELECT 속성명,속성명명...
  FROM 테이블이름
  [ORDER BY 속성명[ASC|DESC]
  ```

  - 두 개의 SELECT 문의 속석드은 개수와 데이터 유형이 서로 돌일해야 한다.
  - 집합 연산자의 종류와 설명을 아래와 같다.

  | 집합 연산자            | 설명                                                                      | 집합 종류 |
  | ---------------------- | ------------------------------------------------------------------------- | --------- |
  | UNION                  | 두 개의 SELECT문의 조회 결과를 통합하여 모두 출력                         |
  | 중복 행은 한 번만 출력 | 합집합                                                                    |
  | UNION ALL              | 두 SELECT 문의 조회 결과를 통합 출력                                      |
  | 중복행까지 다 출력     | 합집합                                                                    |
  | INTERSECT              | 두 SELECT문의 조회 결과 중 공통행만 출력                                  | 교집합    |
  | EXCEPT                 | 두 SELECT문의 조회 결과에서 두 번째 SELECT문의 조회 결과를 제외한 행 출력 | 차집합    |

  ```sql
  // 사원 테이블과 직원 테이블을 통합하는 질의문 완성
  // 같은 레코드는 중복되지 않는다.
  SELECT * FROM 사원
  UNION
  SELECT * FROM 직원;
  ```

### Select의 실행 순서

select는 다음과 같은 순서로 실행이 된다.

- FROM
- WHERE
- GROUP BY
- HAVING
- SELECT
- ORDER BY

```sql
SELECT CustomerId, AVG(Total)
FROM invoices
WHERE CustomerId >= 10
GROUP BY CustomerId
HAVING SUM(Total) >= 30
ORDER BY 2
```

위의 쿼리문은

1. FROM invoices 테이블에 접근한다.
2. WHERE CustomerId ≥10 : CustomerId 필드가 10이상인 레코드들만 조회한다.
3. GROPU BY CustomerId : CustomerId로 그룹화한다.
4. HAVING SUM(Total)≥30 : 그룹화한 데이터에서 Total 필드의 총 합이30이상인 결과들만 필터링한다.
5. SELECT CustomerId, AVG(Total) : 위의 조회된 결과에서 CustomerId 필드와 Total 필드의 평균값을 구한다.
6. ORDER BY 2 : AVG(Tota) 필드를 기준으로 오름차순 정렬한 결과를 리턴한다.
