# 10. 타입스크립트의 핵심

Done Date: 2022년 3월 4일
Due Date: 2022년 3월 2일
Status: Done 🙌
🚀 Goal: TS의 핵심이므로 정리 밀리지말고 꼬박꼬박 하기

## 1. TS는 매우 유연하고 강력한 타입을 갖고있다

다른 프로그래밍 언어에서는 잘 없는

- Conditional Types
- Mapped Types - Kotlin, Switft에는 없다
- Utility Types - Kotlin, Switft에는 없다

이번 강의에서는 이런 타입들을 다루는 방법에 대해 배워보자! 

## 2. Type alias VS Interface 의 차이점과 언제 뭘 써야하는지에 대해..

- 모든 곳에 Interface를 사용하면 안 된다.
- 정확하게 type와 Interface가 어떻게 다른지, 언제 무엇을 쓰는지 알아야한다
    
    → 강의를 배우면서 항상 고민했던 부분이었다.
    

### 구현상의 차이점

```tsx
type AnyType = {
  x: number;
  y: number;
};

interface AnyInterface {
  x: number;
  y: number;
}
```

- Type alias와 Interface 둘 다 적용 가능한 특징
    - Object를 만들 수 있다.
        
        ```tsx
        const obj1 : AnyType = {
        	x:1,
        	y:1
        }
        
        const obj2 : AnyInterface ={
        	x:1,
        	y:2
        }
        
        ```
        
    - Class에서 Implements가 가능하다
        
        ```tsx
        class Pos1 implements AnyType {
          x: number;
          y: number;
        }
        
        class Pos2 implements AnyInterface {
          x: number;
          y: number;
          z: number;
        }
        ```
        
    - Extends가 가능하다
        
        ```tsx
        interface OtherInterface extends AnyInterface {
          z: number;
        }
        type OtherType = AnyType & { z: number }; 
        // intersection을 이용해서 두 가지를 묶은 타입을 만들 수 있다.
        ```
        
    
- Only Interface : merge
    - 이미 선언되어있는 Interface를 아래와 같이 결합이 가능하다 (하지만 Type Script 버전에 따라 이 기능도 가능하게 될지는 모르는 일이다)
    
    ```tsx
    interface AnyInterface {
      z: number;
    }
    ```
    
- Only Type alias : computed properties
    - Type의 key를 이용할 수도 있다
        
        ```tsx
        type  Cat= {
          name: string;
          age: number;
        };
        
        type Name = Person["name"]; 
        // Cat type에 있는 name이라는 키의 type을 사용한다 
        ```
        
    - union type은 interface로 불가능하다
        
        ```tsx
        type Direction = "left" | "right"; 
        ```
        

### 개념상의 차이점

- Interface :
    - Interface는 규격사항 이며,  OBJ - OBJ 의사소통을 Interface를 토대로 상호작용
    - Interface의 규격을 구현 함으로써 동일한 규격서를 따라간다고 할 수 있다
    - 어떤 특정 규격을 정의하는 것이라면 type을 쓰는것은 적절하지 않다. (누군가 구현을 하는 경우)
- Types
    - DATA의 타입을 결정하는 것
    - Position이라는 Type의 경우 어떠한 데이터를 담고있는 모습이다.
    - 이렁 경우 type을 쓰는 것이 적절
    - interface를 쓰는 경우 이것을 구현하는 Class가 있는지 생각하게 된다.
    - 데이터를 담을 목적으로 만들때에는 type을 쓰는 것이 좋다

## 3. [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

- type을 **변환**하는 것이 가능하다
- 한 가지의 type으로 다른 type으로 transform이 가능하다.

1. [Index type](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html) 
    - Index type을 사용하면 다른 type에 있는 Key에 접근해서 그 Key에 대항다는 value의 type을 그대로 사용할 수 있다.
    - Object를 key로 value에 접근하는 것과 같이 Index를 기반으로 접근이 type에 접근이 가능하다
        
        ```tsx
        type Person = {
          age: number;
          name: string;
          alive: boolean;
        	gender: "male" | "female";
        };
        
        type Age = Person["age"];
        ```
        
    - keyof를 사용하여 모든 key의 Type을 key로 할당할 수 있다.
        
        ```tsx
        type Kesy - keyof Person; 
        // 'age'|'name'|'alive'|'gender'  문자열 Union이 들어간다.
        ```
        
    
    - 아래와 같은 방식도 가능 → 재사용성 UP
        
        ```tsx
        type Person = {
            name: string;
            gender: Animal["gender"];
          };
        ```
        
2. [map type](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)  
    - 기존 배열의 형태를 다른 형태로 변환하는 배열의 map 함수와 같이 기존의 type을 다른 형태로 변환한다.
    - 재사용성이 매우 좋다
    - 아래의  OptionsFlas라는 타입은 어떤 타입 T를 받아와서 기존의 타입을 다른 형태로 변환한다.
    
    ```tsx
    type OptionsFlags<T> = {
      [P in keyof T]?: T[P];
    };
    // 이 타입은 ?로 인해 들어온 T타입의 key중 일부만 가져올 수 있는 타입이다.
    
    // ex
    type Person = {
      age: number;
      name: string;
      alive: boolean;
    	gender: "male" | "female";
    };
    
    type PersonOptional = OptionalFlag<Person>;
    
    const person1:PersonOptional ={
    	name:'sora'
    }
    
    // 참고로 이 기능은 이미 typescript에서 정의하고있는 Partial 이라는 type과 비슷한 역할을 한다
    type Partial<T> = {
        [P in keyof T]?: T[P];
    };
    ```
    

