# 4. 객체지향 프로그래밍

Done Date: 2022년 2월 20일
Due Date: 2022년 2월 20일
Note: 전체 필기 다시 보면서 간략하게 정리 해보기
Status: Done 🙌
🚀 Goal: OOP 확실하게 이해하기. 강의에서 하는 질문에 깊게 생각해보기

### Imperative and Procedureal Programming (명령어와 절차적인 프로그래밍)

- 정의된 순서대로 코드가 진행되는 방법
- 단점 : 전체 app이 어떻게 동작하는지 이해하기 힘들가
- 확장 , 유지보수가 힘들가

### Object Oriented Programming

- 데이터, 함수를 여러 Object로 구성
- Pbject 단위로 만들기 때문에 유지 보수성이 좋가
- 재사용성이 좋다
- 확자성 또한 좋다

- Error , Exception , Evernt들도 Object로 만들어서 사용할 수도 있다.
- Object의 data들을 fields 또는 property 라고 부른다. 함수는 method
- 보통 Class를 통해 객체의 틀을 만들고 Object는 Class의 Instance이다.
- OOP를 하려면 4대 원칙에 대해 알아야 한다

### 중요한 객체지향의 원칙

1. Encapsulation
    1. 서로 연관있는 기능들을 하나로 모은 것.
    2. 서로 관련있는 데이터와 함수를 한 Object에 넣어서 외부에서 볼 수 없게 하는 것
2. Abstraction
    1. 내부의 복잡한 기능을 외부에서 Interface를 통해서 쓸 수 있는 것
    2. Encapsulation과 관계있다.
    3. 추상화를 통해 외부에서는 내부의 복잡한 구조를 이해하지 않고도 Interface만을 보고도 사용할 수 있다
3. Inheritance
    1. 상속을 통해 기능을 더해서 다른 종류의 instance를 만들 수 있다. 재사용 가능 
    2. parent(super , base)  —- 상속은 IS-A 관계 —- Child(sub,drived) 
    3. EventTarget ←Node←Document,Element,Test ←HTMLElement
4. Polymorphism
    1. 다형성은 부모의 공통 메서드를 이용해서 자식들에 접근할 수 있는 것

## OOP 프로그래밍을 위한 알아둬야 할 문법들, 프로그래밍 기법들

- static keyword
    - Instance level에서 공유될 수 있는 것이라면 static을 붙여준다.
        
        ```tsx
        class CoffeeMaker {
        
        	static BEANS_GRAMM_PER_SHOT: number = 7; 
        	// 잔당 들어가는 커피콩의 양은 한번 setting하면 변하지 않는다
        	// static을 사용하면 Object마다 만들어지지 않고, 메모리 낭비를 줄일 수 있다.
        }
        
        ```
        
    - Constructor를 private으로 선언하고 method를 통해 생성자에 접근하도록 하는 경우
        
        *static을 을 붙여서 Object를 만들 수 있는 함수를 제공한다면, 누군가 생성자를 이용해서 만드는 것을 금지 하기 위함이다. 이런 경우 constructor를 private으로 만든다*
        
        ```tsx
        // instance를 만들지 않아도 사용 가능하다
            static makeMachine(coffeeBeans: number): CoffeeMaker {
              return new CoffeeMaker(coffeeBeans);
            }
        
        // method 사용
        const machine=CoffeeMake.rmakeMachine(10)
        ```
        
        위의 경우 생성자에 접근하지 못하기 때문에 static method는 Class name을 사용하여 메서드를 사용할 수 있다.
        
    - static으로 선언된 변수는 Instance의 변수에는 출력되지 않는다.
    
- Encapsulation
    - 관련 있는 변수, 메서드를 한 곳에 모으고
    - 중요 변수 또는 외부에서 참고할 필요 없는 변수, 메서드의 경우 private으로 선언하고 오직 public으로 선언된 메서드로만 상태를 변경할 수 있게 함으로써  캡슐화를 시킨다.
    - 이를 통해 외부에서 상태를 바꾸지 못하게 할 수 있음
    - 아래의 코드와  같이 사용자는 eat이라는 메서드만을 사용할 수 있으며 Cat의 내부적인 상태는 직접적으로 수정하지 못하며 확인할 수도 없다.
    
    ```tsx
    
    class Cat {
        // 고양이의 상태
        private emotion: string = "boaring";
        private isHungry: number = 10;
    
        play() {
          // 놀면 happy , 배고픔 1 증가
          this.emotion = "happy";
          this.isHungry += 1;
    
          // 배고픔 지수 10보다 크면 I'm Hungry 출력
          if (this.isHungry >= 10) {
            console.log("I'm hungry Sora");
          } else console.log("Funny !!!! ");
        }
    
        eat() {
          console.log("I'm eatting fish");
          this.isHungry = 0; // 밥 먹으면 배고픔 0
          this.emotion = "happy";
          console.log(`I'm full and ${this.emotion} , Let's start playing again`);
        }
    ```
    

