# 개요

- 노마드코더에서 무료로 제공해주는 Flutter로 웹툰 만들기 클린코딩 강의를 통해 정리한 자료

# 정리

1. Flutter에 대하여
   - Flutter는 안드로이드, 웹, 맥os, 윈도우, 리눅스 심지어 임베디드에서도 실행이 가능하게 한다
   - 이미 많은 곳에서 사용중. 구글은 구글페이를 flutter로 리뉴얼함
   - 1.1 million lines of code instead of 1.7 million -> 기존의 코드보다 35%나 줄였다고함
   - js,css 등 없이 flutter 프레임워크와 dart 언어만으로 가능 -> 가능한 이유가 뭐지?왜지?-> 이유는 아래의 flutter의 동작방식에 대해 읽어보자
2. Flutter works

   - [Flutter architectural overview](https://docs.flutter.dev/resources/architectural-overview)
   - OS직접 소통하는 크로스플랫폼과는 달리 flutter는 게임 엔진처럼 동작한다.
   - flutter는 engine이 모든 ui를 그려주는 방식이다 -> os에 대한 제약이 없다 (이런 부분 때문에 flutter로 많은 것을 통제할 수 있음)
   - flutter는 네이티브 위젯을 사용하지 않음 (이 부분은 flutter를 사용하는 것에 대해서 약간 문제가 되기도 함 단점임)

3. Flutter vs React Native
   - React Native는 Native app에서 제공하는 widget이나 compoment를 사용해야하는 경우 사용하기 적절하다.
     - React Native에서는 자바스크립트를 통해서 os와 커뮤니케이션을 한다.
     - Flutter에서는 이런 컴포넌트나 위젯을 사용할 수 없으므로 비슷하게 만들어야함
   - 아주 세밀한 요구사항이 들어가야한다면 Flutter를 사용하는 것을 고려해볼 수 있다.(커스터마이징된 디자인이 가능)
   - **_커스텀디자인_** 을 반영하고싶다면 Flutter는 좋은 선택이다.
