# NODEJS비동기의\_이해와\_비동기 처리에 대하여

[참고 사이트](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/) [참고 사이트2](https://intrepidgeeks.com/tutorial/why-use-learn-js-asyncawait-feat-asynchronous-processing)

이번 주에 면접을 봤는데, 나왔던 질문 중 비동가와 관련된 질문이 있었다.

1.  서버에서 Promise가 무엇인지 알고 있는지
2.  Async Await은 어떻게 다른지
3.  Server에서 비동기가 언제 쓰이는지 알고 있는지

첫 번째 질문에서는 CallBack지옥을 피하기 위해 나왔고 비동기 처리를 해주는 것이라고 말하였고

두 번째 질문은 Promise 지옥을 피하기 위해 생겨났으며 async로 비동기 처리가 있음을 알리는 키워드로 사용되고 await은 지금 이 함수가 비동기 함수라는 것을 명기해주는 키워드라고 이야기하였다.

세 번째 질문의 답으로는 상대적으로 오래 걸릴 수 있는 DB 쿼리를 할 때 주로 쓴다라고 이야기를 하였다.

틀린 대답은 아니었던 것 같지만,, 좀 더 잘 알고 있었다면 좋았을걸.. 하는 아쉬운 마음에 좀 더 공부를 해보고자 포스팅을 해보기로 하였다. (~~흑흑 ㅜㅜ 붙었음 좋겠다 붙으면 이 부분은 수정해야지 붙었다고~~ 1차 기술 면접은 합격 하였다)

## 일단 비동기에 대해 정리를 간단하게 해 보자

작년 10월에 정리했던 내용이 있긴 했다. [이 글](https://sora9z.tistory.com/81?category=1044549)도 한 번 다시 읽어보았다

비동기 프로그래밍(Asynchronous)란 현재 진행 중인 작업의 처리가 종료되지 않아도 다음 작업을 진행할 수 있게 하는 방식을 말한다. 순서는 보장되지 않지만 CPU Blocking 없이 처리가 가능하다. 반대로 동기 처리 방식은 현재 실행 중인 작업이 다 끝날 때까지 다음 작업이 실행되지 않기 때문에 순차 처리는 가능하지만 Blocking 현상이 발생한다.

Node.js는 이런 Non-blocking 하고 Asynchronous 한 런타임으로 개발되었다. 즉, 자바스크립트의 비동기 처리는 코드의 연산이 끝나지 않았어도 다음 코드를 실행한다.

## 그럼 Node.js는 왜 비동기 처리를 하는 것일까??

Node.js는 싱글 스레드이다. Stack이 한 개밖에 없기 때문에 순차적인 처리밖에 못 한다. 하지만 시간이 오래 걸리는 DB에 쿼리를 하거나 ajax통신을 하는 등의 작업을 할 때 DB 또는 서버의 응답이 올 때까지 대기를 하면서 다음 작업들이 대기를 하게 되는 Blocking 현상이 발생하게 된다. 단지 몇 개의 요청이라면 그리 긴 시간은 아니겠지만, 간단한 프로젝트가 아니고서야 요청은 당연히 많을 것이고 동기적인 방식이라면 웹 앱을 실행하는데 몇십 분은 더 걸리지 않을까..

## BUT 비동기식 처리로 인해 발생하는 문제들도 있다.

예를 들면 DB에 쿼리를 보내는 요청을 하게 될 때 아직 DB에서 응답이 오지 않았는데 다음 응답을 해버리게 되거나,

이 [사이트의](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/) 예시처럼 ajax요청을 보냈을 때 응답을 받기 전에 다음 작업이 실행되는 경우 등 의도한 대로 순서가 보장되지 않을 수 있다. 이런 점들이 자바나 멀티 스레드 기반의 개발을 하는 사람들이 node를 처음 접할 때 어려운 부분이라고 한다.

- 사이트의 예시

```js
function getData() {
  	const tableData;
  	$.get('https://domain.com/products/1', function(response) {
  		tableData = response;
  // $는 jQuery이다
  	});
  	return tableData;
  }

  console.log(getData()); // undefined
```

위의 코드의 의도는 $.get()은 ajax라는 비동기 요청을 하고 받은 응답은 response인자에 담긴다. 그 후 선언한 변수 tableData에 할당되고 return 하는 것이다.

하지만, 이 코드를 실행하면 맨 아래의 console.log가 실행이 되고 getData()가 실행된다. 그리고 ajax 요청인 get 요청이 보내지는데 비동기 요청이기 때문에 응답을 받기도 전에 return tableData를 하게 된다. 결과는 undefined가 출력된다.

즉, 비동기 함수는 비동기 처리 결과를 외부에 반환할 수 없다. 또한 이미 console.log는 출려되기 때문에 상위 스코프의 변수에 할당한다 해도 소용없다.

## callback , promise, async await을 사용해야 하는 이유

Javascript의 ajax 요청은 비동기적으로 동작하고 위와 같은 문제가 발생된다. 이런 이유 때문에 비동기 처리에 대한 후속 처리는 비동기 함수 내부에서 진행되어야 한다.</br>z
이렇게 비동기 함수의 후속 처리를 위한 방법으로 callback , Promise, async - await등을 사용한다. 일단 callback을 사용하는 방법에 대해 알아보자.

### Callback

callback 함수를 사용하여 위의 코드를 수정하면 아래와 같이 수정될 수 있다. (참고 사이트 예시)

return을 바로 하지 않고 callback으로 response를 넣는다.

```js
function getData(callbackFunc) {
  $.get("https://domain.com/products/1", function (response) {
    callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
  });
}

getData(function (tableData) {
  console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
});
```

위의 요청의 경우, callback을 사용함으로써 url을 통해 정보를 받아온 후에 getData() 함수를 실행한다.

위의 코드 실행을 단계별로 분석해 보고 아래와 같이 정리를 해보았다.

참고로 이 부분은 Event loop와 Task queue에 대해 조금 알고 있어야 한다. (Event loop의 이해를 위해 이 [영상을](https://www.youtube.com/watch?v=rpQJAWha8ns) 참고해보자. 이 [영상도](https://www.youtube.com/watch?v=8aGhZQkoFbQ) 조금 길지만 유명하다)

1. getData함수의 [실행 컨텍스트](https://sora9z.tistory.com/129)가 생성되어 call stack에 push된다. </br>여기서, callstack이란 데이터가 밑에서부터 위로 쌓이고 위에서부터 Pop되는 자료구조의 형태로, 실행 컨텍스트가 쌓이는 구조로 코드의 실행 순서를 결정한다.

2. get 함수의 실행 컨텍스트도 생성되고 callstack에 push된다.
3. get 함수의 callback함인 익명함수(function(respose))가 Web api 에 설정된다. (ajax요청은 비동기로 동작하므로 JS 런타임이 아닌 Web api에서 실행된다) 그리고 get함수는 callstack에서 pop된다.
4. get 함수의 요청에 대한 응답이 오면, cb 함수는 task queue에 Push된다.
5. 다음 실행할 코드가 없으므로 callstack의 실행컨텍스트들은 pop되어 텅텅 비워진다.
6. event loop는 callstack에 작업이 없음을 확인하고 task queue의 작업을 callstack으로 push한다.
   callback 함수도 함수 이므로 코드평가를 거치고 실행 컨텍스트를 생성하여 call stack에 Push되고 실행을 한다.
7. cb함수에 있는 callbackFunc도 callstack에 push되어 response를 출력하고 callstack에서 Pop된다.

영상에서 가져온 그림을 추가해 보았다.
![image](https://user-images.githubusercontent.com/70902065/160529135-a7bd4a96-dc55-452d-a766-d1c4e0078a86.png)

다소 긴 과정이긴 하다. 아무튼 이런 방식을 취함으로써 비동기로 동작하는 Javascript에 대해 순서를 보장할 수 있게 된다.

다소 긴 과정이긴 하다. 아무튼 이런 방식을 취함으로써 비동기로 동작하는 Javascript에 대해 순서를 보장할 수 있게 된다.

하지만, 많이 알고 있고 이 글에서도 이전에 정리한 바와 같이 callback지옥에 빠지게 된다.

서버에서 데이터를 받아오고 인코딩, 사용자 인증 등의 과정을 하는 등의 작업들이 비동기 적으로 진행이 되기 때문에 콜백 안에 콜백을, 또 그 안에 콜백을.... 사용하게 된다. 이런 방식은 가독성에도 매우 좋지 않고 유지, 보수에도 매우 좋지 않다. 이를 해결하기 위해 promise나 async와 같은 방법이 생겨났다.

글이 다소 길어지므로 Promise와 async await에 대해서는 다음 포스팅으로 넘긴다.  
이 포스팅이 끝나면 면접 질문에 대해 다시 답을 써보자!
