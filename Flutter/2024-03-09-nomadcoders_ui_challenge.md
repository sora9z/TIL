# 개요

- 노마드코더에서 무료로 제공해주는 Flutter로 웹툰 만들기 클린코딩 강의를 통해 정리한 자료3

# 정리

1. layout 만들기

- Column : 서로를 위,아래로 놓고싶을 떄 사용

  - 정렬
    - mainAxisAlignment : 수직 방향(세로방향)
    - crossAxisAlignment : 수펴 방향(가로방향)

- Row : 두 개의 element를 서로를 양 옆으로 놓고시프때 사용

  - 정렬
    - mainAxisAlignment : 수펴 방향(가로방향)
    - crossAxisAlignment : 수직 방향(세로방향)

- SizedBox : 간격을 주기위해 사용. size가 있는 box를 만들어준다.
- Text에 style을 적용하는 방법
  ```dart
   Text(
    'Hey, Sora',
    style: TextStyle(
      color: Colors.white,
      fontSize: 28,
      fontWeight: FontWeight.w800),
      ),
  ```
- Padding : 위젯의 패딩을 조절할 수 있다.
- 만약 잘 모르겟으면 dev tool을 사용할 수 있다. widget tree도 보여주고 각 widget을 눌러보면 현재 적용되어있는 Layout explorer도 볼 수 있다. 또한 다른 옵션으로 선택했을 때 어떻게 되는지 미리보기도 가능하다.
- 우측 위에있는 가이드라인을 통해 어디에 위치하는지 알 수 있다.

- Container : child를 갖고잇는 단순한 box임. div같은 것

  - clipBehavior : overflow를 어떻게 처리할지 결정할 수 있다.

- constant는 컴파일 타임에 결정되는 값이다. final은 런타임에 결정되는 값이다.
  - 따라서 constant 변수는 최적화에 도움이 된다.
  - setting.json 에 아래와 같이 추가해주면 const를 자동으로 붙여준다.
    ```json
     "editor.codeActionsOnSave": {
    "source.fixAll": true
    },
    ```
- 또한 아래와 같이 추가해주면 부모가 무엇인지 알 수 있도록 가이드라인이 생긴다.

  ```json
  "dart.previewFlutterUiGuides": true,
  ```

  dartfmt를 사용할 때 80자로 자동으로 줄바꿈을 해준다.

- About Code Action

  - 단축키는 `cmd + .` 이다.
  - Widget을 다른 Widget으로 감싸고 싶은 경우 Code Action을 통해 쉽게 할 수 있다.
    - ex Wrap Padding with Container 등등의 작업을 할 수 있음.
  - 특히 extract widget을 통해 쉽게 재사용 가능한 widget을 만들 수 있다. (하지만 공부할 때에는 직접 구현하는 것이 좋다.)

- Icon
  - Icon(Icons.) 를 통해 별도로 받지 않아도 아이콘을 사용할 수 있다.
- Transform 은 transformation을 전달해준다.
  - 부모에 어떠한 영향도 끼치지 않은 채 변형을 할 수 있다.
  - ex) rotation, scale, translate 등등
  - scale은 크기를 조절하는 것이다.
  - translate는 위치를 조절하는 것이다.
    ```dart
    Transform.translate(
      offset: const Offset(5, 10),
      child: const Icon(
      Icons.euro_rounded,
      color: Colors.white,
      size: 88,
      ),
    ```
  - 화명이 over flow 될 때 스크롤을 할 수 있도록 만들기 : SingleChildScrollView 사용
