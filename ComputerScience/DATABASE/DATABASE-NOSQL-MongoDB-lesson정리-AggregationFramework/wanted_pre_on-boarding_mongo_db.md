# NoSQL 데이터베이스 실전 클래스

- 원티에서 진행하는 프리 온보딩 챌린지 - NoSQL 데이터베이스 실전 클래스를 듣고 정리한 자료이다

# MongoDB 제대로 알고 쓰기

- 첫 번째 수업은 제목 그대로 MongoDB를 사용하는 이유와 동작 원리, 실무에서 사용하는 방법들에 대한 수업이다. 핵심만 정리해보자

## 언제 MongoDB를 선택해야 하는가?

- 비즈니스 응집도가 높은 것, 논리적으로 하나의 단위로 취급 될 수 있는 것
- 데이터 생명주기 함께 생성,수정,삭제 되는 것
- 관계 크기 : 1:N 관계에서 N이 제한적인 것.
- 실시간 성능 : Join 복잡성보다 응답 속도가 중요할 때

- 스키마 변경이 잦은 초기 개발 단계, MVP, 프로토타이핑 만들 때
- 빠른 실험을 해야하고 비즈니스 모델이 계손 변화하는 시기에 적합하다.
  - RDBMS는 테이블 변경 시마다 ALTER TABLE해주어야 하고 서비스 중단 위험이 있다.
  - MongoDB의 경우 스키마리스이기 때문에 무중단으로 필드 추가,변경이 가능하다. -> 점진적으로 스키마 진화 가능하다.

## MongoDB 트레이드오프 VS RDBMS

- MongoDB
  - 무중단 스키마 변경
  - 애플리케이션 복잡성 증가
  - 데이터 일관성 관리 부담이 있다
- 언제 RDBMS가 적합할까?
  - 스키마 안정 단계에서 사용할 때 적합하다
  - 데이터들의 일관성 필요할 때
  - 복잡한 관계를 분석해야 할 때

## MongoDB는 RDBMS에 비해 수평 확장이 용이하다

- RDBMS는 강한 일관성을 요구한다. 분산 환경에서 ACID 보장이 복잡하다. 2PC(Two Phase Commit)등으로 복잡하다.
- 정규화된 데이터를 분산해야 하므로 참조 무결정 유지가 복잡하다.
- 애플리케이션에서 라우팅, 리벨런싱 등 직접 구현이 필요하다.
- 실제 예시

  ```
  전자상거래 주문 시스템
  --
  하나의 주문 조회에 여러 테이블 JOIN 필요
  -- 이 테이블들을 서로 다른 서버에 둘 수 없음
  SELECT o.*, u.name, p.name, p.price
  FROM orders o
  JOIN users u ON o.user_id = u.id
  JOIN order_items oi ON o.id = oi.order_id
  JOIN products p ON oi.product_id = p.id

  애플리케이션 샤딩 예시

  # 애플리케이션에서 직접 샤드 라우팅 구현
  def get_db_connection(user_id):
  shard_id = user_id % 4 # 4개 샤드로 분산
  if shard_id == 0:
  return connect_to_shard_0()
  elif shard_id == 1:
  return connect_to_shard_1()
  # ... 복잡한 라우팅 로직
  ```

- MongoDB는 관련 데이터가 하나의 Document로 모이고, Document 단위로 샤드 키 기반 분산이 가능하다.
- 내장 샤딩 : ConfigServier + Mongos + 자동 리밸런싱
  - ConfigServier : 설정 서버, 샤드목록, 샤드키 범위 정보, 청크 정보 등 클러스터에 메타데이터를 저장하는 두뇌 역할을 한다
  - Mongos : 쿼리 라우터 역할로, 클라이언트 요청을 적절한 샤드로 전달하고 결과를 합쳐러 클라이언트에 반환한다. 자체적으로 데이터는 저장하지 않는다.
  - 자동 리밸런싱 : 데이터 분산을 자동으로 조정하는 균형 조정 기능임

```
- 전체 동작 흐름
1. 클라이언트 → Mongos: "userId가 1500인 사용자 조회"

2. Mongos → ConfigServer: "userId 1500이 어느 샤드에 있나?"

3. ConfigServer → Mongos: "Shard2에 있어"

4. Mongos → Shard2: "userId 1500 조회해"

5. Shard2 → Mongos: "결과 데이터"

6. Mongos → 클라이언트: "최종 결과"

```

### MongoDB의 샤딩이 유리할 떄

- 사용자별 데이터 분리 : 각 사용자의 데이터가 독립적인 경우
- 시간 기반 데이터 : 로그, 이벤트 데이터처럼 시간순으로 분산 가능한 경우
- 지역별 데이터 : 지역 기반으로 샤딩할 수 있는 글로벌 서비스

## MongoDB VS Other database

### MongoDB vs ElasticSearch

- 주용도
  - MongoDB : 애플리케이션 DB
  - ElasticSracrh : 검색/분석 엔진
- CRUD 성능
  - MongoDB : 최적화됨
  - ElasticSearch : 제한적임
- 검색 기능
  - MongoDB : 기본 텍스트 검색
  - ElasticSearch : 고금 검색/분석
- 학습 곡선
  - MongoDB : 중간
  - ElasticSearch : 높음

### MongoDB vs DynamoDB

- dynamo db는 고정된 엑세스 패턴이 있다. : key/sort key 기반만 효율적이다
- Join 등의 복잡한 필터링이 어렵다
- GSI(Global Secondary Index) 추가 비용과 복잡성
- AWS 종속성
- 예시

  ```
  # 고정된 멕세스 패턴에 맞게 설계애햐 한다
  {
      "PK": "BOARD#tech", // Partition Key
      "SK": "POST#2024-01-15#123", // Sort Key
      "title": "MongoDB 가이드",
      "author": "김개발",
      "content": "...",
      "tags":
  }
  # 제한적인 쿼패턴

    1. 특정 게시판의 최신 글 조회 (OK)
    const params = {
        KeyConditionExpression: 'PK = :pk',
        ExpressionAttributeValues: {':pk': 'BOARD#tech'}
    };

    2. 작성자별 글 조회 (GSI 필요)
    3. 태그로 검색 (GSI 필요 + 복잡)
    4. 제목으로 검색 (거의 불가능) ["database", "mongodb"]

  ```

- Dynano DB는 단순하고 예측 가능한 엑세스패턴, 서버리스 아키텍처, 완전 관리형으로 운영 부담을 최소화하고 싶을 때 적합하다

## 실무 사럐로 보는 MongoDB

## 핵심 아키텍처 & 동작 원리

## 실전 구축과 운영 노하우
