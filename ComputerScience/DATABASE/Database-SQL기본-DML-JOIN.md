# Database-SQL기본-DML-JOIN

Category: Computer Science
Chapter: Database
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2021년 12월 27일 오후 4:06

## SQL - DML - JOIN

데이터 조작어 중 JOIN에 대해 알아본다.

JOIN은 두 개의 테이블에 대해 연관된 튜플들을 결합하여 하나의 새로운 릴레이션을 반환한다.

JOIN은 크게 INNER JOIN과 OUTER JOIN 두 가지로 구분된다.

![https://www.tutorialgateway.org/wp-content/uploads/SQL-JOINS-Example-0.png?ezimgfmt=rs:740x358/rscb181/ng:webp/ngcb181](https://www.tutorialgateway.org/wp-content/uploads/SQL-JOINS-Example-0.png?ezimgfmt=rs:740x358/rscb181/ng:webp/ngcb181)

### 1. 내부조인 (INNER JOIN)

두 테이블에 공통적으로 존재하는 컬럼을 이용하는 방식이다.

동등조인(EQUI JOIN) , 자연조인(NATURAL JOIN), 교차조인(CROSS JOIN)이 있다.

- QEUI JOIN
    - 공동 존재 컬럼의 값이 같은 경우를 추출한다.
    - “=” 비교를 통해 같은 값을 가지는 행을 연결하여 결과응 생성하는 JOIN 방법
    - 동일한 속성이 두 번 나타나면 (중복되면) 중복 속성은 제거하여 같은 속성을 한 번만 표기한다.
    
    ```sql
    SELECT *
    FROM table_name1
    JOIN tagle_name2 ON table1.속성명=table2.속성명;
    ```
    
- NAURAL JOIN :
    - 두 테이블의 모든 컬럼을 비교하여 같은 컬럼명을 가진 모든 컬럼 값이 같은 경우를 추출한다.
    - NATURAL JOIN은 조인할 속성을 지정하지 않기 때문에 조인하여는 두 테이블에 이름과 도메인이 같은 속성이 반드시 존재햐야 한다.
- CROSS JOIN : 조인 조건이 없는 모든 데이터의 조합을 추출한다.

```sql
// 학생 테이블과 학과 테이블에서 '학과코드'값이 같은 튜플을 JOIN하여 '학번' '이름' '학과코드' '학과명' 풀력
SELECT 학번,이름,학생.학과코드,학과명
FROM 학생
JOIN 학과 ON 학색.학과코드=학과.학과코드;

SELECT 학번,이름,학생.학돠코드,학과명
FROM 학생
JOIN 학과 USING(학과코드);

SELECT 학번,이름,학생.학돠코드,학과명
FROM 학생,학과
WHERE 학생.학과코드=학과.학생코드;
```

### 2. 외부조인 OUTER JOIN

OUTER JOIN은 릴레이션에서 JOIN 조건에 만족하지 않는 튜플도 결과로 출력하기 위한 JOIN 방법이다.

LEFT, RIGHT,FULL OUTER JOIN이 있다.

![https://www.tutorialgateway.org/wp-content/uploads/SQL-JOINS-Example-0.png?ezimgfmt=rs:740x358/rscb181/ng:webp/ngcb181](https://www.tutorialgateway.org/wp-content/uploads/SQL-JOINS-Example-0.png?ezimgfmt=rs:740x358/rscb181/ng:webp/ngcb181)

LEFT OUTER JOIN과 RIGHT OUTER JOIN은 죄특 또는 우측 릴레이션이 기준이 되어 죄측(또는 우측) 릴레이션의 튜플은 모두 표시하고 우측(또는 좌측) 릴레이션에는 관련이 있는 튜플만 표시한다.

- LEFT OUTER JOIN  (RIGHT은 이 반대)
    - INNER JOIN 결과를 구한 후, 우측 항 릴레이션의 어떤 투플과도 맞지 않는 좌측 항의 릴레이션에 NULL값을 붙여서 INNER JOIN 결과에 추가한 것.
    - 표기
        
        ```sql
        SELECT 테이블명1.속성명, 테이블명2.속성명..
        FROM 테이블명1 LEFT OUTER JOIN 테이블명2
        ON 테이블명1.속성명=테이블명2.속성명;
        
        SELECT 테이블명1.속성명, 테이블명2.속성명
        FROM 테이블명1,테이블명2
        WHERE 테이블명1.속성명=테이블명.속성명(+);
        ```
        
        - OUTER JOIN에서 (+)를 사용하면 INNER JOIN과 동일한 형식으로 사용할 수 있다.
        - LEFT인 경우 우측에 +
- FULL OUTER JOIN
    - LEFT OUTER와 RIGHT OUTER를 합쳐놓은 것이다.
    - INNER JOIN결과를 구한 후 좌측 항의 릴레이션의 튜플들에 대해 우측 항의 릴레이션에서 맞지 않는 튜플들에 NULL값을 붙여서 INNER JOIN 결과에 추가하고, 반대로 우측의 경우도 동일하게 추가한다.
    
    ```sql
    // 학생 테이블과 학과 테이블에서 '학과코드'값이 같은 튜플을 JOIN하여 '학번','이름','학과코드','학과명'
    // 을 툴력하는 SQL . '학과코드'가 입력되지 않은 학생도 출력
    SELECT 학번,이름,학생.학과코드,학과명
    FROM 학생 LEFT OUTER JOIN 학과
    ON 학생.학과코드=학과.학과코드;
    
    SELECT 학번,이름,학생.학과코드,학과명
    FROM 학생,학과
    WHERE 학생.학과코드=학과.학과코드(+);
    ```
    
    위의 경우 INNER JOIN을 하면 학과코드가 입력되지 않음 학생을 출력되지 않는다. 따럿 OUTER JOIN을 사용해야한다. 왼쪽의 학생 테이블은 모두 출력되는 LEFT OUTER JOIN 사용.
    
    ```sql
    // 학생 테이블과 학과 테이블에서 '학과코드'값이 같은 튜플을 JOIN하여'학번','이름','학과코드','학과명'
    // 을 출력하는 SQL작성. '학과코드'가 없는 학생이나 학생이 없는 학과코드도 모두 출력
    SELECT 학번,이름,학생.학과코드,학과명
    FROM 학생 FULL OUTER JOIN 학과
    ON 학생.학과코드=학과.학과코드
    ```
    

### 3. SELF JOIN

self join은 같은 테이블에서 2개의 속성을 연결하여 EQUI JOIN을 하는 방법.

### 4. 여러 쿼리문 한 번에 써보기

Brazil에서 온 고객을 도시별로 묶은 뒤에, 각 도시 수에 따라 내림차순 정렬합니다. 그리고 CustomerId에 따라 오름차순으로 정렬한 3개의 결과만 요청

table은 c

```sql
SELECT CustomerId,CustomerName,count(City) as 'City Count' // CustomerId, 고객 이름, City 수
From customers AS c
GROUP BY c.City // 도시별로 묶음 
ORDER BY c.City Count DESC, c.CistomerID ASC
LIMIT 3;
```