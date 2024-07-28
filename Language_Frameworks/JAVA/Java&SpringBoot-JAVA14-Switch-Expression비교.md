# Java & SpringBoot-JAVA14-Switch-Expression비교

Category: JAVA
Visibility: Public
강의 번호: Java & SpringBoot
블로깅: No
유형: LESSON
작성일시: 2022년 1월 6일 오후 2:12

## Java & SpringBoot-JAVA14-Switch-Expression비교

Switch-case 문은 비교 조건이 특정 값이나 문자열인 경우 사용한다.

자바14부터 break문을 사용하지 않아도 되고 조금 더 간결하게 변경되었다.

1. 기존의 Switch-Case문
- break문을 사용하여 case가 끝나면 switch 문을 나오게 해야한다.
- 비슷한 case의 경우 case 1: case 3: case:7 ...과 같이 작성이 가능하다.

```java
public class SwitchCaseTest {

	public static void main(String[] args) {

		int month = 10;
		int day;

		switch(month){

			case 1: case 3: case 5: case 7: case 8: case 10: case 12:
				day = 31;
				break;
			case 4: case 6: case 9: case 11:
				day = 30;
				break;
			case 2:
				day = 28;
				break;
			default:
				day = 0;
				System.out.println("존재하지 않는 달 입니다.");

		}
		System.out.println(month + "월은 " + day + "일입니다.");
	}

```

1. JAVA 14 Switch-Case문
    - case문이 끝날 때마다 break문을 사용하지 않아도 된다.
    - yield 키워드를 사용하여 return 값을 보낸다. 없는 경우 오류발생
    - 식으로 표현하여 반환값을 받을 수 있다.
    - 비슷한 case의 경우 case 1: case 3: 과 같이 하지 않고 “ , ”로 구분한다.
    

```java
public class SwitchCaseUpTest {

	public static void main(String[] args) {

		int month = 3;

		int day = switch (month) {
	    	case 1, 3, 5, 7, 8, 10,12 -> {
	    		System.out.println("한 달은 31일입니다.");
	    		yield 31;
	    	}
	    	case 4,6,9,11 -> {
	    		System.out.println("한 달은 30일입니다.");
	    		yield 30;
	    	}
	    	case 2 ->{
	    		System.out.println("한 달은 28일입니다.");
	    		yield 28;
	    	}
	    	default->{
	    		System.out.println("존재하지 않는 달 입니다.");
	    		yield 0;
	    	}
		};
		System.out.println(month + "월은 " + day + "일입니다.");
	}
}
```