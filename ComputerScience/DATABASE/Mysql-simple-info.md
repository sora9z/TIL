점심먹으면서 가볍게 강의를 듣다가 mysql관련 내용이 나왔고, 정리를 해두면 좋을 것 같아 가볍게 정리

## Mysql 기본

### storage engine 종류, 차이

- mysql 처리 과정
  - devaloper sql 실행
  - mysql 서버 connection / authentication 연결 및 인증
  - mysql server 진입
    - mysql engine
      - query cache - 8.x 부터 없어진 기능
      - query parsing
      - 전처리
      - 최적화
      - 실행
        - storage engine에 api호출
          - innoDB , MyISAM , memory 이 있음
        - Disk에 접근
- storage engine 종류
  - innoDB
    - 트랜잭션 지원(ACID)
    - row level locking
    - 외래키 지원
    - 성능 : 높은 동시성 처리 최적화
    - 충동 복구 : high
    - 저장공간 효율성 : low
    - 특징 : 동시성/ 데이터 무결성
  - MyISAM
    - 트랜잭션 지원 X
    - table level locking
    - 외래키 지원 X
    - 성능 : 읽기 최적화
    - 충동 복구 : low
    - 저장공간 효율성 : high
    - 특징 : 읽기 / 감색
