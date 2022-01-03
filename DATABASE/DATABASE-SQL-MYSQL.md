# DATABASE-SQL-MYSQL

Category: Computer Science
Chapter: Database
강의: Self Study
블로깅: No
유형: LESSON
작성일시: 2022년 1월 2일 오전 12:37

## DATABASE-SQL-MYSQL

mysql 관련 메모들

- Copy a MySQL database

 ‘ < ‘ 는 Import를 의미한다.  ‘ > ‘ export를 의미한다

[How To Copy a MySQL Database](https://www.mysqltutorial.org/mysql-copy-database/)

- Path/schma.sql 은 터미널의 현재 귀치에서 schma.sql의 위치까지 경로를 지정한다.
- 잘못된 SQL을 작성하여 잘못된 DB 및 테이블이 생성된 경우
    - 잘못 생성된 데이터베이스를 삭제하고 다시 생성한다.
    - DROP DATABASE IF EXISTS DB-NAME CREATE DATABASE DB-NAME
    
    ### CASE 사용하기
    
    SQL에서도 if문과 같은 기능을 사용할 수 있다. CASE를 사용하여 특정 조건에 따라 다른 결과를 받을 수 있다.  아래의 query문은 CustomerId 값에 따라 3개의 그룹으로 나뉜다. 
    
    ```sql
    SELECT CASE
    						WHEN CustomerId <=25 THEN 'GROUP 1'
    						WHEN CustomerId <=50 THEN 'GROPU 2'
    						ELSE 'GROUP 3'
    				END
    		FROM customers
    						
    ```
    
    ### SUBQUERY
    
    쿼리문을 작성할 떄 다른 쿼리문을 포함할 수 있다. 
    
    서브쿼리의 결과는 개별 값이다 레코드리스트이다. 또한 이 결과를 하나의 컬럼으로도 사용할 수 있다.
    
    ```sql
    
    SELECT CustomerId,CustomerId = (SELECT CustomerId FROM customers WHERE CustomerId = 2)
    FROM customers
    WHERE CustomerId < 6
    ```
    
    ### IN, NOT IN
    
    IN은 특정한 겂이 서브쿼리에 있는지 확인할 수 있다. 
    
    ```sql
    SELECT *
    FROM customers
    WHERE CustomerId IN (SELECT CustomerId FROM customers WHERE CustomerId < 10)
    ```
    
    위의 쿼리는 CustomerId의 값이 서브쿼리의 결과에 속한 값들만 조회한다.
    
    ### EXISTS
    
    EXIXT or NOT EXIST는 결과로 받는 서브쿼리에 존재하는 records를 확인한다.
    
    존재한다면 TRUE 존재하지 않는다면 FALSE를 return 한다.
    
    ```sql
    SELECT ElmployeeId
    FROM employees e
    WHERE EXISTS (
    			SELECT 1
    			FROM customers c
    	WHERE c.SupportRepId = e.EmployeeId
    	)
    ORDER BY EmployeeId
    ```
    
    위의 쿼리문은 employees 테이블로부터 EmployeeId 를 조회한다.
    
    서브쿼리는 customers 테이블의 SupportRepId 필드와 employees 테이블의 EmployeeId 필드를 비교하여 일치하는 records 들을 가져온다.