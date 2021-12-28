# [Algorithm][codestates] Toy 17

Category: Algorithm & Data Structure
Visibility: Public
강의: CodeStates
블로깅: Yes
유형: Coding Test
작성일시: 2021년 12월 15일 오후 10:55

# Algorithm - Toy 17

### 1. 문제

_문자열을 입력받아 문자열 내의 모든 괄호의 짝이 맞는지 여부를 리턴한다._

괄호의 종류는 ( ).{ },[ ] 세 가지 이다.

### 2 구현

- 사용한 자료구조는 Stack이다.
- 접근 방법은 처음에는 결국 ( ) { } [ ] 은 대칭 된다는 것을 이용하여 해결하려고 했지만 하다보니 조금 많은 조건이 필요하게 되어 다른 방법을 시도하였다. open Bracket ("[ or { or ( " ) 다음에 오는 문자를 확인하여 해당 문자에 대해 맞는 쌍이 나오는지 확인하여 다른 쌍의 close Bracket(" ), } ") 이 나오면 false를 return 하는 접근 방법을 사용하였다.
- Sudo Code

1. Stack에 연속된 open bracket 기호를 구하여 넣는다. (getOPenBracket)
2. open bracket인 (, {, [ 과 close bracket인 ), }, ]을 두 개의 배열을 선언하여 요소로 넣는다. 이 배열은 비교 할 문자가 서로 쌍인이 아닌지 확인하기 위해 사용된다.(opBracket, clBrackets)
3. stack을 선언한다. stack은 FILO의 특성을 갖고있으며 stack에는 open bracket을 넣기 위해 사용된다 가장 마지막에 들어간 open bracket 부터 해당하는 close bracket으로 닫아야 하기 때문에 stack의 성질을 갖는다.
4. getOpenBracket 메서드를 사용하여 close Bracket이 나오기 전 까지 연속된 open Bracket을 stack에 넣는다. 이 메서드는 stack에 들어간 나머지 문자들을 배열로 return 한다. remains 변수를 선언하여 나머지 문자들을 넣는다.
5. stack에 아무 인자가 없을 때까지 반복문을 돌린다
6. stack에서 맨 위에 있는 요소와 remains의 첫 번째 요소를 각 변수(openB , nextB) 에 할당한다. (openB와 nextB가 서로 쌍인지 확인하는 작업을 하기위해)
7. 조건1 : 서로 쌍이 맞는지 확인하기 위해 2번에서 생성한 배열 두개를 사용한다. (만약 openB의 opBracket에서의 인덱스와 nextB의 clBrackets에서의 인덱스와 같다면 같은 쌍임을 의미한다. ) 같은 쌍이라면 stack의 맨 위의 문자를 삭제(pop)하고 remains의 맨 앞의 문자를 삭제 한다.
8. 만약 stack이 비었다면 getOpenBracket 에 remains를 넣어 stack을 채운다. 여기서, 이 값이 false이면 즉, 앞에 open bracket이 없다면 false를 return 한다.
9. 조건 2: 조건1이 아니라면, 만약 nexB가 open Bracket 중에 한 개 이라면 stack에 push한다.
10. 조건1,2가 아니라면 return false
11. 반복문이 끝나면 return true

상당히 긴 수도코드이다. 이미 코드를 작성한 다음에 적는 수도코드 이지만 다음부터는 수도코드를 미리 적어보는 연습을 해야겠다.

- getOpenBracket 함수 구현

```jsx
const getOpenBracket = (arr) => {
  // stack에 open bracket을 넣는 method . stack에 들어갈 문자를 제외한 문자들을 배열로 return 한다.
  for (let i = 0; i < arr.length; i++) {
    if (opBracket.includes(arr[i])) stack.push(arr[i]);
    else return stack.length === 0 ? false : arr.slice(i); // 만약 stack이  비어있다면 return false
  }
};

/* 이 method는 balancedBrackets 함수 내에 선언되었기 때문에 클로저 함수이다. 따라서 부모 함수의 변수를 사용한다.
만약 open bracket이면 stack에 push하고 close bracket을 만나면 바로 멈춘다. 여기서 stack이 비어있다면 
close bracket이 먼저 시작된다는 의미이므로 false를 return 한다. 아니라면 stack에 넣고 남은 문자들을 return 한다.
*/
```

- balancedBrackets 구현