- abstraction
    - Interface를 사용하여 추상화 , 정보은닉이 가능하다
    - Interface는 “규약" 이라고도 할 수 있다.
    - Interface는 몇 개든 구현할 수 있다.
    - Interface를 Implements한 Class는 Interface에서 선언한 함수를 모두 구현해야 한다.
        
        두개의 Interface를 구현하는 경우에도 마찬가지
        
        ```tsx
        interface BeginnerCoffeMaker {
            makeCoffee(shots: number): CoffeeCup;
          }
        
        interface AdvancedCoffeMaker {
            makeCoffee(shots: number): CoffeeCup;
            fillCoffeeBeans(beans: number): void;
            clean(): void;
          }
        
          class CoffeeMachine implements BeginnerCoffeMaker, AdvancedCoffeMaker {
           ...
        	 ...
        
            makeCoffee(shots: number): CoffeeCup {
              this.grindBeans(shots); // 커피를 그라인더로 간다
              this.preheat(); // 물을 heating
              return this.extract(shots);
            }
        
        	clean(): void {
              console.log("cleaning the machine...🧼");
            }
        
        	fillCoffeeBeans(beans: number) {     
              if (beans < 0) {
                throw new Error("value for beans should be grater then 0");
              }
              this.coffeeBeans += beans;
            }
          }
        ```
        
    - Class의 생성자를 통해 생성된 Instance의 경우 두 인터페이스의 기능을 사용할 수 있다
        
        ```tsx
        const maker: CoffeeMachine = CoffeeMachine.makeMachine(100);
          maker.fillCofeeBeans(30);
        ```
        
    - 하지만, Interface type으로 생성된 Instance는 그 interface의 기능만을 사용해야 한다
        
        ```tsx
        // Interface type으로 정의되면 그 메서드만 사용이 가능하다
          const maker2: AdvancedCoffeMakerr = CoffeeMachine.makeMachine(100);
          maker2.clean();
          maker2.fillCofeeBeans(100);
          maker2.makeCoffee(2);
        ```
        
    - *interface를 사용하면 기능을 제안할 수 있다. 위의 인터페이스 형으로 출력된다면 CoffeeMachine 클래스의 다른 기능은 사용할 수 없다.*
    - *coffee를 만드는 makeCokee는 grideBeans->preheat-> extract 의 순서로 만든다 
    이 함수들을 추상화 하지 않으면, 사용자는 순서를 모르기 때문에 잘못 된 순서로 만들게 된다.  
    이럴 때 추상화가 필요하다 Interface를 간편하게 만들어서 의도한 대로  사용자가 사용할 수 있게 한다*
    - 추상화의 방법
        1.  *정보 은닉을 사용하여 추상화 -> 위의 함수들을 모두 private*
        2. *인터페이스를 사용하여 추상화*
    - 구현하는 Interface에 규약에 따라 동일한 Class 임에도 불구하고 사용할 수 있는 기능의 범위가 달라지게 할 수 있다.
    - 이런 추상화로 인해 그 내부의 코드의 구현은 신경쓰지 않아고 Interface의 사용법만 알고 있으면 된다.
    
- Inheritance
    - extends 키워드를 사용하여 상속한다
    - 자식 클래스에서 constructor를 따로 구현하는 경우 super를 꼭 호출해야 하고 보모 Constructor에서 필요로 하는 인자를 매개변수로 받아서 super에 넘겨줘야 한다
        
        ```tsx
        class NewMachine extends CoffeeMachine {
        	
        		// 한 번 설정해서 바뀌지 않는다면 readonly
            constructor(beans: number, public readonly serialNumber: string) {
              super(beans);
            }
        ..
        ..
        }
        ```
        
    - 부모의 method를 super 키워드로 사용이 가능하다
        
        부모에 정의된 method를 Overriding 하는 경우를 예로 들어보자
        
        ```tsx
        private boilingMilk(): void {
              console.log("Boiling some milk...🥛");
            }
            makeCoffee(shots: number): CoffeeCup {
        			// 부모의 함수를 super 키워드로 사용 가능
              const coffee = super.makeCoffee(shots); 
              this.steamMilk();
              // 부모에게서 받아온 것 + milk만 바꿔준다
              return {
                ...coffee,
                hasMilk: true,
              };
            }
        ```
        
