# Algorithm-mergeSort-병합정렬

Category: Algorithm & Data Structure
Visibility: Public
강의: CodeStates
블로깅: Yes
유형: Coding Test
작성일시: 2022년 1월 4일 오후 8:56

# 분할정복(Divide and Conquer)

- 분할 정복(Divide and Conquer)이란 직관적인 이름에서 유추할 수 있듯이 “문제를 나눈 수 없을 때까지 나누어 각각을 풀면서 다시 합병하여 문제의 답을 얻는” 알고리즘을 말한다.
- 하향식 접근법으로, 상위의 답을 구하기 위해 아래로 내려가면서 하위의 해답을 구하는 방식이다. 일반적으로 재귀함수로 구현한다.
- 부분 문제가 중복되어있는 동적계획법과는 다르게 분할정복은 부분 문제가 서로 중복되지 않다(따라서 Memoization 기법은 사용하지 않는다)

## 병합정렬 (Merge Sort)

병합정렬은 분할정복의 대표정인 예제이다. 병합정렬은 재귀용법을 활용한 정렬 알고리즘이다.

병합정렬의 메커니즘은 아래의 단계로 나타낼 수 있다.

1. 리스트를 절반으로 잘라 비슷한 크기의 두 부분으로 나눈다.
2. 각 부분 리스트를 재귀적으로 합병 정렬을 이용하여 정렬한다.
3. 두 부분 리스트를 다시 하나의 정렬된 리스트로 합병한다.

<img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif" width=500/>

</br>

### 1. 병합정렬 이해

정수를 요소로 갖는 배열을 입력받아 오름차순으로 정렬을 하는 함수를 작선한다고 해보자.

병합정렬을 단순하게 생각해 보면,

1. 한 개의 배열을 더 이상 쪼갤 수 없을 때까지(길이가 1일 배열로) 분할한다.
2. 인접한 두 개의 배열을 정렬하고 병합하여 한 개의 배열로 만든다.
3. 반복적으로 인접한 두 개의 배열을 정렬하고 벙합하여 한 개의 배열로 만든다.

아래의 간단한 예시롤 통해 이해해보자

```jsx
arr=[1,9,3,2] 일 때
1. left=[1,9]  right=[3,2] 로 나눈다
2. left를 다시 left=[1] right=[9]로 나눈다.
3. 위의 두 배열을 정렬하여 병합한다 1 < 9 이므로 [1,9]
4. right=[3,2]는 [3], [2] 로 나눈다.
5. [3], [2] 를 정렬하여 병합한다 3 > 2 이므로 [2,3]
6. left=[1,9]와 right=[2,3]을 정렬해어 병합한다
	- left[0] < right[0] 이므로 result = [1]
	- left[1] > right[0] 이므로 result = [1,2]
	- left[1] > right[1] 이므로 result = [1,2,3]
	- left[1]만 남았으니 result = [1,2,3,9] 가 된다.

```

병합 정렬은 위와 같이 제일 작은 단위로 분할한 후 병합하면서 정렬하는 알고리즘이다.

### 2. 병합정렬 구현

여기서 두 개의 기능을 발견할 수 있는데 첫 번째는 두 개의 배열을 병합하는 기능과 한 개의 배열을 쪼개는 기능이다.

먼저, 두 개의 배열을 크기 비교 후 병합하는 함수의 수도코드는 아래와 같이 작성할 수 있다.

```jsx
function split(arr) {
  // 만약 arr에 인자가 1개이면 더이상 분할할 수 없으므로 arr을 return 한다.
  // 배열의 중간 길이를 기준으로 left와 right 두 개로 나눈다.
  // left=arr.slice(0 to mid-1)  right=arr.slice(mid to last)
  // 그런데, left와 right는 더 쪼갠 수 있으므로 아래와 같이 수정한다. (재귀적으로 다시 분할한다)
  // left=split(arr.slice(0 to mid-1))
  // right=split(arr.slice(mid to last))
  // merge(left,right) 두 개의 배열을 병합한다.
}

function merge(left, right) {
  // lefetIndex ,rightIndex =0,0 두 배열의 index를 가리킬 포인토변수를 두 개 선언하고 0을 할당한다.
  // 결과를 넣을 result 배열 result=[]
  // 두 배열의 index pointer들이 증가하다가 각 해당 배열의 모든 index를 벗어날 때까지 반복한다.
  // leftIndex가 가리키는 left 값과 rightIndex가 가리키는 right의 크기를 비교하고
  // 더 작은 값을 result에 push 한다.
  // 더 작은 값을 갖고있던 배열의 index pointer 변수를 1 증가시킨다.
  // leftindex 와 rightIndex중 하나라도 벗어나면 반복문을 나온다.
  // 다 순회하지 않은 배열의 데이터는 그대로 result에 넣는다.
}
```

