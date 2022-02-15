# 13장-스코프-Scope

Category: JavaScript
Visibility: Public
강의: Book
블로깅: No
유형: Self Study
작성일시: 2022년 2월 15일 오후 5:20

모던 자바스크립트 Deep Dive를 읽고 정리한 포스팅

# 13장-스코프-Scope

## 0. Achievement Goals

## 1. Scope란?

- Scope는 유효범위 이다.  함수를 예로 들면, 함수로 전달된 매개변수 또는 함수 내에서 선언된 지역변수의 스코프(유효범위)는 함수 내부이다.
    
    → Scope란 모든 식별자(변수,함수명,클래스 명 등등)는 자신이 선언된 위치에 의해 유효범위가 결정된다. 이를 Scope라고 한다. 즉, 스코프란 “식별자가 유효한 범위”를 말한다.
    

- Identifier resolution (식별자 결정) :
    - 만약 같은 변수 명을 사용하는 전역 변수와 함수의 지역 변수가 있다고 했을 때, Javascript engine이 이름이 중복되는 두 개의 변수 중에서 어떤 변수를 참조해야 할 것인지  결정해야하는데 이를 Identifier resolution이라고 한다.
- “Scope를 식별자를 검색할 때 사용하는 규칙” 이라고도 한다.
- 동일한 스코프 내에서는 식별자는 유일해야 하지만 다른 스코프의 경우 같은 이름의 식별자를 사용할 수 있다.
- 변수 명이 같은 전역변수와 지역변수는 식별자 이름은 동일하지만 스코프가 다른 별개의 변수이다 → Scope는 namespace이다.
- var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언이 허용되기 때문에 의도치 않게 변수에 값이 재 할당 되는 좋지 않은 경우가 있다.
    - const나 let의 경우는 중복 성언을 허용하지 않는다.

### 코드의 문맥과 환경

Javascript engine은 코드를 실행할 때 코드의 문맥(context)를 고려한다. 

- Lexical Environment (렉시컬 환경) : “코드가 어디서 실행되며 주변에 어떤 코드”가 있는지를 의미한다.
- Code의 문맥은 렉시컬 환경으로 이루어진다.
- 실행 컨텍스트(Execution Context)는 소스코드를 실행하는 데 필요한 환경을 제공하고 실행 결과를 실제로 관리하는 영역이다. 식벽자를 등록하고 스코프와 실행 순서 관리를 구현한 메커니즘이다.
- Scope와 실행 컨텍스트는  매우 깊은 관련이 있으며, 자세한 내용은 추후 정리해볼 예정이다.

## 2. 스코프 체인 (Scope chain)

### Scope의 종류

- 전역 스코프  : 적역 스코에 변수를 선언하면 전역 변수가 된다. 전역 변수는 어디서즌 참조할 수 있다.
- 지역 스코프 : 지역 스코프(함수 몸체 내부 등)에 변수를 선언하면 지역 변수가 된다. 지역 변수는 자신의 지역 스코프와 하위 지역 스코프에서 참조할 수 있다(유효하다)

전역과 함수 내부에 x라는 동일한 변수 이름이 있을 때 함수에서 x를 참조하면 지역변수 x를 참조한다. 이는 Javascript engine이 Scope chain을 통해 참좋할 변수를 검색했기 때문이다(Identifier resulution)

### Scope Chain

[참고 그림](https://dev.to/tailine/scope-and-scope-chain-in-javascript-3478)

![https://res.cloudinary.com/practicaldev/image/fetch/s--zk1rqgAm--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zxaetav5cz4gvi87sja5.png](https://res.cloudinary.com/practicaldev/image/fetch/s--zk1rqgAm--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zxaetav5cz4gvi87sja5.png)

- 함수는 중첩될 수 있다 함수 내부에 선언된 함수를 중첩함수(nested function)이라고 하고 중첩함수를 선언하는 외부 함수를 outer function이라고 한다.
- Scope는 이런 함수의 중첩에 의해 계층적인 구조를 갖는다. 외부 함수의 지역 스코프를 중첨 함수의 상위 스코프라고 한다.
- 전역스코프 ←outer 지역 스코프←inner 지역 스코프  와 같은 계층 구조를 갖게되며, 이를 스코프 체인이라고 한다.
- JavaScript engine은 이 Scope Chain을 통해 상위 방향으로 이동하면서 선언된 변수를 검색한다 (Identifier resolution)

### Lexical Environment

- Javascript Engine은 코드를 실행하기 전에 Lexical Environment(렉시컬 환경)이라는 자료구조를 생성한다.  변수 선언이 실행되면 변수 식별자가 이 자료구조의 키로 등록된다. 그리고 변수 할당이 일어나면 이 자료구조의 변수에 식별자 key에 해당하는 value를 할당한다. 변수의 검색 또한 이 Lexical Envorinment라는 자료구조 상에서 이뤄진다.
- Scope chain은 실행 컨텍스트의 Lexical Environment를 단방향으로 연결한 것이다(Chaining)

### 변수 검색

- Javascript Engine은 스코프 체인을 따라 변수를 참조하는 코드의 스코프에서 시작하여 상위 스코프 방향으로 올라가면서 선언된 변수를 검색한다. 상위에서 하위로 검색하지 않는다.
- 이는 하위 스코프의 변수를 상위 스코프에서 참조할 수 없음을 의미한다.
- Scope를 통해 변수를 검색하는 것은 사실살 선언 시 저장된 식별자를 검색하는 것 이므로 Scope를 “식별자를 검색하는 규칙"이라고 표현한다.

## 3. 함수 레벨 스코프(Function level scope)

- Block level scope : 함수 , for, if, while, try/catch 등의 코드 블록을 지역 스코프로 인정한다
- function level scope : 오직 함수만을 지역 스코프로 인정한다.  Javascript의 var키워드가 대표적인 예시이다.

```jsx
var i=10;

// for 문에서 선언한 i는 전역변수이다. 
// var는 함수 몸체만을 지역 스코프로 인정하기 때문에 for문의 i는 중복되어 재할당 된다.
for(var i=0;i<5;i++){
	// do sth..
}
```

## 4. Lexical Scope (Static Scope)

함수의 스코프는 아래 두 가지 방법중 하나로 결정된다.

1. 동적 스코프 (Dynamic Scope) : 함수를 어디에서 호출했는지에 따라 상위 스코프를 결정한다. 이 경우 함수가 호출될 때마다 함수의 상위 스코프를 참조해야한다(?)
2. 정젹 스코프 (Static Scope) = 렉시컬 스코프 (Lexical Scope) : 함수를 어디에 정의했는지에 따라 상위 스코프가 결정된다. 호출과는 무관한다. 

대부분의 프로그래밍 언어다 Lexical Scope를 따른다. 

```jsx
var x =1 

function foo(){
	var x=10;
	bar();
}

function bar(){
	console.log(x)
}

foo()
bar()

// 정적 스코프를 따르므로 bar는 전역 변수인 x를 참조한다.
```