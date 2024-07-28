# Java&SpringBoot-Generic-Programming

Category: JAVA
Visibility: Public
강의 번호: Java & SpringBoot
블로깅: No
유형: LESSON
작성일시: 2022년 1월 26일 오후 2:52

JAVA 6주차 수업 정리  자바의 유용한 클래스들

# Grneric Programming

### Achievement Goals

- Genertic Programming에 대해 이해한다.
- <>  다이아몬드 연산자의 사용에 대해 이해한다
- T extends를 사용하여 자료형의 범위를 제한할 수 있다.
- Generic Method에 대해 이해하고 활용

# 1. Generic Programming

### 1. Generic이란 무엇이고 왜 사용하나?

[Generics in java](https://www.geeksforgeeks.org/generics-in-java/)

위의 사이트에서 나와있듯이 Generic 이란 Type을 매개변수화 한 것을 의미한다. Integer , String 또는 사용자 정의 유형 등의 Type들이  Class , Interface, Method 에 대한 매개변수가 될 수 있다는 말이다. 

이런 Generic을 사용하여 다양한 데이터 타입으로 작동이 가능한 클래스를 생성할 수 있다.

즉, 마치 타입을 매개변수로 대체하고 클래스를 사용할 때 사용 할 타입을 매개변수로 전달하여 사용이 가능하다는 의미이다.

아래의 코드를 통해 Generic을 사용하는 경우와 아닌 경우를 비교해보자.

- 3D Printer Class를 만드려고 한다. 이 3D printer는 material이라는 변수에 재료를 넣고 작업을 한다. 재료는 Powder인 경우와 Plastic 두 가지가 있다.

이 경우 두 가지 방법을 사용할 수 있다. 

1. material의 type이 Plastic인 3DPrinter 와 material의 Type이 Powder인 2 개의 3D 프린터 Class를 생성하는 방법

```java
// 1, 두 개의 Class 생성
// ThreeDPrinterPowder
public class ThreeDPrinter1 {
	
	private Powder material;

	public Powder getMaterial() {
		return material;
	}

	public void setMaterial(Powder material) {
		this.material = material;
	}

}

// ThreeDPrinterPlastic
public class ThreeDPrinter2 {
	
	private Plastic material;

	public Plastic getMaterial() {
		return material;
	}

	public void setMaterial(Plastic material) {
		this.material = material;
	}
}

```

하지만 이런 방법은 재료가 추가될 때 마다 3DPrinter를 새로 만들어야 하므로 효율적이지 못하다.

1. material을 Object type으로 만들어 한개의 3D Printer Class를 마드는 방법이 있다. 

```java
// 2. Object type 사용
public class ThreeDPrinterObject {
	
	private Object material;    //어떤 재료든 적용 가능 

	public Object getMaterial() {
		return material;
	}

	public void setMaterial(Object material) {
		this.material = material;
	}
}
```

 하지만 이 경우 사용할 때마다 사용 할 타입으로 Downcasting을 해줘야 하는 번거로움이 있다. 

```java

public class ThreeDPrinterTest {

	public static void main(String[] args) {
		
		ThreeDPrinterObject printer = new ThreeDPrinterObject();
		Powder powder= new Powder();
		
		printer.setMaterial(powder);
		
		// material을 불러와보자   -> 이런 방식은 번거롭다  
		Powder p=(Powder)printer.getMaterial(); // downcasting 		

	}

}
```

### 2. Generic Class

- Generic은 자료형을 미리 정하지않고 그 자리에 매개변수를 대신 사용한다. 사용할 떄 이 매개변수에 Type을 넣으면 된다.
- 자료형 매개변수 T(Type parameter) 를 다이아몬드 연산자 < > 에 넣어서 제네릭 자료형을 선언한다.

```java
BaseType <Type> obj = new BaseType <Type>()
```

- 아무 문자나 사용이 가능하지만  , E : element , V : value, K: key등 여러 알파벳을 의미에 따라 사용한다.
- Generic Type을 쓰는 Method는 generic method라고 한다.

위에서 예로 사용했던 3D printer를 Generic Class로 만들어보자.

```java
public class ThreeDPrinterGeneric<T>{
	private T material // T 자료형으로 선언
	
	public void setMaterial(T material) {
		this.material = material;
	}

	public T getMaterial() {   //T 자료형을 반환하는 제네릭 메서드
		return material;
	}

	public String toString(){
		return material.toString();
	}
}
```

Generic Class로 만들기 위해 <T> 다이아몬드 연산자를 사용했고 material에 어떤 자료형이 올지 모르기 때문에 T자료형으로 선언하였다. 이제, 이 Class의 Instance를 만들 때 < > 안의 T대신 사용 할 자료형을 넣으면 된다.

```java
public class ThreeDPrinterGenericTest {

	public static void main(String[] args) {

		ThreeDPrinterGeneric<Powder> powderPrinter = new ThreeDPrinterGeneric<Powder>();
		powderPrinter.setMaterial(new Powder());
		System.out.println(powderPrinter);

		ThreeDPrinterGeneric<Plastic> plasticPrinter = new ThreeDPrinterGeneric<Plastic>();
		plasticPrinter.setMaterial(new Plastic());
		System.out.println(plasticPrinter);
```

참고로, new()를 통해  인스턴스를 만들 때 아래와 같이 자료혀은 생략 가능하다.

```java

ThreeDPrinterGeneric<Powder> powderPrinter = new ThreeDPrinterGeneric<>();  // 자료형 생략
		
```

# 2. <T extendes Class> 사용

- Object는 모든 Class들의 최상위 Class이기 때문에, Object reference는 어떤 Type의 객체이든 참조할 수 있다.(위의 Object Class를 사용항 코드에서와 같이)

- 이런 특성은 JAVA의 Type Safe에 반하는 특성이다.
    
    ** [Type Safe](https://stackoverflow.com/questions/260626/what-is-type-safe)란, Compile시 type을 판별하여 Type이 맞지 않으면 error를 발생시키는데 Runtime시가 아닌 컴파일 시 문제를 잡을 수 있다는 의미이다. **
    
- Generic 은 이 Type safe 특성을 추가해준다.  예시 코드를 보면서 이해해보자
    - 아래의 코드와 같이 ThreeDPrinterGeneric<T> 에  material 변수의 자료형을 상속받아서 구현다.
        - Material
            
            ```java
            public abstract class Material { 
            // 이런 경우 이 클ㄹ래스를 직적 쓰는 경우는 거의 없어서 abstract	
            	// 재료들이 공통으로 사용할 메서드들은 여기에 선언
            	
            	public abstract void doPrinting();
            }
            ```
            
        
        - Plastic
            
            ```java
            public class Plastic extends Material{ // Material 상속 받아야만 사용 가능 
            	
            	public String toString() {
            		return "Material is Plastic";
            	}
            
            	@Override
            	public void doPrinting() {
            		// TODO Auto-generated method stub
            		
            	}
            
            }
            ```
            
        - Powder
            
            ```java
            public class Powder extends Material{
            	
            	public String toString() {
            		return " Mamerial is Powder";
            	}
            
            	@Override
            	public void doPrinting() {
            		// TODO Auto-generated method stub
            		
            	}
            
            }
            ```
            
        
        - GenericPrinter
            
            ```java
            public class GenericPrinter<T extends Material>{
            // T에 대한 제한으로 extends Material 	
            	
            	private T material;
            
            	public T getMaterial() {
            		return material;
            	}
            
            	public void setMaterial(T material) {
            		this.material = material;
            	}
            	
            	public String toString() {
            		return material.toString();
            	}
            ```
            
        
        - Test
            
            ```java
            public class GenericPrinterTest {
            
            	public static void main(String[] args) {
            		Powder powder=new Powder();
            		GenericPrinter<Powder> powderPrinter=new GenericPrinter<>(); 
            		
            //		GenericPrinter powderPrinter=new GenericPrinter<>(); 
            //		// type을  쓰지 않으면 Object로 인식을 해서 
            //		Powder p=(Powder)powderPrinter.getMaterial(); // type 지정 필요 
            		
            		powderPrinter.setMaterial(powder);
            		
            		Powder p=powderPrinter.getMaterial();
            		
            		System.out.println(powderPrinter.toString());
            		
            		
            
            	}
            
            }
            ```
            
            ```java
            public class GenericPrinterTest {
            
            	public static void main(String[] args) {
            		Powder powder=new Powder();
            		GenericPrinter<Powder> powderPrinter=new GenericPrinter<>(); 
            		
            //		GenericPrinter powderPrinter=new GenericPrinter<>(); 
            //		// type을  쓰지 않으면 Object로 인식을 해서 
            //		Powder p=(Powder)powderPrinter.getMaterial(); // type 지정 필요 
            		
            		powderPrinter.setMaterial(powder);
            		
            		Powder p=powderPrinter.getMaterial();
            		
            		System.out.println(powderPrinter.toString());			
            
            	}
            
            }
            ```
            
        
        이렇게 선언을 하면, Instance 생성 시 Material을 상속받지 못한 재료 클래스는 T에 들어갈 수 없다.
        
        T에 무작위로 Class가 들어갈 수 없도록 사전에 차단을 하는 것이다.
        
        만약, 상속받지 않는 재료가 T에 들어갈 경우 T는 Object Type이 되어 Class가 기본으로 제공하는 메서드만 사용이 가능하게 된다.  이런 경우 위에서 Generic을 사용하지 않았을 때처럼 Downcasting을 따로 해주어야한다.
        
        # 3. Generic Function
        
        - type argument(자료형 매개변수)<T>를 사용하여 다양한 type을 method에 지정할 수 있는 메서드를 generic method라고 한다.
        - 자료형 매개변수를 메서드의 매개변수 또는 반환 값으로 갖는다.
        - Generic Class가 아니어도 내부에 Generic method는 구현하여 사용할 수 있다.
        - Generic method는 method 선언에서  return type을 적기 전에 <Type parameter>가 온다.
            
            ```java
            public <T> List<T> fromArrayToList(T[] a) {   
                return Arrays.stream(a).collect(Collectors.toList());
            }
            ```
            
            - <T> 의 의미는 이 method가 Generic Type T를  처리할 것임을 의미한다. return type이 있어도 Type paramter를 붙여야한다.
        - 한 개 이상의 자료형 매개변수를 지정할 수 있다.
            
            ```java
            public static <T, G> List<G> fromArrayToList(T[] a, Function<T, G> mapperFunction) {
                return Arrays.stream(a)
                  .map(mapperFunction)
                  .collect(Collectors.toList());
            }
            ```
            
        
        Code를 보면서 이해를 해보자
        
        - 두 점 (top, bottom)을 기준으로 사각형을 만들 때 사각형의 너비를 구하는 메서드를 구현한다.
            - Point Class를 만든다.
                - Point Class는 (x,y) 2차원 좌표를 갖는다.
                - 또한 x 와 y의 Type은 둘 다 정수 또는 실수일 수 있으며 한 개만 정수 또는 한 개만 실수 일 수 있다. → 자료형 매개변수를 두 개 선언해야한다는 의미이다.
            
            ```java
            public class Point<T, V> {
            	T x;
            	V y;
            
            	// Contstuctor 
            	Point(T x, V y({
            		this.x=x;
            		this.y=y
            	}
            public T getX(){
            	return x;
            }
            
            public V getY(){
            	return y
            }
            ```
            
        
        위의 코드에서 메서드는 Generic으로 선언되었다. generic type인 x 또는 y를 return해야 하므로 반환형이 타입 매개변수여야한다.
        
- makeRectangle Method
    
    이 메서드는 Point type 두 개 (두 저 top , bottom)을 입력으로 받아서  사각형의 넓이를 반환하는 메서드이다.  반환값을 double이고 Type parameter를 2개 (T,Y)를 처리한다.
    
    ```java
    public static<T,V> double makeRectangle(Point<T,V> p1,Point<T,V> p2) {
    		
    		double left=((Number)p1.getX()).doubleValue();
    		double right=((Number)p2.getX()).doubleValue();
    		double top=((Number)p1.getY()).doubleValue();
    		double bottom=((Number)p2.getY()).doubleValue(); 
    		
    		double width=right-left;
    		double heigh=bottom-top;
    		
    		return width*heigh;
    	}
    ```
    
- Test Code
    
    
    ```java
    public static void main(String[] args) {
    		
    		Point <Integer,Double> p1=new Point <Integer, Double>(0,0.0);
    		Point <Integer,Double> p2=new Point <>(10,10.0); // 안 써도 됨  
    		
    		double size=GernericMethod.<Integer,Double>makeRectangle(p1,p2); 
    		// static이므로
    		System.out.println(size);
    		
    	}
    ```