```jsx
const balancedBrackets2 = function (str) {
  // TODO Data Type Stack을 이용하자!
  let strtoArr = str.split(""); // str을 배열로 변환 (굳이 안하고 str으로 해도 될 듯 하다)

  const getOpenBracket = (arr) => {
    // stack에 open bracket을 넣는 method
    // stack에 들어갈 문자를 제외한 문자들을 배열로 return 한다.
    for (let i = 0; i < arr.length; i++) {
      if (opBracket.includes(arr[i])) stack.push(arr[i]);
      else return stack.length === 0 ? false : arr.slice(i);
      // 만약 stack이  비어있다면 return false
    }
  };

  // open 문자와 close 문자를 각 각 배열로 만든다
  // stack 빈 배열을 선언한다.
  let opBracket = ["(", "[", "{"];
  let clBracket = [")", "]", "}"];
  let stack = [];

  // 입력으로 받은 str에서 ),],} 중 하나가 나올 떄까지 Stck에 넣는다. -> getOpenBracket(str)
  let remains = getOpenBracket(strtoArr); // stack에 넣은 나머지 문자들을 remain 변수에 배열 자료형으로  초기화

  // stack의 길이가 0이 될 때까지 while문을 돌린다.
  while (stack.length !== 0) {
    nextB = remains[0]; // stack에 넣은 문자의 바로 다음 문자
    openB = stack[stack.length - 1]; // stack의 제윌 위의 문자

    // 만약 다음 문자들이 한  쌍이라면
    if (clBracket.indexOf(nextB) === opBracket.indexOf(openB)) {
      stack.pop(); // stack에서 제거한다.
      remains.shift(); // ramains에서 제거한다.
      if (!stack.length) {
        // 만약 stack이 비었다면  남아있는 문자에서 stack을 채운다.
        if (getOpenBracket(remains) === false) return false; // 결과가   false면 return false
      }
    }
    // 만얃 str의 다음 문자가 [,{,( 중에 있으면 (Openbracket 문자이면) stack에 추가한다.
    else if (opBracket.includes(nextB)) stack.push(nextB);
    // 위의 두 경우가 아니면 return false
    else return false;
  }

  return true;
};
```

- Test

```js
// ! tests
let output = balancedBrackets2("())()(()");
console.log(output); // --> false

let output2 = balancedBrackets2("[({})]");
console.log(output2); // --> true

let output3 = balancedBrackets2("[(]{)}");
console.log(output3); // --> false

let output4 = balancedBrackets2("(((((((((())))))))))");
console.log(output4); // --> true
```

### 2021-12-28 문제 수정

위의 경우 문제가 있었다.

1. “()”로 진행하였을 때 stack에서 계속 ( 이 문자가 계속 추가가 되었다.

디버깅을 열심히 해보다 발견한 것은, if (getOpenBracket(remains) === false) return false; 이 부분에서

remains가 업데이트되지 않았다.

1. 문자가 한 개 있을때 예외처리를 해주지 않았다

수정한 코드는 아래와 같다.

```jsx
if (!stack.length) {
  // 만약 stack이 비었다면  남아있는 문자에서 stack을 채운다.
  if (getOpenBracket(remains) === false) return false;
  // 결과가   false면 return false
  else remains = remains.slice(1);
}
```

하지만 time out으로 통과가 되지 않았는데,, 다시 코드를 조금 더 간결하게 수정하여 통과를 하였다.

너무 복잡하게만 생각하지말고 일단 절차적으로 이 코드가 어떻게 진행되는지부터 생각을 해봐야겠다.

나는 처음부터어떤 기능을 따로 메서드로 만드는 생각을 해버렸기 때문에 중간에 어떤 문제가 생겼을 때 더욱 복잡해지는 것 같다.

최종 수정한 코드는 아래와 같다.

```jsx
const balancedBrackets = function (str) {
  let opBracket = ["(", "[", "{"];
  let clBracket = [")", "]", "}"];
  let stack = [];

  if (str.length === 1) return false;

  for (let i = 0; i < str.length; i++) {
    if (opBracket.includes(str[i])) stack.push(str[i]);
    else if (clBracket.includes(str[i])) {
      let opB = stack.pop();
      let clB = str[i];
      if (
        opB === undefined ||
        opBracket.indexOf(opB) !== clBracket.indexOf(clB)
      )
        return false;
    }
  }
  return true;
};
```
