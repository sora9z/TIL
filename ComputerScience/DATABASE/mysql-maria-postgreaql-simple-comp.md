# MySQL, MariaDB, Postgresql은 무슨 차이가 있을까

- 최근에 받은 질문 중 postgresql, mysql의 차이가 무엇같냐는 질문을 받은 적이 있다. 내가 했던 대답은 Postgresql의 경우 PostGIs, pg_trgam등 지원하는 extention이 많다는 것. 그래서 지원하는 기능이 많다는 것 이라고 했다. 또 원래는 Postgresql이 MVCC 기반이라고 알고있었는데, 최근에 Mysql도 MVCC를 지원한다는 것을 알게되었다고 하였다. 생각해보니 이 둘을 사용하면서 근본적인 차이점을 생각해본적이 없었다. 그래서 이번 기회에 간단하게 정리를 해보자고 한다

- 공식문서
  - mysql https://dev.mysql.com/doc/refman/8.4/en/innodb-introduction.html?utm_source=chatgpt.com
  - postgresql https://www.postgresql.org/docs/8.1/mvcc.html?utm_source=chatgpt.com

### 기본 특성

- 트랜잭션/ 격리수준
  - Postgresql, Mysql 모두 ACID와 Transaction을 지원
  - MySQL(InnoDB)는 4가지 격리수준(기본값은 REPEATERBLE READ)과 크래시 리커버리 제공
  - Postgresql도 MVCC기반으로 읽기,쓰기 경쟁을 최소화하고 동시성 제어를 제공한다.

### 지원 데이터 형식

- Postgresql : JSON , BJSON 제공, jsonpath, 광범위한 함수, 연산자, GIN 인젝싱 등으로 고성능 조회 가능
- MySQL : 네이티브 JSON 타입과 풍부한 JSON함수 제공, 단일 기반 타입 https://dev.mysql.com/doc/refman/8.4/en/json.html?utm_source=chatgpt.com

### 인ㄷ게스

- Postgresql : B-tree, GIST, GIN, BRIN, SP-GIST, HASH등 다양한 인덱스 타입을 제공하여 다양한 질의가 가능하고 최적화도 가능하다 https://www.postgresql.org/docs/current/indexes-types.html?utm_source=chatgpt.com
- MySQL : 일반적으로 B-tree중심(InnoDB), Postgresql대비 인덱스 다양성은 제한적임(https://dev.mysql.com/doc/refman/8.4/en/indexes.html)

### FTS(Full Text Search)

- Postgresql : tsvector/tsquery 타입, 사전/파서 까지 갖춤. 내장 FTS 프레임워크를 제공함. pg_tgram등 익스텐션 사용해서 토크나이징도 한다 https://www.postgresql.org/docs/current/textsearch-intro.html?utm_source=chatgpt.com
- MySQL : innoDB Full text search가능 PG처럼 강력?하지는 않은듯

### Data type, schema

- Postgresql : 배열, range(범위) 복합 타입 등 폭넓게 지원. JSONB+GIN 조합이 강력함 https://www.postgresql.org/docs/current/datatype-json.html?utm_source=chatgpt.com

- MySQL : 숫자,문자,시간,공간,JSON등
