# Java & SpringBoot-StringObject

Category: JAVA
Visibility: Public
강의 번호: Java & SpringBoot
블로깅: No
유형: LESSON
작성일시: 2021년 12월 28일 오전 12:57

## JAVA String Object

### 1. JAVA String Object

java에서 String 키워드는 객체이다. JAVA 플렛폼은 string을 조작하기 위해 String class를 제공한다.

String은 immutable한 성질을 갖는다. immutable이란 수정을 할 수 없다는 것을 의미한다. 

[Strings In Java](https://androidexample.com/java/strings)

[Java String - javatpoint](https://www.javatpoint.com/java-string)

### 2. How to create String object in java

java에서 String을 생성하는 방법은 두 가지가 있다. 

1. “  “ 을 사용하여 생성하는 방법 (String Literal)
2. class의 new 키워드를 하용하는 방법.

1. String Literal 

```java
String s = "JAVA Literal String";
```

- 이 방법으로 String을 생성하다면 이 객채는 String pool이라는 공강에 저장이 되고, string 값 또한 string pool에 저장이 된다.
- string literal로 string이 생성되면 java는 먼저 string pool을 확인하여 동인할 string이 있는지 확인한다.
- 만약 존재한다면 이 strinf value의 참조값을 return 하고 없다면 새로운 string을 string pool안에 생성 후 새로운 string의 참조값을 반환한다.

```java
String s1="Welcome" // 새로운 string을 생성한다
STring s2="Welcome" // string poll에 이미 존재하므로 새로운 문자를 생성하지 않는다.
```

![https://static.javatpoint.com/core/images/java-string.png](https://static.javatpoint.com/core/images/java-string.png)

- String Literal을 사용하는 이유는 조금 더 효율적인 메모리를 사용하기 위해서라고 한다 (존재하는 string을 새로 만들지 않기 때문에)

** Constant Pool 이란? **

Constan Pool은 literal 상수 값을 저장하는 곳이다. String 뿐만 아니라 숫자,문자열,식별자 이름, 참조값 등이 들어있다. 

** String Pool 이란? **

JVM은 리터럴리 할당된 String을 String Pool이라는 테이블에 저장하고, 만약 String Pool에 값이 존재할 경우 인덱스만 참조하게 한다.

1. String Object

```java
String exString = new String("jajavava");
```

new 키워드를 사용하여 String을 생성하면 string check은 수행되지 않고 string object는 heap memory에 생성된다. 

아해의 예시를 통해 두 가지 방법을 비교해보자. (참조한 사이트 코드)

```java
public class String_Example {
 
  public static void main(String[] args) {
      
      // String pool에 새로운 String을 생성한다.
      String stringPool1 = "Java";
       
      // String pool에 생성한다.
      String stringPool2 = "Example";
       
      // String pool에 해당 string이 있는지 확인한다
      // 존재하기 때문에 새로운 String을 생성하지 않는다.
      // 이미 존재하는 String의 주소값을 반해준다.
      String stringPool3 = "Java";
       
      // new 키워드이므로 String pool을 확인하지 않는다.
      // Heap memory에 새로운 객체를 생성한다.
      String stringObject = new String("Java");
             
  }
 
}
```

참조한 사이트에서 퍼온 그림인데 매우 설명이 잘 되어있다.

![https://androidexample.com/upload/content/String_pool_String_object_storage_heap.png](https://androidexample.com/upload/content/String_pool_String_object_storage_heap.png)