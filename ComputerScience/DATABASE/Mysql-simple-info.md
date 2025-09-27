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

### character set 과 collation

- character set
  - 문자들이 어떻게 저장이 되는지
  - utf-8
    - 가변 길이의 문자 인코딩 방식. 대부분 문자를 1Byye로, 복잡한 문자는 2-4Byte로 인코딩
    - 하지만 Mysqldml utf-8은 3Byte까지만 지원하여 일부 문자 저장 못한다고 함
    - 그래서 나온게 아래의 utf-8mb4
  - utf-8mb4
    - mysql에서 제공하는 utf-8인코딩
    - 유니코드의 4바이트 문자까지 지원함
    - 이모지, 동아시아 문자와 같은 모든 유니코드 문자를 완벽하게 지원한다
- collation
  - 문자들이 어떻게 비교,정렬 되는지
  - utf_general_ci : 대소문자 구분하지 않는 비교
  - utf_bin : 대소문자 구분하는 이진 비교
  - utf_unicode_ci : 유니코드 표준을 따르는 대소문자 구분 없는 비교
