# Async_Promise를사용하여_DB에쿼리 보내기

Category: JavaScript
Visibility: Public
강의: Self Study
블로깅: No
유형: Self Study
작성일시: 2022년 3월 27일 오전 11:52

# Async , Promise를 사용하여 DB에 쿼리 보내기

이번 주에 면접을 봤는데, 나왔던 질문 중 비동가와 관련된 질문이 있었다.

1. 서버에서 Promise가 무엇인지 알고있는지
2. Async Await은 어떻게 다른지
3. Server에서 비동기가 언제 쓰이는지 알고 있는지

첫 번재 질문에서는 CallBack지옥을 피하기 위해 나왔고 비동기 처리를 해주는 것이라고 말하였고

두 번째 질문은 Promise 지옥을 피하기 위해 생겨났으며 async로 비동기 처리가 있음을 알리는 키워드로 사용되고 await은 지금 이 함수가 비동기 함수하는 것을 명기해주는 키워드라고 이야기 하였다. 

세 번째 질문의 답으로는 상대적으로 오래 걸릴 수 있는 DB 쿼리를 할 때 주로 쓴다 라고 이야기를 하였다. 

틀린 대답은 아니었던 것 같지만,, 좀 더 잘 알고 있었다면 좋았을걸..하는 아쉬운 마음에 좀 더 공부를 해보고자 포스팅을 해보기로 하였다. (흑흑 ㅜㅜ 붙었음 좋겠다 붙으면 이 부분은 수정해야지 붙었다고)

### 일단 비동기에 대해 정리를 간단하게 해보자

작년 10월에 정리했던 내용이 있긴 했다. [이 글](https://sora9z.tistory.com/81?category=1044549)도 한 번 다시 읽어보았다

비동기 프로그래밍(Asynchronous)란 현재 진행중인 작업의 처리가 종료되지 않아도 다음 작업을 진행할 수 있게 하는 방식을 말한다. 순서는 보장되지 않지만 CPU Blocking없이 처리가 가능하다. 반대로 동기 처리 방식은 현재 실행중인 작업이 다 끝날 때까지 다음 작업이 실행되지 않기 때문에 순차 처리는 가능하지만 Blocking 현상이 발생한다.

Node.js는 이런 Non-blocking하고 Asynchronous 한 런타임으로 개발 되었다. 즉, 자바스크립트의 비동기 처리는 코드의 연산이 끝나지 않았어도 다음 코드를 실행한다.

### 그럼 Node.js는 왜 비동기 처리를 하는 것일까??

Node.js는 싱글쓰레드이다. 즉, Stack이 한 개밖에 없기 때문에 순차적인 처리밖에 못 한다. 하지만 시간이 오래 걸리는 DB에 쿼리를 하거나 ajax통신을 하는 등의 작업을 할 때 DB또는 서버의 응답이 올 때까지 대기를 하면서 다음 작업들이 대기를 하게되는 Blocking 현상이 발생하게 된다. 단지 몇 개의 요청이라면 그리 긴 시간은 아니겠지만, 간단한 프로젝트가 아니고서야 요청은 당연히 많을 것이고 웹 앱을 실행하는데 몇 십분은 더 걸리지 않을까..

### BUT 비동기식 처리로 인해 발생하는 문제들도 있다.

예를들면 DB에 쿼리를 보내는 요청을 하게될 때 아직 DB에서 응답이 오지 않았는데 다음 응답을 해버리게 되거나 이 [사이트의](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/) 예시처럼 ajax 요청보내고 받응 응답을 출력해야하는 코드의 경우, Node.JS는 비동기 처리를 하므로 결과 코드는 undefined를 출력하게 된다.

- 사이트의 예시
    
    ```jsx
    function getData() {
    	var tableData;
    	$.get('https://domain.com/products/1', function(response) {
    		tableData = response;
    	});
    	return tableData;
    }
    
    console.log(getData()); // undefined
    ```
    

오늘은 여기까지, 블로그 수정하고 내일 내용 더 추가하자!