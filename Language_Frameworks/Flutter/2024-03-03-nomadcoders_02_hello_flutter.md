# 개요

- 노마드코더에서 무료로 제공해주는 Flutter로 웹툰 만들기 클린코딩 강의를 통해 정리한 자료II

# 정리

1. Installation
   [Flutter 공식 사이트 참고](https://docs.flutter.dev/get-started/install/macos/mobile-ios?tab=vscode)

   - sdk를 설치해야하는데 공식문서에 있는 방법보다는 brew를 사용하는 것이 빠르고 편하다

     - [brew 문서](https://formulae.brew.sh/cask/flutter)

     ```shell
     brew install --cask flutter
     ```

2. Widget

- Flutter 관점에서의 widget
  - Flutter에서 말하는 Widget이란 UI(User Interface)를 구성하는 기본 단위를 뜻함
  - 레고 블럭을 조립한다고 생각하면 된다. widget들을 합치는 방식으로 앱을 만드다
  - [Widget catalog](https://docs.flutter.dev/ui/widgets) flutter 공식사이트를 보면 공식 widget들도 많다
  - **만약 뭔가를 만들고싶은데 생각이 안나는 경우 요기서 대부분 찾을 수 있다!!**
- programming 관점에서의 widget
  - widget을 만든다는 것은 class를 만드는 것임

2. Hello Flutter main

```dart
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class Player {
  String? name;
  Player({required this.name}); // named parameter
}

void main() {
  var sora = new Player(name: 'sora');
  runApp(App());
}

// sdk에 있는 3개의 widget중 하나를 상속 받아야 widget이 된다.
// 3개의 widget은 StatelessWidget, StatefulWidget, InheritedWidget 이 있다
// StatelessWidget은 상태가 없는 위젯이다.
// 상태란 사용자의 입력, 네트워크에서 받은 데이터, 화면이 변경되는 등의 변화를 말한다.
// 화면에 뭔가를 띄위줘는 것 말고는 하는 것이 없다.
class App extends StatelessWidget {
  // build 메소드는 위젯을 반환한다.(widget의 ui를 만든다)

  @override
  Widget build(BuildContext context) {
    // MaterialApp은 Material Design을 구현한 앱을 만들때 사용하는 위젯이다.(구글의 디자인 시스템)
    // CupertinoApp은 iOS 디자인을 구현한 앱을 만들때 사용하는 위젯이다.(애플의 디자인 시스템)
    // customized앱을 만들고 싶지만 root 를 만들어줘야하기 때문에 둘 중 하나를 선택해야하고
    // MaterialApp은 구글이 만들었기 때문에 flutter에서 더 ios 스타일보다 훨씬 더 보기 좋음
    // 여기에서 구글 스타일을 빼도록 할 수도 있고 별로 오래 걸리지도 않음
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Hello, Flutter!'),
          backgroundColor: Colors.purple,
        ),
        body: Center(
          child: Text('Hello, World!'),
        ),
      ),
    );
    // scaffold는 앱의 기본 구조를 만들어주는 위젯이다.
    // navigation bar를 구현할 수 있고, drawer를 구현할 수 있고, bottom bar를 구현할 수 있다.
  }
}

```
