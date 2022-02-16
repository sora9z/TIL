# 2. 기본 타입 마스터 하기

Done Date: 2022년 2월 15일
Due Date: 2022년 2월 15일
Note: 정리 완료 , TIL
Status: Learning 💻
🚀 Goal: 기본 타입 확실하게 알아 가기!

- type을 최대한 명확하게 명시함으로써 타입을 조금 더 보장을 하는 방식으로 프로그래밍 하는 것이 제일 중요하다.
- 타입을 명확하게 구분할 수 있어야 한다.

## 정리

### Basic

- 💩  (Bad Case) 최대한 지양해야 할 Typt선언들
    - let 변수 : undefined : 값이 아무 덕도 결정되지 않은 상태
    - let 변수 : null  : 명확하게 비어있음
    - let 변수 : unknown : 어떤 데이터가 담길지 알 수 없는 타입이다. 어떤 타입의 값이든 재할당 할 수 있다. 정말 타입을 정할 수 없을 때만 사용한다
    - let 변수 : any  : 어느 타입이든 들어갈 수 있음. 어떤 타입의 값이든 재할당이 가능하다.
    - let 변수 : void  : 변수에는 void를 사용하지 않는게 좋다
    - let 변수 : object : object라고 하는 것보다는  명시적인 방법으로 사요하는 것이 좋다?
- 생소항 type들
    - function name() : never  : return이 없다는 것을 의미한다.
        - Error를 Handling할 떄  return 값이 굳이 필요하지 않을 때
        - 만약 함수에 return 값이 있다면 error가 발생한다
        
    

### Function

- Typeacript에서는 매개변수 , 출력 값의 타입을 지정할 수 있다.
    
    ```tsx
    function add(num:number):string{
    	return `${num}`;
    }
    
    ```
    
- 아래의 함수는 선언문만 봐도 인자로 들어오는 id는 type이 string이고 출력으로 숫자를 return 하는 Promise를 return 한다는 정보를 쉽게 알 수 있다.
    
    ```tsx
    function testFunc(id:string):Promise<number>{
    	...
    	...
    	return new Promise((resolve,reject)=>{
    		resolve(100);
    	})
    }
    ```
    
- Optional prameter : 함수 인자에  “?” 키워드를 넣으면  값을 전달 받을 수 있고 안 받을 수 있다
    
    ```tsx
    function testFunc(num:number,str?:string){
    	console.log(num)
    	console.log(str)
    }
    testFunc(3)
    testFunc(3,"str")
    
    /* 출력 
    3
    3
    undefined --> ? 키워드를 쓰면 undefined로 출력 된다.
    */
    ```
    
- Default parameter
    
    아래와 같이 매개변수에 아무 것도 넣지 않을 경우 기본값으로 들어가는 값을 지정할 수 있다
    
    ```tsx
    function defaultParam(name:string="sora"){
    	...
    	...
    	console.log(name)
    }
    defaultParam()
    // sora
    ```
    
- Rest parameter
    
    JS에서 인자의 수가 정해지지 않은 경우 ...arr 과 같이 rest param을 사용하였다. typescrip에서도 당연히 가능하다.
    
    대신 array 타입을 아래와 같이 지정해주어야 한다.
    
    ```tsx
    function restParam(...nums:Array<number>):number{
    	//
    	//
    }
    ```
    

### Array

- Array의 타입 지정은 아래와 같이 두 가지 방법이 있다
    - const fruits:string[]=[]  → readonly 지정이 가능하므로 이 방법으로 일관성있게 통일하는 것이 좋다
    - const numbs:Array<number> = []
- readonly : 함수 내부에서 전달 인자를 못 하게 할 수 있는 키워드
    
    ```tsx
    function readOnlyFunc(id:readonly string[]){
    	// id는 함수 내부에서 변경하지 못한다
    }
    ```
    
- Tuple
    - 서로 다른 타입을 함께 가질 수 있는 배열이다.
    - 하지만 별로 권장하지는 않으며 Interface , type alias , class로 대체하는 것이 좋다.
    - Tuple의 경우 어떤 데이터가 들어있는지 확인하기 어렵다.
    

### Type Alias

- type alias는 사용자 정의 타입을 정의할 수 있다.
- 아래처럼 객체 형식도 가능하다
    
    ```tsx
    type Worker={
    	id:number;
    	department:string
    }
    
    const enginner:Worker={
    	id:123
    	department:"Backend Enginner Team"
    }
    ```
    

- String Literal Type
    
    타입 자체를 String의 문자열로 지정할 수 있다. 이 설명만으로는 이 것을 왜 쓰는지 아직 잘 이해가 가지는 않았는다.  
    
    ```tsx
    type Name='name'
    let myName:Name;
    
    type Text : string
    
    ```
    

### Union

