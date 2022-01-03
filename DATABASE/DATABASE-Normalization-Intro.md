# DATABASE-Normalization-Intro

Category: Computer Science
Chapter: Database
강의: Self Study
블로깅: No
유형: LESSON
작성일시: 2022년 1월 3일 오후 6:42

## DATABASE-Normalization Intro

- 정규화란 데이터의 중복(redundancy)을 최소화하고 일관성 등을 보장하여 데이터베이스의 품질을 보장하고 성능을 향상시키기 위해 사용한다.
- 정규화는 큰 Table을 작은 table로 쪼개어 서로의 관계를 연결하는 과정이라고 할 수 있다.
- SQL에서 정규화의 목적은 1. 데이터 구조의 안정성과 무결성을 유지하고 2. 중복을 배제하여 이상(anomaly)의 발생을 방지 및 저장 공강의 최소화 3. 데이터 삽입 시 릴레이션을 재구성할 필요성을 줄인다.
- 정규화의 목적

  - Data Redundancy (데이터 중복) 제거
    - Redundancy는 실제 데이터의 동일한 복사 또는 부분적인 복사를 의미한다.
    - 중복된 데이터는 일관적인 자료 처리가 어렵고 저장공한을 낭비하며 데이터 효율성을 감소시킨다
    - 중복성은 insertion , deletion, update anormalize(이상)을 유발할 수 있다.
  - Data Integrity (데이터 무결성) 유지
    - data integrity는 데이터의 정확성을 보장하기 위해 부정확한 자료가 DB 내에 저장되는 것을 방지하기 위한 제약조건이다.
    - 즉, 저장된 데이터베이스에 잘못된 데이터가 없다는 것을 의미한다.
    - 무결성의 종류로는 1. 개체 무결성 2. 도메인 무결성 3. 참조 무결성 4. 사용자 정의 무결성 등이 있다.
      - 개체 무결성 : 기본 테이블의 기본키를 구성하는 어떤 속성도 NULL이나 중복값을 가질 수 없다.
      - 도메인 무결성 : 주어진 속성 값이 정의된 도메인에 속한 값이어야 한다
      - 참조무결성 : 외래키 값은 NULL이거나 참조 릴레이션의 기본키 값과 동일해야 한다. 즉, 릴레이션은 참조할 수 없는 외래키 값을 가질 수 없다.
      - 사용자 정의 무결성 : 속성 값들이 사용자가 정의한 제약조건에 만족해야 한다.
  - Anomaly (이상현상)
    [Data Anomalies](https://databasemanagement.fandom.com/wiki/Category:Data_Anomalies)

    - 기대한 데이터와 다른 이상현상을 가리킨다.
    - DB내에 데이터들이 불필요하게 중복되어 릴레이션 조작 시 이상현상이 발생할 수 있다.
    - 이상현상의 종류
      ![image](https://user-images.githubusercontent.com/70902065/147947218-ef86c21d-f75c-4c7f-bb01-d90dd35c620e.png)

      위의 Table에서 Student_Group은 Not null이다

      - 삽입 이상(Insertion Anomaly)
        삽입이상은 데이터를 삽입하기 위해 원하지 않은 불필요한 데이터를 함께 삽입해야 해는 현상이다. 위의 table을 예로 들어보자. 만약 새로운 직원이 들어왔지만 아직 Student_Grop이 배정되지 않았을 경우 임의로라도 Student_Grop을 널지 않는 이상 데이터를 삽입할 수 없는 경우를 말한다
      - 삭제 이상(Deletion Anomaly)
        삭제이상은 data의 삭제로 인해 의도와는 상관없이 원하지 않는 값들도 함께 삭제되는 연쇄가 일어나는 현상이다. 만약 위의 Table에서 Student_Grop의 Beta Apha Psi 가 해산되어서 Table에서 삭제된다면 “J. Longfellow” 와 Accounting Department은 더이상 존재하지 않게 된다. 즉, 실제로 연관되지 않은 데이터를 한 개의 테이블로 결합하면 생기는 문제이다.
      - 갱신 이상(Update Anomaly)
        갱신이상은 일부 튜플의 업데이트와 데이터 중복으로 인한 데이터 불일치이다. 예를 들어, 위의 테이블에서 Brunchs의 Department가 잘못되었다면 적어도 두 번의 update가 필요하다.
