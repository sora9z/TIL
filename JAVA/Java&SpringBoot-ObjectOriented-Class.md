# Java & SpringBoot-ObjectOriented-Class

Category: JAVA
Visibility: Public
강의 번호: Java & SpringBoot
블로깅: No
유형: LESSON
작성일시: 2022년 1월 6일 오후 4:02

## Object Oriented-Class

### 1. 객체지향 프로그래밍

객체 지향 프로그래밍은  객체를 만드는 것부터 시작한다.

각 객체의 속성을 맴버 변수로 ,  객체의 어떤 역할을 method로 구현한다.

그후 객체간 서로 상호작용을 하며 협력을 하는 것이 객체지향 프로그래밍이다.

객체는  보통 Class로 구현을 하고, 대문자로 시작하는 것이 좋다. Java 파일에 여러 개의 class가 들어갈 수 있지만 public class는 한개여야 한다. (public class의 이름과 .java 파일의 명이름은 동일해야 한다)

### 2. 객체의 정의와 구현

Class를 사용하여 객체를 정의한다.

먼저, 학생 이라는 Class를 정의해보자 

- 학생 Class의 맴버변수 :  학생의 ID , 학생 이름, 학색의 주소
- 학생 Class의 메서드 : 학생의 정보를 보여주는 method , 학생의 이름을 가져오는 method

```java
// 객체의 귀현
Public class Student {
	public String studentName;
	public String address;

	public void showStudentInfo() {
		System.out.println(studentName + "," + address);
	}

	public String getStudentName() {
		return studentName;
	}
}

// 객체 사용

public static void main(String[] args){

		Student studentKang = new Student();
		studentKang.studentName = "라탱";
		studentKang.address = "동탄";

		studentLee.showStudentInfo();

		System.out.println(studentKang);
	}

```

method의 이름은 method를 사용하는 입장에서 네이밍을 하는 것이 좋다. method를 사용하는 것은 객체가 아니기 때문. 

객체를 사용할 때에는 Class를 기반으로 하여 생성된 Instance를 만들어서 사용한다. 인스턴스는 각각 다른 맴버변수 값을 갖게 된다. Class는 객체의 속성과 기능을 정의하고 구현해 놓은 “틀” 이라고 생각하면 된다.

객체는 Heap memory에 할당된다. C의 malloc으로 만든 heap 공간을 프로그래머가 직접 해제해야하는 것과 달리 자바의 Gabage Collector가 주기젹으로  사용하지 않는 메모리를 해제하므로 신경쓰기 않아도 된다.

![https://www.journaldev.com/wp-content/uploads/2014/08/Java-Heap-Stack-Memory.png](https://www.journaldev.com/wp-content/uploads/2014/08/Java-Heap-Stack-Memory.png)

### 3. Class 생성자와 생성자 오버로딩

생성자는 객체를 생성하기 위해 new 키워드와 함께 호출된다.

생성자는 Class를 만들 때 직접 구현한다. 구현하지 않았다면 컴파일러가 기본 생성자(default 생성자)를 제공해준다.

생성자는 클래스 이름과 동일하고 반환값이 없으며 상송되지 않는다.

- Default Contructure

클래스에 생성자가 구현되어있지 않다면 컴파일러가 기본 생성자를 넣어준다.

```java
public StuentClass(){} 
```

하지만 기본 생성자는 위와 같이 아무런 초기화가 되어있지 않은 상태이며 따로 맴버변수에 값을 넣어주어야 한다.

- 생성자의 구현

Class Student의 생성자를 만들어보자. this 키워드는 현재의 객체를 의미한다. 

```java
class {
// 구현 할 class 내부에 생성자를 작성한다
	public Student(int studentNumber, String studentName, int grade){
		this.studentNumber=studentNumber;
		this.studentName=studentName;
		this.grade=grade;
	}
}

// 생성자의 사용

public class Test {
	public static main(String[] args) {

	Student studentKang = new Student(11111,"Kang",3) // 생성자의 호출과 초기화
}
```

생성자를 따로 구현하면 기본생성자는 따로 제공되지 않는다. 만약 기본생성자를 사용하고 싶다면 따로 class에 구현을 해야한다

```java
public Student(){}
```

여러 생성자를 구현하고 필요에 따라 호출해서 사용할 수 있다. 두 개 이상의 생성자를 구현하는 경우를  생성자 Overloading이라고 한다.