# Java&SpringBoot-Interface란?

Category: JAVA
Visibility: Public
강의 번호: Java & SpringBoot
블로깅: No
유형: LESSON
작성일시: 2022년 1월 21일 오전 9:48

JAVA 4주차 수업 정리 3.11 ~3.15 TIL - Interface_Interface와 상속

### Achievement Goals

- Interface는 무엇이고 왜 쓰는지 알아본다.
- Interface의 구현에 대해 알아본다.
- 자바8 이후에 추가된 인터페이스 기능은 무엇이 있는지 알아본다
- Interface의 Implement에 대해 알아본다.

Interface는 [객체지향 개발 5대 원칙SOLD](https://velog.io/@lsb156/%EA%B0%9D%EC%B2%B4%EC%A7%80%ED%96%A5-%EA%B0%9C%EB%B0%9C-5%EB%8C%80-%EC%9B%90%EC%B9%99-SOLID) 을 만족시킬 수 있는 도구라고 한다.

Interface란 무엇이고 어떻게 구현하는지 알아보자.

# 1. 인터페이스란? (Interface)

인터페이스란?

[https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrgAeM%2FbtqN2VpqaBi%2FkanTFm2nCAyOjYIQL95Bik%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrgAeM%2FbtqN2VpqaBi%2FkanTFm2nCAyOjYIQL95Bik%2Fimg.png)

Interface는 단지 추상 메서드들을 나열한 형태이다. 구현도 되지 않는 메서드들의 나열을 왜 사용할까?

- Interface의 추상 메서드들의 나열은 클래스나 프로그램이 제공하는 기능을 명시적으로 선언한 형태이다. 이 명세를 보고 클라이언트 프로그램은 선언되어있는 명세만 보고 이를 구현한 클래스를 사용할 수 있다.
- Interfacesms 클래스를 정의할 때 틀을 제공한다. 즉, 객체를 만들 때 어떻게 구성해야 하는지에 대한 설계도 (틀) 이다. 공통적인 틀을 제공하기 때문에 공통 목적을 갖는 클래스들의 기능을 일관되게 표준화 시킬 수 있다
- 자식 클래스는 부모 클래스를 상속한다. 하지만 인터페이스는 “구현한다”라고 한다. 어떤 클래스가 어떤 인터페이스를 구현한다는 것을 “그 인터페이스 타입” 이라고 한다.
- 클래스들 사이에서 중간 매개역할을 한다.

정리해보자면

Interface는 클라이언트 프로그램에서 구현을 보지 않고도 객체를 사용할 수 있는 매개체 역할을 하고,

공통적인 목적을 갖고있는 클래스들의 틀을 제곤하는 역할을 한다. 솔직히 말로 풀어서 쓰는 것보다 직접 코드를 보고 작성해 보면서 이해하는 것이 빠르니 인터페이스가 어떻게 구현되는지 알아보자.

# 2. 인터페이스 선언

인터페이스는 아래와 같이 선언한다

```java
[public] interface InterfaceName{

	// 상수 public static final pi=3.14F;
	double PI=3.14
	int ERROR=-99999999;
	// 추상 메서드 public void makeSomething();
	int add(int num1, int num2);
	int substract(int num1, int num2);
	int times(int num1, int num2);
	int divide(int num1, int num2);

}
```

- interface 선언은 interface 키워드를 사용하고 naming은 Camel Case로 한다.
- interface는 공개가 목적이기 때문에 접근 지정자는 public밖에 없다. public을 하지 않으면 interface가 있는 package 내에서만 사용이 가능하다.
- Interface는 구현코드가 없기 때문에 맴버변수를 갖고있을 수 없고 상수화 된다.
  (모든 변수는 따로 지정하지 않아도 public static final로 컴파일 된다.
- 모든 메서드 또한 따로 지정하지 않아도 public abstract로 컴파일 된다.
- interface도 class처럼 .java 파일로 작성이 된다.
- 컴파일러 (java.exe)를 통해 바이트 코드 형태의 .class 파일로 컴파일 된다.
- Java7까지는 상수필드, 추상 메서드만 선언이 가능하다
- Jav8이후 부터는 default method, static method , private 메서드(Java 9 이후 ) 선언이 가능졌기 때문에 일부 구현코드가 있다.

  - **Default Method는 구현을 갖는 메서드이다.**
    - 인터페이스를 구현하는 클래스들에서 공통으로 사용할 수 있는 기본 메서드이다.
    - 구현하는 클래스에서 재정의도 가능하다.
    - 당연히 인터페이스를 구현한 클래스의 인스턴스가 생성되어야 사용 가능하다.
    - public을 명시적으로 사용하지 않아도 Compile Time에 자동으로 선언 된다.

  ```java
  // Java 8이후 Default method
  default void description(){
  	System.out.println("Default method example");

  }

  // 구현하는 클래스에서 재정의

  @Override
  public void description(){
  	// super.description();
  	System.out.println("Overriding default methodw");
  }

  ```

  - **Static Method 는 인스턴스 생성과는 상광 없이 인터페이스 타입으로 사용할 수 있다.**
    - 만약 많은 인스턴스에서 중복으로 쓰이는 메서드가 있는 경우, 이를 중복적으로 인스턴스에서 만들어야 하므로 비표율적이다. static 메서드를 만들면 공통으로 사용할 수 있다.
    - public을 명시적으로 사용하지 않아도 Compile Time에 자동으로 선언 된다.

  ```java
  static int total(int[] arr){
  	int total=0;
  	for(int i:arr){
  		total+=1;
  	}
  	mystaticMethod();
  	return total'
  }
  ```

  - **Private Method (Java 9이후)**
    - 인터페이스를 구현한 클래스에서 사용하거나 재정의 할 수 있다.
    - 인터페이스 내부에서만 사용하기 위해 구현하는 메서드이다.
    - default 메서드나 static 메서드에서 사용하기 위해 구현한다.

  ```java
  private void myMetho(){
  	System.out.println("private method");
  }

  default void description() {
  	System.out.println("정수 계산기를 구현합니다.");
  	myMethod();
  }
  ```

# 3. 인터페이스 구현

- 인터페이스는 구현코드가 없고 클래스가 이 인터페이스를 “구현한다”라고 한다.
- 코드에서 인터페이스의 메서드를 호출하면 인터페이스는 구현 객체의 메서드를 찾아서 호출한다.
- 그리고 객체는 추상메서드를 구현한 메서드를 갖고있어야 한다. 이 객체를 구현객체 라고 한다.
- 구현 객체를 생성하는 클래스는 구현 클래스라고 하다.
- 인터페이스를 구현한 클래스는 인터페이스 형으로 선언한 변수로 형 변환을 할 수 있다.
  - Calc calc = new CompleteCalc();
  - CompleteCalc는 Calc 인터페이스를 구현한 클래스이고 Calc은 interface 이다.
- interface의 구현은 implements 키워드를 사용하여 아래와 같다.

## 단일 인터페이스 구현

(다중 인터페이스 구현은 다음 포스팅)

단일 인터페이스는 아해와 같이 구현한다.

```java
public class ClassName impements InterfaceName{
	// 인터페이스의 추상 메서드 구현
}
```

### **단일 인터페이스 구현**

- Diagram
  아래 Diagram에서 기울어진 문자열은 추상 클래스임을 의미하고 점선 화살표는 Interface를 구현했음을 의미한다. 추상 클래스인 Calculator가 Calc타입 상속을 받고있다. CompleteCalc는 Calculator 클래스를 상속받는다.

![Untitled](./img/Untitled.png)

- 구현

  - Calc interface

    ```java
    public interface Calc{
    	double PI=3.14;
    	int ERROR=-99999999;

    	int add(int num1, int num2);
    	int subtract(int num1, int num2);
    	int times(int num1, int num2);
    	int divides(int num1, int num2);

    ```

  - Calculator 추상 클래스

    ```java
    public abstract class Calculator implements Calc{
    	@Override
    	public int add(int num1, int num1){
    		return num1+num2;
    	}

    	@Override
    	public int substract(int num1, int num2){
    		return num1-num2;
    	}
    }
    ```

    - Interface의 Method를 다 구현하지 않았기 때문에 추상클래스이다.

  - CompletCalc

    ```java
    public class CompletCalc extends Calculator{

    	@Override
    	public int times(int num1, int num2){
    		return num1*num2;
    	}

    	@Override
    	public int divide (int num1,int num2){
    		if(num2===0) return ERROr;
    		return num1/num2;
    	}
    	// 추가 메서드
    	public void showInfo(){
    		System.out.println("Add method");
    	}
    }
    ```

- 구현

  - Calc는 interfaced이고 Calculator는 추상 클래스이므로 instance를 생성하지 못한다.

  ```java
  public static void main(String[] argss){

  	int num1=10;
  	int num2=2;

  // 구현된 메서드는 CompleteCalc 또는 Calculator 메서드이다.
  	Calc calc= new CompleteCalc(); // calc는 interface의 메서드만 쓸 수 있다.
  	System.out.println(calc.add(num1, num2));
  	System.out.println(calc.substractt(num1, num2));
  	System.out.println(calc.times(num1, num2));
  	System.out.println(calc.divide(num1, num2));

  // Result
  12
  8
  20
  5

  ```

  - Interface를 구현한 클래스는 인터페이스 형으로 선언한 변수로 형변환 할 수 있다.
  - 형변환을 하는 경우 아래와 같이 interface에 선언된 메서드만을 사용 가능하다.
    ![Untitled](./img/Untitled%201.png)
