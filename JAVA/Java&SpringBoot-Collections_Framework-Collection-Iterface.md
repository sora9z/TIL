# Java&SpringBoot-Collections Framework-Collection Interface

Category: JAVA
Visibility: Public
강의 번호: Java & SpringBoot
블로깅: No
유형: LESSON
작성일시: 2022년 1월 28일 오후 6:57

JAVA 6주차 수업 정리  자바의 유용한 클래스들

# Collections Framework - Collection Interface

### Achievement Goals

- Collections Framework란?
- Collections Framework의 Collection Interface와 그 하위 구성

[참조](https://opentutorials.org/course/1223/6446)

## 1. Collections Framework

- Collections Framework이란,  Container라고도 부른다.  (그릇의 개념) JAVA는 다양한 상황에서 사용할 수 있는 다양한 Container를 제공하는데  이것을 Collections Feamework라고 부른다.
- 즉, 프로그램 구현에 필요한 자료구조들을 구현해 놓은 JDK 라이브러리이다.
- java.util pacakge에 구현되어있다.

![https://s3.ap-northeast-2.amazonaws.com/opentutorials-user-file/module/516/2160.png](https://s3.ap-northeast-2.amazonaws.com/opentutorials-user-file/module/516/2160.png)

- 위에서 보듯이 Collections Framework는 Collection , Map두 그룹으로 분류된다.
- Map 인터페이스는  key : value 쌍으로 이루어진 객체를 관리하는데 사용하는 메서드들이 선언된 Interface이다.
- Map은 내부적으로 Hash로 구현되어있다.

각 Interface에 대해 알아보자

## 1. Collecion interface

[Collection Interface in java tutorial](https://docs.oracle.com/javase/tutorial/collections/interfaces/collection.html#:~:text=A%20Collection%20represents%20a%20group,that%20takes%20a%20Collection%20argument.)

[Collection Interface API](https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html)

Collection Interface는 하나의 객체를 관리하기 위한 메서드가 선언된 인터페이스이다.  Collection Class에 저장된 데이터를 읽고, 추가하는 등의 기본적인 메서드들을 정의해 놓았다. List와 Set의 공통점을 모아 재정의한 인터페이스이다. 

- List Interface는 아래와 같은 특징을 갖는다.
    
    [List Interface API](https://docs.oracle.com/javase/8/docs/api/java/util/List.html#:~:text=The%20List%20interface%20provides%20a,specified%20position%20in%20the%20list.)
    
    - 객체를 순서에 따라 저장하고 관리하는데 필요한 메서드가 선언된 인터페이스이다.
    - 자료구조 리스트(배열, 연결리스트)의 구현을 위한 인터페이스이다.
    - 중복을 허용한다.
    - ArrayList, Vector, LinkedList가 모두 List Interface를 구현한다.

- Set Inerface
    
    [Set Interface API](https://docs.oracle.com/javase/7/docs/api/java/util/Set.html)
    
    - 순서와 상관없이 중복을 허용하지 않고 유일한 값을 관리하는데 필요한 메서드가  선언되어있다.
    - Id, 주민번호 등 유일해야 하는 값을 관리하는데 필요한 메서드가 선언되어있다.
    - 저장순서, 출력순서는 다를 수 있다.
    
- Collection 요소의 순회
    - List Interface의 경우 get(i) 메서드를 사용할 수 있으므로 반복문과 get(i)를  같이 사용하여 순회를 한다.
        - Member 객체들이 들어있는 ArrayList에서 지우고 싶은 Member의 Id를 입력으로 받고 리스트에서 제거를 하는 removeMember 메서드를 작성해보자.
            
            ```java
            public class MemberArrayList {
            
            	private ArrayList<Member> arrayList;  
            
            	public MemberArrayList(){
            		arrayList = new ArrayList<Member>();  
            	}
            ...
            ...
            ...
            
            public boolean removeMember(int memberId) {
            		
            		for(int i=0;i<arrayList.size();i++) {
            // get(i)를 사용하여 arrayList 에서 i번쨰의 객체를 가져온다.
            			Member member=arrayList.get(i);
            			int tempId=member.getMemberId();
            			
            // id를 비교하고 대상 id라면 arrayList에서 해당 index의 member를 제거한다.
            			if(tempId==memberId) {
            				arrayList.remove(i);
            				return true;
            			}		
            		}
            
            }
            ```
            
            원하는 맴버를 제거하기 위해서는 먼저 맴버에 해당하는 index를 찾아야한다.
            
            위의 코드와 같이 arrayList의 크기는 size()메서드로 접근이 가능하고 arrayList.get(index)를 통해 요소를 가져와서 반복문을 통해 순차적으로 순회하면서 지우려고 하는 index라면 arrayList의 remove 메서드를 통해 제거한다.
            
            - ArrayList 또한 Collection이기 때문에 Iterator 또한 사용이 가능하다.
                
                JAVA iterator는  요소를 하나씩 반복하기 위해 사용하는 Interface이다.
                
                ```java
                Iterator<Member> java.util.ArrayList.iterator()
                ```
                
                iterator는 interface Collection에 정의되어있다. iterator의 호출 결과는 iterator interface를 구현한 객체를 리턴한다. [Interface Iterator<E>](https://docs.oracle.com/javase/8/docs/api/java/util/Iterator.html)
                
                iterator Interface는 아래의 세 개의 메소드를 구현하도록 강제한다.
                
                - hasNext() : iteration에 다음 element가  있다면 true 없다면 false
                - next() : 다음 element를 return 한다.
                
                이를 이용하여 remove를 for문을 사용하는 것 과 같이 구현할 수 있다.
                
                ```java
                // iterator 사용  
                	public boolean removeMemberIr(int memberId) {
                		Iterator <Member>ir=arrayList.iterator();
                		// <Member 안 하면 Object반환 
                
                // ir에 next값이 없다면 반복문을 종료
                		while(ir.hasNext()) { 
                			Member member=ir.next();
                			int tempId=member.getMemberId();
                			if(tempId==memberId) {
                
                				arrayList.remove(member);
                				return true;				
                			}
                		}
                		return false;
                	}
                ```
                
                하지만, List interface의 경우 get(i) 메서드를 사용할 수 있으므로 iterator를 사용하지 않고도 순회를 할 수 있지만 set의 경우 get(i)메서드가 제공되지 않으므로 Iterator를 활용하여 객체를 순회할 수 있다.
                
    - set의 경우 get(i) 메서드가 없기 때문에 Iterator를  사용하여 구현해야 한다.

- HashSet Interface 를 구현한 Class와 활용
    
    
    - HashSet Class
        - Set은 중복은 허용하지 않는다.
        - 맴버의 중복 여부를 체크하기 위해 Instance의 동일성을 Check해야한다.
        - 동일성 구현을 위해 equals()와 hashCoed() 메서드를 재정의해야 한다.
        
        ```java
        // Member Class
        public class Member {
        
        	private int memberId;
        	private String memverName;
        ..
        // 생성자 ,, getter setters...
        ..
        
        // 동일성 구현을 위해 equals()와 hashCoed() 메서드를 재정의해야 한다.
        
        @Override 
        public boolean equals(Object obj){
        
        	if(obj instanceof Member){ // obj가 Member의 Instance라면
        
        		Member member=(member)obj; // downcasting
        
        		if(this.memberId==member.memberId) // ID 교 
        			{
        				return true;
        			}else return false;
        		
        		return false;
        	}		
        
        @Override
        public int hashCode() {
        		return memberId;		
        	}
        ```
        
        ```java
        // MemberHashSet Class
        
        public class MemberHashSet {
        	
        	private HashSet<Member> hashSet;
        	
        // 생성자
        	public MemberHashSet() {
        		
        		hashSet=new HashSet<>();
        	}
        	public MemberHashSet(int size) {
        		
        		hashSet=new HashSet<>(size);		
        	}
        	
        	public void addMember(Member member) {
        		hashSet.add(member);
        	}
        	
        	public void showAllMember() {
        		
        		for(Member m:hashSet) {
        			System.out.println(m);
        		}
        		System.out.println();
        	}
        	
        	// iterator 사용  
        	public boolean removeMember(int memberId) {
        		Iterator <Member>ir=hashSet.iterator();
        
        		while(ir.hasNext()) {
        			Member member=ir.next();
        			int tempId=member.getMemberId();
        			if(tempId==memberId) {
        				hashSet.remove(member);
        				return true;				
        			}
        		}
        		return false;
        	}	
        }
        ```