코드는 아래와 같다.

```jsx
const mergeSort = function (arr) {
  const merge = (left, right) => {
    // ? 두 개의 배열을 받아서 오름차순으로 정렬을 하고 병합하는 함수
    let [leftIdx, rightIdx] = [0, 0];
    let result = [];

    // left 또는 right 가 다 돌면 반복을 끝낸다.
    // 아직 다 돌지 않은 배열은 제일 끝에 추가한다 (어차피 제일 큰 값을일 것이므로)

    while (leftIdx < left.length && rightIdx < right.length) {
      if (left[leftIdx] < right[rightIdx]) {
        result.push(left[leftIdx]);
        leftIdx++;
      } else {
        result.push(right[rightIdx]);
        rightIdx++;
      }
    }
    // 둘 중 idx가 남는다면 나머지를 result의 뒤에 붙인다.
    if (leftIdx < left.length) result.push(...left.slice(leftIdx));
    else if (rightIdx < right.length) result.push(...right.slice(rightIdx));

    return result;
  };

  const mergeSplit = (arr) => {
    //? 한 개의 배열을 입력받아 두 개의 배열로 분할하는 함수

    // arr의 길이가 1이라면 배열을 바로 반환한다.
    if (arr.length <= 1) return arr;

    // 배열을 나눌 기준이 되는 중간 값을 구한다
    const mid = Math.floor(arr.length / 2);
    // arr을 mid로 기준으로 나눈 두 개의 배열의 길이를 mergesplit으로 다시 재귀적으로 분할한다.
    const [left, right] = [
      mergeSplit(arr.slice(0, mid)),
      mergeSplit(arr.slice(mid)),
    ];

    // left와 right을 병합한 결과를 return 한다.
    return merge(left, right);
  };

  return mergeSplit(arr);
};

//! Test
let output = mergeSort([3, 1, 21]);
console.log(output); // --> [1, 3, 21]
```

</br>
### 3. 시간복잡도 계산</br></br>

병합정렬은 재귀적인 방법을 사용하여 하위 단계로 내려간다. 길이가 n인 배열을 두 개의 배열로 분할하고, 그 다음 단계에서는 분할한 각 배열을 다시 2개의 배열로 분할하여 내려간다.

첫 번째 단계를 depth 0으로 하고 하위 단계로 내려갈수록 depth가 1씩 늘어난다고 하자.

- 전체 시간 복잡도를 계산하기 위해 먼저 각 단계에서의 시간복잡도를 구해보자</br>
  - 단계별로 실핸하는 연산은 한 개의 배열을 2개로 나누는 split 연산과 그 결과를 다시 병합하는 merge 연산으로 이루어진다.</br></br>
  - split 연산은 다음 단계로 내려가는 연산이므로 현재 단계에서는 merge 연산의 시간복잡도만을 생각한다.
    - depth=0에서 merge는 left 와 right 만을 merge 하므로 O(n)이다
    - depth=1에서 merge는 depth=0에서 나눈 size가 n/2인 left와 right에서 각각 merge 연산이 이루어진다. node = 2개 , 노드당 배열의 길이 n/2 O(n/2) + O(n/2) = O(n)
    - depth=2에서는 depth =1에서 나눈 size가 n/4인 2개의 left와 2개의 right에서 각각 merge 연산이 이루어진다. node = 4개 , 노드당 배열의 길이 n/4 , O(n/4) + O(n/4) + O(n/4) + O(n/4) = O(n)
      → 즉 , depth가 i인 단계에서 node는 $2^i$ 개가 있고, 각 node에서 연산 할 배열의 길이는 $n/2^i$ 이다.
      전체 merge 시간복잡도는 $2^i$ x $n/2^i$ = O(n)이 된다.</br></br>
  - 이제 재귀가 몇 개 만들어지는지. 즉, split 연산은 얼마나 하는지를 생각해보자!
    - split 함수를 살펴보면 길이가 1일 때 재귀는 종료된다.
    - 즉, $n * 1/2^i =1$ 이 될 떄까지 depth가 생긴다.
    - 위의 공식을 계산해보면, $log_2n = i$ 를 얻을 수 있다.
    - n=8인 경우 i=3인 depth가 나온다.
      → 단계는 항상 $log_2n$ 개만큼 만들어진다.
  ### → split 함수 내부에서 merge 함수를 호출하므로 최종 시간 복잡도는 O(n)\*O(logn) = O(nlogn)이 된다.

![https://cdn.kastatic.org/ka-perseus-images/5fcbebf66560d8fc490de2a0d8a0e5b1d65c5c54.png](https://cdn.kastatic.org/ka-perseus-images/5fcbebf66560d8fc490de2a0d8a0e5b1d65c5c54.png)
