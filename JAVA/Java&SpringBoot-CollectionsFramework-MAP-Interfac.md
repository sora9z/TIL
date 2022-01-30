# Java&SpringBoot-Collections Framework-MAP Interface

Category: JAVA
Visibility: Public
강의 번호: Java & SpringBoot
블로깅: No
유형: LESSON
작성일시: 2022년 1월 28일 오후 11:29

JAVA 6주차 수업 정리  자바의 유용한 클래스들

# Collections Framework - MAP Interface

### Achievement Goals

- Comparable 과 Comparator란?
- Collections Framework의 Map Interface

[참조](https://opentutorials.org/course/1223/6446)

### 1. Comparable과 Comparator Interface

[참고블로그](https://m.blog.naver.com/PostView.nhn?blogId=occidere&logNo=220918234464&proxyReferer=https:%2F%2Fwww.google.co.kr%2F)

- Comparable Interface
    
    [Interface Comparable<T> API](https://docs.oracle.com/javase/8/docs/api/java/lang/Comparable.html)
    
    [JAVA Comparable intercace](https://docs.oracle.com/javase/8/docs/api/java/lang/Comparable.html)
    
    - 이 Interface는 사용자 정의 Class의 객체를 정렬하는데 사용한다.
    - java.lang.package에 있고 compareTo(Object) 한 개의 method가 포함되어있다.
    - JAVA에서 제공되는 정렬 가능한 클래스들은 모두 Comparable Interface를 구현하고 있다.
    - public int compareTo(Object) : this.Object와 인자로 주어진 Object와 비교하고 this.Object와 Object의 크기를 비교하여 보다 크면 양수, 작으면 음수, 같다면 0을 return 한다.
    - String, Integer들의 JDK의 많은 Class들은 이미 Comparable이 구현되어있다.
    
    ```java
    mport java.util.TreeSet;
    
    public class TreeSetTest {
    
    	public static void main(String[] args) {
    
    // String의 경우 이미 Comparable이 구현되어있으므로 treeSet에 사용 가하고
    // 오름차순으로 정렬되어 출력된다.
    
    		TreeSet<String> treeSet = new TreeSet<String>();
    		treeSet.add("홍길동");
    		treeSet.add("강감찬");
    		treeSet.add("이순신");
    
    		for(String str : treeSet) {
    			System.out.println(str);
    		}
    	}
    }
    ```
    
- [Compareator Interface](https://docs.oracle.com/javase/8/docs/api/java/util/Comparator.html)
    
    [Interface Comparator <T>](https://docs.oracle.com/javase/8/docs/api/java/util/Comparator.html)
    
    - 정렬 가능한 클래스(Comparable Interface를 구현한 클래스)들의 기본 정렬 기준과 다르게 정렬하고 싶을 때 사용하는 Interface이다.
    - sorteds set or sorted maps등 특정 자료구조의 순서를 제어하는데 사용될 수 있다.
    - package.java.util.Comparator에 있으며 주로 익명 클래스로 사용된다.
    - 기본적인 정렬 방법인 오름차순 정렬을 내림차순으로 정렬할 때 많이 사용된다.
    - Comparator interface를 implements후 compare() 메서드를 Override한 class를 작성한다.
    - 내림차순의 정렬 → 오름차순 정렬 로 변경할 경우
        - 파라미터1 < 파라미터2  return 음수    또는 파라미터1 == 파라미터2  return 0 의 경우 객체의  자리는 그대로 유지된다.
        - 파라미터1 > 피라미터2 return 양수 의 경우 객체의 자리는 변경된다.
    - 이미 오름차순으로 정렬되어있는 String을 Comparator를 사용하여 내림차순으로 구현하면 아래와 같다.
        
        ```java
        class MyCompare implements Comparator<String>{
        
        	@Override
        	public int compare(String s1, String s2) { 
        // 매개변수가 두 개이다.  한 개는 this이고 한 개는 비교 대상
        		return (s1.compareTo(s2)) *-1 ;
        	}
        }
        
        /// 내림차순으로 출력이 된다.
        public class ComparatorTest {
        
        	public static void main(String[] args) {
        
        		Set<String> set = new TreeSet<String>(new MyCompare());
        		set.add("aaa");
        		set.add("ccc");
        		set.add("bbb");
        
        		System.out.println(set);
        	}
        }
        ```
        
    
- [TreeSet](https://www.geeksforgeeks.org/treemap-in-java/)
    - TreeSet은 객체의 정렬에 사용하는 Class이다.
    - TreeSet Map은 key의 순서에 따라 또는 map 생성시 제공되는 Comparator에 의해 정렬이된다.
    - Set Interface를 구현하여 중복을 허용하지 않고 오름차순이나 내림차순으로 객체를 정렬할 수 있다.
    - 내부적으로 Binary Search trere로 구현된다.
    - 비교 대상이 되는 객체에 Comparable이나 Comparator 인터페이스를 구현 해야 TreeSet에 추가될 수 있다.
    
    [TreeSet](https://www.geeksforgeeks.org/treemap-in-java/) Class를 사용하여 정렬을 해보자.
    
    - Member라는 객체를 만들어 MamberTreeSet으로 관리하는 코드를 작성해보자. Member class는 오름차순으로 정렬이 되어야한다.
        - Member Class → 오름차순으로 정렬을 하기 위해 Comparable 인터페이스를 구현해야 한다.
        
        ```java
        // 
        public class Member implements Comparable <Member>{
        	private int memberId;
        	private String memberName;
        	
        	public Member(int memberId, String memberName){
        		this.memberId=memberId;
        		this.memberName=memberName;
        	}
        
        	// getter , setter ... 
        
        	@Override
        	public int compareTo(Member member){
        		return this.memberId-member.memberId ; 
        		// 만약 내림차순으로 정렬하고 싶다면 
        		// (this.memberId-member.memberId)*(-1) 
        	}
        
        	@Override
        	public boolean equals(Object obj) {		
        		if(obj instanceof Member) {			
        			Member member=(Member)obj;
        
        			if(this.memberId==member.memberId) {
        				return true;
        			}
        			else return false;
        		}
        		return false;		
        	}
        	
        	@Override
        		public int hashCode() {
        			return memberId;			
        		}
        ```
        
        - MemberTreeSet
            - TreeSet에서 값의 추가는 Binary Tree에서 처럼 값을 비교해 나가면서 적절한 위치를 찾는 과정을 거친다.
        
        ```java
        private class MemberTreeSet {
        	private TreeSet<Member> treeSet;
        
        	public MemberTreeSet(){
        		treeSet = new TreeSet<Member>();
        	}
        
        	public void addMember(Member member){
        		treeSet.add(member);
        	}
        // Iterator를 사용하여 조회를 한다.
        	public boolean removeMember(int memberId){
        	
        			Iterator<Member> ir = treeSet.iterator();
        	
        			while( ir.hasNext()){
        				Member member = ir.next();
        				int tempId = member.getMemberId();
        				if( tempId == memberId){
        					treeSet.remove(member);
        					return true;
        				}
        			}
        }
        ```
        
    
    - Test Code
        
        ```java
        import java.util.TreeSet;
        
        public class MemberTreeSetTest {
        	public static void main(String[] args) {		
        		
        		MemberTreeSet memberTreeSet=new MemberTreeSet();
        		
        		Member member1=new Member(200,"KIM");
        		Member member2=new Member(400,"Kang ");
        		Member member3=new Member(500,"Taeng ");
        		Member member4=new Member(100,"AIKI ");
        		Member member5=new Member(300,"ZㅐZ ");		
        
        		memberTreeSet.addMember(member1);
        		memberTreeSet.addMember(member2);
        		memberTreeSet.addMember(member3);
        		memberTreeSet.addMember(member4);
        		memberTreeSet.addMember(member5);		
        		
        		memberTreeSet.showAllMember();
        	}
        
        }
        
        /*Result
        KIM s ID is 100
        Kang  s ID is 200
        Taeng  s ID is 300
        AIKI  s ID is 400
        ZㅐZ  s ID is 500
        */
        ```
        
        들어간 순서와 상관 없이 ID 순으로 정렬되어 출력이 된다.
        
    
    이미 Mambersms Comparable로 오름차순으로 정렬이 되어있지만, 내림차순으로 다시 정렬을 한다고 했을 때 Comparator Interface로 비교하는 방식을 다시 구현할 수 있다.
    
    1. Member가 Comparator를 구현해야 한다. 
        
        Comparator를 구현하려면 compare 메서드를 재정의 해야한다. compare Method는 두 개의 매개변수가 있고, 한 개는 this, 한 개는 비교대상이다. 
        
        ```java
        import java.util.Comparator
        public class Member_Comparator implements Comparator<Member_Comparator>{
        
        	private int memberId;
        	private String memberName;
        	
        	public Member_Comparator(int memberId, String memberName){
        		this.memberId=mamberId;
        		this.memberName=memberId;
        	}
        
        // getter, setter....
        	
        // 이 Comparator를 사용하는 Class에서 
        // treeSet=new TreeSet<Member_Comparator>(new Member_Comparator()); 
        // 위와 같이 생성하므로 Default Constrctor가 Member_Comparator가 있어야한다.
        	public Member_Comparator() {}
        
        // Comparator를 구현하면 compare를 재정의 해야한다.
        	@Override
        	public int compare(Member_Comparator m1,Member_Comparator m2){
        		return (m1.memberId-m2.memberId)*(-1)  // 내림차수으로 정리 
        	} 
        @Override
        	public boolean equals(Object obj) {
        		
        		if(obj instanceof Member_Comparator) {
        			
        			Member_Comparator member=(Member_Comparator)obj;
        			if(this.memberId==member.memberId) {
        				return true;
        			}
        			else return false;
        		}
        		return false;		
        	}
        	
        	@Override
        	public int hashCode() {
        		return memberId;
        	}
        ```
        
    2. MemberTreeSet 에서 구현하기 위해서는 new 연산자 사용 시 Comparator되는 대상을 명기해 주어야 한다.
        
        ```java
        public class MemberTreeSet_Comparator {	
        	private TreeSet<Member_Comparator> treeSet;	
        	public MemberTreeSet_Comparator() {
        		
        		//Comparator의 경우 어떤 것으로 구현을 해놨는지 
        		// Comparator 되는 대상을  써줘야 한다. 				
        		treeSet=new TreeSet<Member_Comparator>(new Member_Comparator()); 
        		// new Member_Comparator() 으로Comparator가 
        		// 구현이 되어있으므로 이 클래스의 compare 함수 호출하여 비교를 하라는 의미이다.
        		// new Member_Comparator() 가 들어가므로 Member_Comparator는 defaut constructor가 있어야 한다.
        		// TreeSet생성자 에는 Comparator 를 parameter 로 받는 것이 있다. 그것을 쓴 것.		
        	}
        ```
        
    
    - Test Code
        
        ```java
        import java.util.TreeSet;
        
        public class MemberTreeSetTest_Comparator {
        
        	public static void main(String[] args) {	
        		
        		MemberTreeSet_Comparator memberTreeSet=new MemberTreeSet_Comparator();		
        		Member_Comparator member1=new Member_Comparator(200,"Kim");
        		Member_Comparator member2=new Member_Comparator(400,"Kang ");
        		Member_Comparator member3=new Member_Comparator(500,"Taeng ");
        		Member_Comparator member4=new Member_Comparator(100,"AIKI ");
        		Member_Comparator member5=new Member_Comparator(300,"ZㅐZ ");
        		
        		memberTreeSet.addMember(member1);
        		memberTreeSet.addMember(member2);
        		memberTreeSet.addMember(member3);
        		memberTreeSet.addMember(member4);
        		memberTreeSet.addMember(member5);		
        		
        		memberTreeSet.showAllMember();
        	}
        }
        
        /* Result
        Taeng  s ID is 500
        Kang  s ID is 400
        ZㅐZ  s ID is 300
        Kim s ID is 200
        AIKI  s ID is 100
        */
        
        ```
        
        결과를 보면 내림차순으로 정렬을 하는 것을 확인 할 수 있다.
        

### 2. MAP Interface

[참고](https://www.geeksforgeeks.org/map-interface-java-examples/)

![https://media.geeksforgeeks.org/wp-content/uploads/20220112221354/javamaphierarchy.jpg](https://media.geeksforgeeks.org/wp-content/uploads/20220112221354/javamaphierarchy.jpg)

- Map Interface 는 java.util package에 있는 Interface이다. Map Interface는 key - value를 쌍으로 관리하는 메서드를 구현한다.
- Map Interface에서 가장 많이 쓰이는 HashMap class는 검색을 위한 자료구조이다.
- key를 이용하여 값을 저장하고 key를 이용하여 값을 꺼내오는 방식이다. 값은 hash 알고리즘으로 구현된다.
- key가 되는 객체는 중복될 수 없다.
- 중복될 수 없으므로 유일성 비교를 위한 equals와 hasgCode 메서드를 구현해야 한다.

- memberId와 memberName을 맴버로 같는 Member 객체를 인자로 하는 HashMap을 코드로 구현해보자.
    - 이 HashMap은  key로 integer 타입을, value로는 Member 타입을 갖는 HashMap을 맴버 변수로 갖는다. HashMap은  두 개의 타입을 사용하므로 Generic으로 <Integer, Member>를 갖는다.
        
        ```java
        public class MemberHashMap {
        	
        	// key : integer 	Value : Member	
        	private HashMap<Integer,Member> hashMap;
        	// constructor
        	public MemberHashMap() {
        		hashMap=new HashMap<>();		
        	}
        ```
        
    - 요소를 추가하는 메서드는 hashMap의 put(Object, Object) method를 사용한다.  put method는 키와 값을 인자로 받고 hashMap에 추가한다. key는 Integer 타입의 memberId이며 value는 member 객체이다.
        
        ```java
        public void addMember(Member member) {
        		hashMap.put(member.getMemberId(),member);
        	}
        ```
        
    - 요소를 제거하는 메서드는 hashMap의 remove(Object)를 사용한다.Object는 key값으로, 이와 mapping되는 value를 제거한다.
        
        아래에서 정의한 메서드는  Int형의 memberId를 매개변수로 받으면 hashMap의 containsKey method를 사용하여 key가 hashMap에 존재하는지 확인을 하고 있다면 remove를 한다.
        
        ```java
        public boolean removeMember(int memberId) {
        		if(hashMap.containsKey(memberId)) {
        			hashMap.remove(memberId);
        		}
        		System.out.println("no element");
        		return false;
        	}
        	
        ```
        
    
    - 모든 요소를 한 개 한 개  출력하려면, Iterator를 사용해야한다.  하지만 hashMap에는 Iterator가 없으므로 key또는 value를 통해 Iterator를 사용해야 한다.
        
        ```java
        public void showAll() {
        		// iterator는 key 또는 val를 통해 사용이 가능 
        		Iterator<Integer> ir=hashMap.keySet().iterator();
        		
        		while(ir.hasNext()) {
        			int key=ir.next();
        			Member member=hashMap.get(key);
        			System.out.println(member);
        			// 그냥 hashmap 출력해도 된다 .
        		}
        	}
        ```
        
        - Test Code
        
        ```java
        import java.util.HashMap;
        public class MemberHashMapTest {
        	public static void main(String[] args) {		
        		MemberHashMap memberHashMap=new MemberHashMap();		
        		Member memberKang= new Member(1004,"kang");
        		Member memberKim= new Member(1005,"kim");
        		Member memberYang= new Member(1006,"yang");
        		Member memberBang= new Member(1009,"bang");		
        
        		memberHashMap.addMember(memberKang);
        		memberHashMap.addMember(memberBang);
        		memberHashMap.addMember(memberKim);
        		memberHashMap.addMember(memberBang);
        		memberHashMap.addMember(memberYang);
        		
        		memberHashMap.showAll();
        		
        		HashMap<Integer,String> hashMap=new HashMap<>();
        		hashMap.put(1001,"KK");
        		hashMap.put(1002,"SK");
        		hashMap.put(1004,"DK");
        		hashMap.put(1006,"FK");
        		
        		System.out.println(hashMap); 
        // key - value 쌍 으로 나옴 		
        	}
        }
        ```
        
        물론 그냥 hashMap을 출력해도 된다 . 결과는 key - value 쌍으로 출력된다.
        
        ```java
        /* Result
        bang s ID is 1009
        kang s ID is 1004
        kim s ID is 1005
        yang s ID is 1006
        {1001=KK, 1002=SK, 1004=DK, 1006=FK}
        */
        ```
        
    
- 전체 코드는 아래와 같다.

```java
import java.util.HashMap;
import java.util.Iterator;

public class MemberHashMap {
	
	// key : integer 	Value : Member
	
	private HashMap<Integer,Member> hashMap;
	
	// constructor
	public MemberHashMap() {
		hashMap=new HashMap<>();		
	}
	
	public void addMember(Member member) {
		hashMap.put(member.getMemberId(),member);
	}
	
	public boolean removeMember(int memberId) {
		if(hashMap.containsKey(memberId)) {
			hashMap.remove(memberId);
		}
		System.out.println("no element");
		return false;
	}
	
	public void showAll() {
		// iterator는 key 또는 val에서  
		Iterator<Integer> ir=hashMap.keySet().iterator();
		
		while(ir.hasNext()) {
			int key=ir.next();
			Member member=hashMap.get(key);
			System.out.println(member);
			// 그냥 hashmap 출력해도 된다 .
		}
	}

}
```