# [Algorithm][Codestates]Toy24-RadixSort-기수정렬

Category: Algorithm & Data Structure
Visibility: Public
강의: CodeStates
블로깅: Yes
유형: Coding Test
작성일시: 2022년 2월 10일 오후 8:33

# Algorithm - Toy 24

### 1. 기수정렬(Radix Sort)

[참고](http://syllabus.cs.manchester.ac.uk/ugt/2019/COMP26120/SortingTool/radix_sort_info.html#:~:text=The%20time%20complexity%20of%20radix,base%2010%20for%20decimal%20representation.)

기수 정렬 알고리즘은 최 하위 자릿수부터(digit) 시작하여 최 상위 자릿수 까지 자릿수 별로 정렬을 하는 알고리즘이다. 기수 정렬은 Counting 정렬을 Subroutine으로 사용하여 정렬한다.  Queue를 자료구조로 갖는 길이가 10인 배열을 사용하여 정렬한다. 이를 Bucket이라고 하자.

- 아래의 배열을 기수정렬로 정렬해보자
    
    Original Arr = [170 , 45 , 75 , 90 , 802 , 24 , 2 , 66] 
    
    Bucket = [Queue1, Queue2 ... Queue10]
    
    최 하위 자릿수는 1의 자리이다.  위의 배열에서 1의 자리만을 뽑으면 아래와 같을 것이다.
    
    [0, 5, 5, 0, 2, 4, 2, 6]
    

- 자릿수 배열의 요소를 indx로 하고 Bucket[indx] Queue에 Original Arr의 요소를 넣는다.
    
    즉, Original Arr를 한 번 순회를 하면서 Bucek[0] 의 Queue에 170을 넣고 Bucket[5] Queue에  45, Bucket[5] Queue에 75...Bucket[6] Queue에 66을 넣는다.  이 Bucket에 있는 요소들을 순서대로 내열하면 아래와 같이  일의자리를 기준으로 오름차순 정렬이 되어있는 배열을 얻을 수 있다.
    
    [170, 90, 802, 2, 24, 45, 75, 66]
    

- 위의 결과 배열을 다음 높은 자릿수를 기준으로 정렬을 한다 . (10의자릿수)
    
    결과는 아래와 같이 10의 자리를 기준으로 정렬된 배열을 출력한다. 이미 1의자리로 정렬을 했기 때문에 같은 10의자리 수인 경우는 이미 정렬이 되어있는 상태이다.
    
    [802, 2, 24, 45, 66, 170, 75, 90]
    
- 마지막으로  최대 자릿수인 100의 자리로 정렬을 하면 아래와 같은 전체 정렬된 결과를 얻을 수 있다.
    
    [2, 24, 45, 66, 75, 90, 170, 802]
    

[참고영상](https://youtu.be/nu4gDuFabIM)

Radix Sort의 시간 복잡도는 O(d*(n+b)) 이다. 여기서 d는 digit(자릿수)의 개수이고 n은 list의 요소 개수이다. b는 buckle size이다. 

### 2 구현

구현은 아래와 같이 구현하였다. 

확인을 해보니 이미 나와있는 코드와는 조금 다르게 작성되었다. 

 Ref Code와의 차이점은 Ref code는 counting Sort를 사용하여 정렬을 하였고 내가 작성한 code는 직접 자리수의 숫자를 추출하고 자료구조 Queue 배열을 사용하였다는 점에서 조금 다르다고 생각한다. 

counting sort는 중복되는 것의 누적수를 통해 저장되는 index를 찾고, Queue배열을 이용한 방법은 배열의 인덱스를 사용하여 index를 찾는다. 

```jsx
// max digit 값을 return 하는 method
const getMaxDigit = (arr) => {
  let MAX = String(
    arr.reduce((acc, cur) => {
      return acc > Math.abs(cur) ? acc : Math.abs(cur);
    }, Math.abs(arr[0]))
  ).length;
  return MAX;
};

const sortRadix = (arr) => {
  // 자릿수의 데이터를 추출하는 메서드
  const getDigitData = (digit, data) => {
    let str = "";
    if (digit === 1) str = String(Math.abs(data)).slice(-1);
    else {
      str = String(Math.abs(data)).slice(-1 * digit, -1 * (digit - 1));
    }
    return Number(str);
  };

  // Get Bucket
  let bucKet = [];
  for (let i = 0; i < 10; i++) {
    bucKet.push(new Array());
  }

  // get max digit
  const MAX = getMaxDigit(arr);
  let count = 1;

  // sort

  //size 만큼 반복
  while (count <= MAX) {
    let newArray = [];

    // Bucket에 대응되는 Data를 넣는다
    for (let data of arr) {
      // 해당 자릿수의 숫자를 구한다.
      let buckId = getDigitData(count, data);
      // Bucket에 해당 자릿수에 맞는 index에 push한다.
      bucKet[buckId].push(data); // enquqeu
    }

    // arr을 다시 정렬한다.
    for (let data of bucKet) {
      let len = data.length;
      if (len) {
        newArray = newArray.concat(data);
        data.length = 0;
      }
    }

    arr = [...newArray]; // arr 갱신
    count++;
  }
  return arr;
};

function radixSort(arr) {
  /* 
  1. 양수배열과 음수 배열로 나눈다 (left right) 여기서 left의 요소는 모두 양수로 바꾼다.
  2. 각 배열에 radix Sort Func를 적용한다. (양의 정수만을 sort 한다)
  3. 음수 배열은 reverse를 해주고 각 element에 -를 곱하여 다시 음수화 한다.
  */

  let [left, right] = [[], []];

  // 양수배열, 음수 배열로 나눈다.
  arr.forEach((el) => {
    el < 0 ? left.push(-1 * el) : right.push(el);
  });

  // 정렬
  right = [...sortRadix(right)];
  left = [...sortRadix(left)];

  return left
    .reverse()
    .map((el) => -1 * el)
    .concat(right);
}
```

레퍼런스 코드 

```jsx
function getMax(arr) {
  return arr.reduce((max, item) => {
    if (item > max) return item;
    return max;
  }, 0);
}

function countingSort(arr, radix) {
  const N = arr.length;
  const output = Array(N).fill(0);
  const count = Array(10).fill(0);

  // 현재 자리수를 기준으로 0~9의 개수를 센다.
  arr.forEach((item) => {
    const idx = Math.floor(item / radix) % 10;
    count[idx]++;
  });

  // count[i]가 i까지의 누적 개수가 되도록 만든다.
  count.reduce((totalNum, num, idx) => {
    count[idx] = totalNum + num;
    return totalNum + num;
  });

  // 아래 속성이 유지되도록 하기 위해 배열을 거꾸로 순회한다.
  //  1. 가장 큰 값을 먼저 본다.
  //  2. 가장 큰 값을 가장 마지막에 놓는다.
  let i = N - 1;
  while (i >= 0) {
    const idx = Math.floor(arr[i] / radix) % 10;
    // count[idx]: 현재 radix의 idx까지 누적 개수
    // count[idx]개만큼 있으므로, 인덱스는 count[idx] - 1
    output[count[idx] - 1] = arr[i];
    count[idx] -= 1;
    i--;
  }

  return output;
}

function radixSort(arr) {
  let left = [];
  let right = [];
  arr.forEach((item) => {
    if (item >= 0) right.push(item);
    else left.push(item * -1);
  });

  let max = getMax(left);
  let radix = 1;
  while (parseInt(max / radix) > 0) {
    left = countingSort(left, radix);
    radix *= 10;
  }

  max = getMax(right);
  radix = 1;
  while (parseInt(max / radix) > 0) {
    right = countingSort(right, radix);
    radix *= 10;
  }

  return left
    .reverse()
    .map((item) => item * -1)
    .concat(right);
}
```