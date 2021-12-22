# [자료구조/알고리즘]GCD 최대공약수 문제

Category: Algorithm & Data Structure
Visibility: Public
강의: CodeStates
블로깅: Yes
유형: LESSON
자료: https://velog.io/@muchogusto/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B07-%ED%8A%B8%EB%A6%AC
작성일시: 2021년 12월 22일 오후 2:34

## GCD(Greatest Common Divisor) 최대 공약수

### 1. 문제

M개의 A 빼뺴로와 N개의 B 빼뺴로를 k명의 직원에세 공평하게 나누어 주는 방법을 구하는 함수를 작성하는 문제이다.  예를 들어  A빼빼로가 4개 B빼뺴로가 8개인 경우, 직원이 2명 이라면 A 뺴빼로를 2개, B를 4개 씩 공평하게 나눠준다. 

- 입력 : 인자 M (1<=M<=100,000,000) , 인자 N (1<=N<=100,000,000)
- 출력 : 2차원 배열 output을 return 해야한다. output[i]는 [빼빼로를 받게 되는 직원의 수, 나누어 주는 아몬드 빼빼로의 수, 나누어 주는 누드 빼빼로의 수] 의 인자를 갖고있는 길이 3의 배열이다 output[i][0]을 기준으로 오름차순으로 정렬한다.

### 2. 접근방법

이 문제에서 k명의 직원에세 M개와 N개를 똑같은 양으로 나눠서 주는 문제이다. 즉, N과 M을 k로 나누어 떨어지는면 공평하게 나누어 줄 수 있는 경우가 된다. 수학적으로 생각을 해보면 M과 N이 k로 나누어 떨어져야 하므로 k를 공약수로 갖고있어야 함을 알 수 있다. 만약 N과 M이 그다지 크지 않다면 아래와 같은 간단한 방법을 사용하여 문제를 풀 수 있을 것이다.

```jsx
// Soducode
// for i=1 to min(M,N)
  // if  M % i ===0 ? && N % i ===0?
  //  output push [직원 수 ,M/i, N/i]
  // if i > Min break return output

 function solution1(M, N) {
 
  let min = Math.min(M, N);
  let result = [];

  for (let i = 1; i < min + 1; i++)
    M % i === 0 && N % i === 0 ? result.push([i, M / i, N / i]) : null;

  return result;
}
```

위의 방법은 O(n)으로 대부분의 test case를 통과하였지만 M,N이 100,000,000인 경우 Timeout이 발생한다. 

조금 더 효율적인 방법은 , 약수와 제곱근의 원리를 이용하여 연산 량을 줄이는 방법이다. 

예를 들어 30의 약수를 구하면 [1, 2, 3, 5, 6, 10, 15, 30] 8개가 된다.  

각 30을 각 약수로 나눠보면 아래와 같은 결과가 나온다. 

30 / 1 = 30

30 / 2 = 15

30 / 3 = 10

30 / 5 = 6

30 / 6 = 5

30 / 10 = 3

30 / 15 = 2 

30 / 30 = 1 

첫 번째 약수로 나눈 값은 8번 째 약수인 30이 되고 , 두 번째 약수로 나눈 값은 7번 째 약수인 15가 된다.

30을 4번 째 약수인 5로 나눈 값은 5번 째 약수인 6이 된다.  즉, 1 ~ 4번째 까지의 약수를 구하고 30을  구한 약수로 나눠주면 나머지 약수가 구해진다.  

여기서  약수를 구하는 분기점은 약수의 개수를 k라고 했을 때 k/2 이다.

$\sqrt{30}$ X $\sqrt{30}$ = 30 이므로 약수를 오름차순으로 정렬했을 때 중간 값이 되는 수는 $\sqrt{30}$  보다 **같거나 작은 수**가 된다.   **5<$\sqrt{30}$ <6** 이고 5가 분기점이 되된다. 결과적으로 30의 모든 약수를 구하지 않고 1부터 5까지의 수 중 30으로 나웠을 때 나누어 떨어지는 값만을 구하면 나머지는 계산으로 구할 수 있다. 

이를 수학적으로 표기하면 아래와 같다.

- 결론 1 : $d_{k+1-i} = {n \over d_i}$       : k=8일 이고 i=1일 때 7번 째 약수는 n을 1번째 약수로 나눈 결과이다
- 결론 2 :  $i <= {k \over 2}$      →     $d_i <= \sqrt{n}$  :  i가 약수의 총 개수 k의 k/2 보다 작거나 같다면 i번 째 약수는 n의 제곱근보다 작거나 같은 수이다.

→ 결과적으로 모든 약수를 구하지 않고 n의 제곱근 이하 까지의 약수만 구하면 된다.

이를 코드로 옮기면 아래와 같다.

```jsx
function divideChocolateStick(M, N) {
  // Todo: 먼저 M과 N중에 최솟값의 약수를 구한다.
  // Todo : n의 약수는 루트n보다 작은 수의 약수를 먼저 구하고 나머지 약수는 구한 약수를 나누어 계산한다.

  let min = Math.min(M, N);
  let max = Math.max(M, N);

  let divisors = getDivisors(min); // 최솟값의 약수들을 구한다.
  let result = [];
  for (let el of divisors) // maxr값과 나눴을 때 약수가 되는 것들만 배열로 만든다.
    max % el === 0 ? result.push([el, M / el, N / el]) : null;
  return result;
}

const getDivisors = (num) => {
  let result = [];
  for (let i = 1; i * i <= num; i++)
    // i가 제곱근이면 i만 배열에 넣어주고 아니라면 i와 n을 i로 나눈 값도 넣어준다
    if (i * i === num) result.push(i);
    else if (num % i === 0) result.push(...[i, num / i]);

  return result.sort((a, b) => a - b);
};
```

위의 방법이 좋은 방법인지는 스터디를 통해서 토의를 해봐야겠다.