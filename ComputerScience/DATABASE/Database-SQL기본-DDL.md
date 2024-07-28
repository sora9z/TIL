# [Database] SQL 기본 - DDL

Category: Computer Science
Chapter: Database
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2021년 12월 26일 오후 11:58

## SQL이란

- SQL은 Structured Query Language의 약자로 국제 표준 데이터베이스 언어이다. 관계형 데이터베이스(RDB)를 지원하는 언어로 주로 사용된다.
- 관계 대수와 관계 해석을 기초로 한 혼합 데이터이다.
- 질의어(Query Language)의 기능 뿐 아니라 데이터 구조 정의, 데이터 조작, 데이터 제어 기능을 갖추고 있다.

## SQL 분류

SQL은 사용 용도에 따라 DDL(데이터 정의어), DML(데이터 조작어),DCL(데이터 제어어)로 구분된다.

### DDL (Data Difine Language) 데이터 정의어

- DDL은 데이터를 정의할 때 사용한다.
- Schema, Domain, Table, View, Index를 정의 , 변경, 삭제할 때 사용하는 언어이다.
- DDL은 번역한 결과가 Data Dictionary에 여러 개의 table로 저장된다.

| 명령어 | 기능 |
| --- | --- |
| CREATE | Schema, domain, table, index등 데이터를 정의한다  |
| ALTER | Table에 대한 “정의”를 변경하는데 사용된다. |
| DRPO | Schema, domain, table, index를 삭제한다(틀까지 삭제하는 것) |
- CREATE DATABASE : 데이터베이스 생성
    
    ```sql
    CREATE DATABASE database_name;
    ```
    
- USE : 디폴트로 사용할 데이터베이스 지정
    
    ```sql
    USE database_name;
    ```
    

USE를 사용하여 데이터베이스를 선택하면 CREATE를 할 수 있다. 

- CREATE SCHEMA : 스키마란, 데이터베이스의 구조와 제약 조건에 관한 전반적인 명세를 의미하며 데이터 개체, 속성, 관계 등에 관한 정의
    
    ```sql
    CREATE SCHEMA schema_name AUTORIZATION user_id;
    
    CREATE SCHEMA 대학교 AUTORIZATION 라탱 
    // 소유권자의 ID가 '라탱'인 스키마 '대학교'를 정의
    ```
    

- CREATE DOMAIN
    
    ```sql
    CREATE DOMAIN domain_name [AS] data_type
    			[DEFAULT 기본값]
    			[CONSTRAINT 제약조건명 CHECK (번위값)];
    
    // 성별을 "여자" 또는 "무성" 또는 "남자"  의 2개의 문자로 표현되는 도메인 SEX 정의
    CREATE DOMAIN SEX CHAR(2)
    	DEFAULT "여자"  // 기본값 여자 
    	CONSTRAINT VALID-SEX CHECK(VALUE IN ('여자','무성','남자')) // 성별은 여자 , 무성, 남자 중 하나의 값만 지정 가능
    ```
    
    - Domain이란,특정 속성세서 사용할 데이터의 범위를 의미한다. (a라는 속성의 domain은 1~4 이다)
    - SQL에서 [ ]를 생략 가능함을 의미.

- CREATE TABLE
    
    ```sql
    CREATE TABLE table_name
    	(속성명 data_type [DEFAULT 기본값][NOT NULL]
    	,[PRIMARY KEYU(기본키_속성명)]   
    	,[UNIQUE KEY(대체키_속성명)]
    	,[FOREIGN KRY(외래키_속성명)]
    			[REFERENCES 참조테이블(기본키_속성명,...)]
    			[ON DELETE 옵션]
    			[ON UIPDATA 옵션]
    	,[CONSTRAINT 제약조건명][CHECK (조건식)];
    
    ```
    
- Primary key : 기본키로 사용할 속성 또는 속성의 집합
- Unique key :  대체키로 사용 가능한 속성 또는 속성의 집합
- Foreign key ~ References ~
    - References: 참조할 다른 테이블과 참조할 때 사용할 왜래키 속성을 지정.
    - 왜래키가 지정되면 “참조 무결성 제약”인 “CASECADE 법칙이 적용됨. (어떤 데이터를 삭제할 때 밀접하게 연관된 다른 테이블도 삭제됨)
- ON DELETE / ON UPDATE : 참조 테이블의 튜플이 삭제 또는 변경 되었을 때 기본 테이블에서 취해야 할 사항 결정
    - NO ACTION
    - CASCADE
    - SET NULL
    - SER DEFAULT
