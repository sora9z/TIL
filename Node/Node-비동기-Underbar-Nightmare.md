# [JS/Node] 비동기 -Underbar -Night mare

Category: JavaScript
Visibility: Public
강의: CodeStates
블로깅: Yes
유형: Sprint
작성일시: 2021년 10월 20일 오전 12:08

# Underbar Night mare

이번 포스팅 에서는 미루고 미뤄왔던 Night mare 포스팅을 진행하겠다. 

1. _.memoize : momoise() method는 Lodash 라이브러리의 method이다. 이미 계산된 값을 일시적으로 기억했다가 다시 호출할 때 다시 계산하지 않고 기억한 값을 출력한다.  이미 해결한 문제는 다시 풀지 않는 기법이다.
    
    완전하게 Lodash 라이브러리의  memoization 구현을 한 것은 아니겠으나, 추후 Memoization 에 대해 공부 할 일이 생긴다면 한번 더 구현을 해보기로하자.
    

**Parametar**  func : callback 함수로 memoization을 적용하고자 하는 함수.

```jsx
_.memoize = function (func) {
  
  // memo를 하기위한 배열을 선언한다.
  // 여기서, memo의 요소로 객체가 들어간다
  // 객체 = {arg : [인자들의 나열],
  //        ans : 함수의 결과값 }

  const memo = [];

  // callback 함수에 넣어줄 인자를 전달 할 클로저 함수를 만든다
  return function (...args) {
    let memorization = false;
    let obj = { arg: [], ans: 0 };
    // momo에 args가 있는지 확인한다.
    for (let m of memo) {
      // 각 obj의 age에  agrs가 있는지 확인. 일치한다면 memorization 에  저장되어있던 결과를 넣는다
      if (args.every((el) => m.arg.includes(el))) {
        memorization = m.ans;
        break;
      } else memorization = false;
    }

    // 만약 결과가 true 이면 저장되어있는 값이므로 return 해준다
    if (memorization !== false) return memorization;

    // 아니라면 인자들와 콜백함수의 실행 결과를 객체에 넣고 값을  return 한다.
    obj.arg.push(...args);
    obj.ans = func(...args);
    memo.push(obj);
    return obj.ans;
  };
};
```

기억된 값이 있는지 먼저 인자를 확인하는 절차를 갖는다. 선언된 memo 배열은 객체를 인자로 갖고, 객체는 인자들과 결과를 저장한다. 

함수가 호출되면 인자를 하나 씩 memo의 요소인 객체들의 arg키의 값들과 비교하고 이미 기억된 인자인지 확인 후 기억되어있다면 ans를 return 하고 아니라면 함수를 실행한다. 

every와 includes를 사용했기 때문에 성능이 좋을지는 모르겠다. 

아래는 Lodash _.memoize에 대한 설명이다

[Lodash _.memoize() Method - GeeksforGeeks](https://www.geeksforgeeks.org/lodash-_-memoize-method/)

1. _.throttle : 시간(ms)동안 callback 함수를 단 한번 실행되는 함수를 반환하는 method이다. 

**Parameter** 

- func : trottled 대상 함수
- wait : 호출이 throttled 될 기간 (miliseconds)

```jsx

_.throttle = function (func, wait) {

  let start = new Date();
  let t1 = Math.floor(start.getTime());
  func();

  return function (...args) {
    let end = new Date();
    let t2 = Math.floor(end.getTime());

    if (t2 - t1 >= wait) {
      start = new Date();
      t1 = Math.floor(start.getTime());
      func(...args);
    }
  };
};
```

단순하게 처음 호출될 떄의 시간과 다른 호출이 될 때의 시간의 차이를 구하고 인자로 받은 시간 보다 크거가 같을 때 인자로 받은 func가 실행되게 하였다. 

t1은 clouser 함수 외부에서 선언되어 처음 호출 시 시간이 할당되며 t2-t1이 wait보다 크거가 같을 때 func가 실행되고 t1은 다시 reset된다.

아래드 Lodash의 _throttle() method에 대한 설명이다.

[Lodash _.throttle() Method - GeeksforGeeks](https://www.geeksforgeeks.org/lodash-_-throttle-method/)

Night mare라고 해서 얼마나 어려울까 했는데 그닥 어렵지는 않았다.  하지만 답을 위한 코드가 아닌 더 개선된 코드를 짜지는 못한 것 같다.