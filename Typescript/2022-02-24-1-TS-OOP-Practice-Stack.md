# 5. 객체지향 프로그래밍 연습시간

Done Date: 2022년 2월 23일
Due Date: 2022년 2월 22일
Status: Done 🙌
🚀 Goal: 직접 Stack 구현 해보고 강의 후 다시 만들어보기

## Stack 구현하기

- typescript의 배열 등의 자료형을 사용하지 않고 구현을 하는 연습
- 배열은 사용할 수 없으므로 링크드 리스트를 사용하여 구현하였다.
- 강의 자료를 사용한 코드는 노출시킬 수 없으므로 내가 짠 코드와 강의를 보고 수정이 필요한 부분을 간략하게 정리해보았다.

### My Solution

- 기본적인 자료구조는 알고있었기 때문에 구현이 어렵지 않았지만 코드가 그닥 깔끔하지 않았다.
- 간단하게 수도코드를 작성하면 아래와 같다
    
    ```tsx
    type Node ={
    	value :string
    	prev :Node | null // 밑에 있는 Node를 가리키는 pointer | null 값 가능
    }
    
    class Stack {  // interface를 할지 class로 바로 할지 고민함
    	head : Node | null 
    	tail : Node | null 
    
    	push(value:string){
    		const newNode
    		if stack is Empty 
    	
    		else head -> newNode // stack이 비어있지 않은 경우
    	}
    
    	pop():Node|void {
    		const delNode
    		if stack is Empty
    				Error message
    		else  {
    			// somethins process 
    			return delNode
    	}
    
    	
    	printAll():Node | string{
    		if stack is Empty : return "error message"
    			
    		else return head 
    	}
    
    		
    ```
    
- 위의 코드에서 Stack을 Interface로 하지 않고 바로 Class로 정의한 이유는 간단한 스텍을 만드는 것이기 때문에 재사용성, 확장성에 대한 생각을 굳이 할 필요가 있을까 싶었다.
- Node를 Class로 하지않고 Type으로 정의한 이유는

### Refec

- 강의를 통해 배운 내용을 참고하여 좀 더 깔끔하게 수정
    1. Stack Interface 생성
        - 하지만 어차피 연습을 하는 시간이었고 이런 이후 강의에서 오늘 만든 Stack을 조금 수정하는 일이 있기 때문에 Interface로 만드는 것이 편한 방법이었다.
        - 그리고 size..! array.length처럼 이 stack의 사이즈를 알아야 pop을 하든 한 것인데 미처 생각하지 못했다.
        - siez의 경우 사용자가 변경할 일이 없으며 단지 읽을 수 있으면 되기때문에 readonly로 해준다
    
    ```tsx
    Interface Stack {
    	readonly size : number
    	push(value:string):void  // string타입을 넣으면 새로운 Node를 생성해서 stack에 push
    	pop():string // 
    ```
    
1. Type Node
    - Stack에서 관리하는 Node를 정의하는 Type이다.
    - 외에서와 같이 value와 prev 포인터를 갖는다.
    - value와 prev또한 사용자가 조작하는 것이 아니다. 그리고 데이터를 넣어서 한 단계 감싸는 경우 불변성을 유지하는 것이 좋다 → readonly
    - type name : 나는 위에서 그냥 Node라고 하였는데, Stack에 들어가는 Node이니 StackNode라고 하는 것이 명확해보이는 것 같다
    - 그리고 prev는 StackNode가 들어갈 수도 있고 null 또는 undefined가 들어갈 수도 있다. 이런 경우에는 | null 보다 Optional parameter인 “?” 를 사용하는 것이 더 깔끔하게 코드를 작성할 수 있다.
    
    ```tsx
    type StackNode={
    	readonly value:string
    	readonly prev? StackNode
    ```
    
2. class Stack
    1. class Stack 변수
        1. size는 readonly 이므로 get method로 구현한다.
        2. size는 StackNode가 추가되면 증가 되어야 한다. 하지만 size는 readonly이므로 동일한 변수임을 의미하는 _size 를 private으로 선언하여 사용한다.
        
        ```tsx
        class StackImpl implements Stack{
        	private _size: number = 0; // "_는 동일한 변수 있음 의미";
          private head?: StackNode;
        
        	
        	get size() {
              return this._size;
            }
        ```
        
    2. class Stack method
        - push의 경우 나는 먼저 stack이 비어있는지 확인하고, 비어있다면 head에 null을 넣는 코드를 넣었다. 하지만 그럴 필요 없이 이미 head와 prev는 optional parameter로 undefine가 들어갈 수 있기 때문에 따로 null을 넣어주는 작업을 하지 않아도 된다.
            
            ```tsx
            	// 수정 전
            	push(value:string){
            		const newNode
            		if stack is Empty 
            	
            		else head = newNode // stack이 비어있지 않은 경우
            	}
            
            // 수정 후 
            
            	push(value:string){
            		const newNode : StackNode = {value,prev=this head}	
            		head = newNode
            		_size ++;
            	}
            
            	
            
            ```
            
        
        - pop의 겨우
            - Stack이 비어있을 때와 아닐 떄로 나누고, Stack이 비어있지 않지만 head.prev가 null인 경우와 아닌 경우를 또 나누어 처리를 하였다.  또한 Node를 return 하지 못할 때가 있기때문에 void 타입을 리턴 타입에 추가하였다.
                
                하지만,  head와 prev를 optional parameter로 선언하였기 때문에 단지 head가 null 또는 undefined인 경우만 check를 하면, head.prev가 null인지 굳이 확인하지 않아도 되었다;;
                
            
            - 또한 당연히 항산 null check은 strict null check을 하였는데, optional operator의 경우 null이 될 수도 있도 undefined가 될 수도 있기 때문에 “===”가 아닌 “==”으로 비교를 해준다 (null==undefined)
            
            ```tsx
            // 수정 전
            pop():Node|void {
            		const delNode
            		if stack is Empty
            				Error message
            		if head.prev is null
            				head=null
            		else head=head.prev
            			return delNode
            	}
            
            // 수정 후 
            
            pop(): string {     
                  if (this.head == null) return error
                  
                  const node = this.head; // head는 stack이 비어있으면 없을 수도 있다
                  this.head = node.perv;
                  this._size--;
                  return node.value;
                }
            ```
            
        
        아직 타입이 익숙하지 않아 코드가 매우 깔끔하지 못는데 강의를 듣고 다시 정리를 해보니 타입에 점점 익숙해 지는 것 같다. 그리고 타입이 있어 확실히 코드가 자바스크립트로 짰을떄 보다 더욱 구성이 단단해 지는 것 같다는 생각이 든다.