# [Clean Code ] 클린 코드와 그 첫걸음 네이밍

Category: Clean Code

# 1. 클린 코드와 그 첫걸음 네이밍

이 글은 Clean Code 강의를 보고 정리한 글이다. 클린코드 1~2장에 대한 강의 내용이다.

순서는 아래와 같다.

1. 나쁜 코드
2. 클린 코드
3. 의미 있는 이름 짓기
4. Google Java Naming Guide

### 1. 나쁜 코드

- 성능이 나쁜 코드 : 불필요한 연산
- 의미가 모호한 코드 : 이해하기 난해한 코드, 네이밍과 그 내용이 다른 코드
- 중복된 코드 : 충분히 재활욜 할 수 있음에도 하지 않아 중복된 코드로 인해 버그 발생

코드가 나쁜 이유는 무엇인가?

**깨진 유리창 법칙** 나쁜 코드는 계속 나쁜 코드가 만들어지도록 한다.

- 나쁜 코드는 팀의 생산성을 저하시킨다.
- 새로운 시스템을 만들어야 한다. 하지만 이를 대체할 새로운 system을 만드는 것은 매우 어렵다.

### 2. 클린 코드

- 깨끗한 코드는 한 가지를 제대로 한다.
- 깨끗한 코드는 단순하고 직접적이다.
- 깨끗한 코드는 잘 쑨 문장처럼 읽힌다.

(1) 성능이 좋은 코드

(2) 의미가 명확한 코드 = 가독성이 좋은 코드

(3) 중복이 제거된 코드 (재활용이 가능한 코드)

**보이스카우트 룰** "전보다 더 깨끗한 코드로 만든다"

### 3. 의미있는 이름 짓기

- 의미가 분명한 이름을 잦는다.

아래의 코드는 코드를 실행시킨 결과를 보고서야 의미가 명확해진다.

```java
int a;
String b;
// ....
System.out.printf('User Requested %s, count=%d",b,a);
// console Output
// User Requested book, count=3
```

```java
int itemCount;
String intemName;
// .....

System.out.printf('User Requested %s, count=%d",itemName,itemCount);
```

구체적인 내용을 변수 명에 넣어서 만들어주면 의미 전달이 명화해질 수 있다.

더 나아가서 class를 이용해서 비슷한 의미를 묶어줌으로서 더욱 명확하게 전달이 가능하다.

```java
class SalesItem{
	IetemCode code;
	String name;
	int count;
}
// .....
SalesItem selectedItem=salesItemRepository.getItemByCode(purchaseRequest.getItemCode())
System.out.printf('User Requested %s, count=%d",selectedItem.getName(),selectedItem.getCount());

```

위의 코드는 purchaseRequest에서 긁어온 SalesItem을 다시 SalesItem selectedItem에 넣어줌으로써 고객이 구매요청한 제품을 선탣한 제품으로 넣어주어 더욱 의미가 명확하게 전달된다. 또한 , purchaseRequest 라고 명확하게 네이밍을 했기 때문에 코드를 읽으면서 무슨 내용인지 유추가 쉽게 가능하다.

- 루프 속 ijk를 사용하지 말자.

  index를 사용하지 않을거면 advanced for 문으로 대체가 가능하다.

  for( let i=0 ;i<messages.length;i++) 대신에

  for(let message of messages)를 사용한다.

  현업에서는 i를 사용하는 경우가 거의 없다.

  만약, index를 통한 접근이 필요한 경우 의미가 전달될 수 있는 것으로 바꿔 사용한다.

  i, j → row, col / width, height

  i, j, k→row, col, depth

- 통잉성 있는 단어를 사용한다.

  Member / Customer / User 와 같이 비슷한 의미인 단어를 여기,저기 사용하면 파악하기 힘들다. 비슷한 의미는 하나로 통일하여 사용하는 것이 좋다.

- 변수명에 타입을 넣지 않는다.

String nameString (x) → name

Int itemPriceAmount(x) → itemPrice : price와 amount는 중복된 내용이다.

Account[] accountArray (x) → accounts

Map<Account> accountMap (o)

List<Account> accountList → accounts, accountList

Map이나 List의 경우에 위에 List 또는 Map을 써주는 경우가 종종 있다. 대체할 만한 적당한 어휘가 없다.

### 4. Google Java Naming Guide

- Package Naming Guid

All lower case, no underscores

```java
com.example.deepspace(o)
com.example.deepSpace(x)
com.example.deep_space(x)
```

- Class Naming Guide

UpperCamelCase

```java
// 클래스는 명사, 명사구
Character, ImmutableList

// 인터페이스는 명사, 명사구 . 또는 형용사
List, Readable

// 테스트 클래스는 Test로 끝내가
HashTest, HashIntegrationTest
```

- Method Naming Guide

LowerCamelCase

```java
// 메서드는 동사, 동삭구
sendMessage, stop

// jUnit 테스트에 uderscore를 사용하기도 한다.
// <methodUnderTest>_<state> 패턴

pop_emptyStack
```