- CONSTRAINT : 제약조건. 제약조건명이 없다면 CHECK 절만 사용하여 속성 값에 대한 조건을 명시
- CHECK : 속성 값에 대한 제약 조건을 정의
- 예시1  <학생> 테이블 정의  : 이름, 학번, 전공, 성별, 생년월일로 구성된 <학색> 테이블을 정의하는 SQL 구문
    
    
    | 필드이름 | 타입 |  |
    | --- | --- | --- |
    | 이름 | NULL X , 최대 5문자  |  |
    | 학번 | 기본키 , 최대 10문자 |  |
    | 전공 | 학과 tabe의 학과코드를 참조하는 외래키로 사용됨
    <학과> 테이블에서 삭제가 발생되면 전공값 NULL
    <학과> 에서 학과코드가 변경되면 전공값도 변경
    최대 15문자 |  |
    | 성별 | 도메인 SEX 사용 |  |
    | 생년월일 | 1980-01-01 이후의 데이터만 저장,
    제약조건명 : 생년월일제약 |  |

```sql
CREATE TABLE 학생
	이름 varchar(5) NOT NULL,
	학번 varchar(10),
	전공 varchar(15),
	성별 SEX,
	생년월일 DATE,
	PRIMARY KEY(학번),
	FOREIGN KEY(전공) REFERENCES 학과(학과코드)
		ON DELETE SET NULL
		ON UPDATE CASECADE,
	CONSTRAINT 생년월일제약
		CHECK((생년월일)>='1980-01-01'));

```

- 예시 2 — mysQL에서 사용
    - id  : 숫자 , Primary key , 자동 증가하도록 설정
    - name : 최대 255개의 문자열
    - email : 최대 255개의 문자열
    
    ```sql
    CREATE TABLE user(
    	id int PRIMARY KEY AUTO_INCREMENT,
    	name varchar(255),
    	emain varchar(255)
    );
    ```
    

- DESCRIBE tagle_name  명령어를 사용하면 테이블의 정보를 확인할 수 있다.

- CREATE VIEW
    
    ```sql
    CREATE VIEW 뷰명[(속성명,..)]
    AS SELECT 문
    ```
    
    SELECT문의 결과로 뷰를 생성한다. 참고로 view란 하나 이상의 기본테이블로부터 생성되는 가상테이블이다. 물리적으로 저장되는 것이 아니라 view의 정의가 저장되었다가 뷰 이릅을 사용하여 실행하면 뷰의 정의가 대체되어 수행된다.
    
    - 예시
    
    ```sql
    // <고객> 테이블에서 '주소'가 '안산시'인 고객들의 '성명'과 '전화번호'를 '안산고객'이라는 이름으로 뷰 생성
    CREATE VIEW 안산고객(성명,전화번호)
    AS SELECT 고객
    WHERE 주소='안산시';
    
    ```
    

- CREATE INDEX
    
    ```sql
    CREATE [UNIQUE] INDEX index_name
    ON table_name(속성명[ACS | DES],속성명[ACS | DES]..)
    [CLUSTER];
    ```
    
    - UNIQUE : 사용되면 중복 값이 없는 속성으로 index생성, 아닌 경우 중복값 허용
    - ACS , DES 오름, 내림차순 정렬
    - CLUSTER : 키의 순서에 따라 데이터가 정렬되는 방식이다. 삽입,삭제 시 순서 유지 위해 데이터를 다시 정렬해야 한다.

- ALTER TABLE
    
    TABLE에 대한 정의를 변경하는 명령문
    
    ```sql
    ALTER TABLE table_name ADD 속성명 데이터_타입 [DEFAULT '기본값']
    ALTER TABLE table_name ALTER 속성명 데이터_타입 [SET DEFAULT '기본값']
    ALTER TABLE DROP COLUMN 속성명 [CASCADE]
    ```
    
    - ADD는 새로운 속성을 추가할 때 사용
    - ALTER 는 특정 송성의 default 값을 변경할 때 사용
    - DROP COLUMN : 특정 속성을 삭제할 때 사용
        
        ```sql
        // <학생> 테이블에 퇴대 문자 3개로 이루어진 '학년'속성 추가
        ALTER TABLE 학생 ADD 학년 varchar3)
        
        // <학생> 테이블의 학번 필드이 데이터 타입과 크기를 varchar(10)으로 하고 NULL이 입력되지 않도록 
        ALTER TABLE 학생 ALTER 학변 VARCHER(10) NOT NULL;
        ```
        

- DROP
    
    ```sql
    DROP TABLE 테이블명 [CASCADE RESTRICTED]
    ```
    
    - cascade : 주가 되는 테이블 제거 시 외래키와의 관계를 맺고있는 모든 데이터를 제거. 참조무결성 제약조건을 설정하기위해 사용.
    - restricted :다른 개체가 제거할 요소를 참조중인 경우 제거를 취소.