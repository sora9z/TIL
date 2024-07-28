# DATABASE-NOSQL-MongoDB-lesson정리-Basic

Category: DATABASE
Chapter: Database
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2022년 1월 16일 오후 2:47

## DB-NOSQL-MONGODB Basic

— lesson 정리

### Achievement Goals

- NoSQL의 장점,특징
- MonogoDB의 Document , Collection 이해
    - JSON & BSON 차이점 이해, Document import, export
- MongoDB의 Atlas 이해
    - Cluster , Replice set 이해
    - Atlas를 GUI와 shell쿼리문으로 사용할 수 있다.

### Intro

- 학습목표 : Data가 구성되는 방법, DB에 쿼리를 사용하고 저장하는 방법, 인덱싱, 고급 개념 학습

- NoSQL이란? 관계형 테이블의 방법을 사용하지 않는 데이터 저장소
    
    MongoDB 는 NoSQL document DB이다.
    
- NoSQL이 쓰이는 경우
    - 비구조정인 대용량의 데이터를 저장
        - 관계형보다 자유로운 형태로 데이터를 저장 할 수 있다.
        - 정형화되지 않는 많은 양의 데이터가 필요한 경우 NoSQL이 효율적
    - 클라우드 컴퓨팅 맟 저장곤간을 최대한 활용하는 경우 용이
        - NoSQL DB는 클라우드 기반으로 쉽게 분리할 수 있도록 지원한다.
        - NoSQL은 수평적 확장을 하므로 서버를 계속 분산시켜 DB를 증설할 수 있다.
    - 빠른 서비스구축 및 잦은 데이터 구조 업데이트
        - 스키마를 미리 준비할 필요가 없기때문에 개발을 빠르게 해야하는 경우 매우 적합하다.
        - 빠른 프로토타입 출시  또는 SW 버전별 많은 다운타임(DB 서버를 Offline으로 전환하여 하는 작업)없이 DB구조를 자주 업데이트해야하는 경우 적합하다.(스키마를 수정할 필요가 없으므로)
    

### Atlas Cloud

- MongoDB에서는 Atlas로 클라우드에 DB를 설정한다.
- 아틀라스로 클러스터를 배포할 수 있다
- 클러스터는 그룹화된 서버에 데이터를 저장한다.
- 용어
    - 클러스터(Cluster)
        - instance들의 모임. 하나의 시스템처렁 동작한다.
        - 데이터를 저장하는 서버그룹으로 여러 대의 컴퓨터를 네트워크를 통해 연결하여 하나의 단일 컴퓨터처럼 동작하도록 제작한 컴퓨터이다.
    - Instance는 특정 SW를 실행하는 로컬 또는 클라우드의 단일 머신이다. 쿨라우드에서 실행되는  MongoDB의 데이터베이스이다.
    - 레플리카 세트(Raplica Set)
        - 각각의 Instance는 복제본을 갖고있고 이 모음을 replica set이라고 한다. 데이터를 저장하는 몇 개의 연결된 MongoDB 인스턴스의 모음이다.클러스터를 이용하여 베포할 경우 자동으로 Raplica Set을 생성한다.
        - Raplice ste은 데이터의 사본을 저장하는 인스턴스의 모음이다. 인스턴스 중 하나에 문제가 발생해도 데이터는 그래도 유지되며 나머지 레플리카 세트의 인스턴스에 저장된 데이터로 작업이 가능하다.
    
    Document 또는 Collection을 변경할 경우, 변경된 데이터의 중복 사본이 Raplica set에 저장된다.  이 설정으로 인해 raplica set의 instance중 하나에 문제가 발생되어도 데이터는 그대로 유지된다.  이 과정을 위해 Cluster(서버 그룹)을 배포하면 자동으로 Raplica set이 구성된다.
    

### MongoDB Dcoument

Document에는 데이터를 <field>:<value> 로 저장하고 구성한다.  이런 Document의 모음을 Collection이라고 한다.

```json
{
	<field> : <value>,
	"name" : "sorakang",
	"age" : 31
}
```

- 용어
    - Document : 필드 - 값 쌍으로 저장된 데이터
    - Field : 데이터의 고유 식별자
    - Value : 주어진 식벽자와 연결된 데이터
    - Collection :
        - MongoDB의 Document로 구성된 저장소이다.
        - Document간 공통 필드가 있다.
    

### JSON VS BSON

목표 : Document를 올바르게 작성하는 방법과 Document가 표현되는 방법을 학습한다.

shell을 이용할 떄 Document는 JSON형식으로 출력되며 다음의 조건을 만족해야한다.

- { } 중괄호로 도큐먼트가 시작하고 끝나야한다.
- 필드와 같이 :으로  분리되어야하며 쉼표로 필드-값 쌍을 구분한다.
- 문자열인 필드도 “”으로 감싸야한다.

JSON 형식을 읽기 쉽고 다루기 편리하지만 파싱이 느리고 메모리 사용이 비효율적이라는 단점이 있다.

또한 JSON은 기본 데이터타입만 지원하므로 사용할 수 있는 data type에 제한이 있다.

이를 해결하기 위해 [BSON](https://bsonspec.org/) (Binary JSON)을 사용한다.

- 이진법에 기반을 둔 표현 → JSON보다 메모리 사용이 효율적이며 빠르고 가볍다.
- BSON의 사용으로 더 많은 Data type을 사용할 수 있다.
- Mongo DB는 내부에서 BSON으로 데이터를 저장하고 사용한다.

### Imporint & Exporting

데이터형식(JSON, BSON)에 따라 import export가 다르다. MongoDB는 BSON형태로 저장이 되고 읽기 쉬운  JSON 형태로 출력이 된다.  

- BSON으로 import or export 하는 경우 :
    - 단순히 백업 저장을 하는 경우
    - import : mongorestore
        - mongorestore —uri “<Atlas Cluster URI>” —drop dump
        - drop 쿼리문은 선택적으로 사용이 가능(기존에 있는 데이터 삭제 옵션)
    - export : mongodump
        - mongodump —uri “<Atlas Cluster URI>”
        - url는 일반 웹 uri의 형식과 같고 username, password, cluster 주소로 이루어져있다.
- JSON으로 import or export 하는 경우 : 조회 또는 출력을 해야하는 경우
    - import : mongoimport
        - mongoimpoer —url “<Atlas cluster URI>” —drop=<filename>.json —collection <collection name>
        - collection name은 optional
        - 참고로, 데이터는 JSON일 수도 있고 지원되는 다른 데이터형식일 수고 있다.
    - export : mongoexport
        - mongoexport —uri “<Arlas Cluster URI>” —collecrion=<collection name> —out=<filename>.json
        - 데이터베이스의 컬렉션 이름, 파일 이름까지 정확하게 작성해줘야 한다.
        
    
    ### mongoDB 연결 방법
    
    mongosh "mongodb+srv://cluster0.4ence.mongodb.net/myFirstDatabase" --username sorakang