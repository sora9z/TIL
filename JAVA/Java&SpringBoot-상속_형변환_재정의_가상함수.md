# Java&SpringBoot-상속(Inheritance),형변환,재정의,가상함수

Category: JAVA
Visibility: Public
강의 번호: Java & SpringBoot
블로깅: No
유형: LESSON
작성일시: 2022년 1월 16일 오후 11:34

JAVA 4주차 수업 정리 3.1 ~3.5 TIL - 상속(Inheritance),형변환,재정의,가상함수

### Achievement Goals

- 객체간 상속에 대해 이해
- 상속을 하는 경우
- 하위 클래스 생성 과정과 형 변환 이해
- 메서드 재정의(Overriding)이해
- 가상메서드의 원리 이해

## 1. 상속(Inheritance)

- 이미 구현된 클래스보다 더 구체적인 기능을 가진 클래스를 구현해야 할 때 상송을 한다.
- 상속이란 이미 구현된 클래스의 기능을 그대로 하위 클래스가 물려받는 것을 말한다.

![https://madplay.github.io/img/post/2018-01-23-inheritance-in-java-2.jpg](https://madplay.github.io/img/post/2018-01-23-inheritance-in-java-2.jpg)

Class Diagram을 보면 화살표가 위에서 아래로 내려가지 않고 위를 향하게 표현한다. 

위의 그림에서 Person은 상속하는 클래스로 parent class, base class, super class로 불린다.

상속받는 class는 하위 클래스, child class, derived class, subclass 등으로 불린다.

- 상속 문법
    
    extends 키워드를 사용하여 B는 A를 상속받는 하위 Class임을 의미한다.
    
    ```java
    class B extends A{
    	...
    	...
    }
    ```
    
    - 자바는 단일 상속 (single inheritance) 이기때문에 extends 뒤에는 단 하나의 class만 올 수 있다.
    - 여러 개가 오게되면 모호성이 있을 수 있다. 뒤에 클래스가 오면 더 많은 확장이 가능하지만 그로인한 모호성들의 문제점이 발생하므로 자바는 애초에 없애버림
- 상속을 구현하는 경우
    - 상위 클래스가 하위 클래스보다 더 일반적인 개념, 기능을 갖는다.
    - 하위 클래스는 상위 클래스보다 더 구체적인 개념, 기능을 갖는다.
    - 단순히 어떤 기능이 필요해서 상속을 하는 것이 아니라, Class가 일반적인 class에서 기능을 확장시킹 때 상속을 받는 것이다.
    - class에서 if else if else 구문이 많다면 상속을 고려해 보는 것도 좋음
    
- protected 접근 제어자
    - 상위 클래스의 private은 하위 클래스에서 접근할 수 없다.
    - 외부 클래스에서는 접근이 불가능하지만 하위 클래스에서 접근이 가능하도록 protected 접근제어지시자를 사용한다.
    
    ```java
    public class Customer { // General Customer
    	protected int customerID; // 하위 클레스에서는 접근 가능 (protected)
    	protected String customerName;
    	protected String customerGrade;
    	int bounusPoint; // package default도 외부 class에서는 접근을 못 하므로 어느정도 hiding
    	double bounusRatio;
    
    	// constructor
    	public Customer() { // 일반 고객은 ratio와 grade 동일 
    		bounusRatio=0.01;
    		customerGrade="SILVER";
    	}
    ...
    ...
    }
    ```
    

## 2. 상속에서 클래스 생성 과정

- 하위클래스 생성 과정 :
    - 하위클래스를 생성하면 상위 클래스가 먼저 생성된다.(반드시 호출해야한다)
- super 키워드 :
    - 하위 클래스에서 가지는 상위클래스에 대한 참조값이다.
    - super()는 상위클래스의 기본생성자를 호출한다.
    - 하위클래스에서 명시적으로 상퀴 클래스의 생성자를 호출하지 않는다면 super()가 호출된다(상위 클래스에서 기본 생성자가 있어야한다)
    - 하지만 만약 상위클래스의 기본 생성자가 없고 다른 생성자가 있는 경우에는 super를 이용하여 명시적으로 상위 클래스의 생성자를 호출한다.
    - super는 상위 클래스 인스턴스의 참조값을 갖고있으므로 super를 이용하면 상위 클래스의 메서드, 맴버변수에 접근할 수 있다.
    - 만약 상위,하위 클래스에 모두 생성자가 없다면, 양쪽 다 기본 생성자가 추가되면서 하위에서 super를 호출한다.
    
    ```java
    // 상위 클래스의 생성자 (기본 생성자 x)
    public class Customer { // General Customer
    	...
    	...	
    	public Customer(int customerID,String customerName) {
    		this.customerID=customerID;
    		this.customerName=customerName;
    		
    		customerGrade="SILVER";
    		bounusRatio=0.01;
    		System.out.println("Customer(int,String) is called");
    	}
    ...
    ...
    }
    
    // 하위 클래스
    
    public class VIPCustmoer extends Customer{
    	
    	// super를 사용하여 명시적으로 생성자를 호출하였다
    	public VIPCustmoer(int customerID, String customerName) {
    		super(customerID, customerName); 
    		// TODO Auto-generated constructor stub
    		
    	}
    
    ...
    ...
    }
    
    ```
    

- 상속에서 인스턴스 메모리의 상태
    
    ![https://media.vlpt.us/images/ldevlog/post/84f72310-51fa-4f7c-9955-c729976497c8/image.png](https://media.vlpt.us/images/ldevlog/post/84f72310-51fa-4f7c-9955-c729976497c8/image.png)
    
    위의 그림에서 보듯이 항상 상위 클래스의 instance가 먼저 생성이되고 하위 클래스의 인스턴스가 생성된다.  
    
    private도 메모리는 만들어지지만 하위 클래스에서 접근을 하지는 못한다.
    

## 3. 형변환 (업케스팅)

- 상위 클래스로 변수를 선언하고 하위 클래스의 생성자로 인스턴스를 생성하는 것을 업케스팅이라고한다.
    - 하위 클래스는 상위 클래스의 type을 내포하고있기 떄문에 하위 클래스가 상위 클래스로 형변환 하는 것은 문제가 되지 않는다.
    - 하위 클래스가 상위클래스로 대입된다는 것을 binding된다고 한다.
    
    ```java
    Customer customerLee=new VIPCustomer(); // binding된다고 한다.
    ```
    
- 상위 클래스 변수에 하위 클래스 변수가 대입되는 것이다.
    
    ```java
    VIPCustomer vCustomer = new VIPCustomer();
      addCustomer(vCustomer);
    
      int addCustomer(Customer customer){
    
      }
    ```
    
- 하위 클래스는 상위 클래스의 타입을 내포하고 있으므로 상위 클래스로의 묵시적 형변환이 가능하다.
- 상속 관계에서 모든 하위클래스는 상위 클래스로 형변환(업케스팅)이 된다.

- 형 변환과 메모리
    
    ![https://media.vlpt.us/images/ldevlog/post/84f72310-51fa-4f7c-9955-c729976497c8/image.png](https://media.vlpt.us/images/ldevlog/post/84f72310-51fa-4f7c-9955-c729976497c8/image.png)
    
    - 형변환이 되면 상위클래스의 변수나 메서드는 상위 클래스의 변수,메서드에만 접근이 가능하다.
    
    ```java
    Customer vc = new VIPCustomer(); 
    ```
    
    위의 형변환 코드에서 vc는 힙메모리에 VIPCustormer에 대한 변수나 메서드는 생성되었지만, 변수타입이 Customer이므로 실제 접근 가능한 변수나 메서드는 Customer의 변수와 메서드이다.
    
    자식 클래스는 어차피 부모클래스의 변수나 메서드를 사용할 수 있는데 왜 형변환을 하는 것일까 ?  자식 클래스는 Overriding을 통해 부모 클래스의 메서드를 구체화하여 사용할 수 있다. 여러 하위 클래스가 똑같은 이름의 메서드를 overridig 했다고 했을 때 형변환을 통해  여러 하위 클래스들의 공통적인 부분을 이용하여 더욱 간단하게 만들 수 있다. 간단하게 아래와같이 Car라는 class를 선언하고 자식 클래스로 CarA CarB CarC를 선언했다고 해보자.
    
    ```java
    public class Car{
    	public void 시동On{
    }
    }
    
    public class CarA extends Car{
    
    	public void 시동On{
       // overriding
    	}
    }
    
    public class CarB extends Car{
    
    	public void 시동On{
       // overriding
    	}
    }
    
    public class TestClass{
    
    	public void 시동On(Car car){
    	car.시동On
    }
    
    // 만약 형변환을 하지 않는다면
    
    CarA a=new CarA();
    CarA b=new CarB();
    CarA c=new CarC();
    
    a.시동On();
    b.시동On();
    c.시동On();
    
    // 형변환을 한다면
    TestClass t = new TestClass();
    CarA a=new CarA();
    CarA b=new CarB();
    CarA c=new CarC();
    
    Car [] arr={a,b,c};
    for(int i=0;i<3;i++){
    	t.시동On(arr[i])
    }
    
    ```
    
    위의 코드처럼 만약 형변환을 하지 않는다면 같은 동작을 하는 각 인스턴스의메서드를 호출해야한다. 
    
    하지만 형변환을 한다면 마지막 코드와같이 작성이 가능하다.
    
    ## 4. 메서드 재정의(Overriding)
    
    Overriding이란 상위 클래스에서 정의된 메서드의 구현 내용이 하위 클래스에서 구현할 내용과 맞지 않는 경우 하위 클래스에서 동일한 이름의 메서드를 재정의할 수 있음을 의미한다. 
    
    ```java
    // 상위 클래스에서의 정의
    
    public int calPrice(int price) { // 보너스 포인트만적립  
    	
    		bounusPoint+=price*bounusRatio;
    		return price; // 우수 고객의 경우 할인율이 적용이 될 것이므로  
    	}
    
    // 하위 클래서에서의 재정의
    
    public class VIPCustmoer extends Customer{
    
    	@Override
    	public int calPrice(int price) { //@overiid가 붙으면 override라고 인식하고 명칭이나 정의등이 기존 것과 바뀌면 err
    		// TODO Auto-generated method stub
    		bounusPoint+=price*bounusRatio;
    		price-=(int)price*salesRatio;
    		return price; // original return	
    		
    	}
    }
    
    ```
    
- 형변환과 오버라이딩 메서드 호출
    - 자바에서는 항상 인스턴스의 메서드가 호출된다(가상메서드의 원리)
    
    ```java
    Customer vc=new VIPCustomer();
    // vc변수의 타입은 Customer이지만 인스턴스의 타입은 VIPCustomer이다.
    ```
    
    - 자바의 모든 메서드는 가상메서드이다(virture)
    
    ```java
    		Customer customerLee=new Customer(10010,"lelele");
    		customerLee.bounusPoint=1000;
    		int price=customerLee.calPrice(1000);		
    		System.out.println(price);
    		// 1000
    		
    		
    		VIPCustmoer customerKang=new VIPCustmoer(10020,"Kang so ra");
    		customerKang.bounusPoint=10000;
    		price=customerKang.calPrice(1000);
    		System.out.println(price); 
    		// 900
    		
    		Customer vc=new VIPCustmoer(12345,"noname"); // type change
    		// vc는 vip 라고 해도 customer 메서드 등만 사용 가능 
    		price=vc.calPrice(1000); 
    		System.out.println(price);  
    		// 900
    ```
    
    위의 코드에서 vc변수의 타입은 Customer이지만 인스턴스의 타입은 VIPCustomer이다. 자바는 인스턴스의 메서드를 사용하므로overriding된  VIPCustomer가 호출되었다.
    

## 5. 메서드 재정의와 가상메서드 원리

### (1) 메서드가 어떻게 호출되고 실행되는지 알아보자.

- 메서드의 이름은 주소값을 나타낸다.
- 메서드는  프로세스 구조에서 code영역에 위치한다.

```java
public class TestMethod {

	int num;

	void aaa() {
		System.out.println("aaa() 호출");
	}

	public static void main(String[] args) {

		TestMethod a1 = new TestMethod();
		a1.aaa();

		TestMethod a2 = new TestMethod();
		a2.aaa();
	}

}
```

![https://media.vlpt.us/images/ldevlog/post/c17417fb-a6be-46d0-adf0-0eed6fa065ad/image.png](https://media.vlpt.us/images/ldevlog/post/c17417fb-a6be-46d0-adf0-0eed6fa065ad/image.png)

1. main 함수가 실행되면 main 함수의 지역변수들이 stack에 할당된다.
    1. args, a1,a2
2. Instance는 heap 메모리에 저장이 되고 stack에 있는 변수는 그 주소값이 저장되어 각 instance를 참조한다.
3. aaa를 호출하라는 메소드를 호출하면 메서드 영역에서 호출이된다.

(만약 aaa에서도 선언된 변수가 있다면 stack에 추가된다)

### (2)가상 메서드의 원리

- 가상 메서드 테이블(virture method table)에서 해당 메서드에 대한 address를 가지고있다.
- 재정의된 경우에는 재정의된 메서드의 주소를 가리킨다.

![https://media.vlpt.us/images/ldevlog/post/858b7c8e-641e-47fc-bb5f-d10488f7a84c/image.png](https://media.vlpt.us/images/ldevlog/post/858b7c8e-641e-47fc-bb5f-d10488f7a84c/image.png)

![https://media.vlpt.us/images/ldevlog/post/e1741d44-e232-4c2b-aa6c-b62522dd45e9/image.png](https://media.vlpt.us/images/ldevlog/post/e1741d44-e232-4c2b-aa6c-b62522dd45e9/image.png)

상속, 형변환, 재정의, 가상함수 테이블을 이해해야 다형성이 구현된다는 것을 이해할 수 있다.