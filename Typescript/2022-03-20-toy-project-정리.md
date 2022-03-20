# Toy-project-vending_machine-TIL

Vending Machine Class를 사용하여 React로 Client를 만들고 직접 Vending Machine client를 구현하려고 하였다.</br> Interface는 아래와 같이 만들었으며 client로 구현하기 전 intance를 만들어 console로 결과물을 출력해 보았을 때 제대로 나왔기 때문에 큰 문제는 없을 것이라 생각하였다.

```tsx
import { types } from "types";

export interface VendingMachine {
  displayProducts(): types.Display; // 선택 가능한 제품을 보여준다
  enterCashOrCard(pay: types.Payment): number | types.Err;
  // 금액 또는 카드를 입력 받고 받은 금액을 출력한다.
  selectProduct(productId: number, amount: number): number | types.Err; // 제품을 선택한다.
  displayAmount(): number; // 남은 잔액을 보여준다
  returnCashOrCard(): string | number; // 잔돈 또는 카드를 반환한다.
}
```

typescript로 React에 적용하는 것은 처음이라 event에 대한 type등이 조금 헷갈려서 작은 문제들은 있었지만 금방 해결하였다.</br>Vending Machine의 product도 display를 잘 되었다.

하지만, enterCashorCard에서 문제가 발생했다. 돈을 넣는 버튼을 눌러도 rendering되는 amount는 더해지지 않고 입력한 숫자로만 업데이트 되는 것이다. enterCashOrCard method는 사용자가 입력을 하면 instance의 payment에 더하는 기능을 한다. </br>하지만 renderfing은 계속 의도와 다르게 출력이 되었다.

이것 때문에 react props구조,componrnt, page 구조 등 바꿔보면서 하루종일 삽집을 이틀간 하였다 ;;

그러다 instance의 변수인 private payment: types.Payment; 이것에 더한 값이 소멸되는 것인가 싶어서 react class instance 라고 검색을 해보니, 나와 같은 고민을 한 질문들이 스택오버플로우에 꾀나 있었다.

[이 질문의 답변](https://stackoverflow.com/questions/62262385/react-context-not-updating-for-class-as-value) 과 [이 답변](https://stackoverflow.com/questions/70398528/how-do-i-change-a-value-in-an-instance-of-a-typescript-class) 을 보니 React의 상태는 state로만 관리를 한다는 것..! 이전에 Front end 부분을 들었을 때 배웠던 내용이지만 요즘 백엔드 과정만 하다보니 까먹었던 내용이었다. </br>거기다 지금까지는 객체를 만들어서 이렇게 사용해본적이 없었기 때문에 당연히 new로 생서한 instance상태가 변경될 것이라고 생각을 했던 것이다.

그래도 이렇게 알게되었으니 모르는 것보다는 나은 것이라 생각한다.

이후 amount를 react state로 바꾸고 class의 method를 수정해 주니 돈 계산이 정상적으로 되었다.

그리고 추가적으로 selectProduct를 하면 amount에서 제품 가격이 차감이 되어야 하는데 이 부분 역시 Instance의 amount에서 계산을 해주어서 되지 않았다.</br> 이 부분 또한 react의 amunt를 인자로 넣어서 가격이 변동된 amount를 return 해주는 방식으로 변경하니 잘 작동되었다.

현재 나의 상태는 며칠 동안 고민하게 만들었던 기능들이 다 풀려서 매우 시원한 상태이다.

현재 면접도 준비해야 하고 팀 프로젝트에서 팀장을 맡고 있어서 상세한 내용을 적어보지는 못하였다.

이번에 진행한 미니 토이 프로젝트에 대한 전반적인 리뷰는 완성 후 진행하겠다.

- React로 Client 만드는 도중
  ```jsx
  TS2322: Type '{ products: Product[]; }' is not assignable to type 'IntrinsicAttributes & Product[]'.
    Property 'products' does not exist on type 'IntrinsicAttributes & Product[]'.
  ```
  → 해결 [StackOverflow](https://stackoverflow.com/questions/48240449/type-is-not-assignable-to-type-intrinsicattributes-intrinsicclassattribu)
