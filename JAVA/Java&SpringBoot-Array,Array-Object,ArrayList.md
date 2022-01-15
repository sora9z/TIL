# Java&SpringBoot-Array,Array-Object,ArrayList

Category: JAVA
Visibility: Public
강의 번호: Java & SpringBoot
블로깅: No
유형: LESSON
작성일시: 2022년 1월 15일 오전 11:24

JAVA 3주차 수업 정리 TIL - Array,Array list

## 1. Array(배열)

- 자바에서의 배열 선언 & 초기화

```java
// 선언
int[] nums= new int[10];
int array[] = new int[20];

// 초기화
// default : 정수 : 0 실수 : 0.0 ,객체 : null
// 다른 값으로 초기화
int[] nums=new int[] {10,20,30}; // 개수는 생략한다.

int[] nums={10,20,30} // 선언과 동시에 초기화 하는 경우는 new int[] 생략 가능

int[] array; // 선언만
array=new int[] {10,20}; // new int [] 필수
```

- 배열의 길이 ≠ 요소의 개수
  - 배열을 선언할 경우 개수만큼 메모리가 할당되지만, 실제 데이터가 없는 경우도 많다.
  - length 속성은 배열의 개수만을 반환해주기때문에 요소의 개수와는 다르다.
  - 요소의 개수를 알기 위해서는 count 변수를 만들어서 사용해야한다.
- 향상된 for문
  JAVASCRIPT의 for(let elem of array) 와 비슷하게 index가 아닌 요소로 반복문을 돌리는 것이 가능하다.
  ```java

  char[] alphabets = new char[26];
  char ch='A';
  // gerneral for
  for(let i=0;i<alphabetes.length;i++) alphabetes[i]=char++;

  // advanced for
  for(char alpha : aphabetes){
  ..
  ...
  }
  ```

## 2. Object Array & 다차원 배열

- 객체배열

일반 배열의 경우 선언과 동시에 배열의 크기만큼 메모리가 할당되지만, 객체배열은 요소가 되는 객체의 주소가 들어갈 4바이트, 8바이트의 메모리만 할당이 되고 (null이 기본값) 각 요소의 객체는 생성해서 직접 저장해야한다.

```java
Bok[] library=new Book[5]

library[0]=new Book("titla","kang");
libraty[1]=new Book("title2","so");
```

- 객체 배열 복사

JAVA에서는 배열을 복하사는 메서드를 제공해준다.

- System.array.Copy(src,srcPos,dest,destPos,length)
  - src : source
  - dest : detination
  - length : 얼마나
  - destPos 어디 위치부터 복사를 할 것인지
- 얕을복사 : 객체의 주소만 복사된다. 두 배열은 같은 객체를 가리키게된다.

```java
Book[] library=new Book[5];
Book[] copyLibrary=new Book[5];

... // library에 값 할당
...

System.arraycopy(library,0,copylibrary,0,5);
// 이 경우 얕은 복사가 된다.
```

- 깊은복사 Deep Copy : 각 객체를 생성하여 그 객체의 값을 복사하여 배열이 서로 다른 객체를 가리키도록 한다.
  - 깊은 복사를 하려면 Instance를 만들어주어야 한다. 값은 같지만 다른 값을 같는 객체가 된다.

```java
for(int i=0;i<library.length;i++){

	copyLibrary[i].setTitle(library[i].getTitle());
}
```

- 다차원배열

**이차원 이상으로 구현된 배열**

```java
int[][] arr={{1,1,1},{2,2,2}};

// 접근은 다른 언어와 다를 바 없이 이중 for문으로
```

## 3. ArrayList : 객체 배열을 구현한 class

ArrayList는 java.util 패키지에서 제공된다.

- 기존의 배열 선언과 사용방식은 배열의 길이를 정하고 요소의 개수가 배열의 길이보다 커지면 배열을 재할당하고 복사해야했다.
- 배열의 요소를 추가하거나 삭제하면 다른 요소들의 이동에 대한 구현을 해야한다.
- ArrayList는 객체 배열을 조금 더 효율적으로 관리하기 위한 class이다.
- ArrayList 주요 메서드

| Method              | Description                                                   |
| ------------------- | ------------------------------------------------------------- |
| boolean add(E d)    | 요소 한 개를 배열에 추가한다. E는 요소의 자료형이다.          |
| int size()          | 배열에 추가된 요소 전체 개수를 반환한다.                      |
| E get(int index)    | 배열의 index 위치에 있는 요소 값을 반환한다.                  |
| E remove(int index) | 배열의 index 위치에 있는 요소 값을 제거하고 그 값을 반환한다. |
| boolean isEmpty     | 배열이 비어있는지 확인한다.                                   |
|                     |                                                               |

사용 예제

```java
import java.util.ArrayList;

public static void main(Strin[] args){

	ArrayList<Book> library=new ArrayList<Book>();

	library.add(new Book("title1","sora");
	library.add(new Book("title2","kange");
```
