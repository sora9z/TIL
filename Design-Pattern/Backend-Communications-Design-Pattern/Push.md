- Client에 응답을 빠르게 주고싶다면 Push는 백엔드에서 구현할 수 있는 유명한 패턴 중 하나이다.

- 실시간 notification 을 client에서 원할 때

- what is push?

  - 클라이언트는 서버에 연결하고 서버는 데이터를 클라이언트에게 보낸다.
  - Client는 어떤 요청도 보낼 필요 없다.
  - Protocol은 양방향이여야한다.
  - RabbitMQ 에서 사용된다.
    - RabbitMQ의 큐 시스템에 메시지를 제출하면 RabbitMQ의 큐를 소비하는 클라이언트들이 있다.
    - 결과가 Queue에 들어오는 순간 Client에 push될 수 있다

- Push Pros and Cons

  - Pros
    - real time
  - Cons
    - Client must be online
    - Clients must not be able to handle
      - kafka가 RabbitMQ처럼 push모델을 하지 않았던 이유
      - kafka는 polling 으로 동작한다.
    - Requires a bidirectional protocol
    - Polling is preferrne for light client
