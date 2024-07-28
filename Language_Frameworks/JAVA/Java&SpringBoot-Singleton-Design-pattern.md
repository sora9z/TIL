# Java&SpringBoot-Singleton-Design-pattern

Category: JAVA
Visibility: Public
강의 번호: Java & SpringBoot
블로깅: Yes
유형: LESSON
작성일시: 2022년 1월 15일 오전 10:16

JAVA 3주차 수업 정리 TIL - Singleton

# Singleton pattern

### Singleton Structure

![https://media.vlpt.us/images/hyungjungoo95/post/30d13b27-1484-484b-b5cb-723f38b9d3a9/singleton-structure.png](https://media.vlpt.us/images/hyungjungoo95/post/30d13b27-1484-484b-b5cb-723f38b9d3a9/singleton-structure.png)

위의 Struture는 

- 맨 위에는 Class의 이름
- 변수
- 생성자, 메서드

로 나뉘어져있다. -는 Private을 의미하고 public은 + 를 의미한다. 

 - instance : private 변수 

 - private Singleton (private) , public getInstance(메서드)

- Singleton pattern이란, 어떤 Class가 최초 한 번만 메모리를 할당하고(Static) 그 메모리에 객체를 만들어 사용하는 Design pattern이다.
- 주고 DBCP(Database Connection Pool)와 같은 상황에서 많이 사용된다.
- 프로그램에서 instance가 단 한 개만 생성되어야 하는 경우 사용한다.
- 생성자를 여러 번 호출해도  객체는 오직 한개만 생성된다.

보통 아래의 코드와 같이  객체를 구현하다.

```java
public class Company{
  // Instance 
	private static Company instance=new Company();

	// Private constructor
	private Company() { }

	public static Company getInstance(){
		if(instance==null)
			instance=new Company();

		return instance;
	}
}
```

- 위의 코드에서는 기본 생성자를 private을 사용하여 외부에서 생성을 불가능하게 하였고, Instance 또한 class 내부에서 private으로 선언하여 생성하였다.
- getInstance를 통해서만 생성이 가능한데, 이 메서드는 내부적으로 Instance가 생성되지 않았다면 생성하고, 있다면 그 Instance를 반환한다.
- Instance 변수와 Instance 생성 메서드는 static으로 선언된 정적 변수 및 메서드이다. 당여하게도 기본 생성자를 생성할 수가 없기 때문에 외부에서 접근을 하려면 static으로 선언되어야 한다.

### Singleton을 사용하는 이유? 장점

1. 한 번의 객체 생성으로 메모리 낭비를 방지할 수 있다.
2. 다른 객체과 공유하기 용이하다.

### Singleton의 단점 , 문제점

Multi-thread환경에서는 여러 쓰레드가 공유되는 상황이기 때문에 여러 Instance가 생성될 수 있어 안전하지 않은 문제점이 있다. 

이런 경우 정적 변수에 인스턴스를 만들어 초기화하는 방법으로 해결할 수 있다. 또한 synchronize 키워드를 사용하여 동기적으로 진행하게 하면 쓰레드에 의한 동시 접속을 해결할 수 있다. 

또란 싱글톤객체는 공통으로 사용하기 때문에 각 객체간 결합도가 높아진다.  이는 싱글통객체의 변경에 의해 참조한 값의 변경 또한 발생되어야 함을 의미한다. 이는 객체지향프로그램 페러다임에 어긋나는 방향이다. 

[조금 더 알아보기](https://blog.seotory.com/post/java-singleton-pattern)