- 또한 Readonly를 뺄 수도, 붙일 수도 있는 Type을 만들 수 있다.
    
    ```tsx
    // readonly add
    // 이 타입 또한 Typescript에서 Readonly 라는 타입으로 이미 내장되어있다.
    type ReadOnly<T> = {
        readonly [P in keyof T]: T[P];
      };
    
    // Removes 'readonly' attributes from a type's properties
    type RemoveReadOnly<Type> = {
      -readonly [Property in keyof Type]: Type[Property];
    };
    ```
    

- Null이 지정 가능하게 할 수동 있다. 기존의 value type을 쓰거나 null이 가능하도록 함
    
    ```tsx
    type Nullable<T> = { [P in keyof T]: T[P] | null }; 
    
    const obj: Nullable<Video> = {
        title: null,
        author: "so"
      };
    
    // typescript에는 null이나 undefined가 되지 않도록 하는 Type 또한 내장되어있다
    
    /**
     * Exclude null and undefined from T
     */
    type NonNullable<T> = T extends null | undefined ? never : T;
    
    ```
    

- 전달된 타입의 값들을 다른 타입으로 한 단계 감싸는 것도 가능
    
    ```tsx
    type Proxy<T> ={
    	get():T;
    	set(value: T): void;
    };
    
    type Proxify<T> ={
    	[P in keyof T]:Proxy<T[P]>;
    };
    ```
    

1. [condition type](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) (공식홈페이지 예제들)
    - 조건이 맞으면 특정 타입을 선택할 수 있다.
        
        ```tsx
        SomeType extends OtherType ? TrueType : FalseType;
        ```
        
    
    - 들어오는 type이 number라면 NameOrId는 IdLabel을, string이라면 NameLabel  Interface Type으로 특정 타입으로 선택할 수 있다.
        
        ```tsx
        type NameOrId<T extends number | string> = T extends number
          ? IdLabel
          : NameLabel;
        
        function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
          throw "unimplemented";
        }
         
        let a = createLabel("typescript"); // string 이므로 a는 NameLabel 타입이다.   
        // let a: NameLabel
         
        let b = createLabel(2.8);   
        // let b: IdLabel
        ```
        
    
2. partial type
    - **Partial<Type>**
    - Typescript의 util ltype중 하나이다. 이미 ts에 선언되어있다.
    - map type을 설명하면서 구현해본 type이다. 이 타입을 이용하면 아래와 같이 현재 Type의 부분적인 type을 받을 수 있고 아래와 같이 사용될 수 있다.
    
    ```tsx
    interface Todo {
      title: string;
      description: string;
    }
     
    function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
      return { ...todo, ...fieldsToUpdate };
    }
     
    const todo1 = {
      title: "organize desk",
      description: "clear clutter",
    };
     
    const todo2 = updateTodo(todo1, {
      description: "throw out trash",
    });
    ```
    
3. pick
    - **Pick<Type, Keys>**
    - 간략한 정보만 나타내는 type의 경우 Pick을 이용하느 것이 좋다.
    - 선언부
        
        ```tsx
        /*
        * From T, pick a set of properties whose keys are in the union K
         */
        type Pick<T, K extends keyof T> = {
            [P in K]: T[P];
        };
        ```
        
    - 사용예시
        
        ```tsx
        interface Todo {
          title: string;
          description: string;
          completed: boolean;
        }
        
        type TodoPreview = Pick<Todo, "title" | "completed">;
        
        const todo: TodoPreview = {
        	title: 'Clean Code",
        	completed : true,
        }
        ```
        
    
4. omit
    - **Omit<Type, Keys>**
    - pick과 반대로 원하는 것을 뺀다.
    - 선언부
        
        ```tsx
        /**
         * Construct a type with the properties of T except for those in type K.
         */
        type
        ```
        
    - 사용예시
        
        ```tsx
        type TodoPreview = Omit<Todo, "description">;
        
        const todo: TodoPreview = {
          title: "Clean room",
          completed: false,
          createdAt: 1615544252770,
        };
        ```
        
5. record
    - **Record<Keys, Type>**
    - type을 묶을 수 있다.
    - 선언부
        
        ```tsx
        /**
         * Construct a type with a set of properties K of type T
         */
        type Record<K extends keyof any, T> = {
            [P in K]: T;
        };
        ```
        
    - 사용 예시
        
        ```tsx
        type CatInfo {
          age: number;
          breed: string;
        }
        
        type CatName = "miffy" | "boris" | "mordred";
        
        const cats: Record<CatName, CatInfo> = {
          miffy: { age: 10, breed: "Persian" },
          boris: { age: 5, breed: "Maine Coon" },
          mordred: { age: 16, breed: "British Shorthair" },
        };
        
        ```
        

### 정리

- Interface와 Type은 공통적인 기능을 하는 부분이 많지만,  구분해서 사용해야 한다.
- Interface의 경우 구현을 해야하는 경우 사용하고
- Type alias의 경우 어떤 Data의 Type을 명시해 줄 때에만 사용하는 것이 바람직하다
- TypeScript에는 Utilty Types가 있다. 이미 Ts 개발자들이 지정해 놓은 Type이다.