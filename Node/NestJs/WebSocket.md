# 개요

- nestjs에서 websocket을 사용하는 방법을 공식문서를 보고 정리하였다.
- 공식문서 링크는 여기 참고 https://docs.nestjs.com/websockets/gateways

# 정리

- NestJs는 구현부를 추상화하여 http, websocket, microservice를 사용할 수 있도록 지원한다.
- NestJs에서 gateway는 단순히 class에 @webSocketGateway() 데코레이터를 붙이면 된다.
  - gateway란 websocket 통신을 처리하는 클래스이다.
- gateway는 기술적으로 플랫폼에 구애받지 않기 때문에 어댑터를 생성하면 어떤 WebSockets 라이브러리와도 호환될 수 있다.
- NestJs 에서 기본적으로 제공되는 WebSocket platform은 socket.iod와 ws이다.
  - socket.io : 많이 사용되는 라이브러리로 다양한 기능을 제공한다.
  - ws : 가볍고 빠른 라이브러리이다.
- 물론 커스텀 어댑터를 만들 수도 있다. 이 [가이드](https://docs.nestjs.com/websockets/adapter)를 확인해보자
-
