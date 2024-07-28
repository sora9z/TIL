# [Algorithm]LPS

Category: Algorithm & Data Structure
Visibility: Public
유형: Coding Test
작성일시: 2021년 12월 28일 오후 12:11

# Algorithm - LPS

이 문제는 간단하게 풀렸지만 다른 다양한 풀이에 대해 공부를 해보고자 한다.

### 1. 문제

_문자열을 입력받고 다음의 조건을 만족하는 LPS를 찾아 그 길이를 return 한다._

_LPS란, 주어진 문자열의 가장 긴 접두어이자 접미어(Longest Prefix which is also Suffix)_

_non-overlapping : 접두어와 접미어는 서로 겹치는 부분이 없어야 한다._

_prefix와 suffix는 문자열의 동일한 인덱스에 위치한 문자를 요소로 가지면 안 된다._

_인자1 str_

_str 타입의 알파벳 소문자 문자열 len <=60,000_

_출력 : num타입_

_예를들어, aabaa의 경우 aa가 가장 긴 접두어이자 접미어이다._

### 2 구현

- My code

이 문제는 양 끝의 문자열이 동일한지 확인하면서 같다면 그 길이를 저장하는 방식으로 진행하였다.

수도코드는 아래와 같다.

```jsx
// 문자열을 반으로 자른다.
// 각 각 prefix, suffix 라는 변수에 담는다.
// 반복문의 조건인 iterator 라는 변수를 선언하여 str의 길이가 홀수인 경우와
// 짝수인 경우에 따라 다르게 설정한다.
// prefix가 iterator보다 작을 동안 반복한다.
// prefix에 str의 문자를 첫 번째 문자부터 넣는다
// suffix에는 마지막 문자를 넣는다.
// 두 변수를 비교하고 같다면 result 배열에 길이를 Push한다.
// 반복이 끝나면 배열의 최댓갑을 반환
```

코드는 아래와 같다

```jsx
const LPS = function (str) {
  let result = [];
  let len = str.length - 1;
  let [prefix, suffix] = ["", ""];
  let iterator = str.length % 2 === 0 ? str.length / 2 : str.length / 2 - 1;

  for (let i = 0; i < iterator; i++) {
    prefix += str[i];
    suffix = str[len - i].concat(suffix);
    if (prefix === suffix) result.push(prefix.length);
  }

  return result.length === 0 ? 0 : Math.max(...result);
};
```

### Solution : Use Regular Expression

이전에 Regular expression을 정리한 적이 있다. 잘 사용을 하지 않아서 거의 까먹고 있었는데 다시 공부할 수 있는 기회가 되었다.

[Regular Expression](https://sora9z.tistory.com/71)

이 문제를 Regular Expressoin으로 풀면 상당히 간단하게 풀리는 풀이를 보았다.

그 코드는 아래와 같다.

```jsx
const LPS = (str) => {
  const result = str.match(/^(\w*).*\1$/);
  return result[1].length;
};
```

**/^(\w*).*\1$/** 의 의미를 알기 위해 먼저 각 표현을 살펴보자.

**str=codecodecode인 경우**

^   :   ^pattern 이 있으면 문장 제일 앞에 있는 pattern을 선택한다.

→ /^code/ 로 찾으면 str에서 **code**codecode 맨 앞의 code만 선택이 된다.

\w*   :    \w는 문자를 1개 선택한다. pattern*은 pattern이 0개 이상인 (연속된) 문자들을 찾는다.

→    /^(code)\*/로 찾으면 codecodecode가 전부 선택이 된다.

( )    :    괄호는 그룹으로 묶는 기능을 하고 따로 사용할 수 있도록 저장한다.

- 정리 1

여기까지 정리를 해보면

→ ^(\w\*) 은 숫자나 공백, 기호가 아닌 문자로 구성된 연속된 pattern이 0개 이상인 것 중 제일 앞에 있는 pattern만 선택한다.라는 의미이다.

.    :    개행을 제외한 모든 문자 (1개)를 선택하는 기호이다.

.\*    :    개행을 제외한 모든 문자 0개 이상을 선택한다.

\1    :    ( ) 그룹으로 묶은 것 중 첫 번째 그룹을 선택한다.

- 정리2

여기까지 다시 정리는 해보면 codecodecode에서 /^(\w*).*\1/ 이 pattern을 이용하여 찾는다고 할 때

(\w*)에 속하는 그룹은 code이고 마지막에 \1은 다시 (\w*)을 의미하므로 첫 번째 code와 마지막 code는 각각 (\w*)과 \1을 의미한다. 그럼 자연스럽게 가운데 code가.*가 된다.

만약 codecod에 위의 pattern을 적용하면 (\w*)과 \1 은 각각 cod cod가 되고 자연스럽게 중간의 e가.*와 메칭 된다.

마지막에 $ 기호가 붙는데 이건 \*과는 반대로 \1을 문장의 마지막에 있는 것 만을 찾겠다는 의미이다.

이 문제는 prefix와 suffix가 같은 문자를 찾아야 하는 문제이므로 가장 마지막에 메칭 되는 문자만을 찾으면 된다.