- Polymorphism
    - Class를 상속받고 각 자식에게 맞게 함수를 Overriding 하면서 다형성을 만들 수 있다.
    - 다형성의 장점
        - *내부적으로 구현된 다양한 클래스들이 한 가지 인터페이스를 구현하거나 동일한 부모 클래스를 
        상속했을 때 동일한 함수를 어떤 클래스인지 구분하지 않고 공통된 API를 호출할 수 있다.*
        - *자식들이 Interface와 부모 클래스의 함수를 사용하여 다양하게 구성을 함으로써 다형성을 구성하고*
        - *동일한 함수 API를 통해서 각각 구현된 자식 클래스의 내부 구현 사항을 신경쓰지 않아도 약속된 한 가지의 API를 호출 함으로써 다양한 기능으로 사용할 수 있도록 도와준다.*
        - 아래의 코드를 보면, CoffeeMaker type을 갖는 machine 매개변수를 통해 CoffeeMaker Interface를 구현한 클래스들에 각각 정의되어있는 method가 출력되는 것을 볼수 있는데, 다형성의 한 예시이다.
            
            ```tsx
            interface CoffeeMaker {
                makeCoffee(shots: number): CoffeeCup;
              }
            
            const machies: CoffeeMaker[] = [
                new CoffeeMachine(16),
                new CaffeLateeMachine(16, "1"),
                new SweetCofeeMaker(16),
                new CaffeLateeMachine(16, "1"),
                new SweetCofeeMaker(16),
                new CoffeeMachine(16),
              ];
            
             machies.forEach((machie: CoffeeMaker) => {
                console.log("---------------------");
                machie.makeCoffee(1);
              });
            
            -->출력
            /*
            grindging beans for 1
            heating up...🎇
            
             Pulling 1 shots...⚰
            grindging beans for 2
            heating up...🎇
            
             Pulling 2 shots...⚰
            Add Syrup...🍯
            */
            ```
            
- Composition
    - Favor object composition over inheritance : 상속보다 합성을 선호 해라 라는 의미이다.
    - 오로지 기능을 상속하기 위해 상속을 남발하는 것은 매우 좋지 않다.
    - 상속의 단점은, 깊이가 깊어질 수록 관계가 복잡해진다는 것이다.
    - 또한 부모 클래스를 수정하면 이 클래스를 상속받는 자식 클래스 전체에 영향을 끼칠 수 있다.
    - 이런 문제를 해결하기 위해 Composition을 사용한다.
    - Composition이란,  특정 Class의 기능을 다른 class에 넘겨주고 싶을 때 다른 Class에 있는 기능을 다른 Class에 적용시키는 방법이다.
    - Inheritance는 is-a의 관계이고 composition은 has-a의 관계의 경우 사용하는 것이 유리하다.
    - Composition은 code의 재사용성을 아주 높여준다.
    - 예를 들어, 청소 로봇 이라는 Class가 있다고 하자.  청소 로봇은 청소하기 라는 기능이 기본으로 있으며 어떤 장비(tool)를쓰느냐에 따라 쓸기만 하는지, 쓸고 닦는 기능까지 하는지 달라진다.
    
    ```tsx
    {
      interface CleaningMachine {
        move(): void;
        startCleaning(): void;
      }
    
      interface Tool {
        wipe(): void;
      }
    
      class CleanRobot implements CleaningMachine {
        
        constructor(private tool: Tool) {}
    
        move(): void {
          console.log("Moving...🚶🏻‍♂️");
        }
    
        startCleaning(): void {
          return this.tool.wipe();
        }
      }
    
      class BroomStrick implements Tool {
        wipe(): string {
          return "Sweep with a broom 🧹";
        }
      }
    
      class WetMop implements Tool {
        wipe(): string {
          return " mop mop 🧼";
        }
      }
    
      class VaccumCleaner implements Tool {
        wipe(): string {
          return "Vaccum up🧹🧹";
        }
      }
    
      // Tool
      const vaccumCleaner = new VaccumCleaner();
      const brom = new BroomStrick();
    
      // Robot
      const vaccumrobot = new CleanRobot(vaccumCleaner);
      const broomBot = new CleanRobot(brom);
    
      console.log(vaccumrobot.startCleaning());
      console.log(broomBot.startCleaning());
    }
    ```
    
    만약 Composition이 아닌 상속으로 구현할 경우, 각 기능에 대한 Robot Class를 계속 만들어 주어야 하고, 두 가지 이상의 기능이 필요한 경우 더 복잡하게 관계가 구축된다. 위의 코드처럼 기능을 따로 Class로 작성하고 기능들을  Interface를 통하게 함으로써 코드를 더욱 간결하고 재사용성이 가능한 코드로 작성할 수 있다.
    
- Abstract Class
    - Class에서 반복되는 절차가 있는데, 특정 기능만 자식 클래스에서 다르게 정의되어야 하는 경우 Abstract를 고려할 수 있다.
    - 추상 클래스를 만들거나 추상 메서드를 만들 경우 앞에 abstract 키워드를 추가한다.
    - Method의 경우 추상메서드는 자식 클래스에서 구현해야 하므로 따로 구현부를 작성할 수 없다.
        
        ```tsx
        protected abstract extract(shots: number): CoffeeCup;
        ```
        
        와 같이 선언하고 자식 클래스에서 구현을 해야하기 때문에 protected 또는 Public이여야 한다.