- Union은 OR  이라고 생각하면 된다.
- 한 가지 타입이 아니라 지정된 여러 개의 타입을 사용해야 할 경우 유용하다.
    
    ```tsx
    type Level="Beginner"|"Intermediate"|"Advanced"
    
    function classLevel(level:Level){
    	console.log(level)
    }
    ```
    

### Discriminate : 차별화하다

- 코드를 구현할 때 인수로 받는 변수의 타입에 따라 return 해야하는 값이 다른 경우가 있다.
- 아래의 코드처럼 두 개의 타입을 정의하고 둘 중 하나의 타입을 갖을 수 있는 타입이 또 있다고 해보자
    
    ```tsx
    type SuccessResponse={
    	response : {
    		body:string;
    	};
    };
    
    type FailureRersonse={
    	errorMsg : string;
    };
    
    // 이 State는 성공 또는 실패의 타입을 갖는다.
    type State:SuccessResponse | FailureResponse
    
    // 이 함수는 state를 인자로 받아 state의 타입에 따라 return이 다르다.
    function requestSomthing(state:State):{
    // 이 방법을 많이 사용하지만 별로 좋은 케이스는 아니다
    	"response" in state // 인자에 특정 키가 있는지 확인하는 방법 
    		? console.log(`Request Success ${state.response.body}`)
        : console.log(`Request Failed ${state.reason}`);		
    }
    
    ```
    
- 위의 코드에서 함수는 특정 키가 있는지를 확인하는 방식을 사용한다. 하지만 이런 방식은 그닥 좋은 방법이 아니다. Discriminate 기법? 을 사용하여 공통의 key를 넣고 값을 다르게 함으로써 상태를 더울 쉽게 구분할 수 있다.
    
    ```tsx
    // discriminate 란 동일한 key를 갖게하여 state별로 다른 값을 갖고있도록 하여 구분하기 쉽게 만든다
    
    // 먼저 아래 두 타입에 동일한 key인 resut를 추가해준다
    type SuccessResponse = {
        result: "success";
        response: {
          body: string;
        };
      };
      type FailureResponse = {
        result: "fail";
        reason: string;
      };
    
    // 이 State는 성공 또는 실패의 타입을 갖는다.
    type State:SuccessResponse | FailureResponse
    
    function requestSomthing(state:State) {
        state.result === "success"
        ? console.log(`Request Success ${state.response.body}`)
        : console.log(`Request Failed ${state.reason}`);		
      }
    ```
    

### Intersectrion : AND

- union이 OR이라연 Intersection은 AND 이다. 인자에 두 가지 타입이 들어가야 할 때 사용할 수 있다
    
    ```tsx
    // type 이 Student가 있고
    // type이 Worker인 타입이 있을 때 
    // Intern 은 Student이면서 Worker 타입을 갖을 수 있다
    // 이 경우 person : Student & Worker  과 같이 &를 사용하여 타입을 지정할 수 있다
    // 대신 두 타입이 Input에 모두 들어가야 한다.
    ```
    

### Enum 🤔

- Enum이란 여러 상수 값들을 한 곳에 모아서 값이 변화하지 않아 타입이 보장되고  안전하게 쓸 수 있는 구조로 되어있다.
- Enum으로 상수값을을 관리할 수 있지만 ts에서는 union을 사용하는 것이 선호된다.
    
    ```tsx
    enum Month{
    	JAN,
    	FEB,
    	MAR,
    	APR,
    	....
    }
    // 값을 지정하지 않는다면 자동으로 0부터 할당이 된다. 
    let month=Month.JAN //  과 같이 상수 사용 가능
    
    month=424 // error 나지 않는다
    
    ```
    
    하지만  enum은 할당된 변수에 다른 값을 넣어도 문제가 없게된다. 경고가 오지 않는다. 그렇기 때문에 union을 사용하는 것이 더 안정적
    

### 타입 추론 Inference

- ts에서는 자동으로 타입을 추론한다. 예를 들어 let text=”text” 의 경우 자동으로 text 변수를 string이라고 추론한다.
- 함수의 경우 any라는 타입이 암묵적으로 들어간다. 그러므로 type은 명확하게 하는 것이 좋다
- 또는 function print(message='hello') 와 같이 default value를 넣으면 타입 추론을 한다.

### Type Assertion💩

- type assertion은 지양해야하지만 JS와 연동되어야 하기 때문에 어쩔 수 없이 쓰는 경우도 있다
- type assertion은 아래와 같이 사용한다.
    
    ```tsx
    consolg.log(wrong as string);
    // wrong을 문자열 처럼 사용할 것이라고 casting 하는 것.
    ```
    
- 타입이 확실할 때 , 100% 절대적일 때 사용한다.
- 또는 “ ! “ 키워드를 사용할 수도 있다.
    
    ```tsx
    numbers!.push(3) 
    
    ```