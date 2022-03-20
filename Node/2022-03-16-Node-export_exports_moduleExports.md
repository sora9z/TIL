

# About_export_exports_module.exports

이전 포스팅에서 require()에 대해 알아보았다. 이번엔 require와 함께 붙어다니는 exports에 대해 알아보자

### 1. export는 왜 하는 것일까?

exports를 하는 경우는 1.  Node의 내부 모듈을 사용할 때 2. 작성한 js파일을 다른 js파일에서 불러와야 할</br>

모듈이란, 우리가 만드는 applicaion을 구성하는 개별적인 요소로, 재사용이 가능하도록 만들어졌다. </br>

NodeJS에서 모듈을 따로 export 해주지 않는다면 모듈 내부의 함수,변수 등의 자원은 사용하지 못한다. 이는 모듈 자체로 스코프를 갖고있기 때문이다. </br>이를 “모듈스코프" 라고한다. 따라서, 모듈은 애플리케이션과 독립적이며 export를 통해 선택적으로 모듈 내부의 자산을 외부로 공개하는 것이다.</br>

반대로, import는 모듈을 사용하는 사용자가 Import를 통해 공개된 모듈을 재사용한다. 불려온 모듈은 사용자의 스코프에서 사용된다.</br>

---

잠시 자바스크립트와 모듈에 대해서 이야기를 해보면, 자바스크립트는 모듈 시스템을 지원하지 않는다. js 파일을 script 태그로 로드해도 모든 js파일은 하나의 전역을 공유한다. 

→ 같은 변수명이 있는 js파일이 로드되면 변수 값은 최근에 불러온 파일의 변수로 덮어씌워진다. 

이를 보완하기 위해  CommonJs & AMD(Asynchronous Module Definition) 두 개의 모듈 로더 라이브러리 이다.</br> 브라우저 환경에서  모듈을 사용하려면 두 라이브러리중 하나를 사용해야한다. → ES6에서는 모듈 기능을 추가했다고 한다 (ESM이라고 한다)

→ script에 type=”module”을 명시해주면 모듈로 동작한다. 추가적으로, ESM의 파일 확장자를 .mjs로 함으로써 더욱 명확하게 나타낼 것을 권장한다고 한다

→ var 키워드 또한 mjs로 로드된다면 더이상 전역변수가 되지 않고 window 객체의 property도 아니다.

JS 런타임 환경인 NodeJS는 ECMAScript 표준 사양이 아닌 CommonJS 사양을 따르기 때문에 모듈 사용이 가능하다.  → 즉, NodeJS에서는 jsvascript의 각 파일은 독자적인 모듈 스코프를 갖는다.

---

### 2. export 키워드

export키워드는 ES6에서 사용하는 방식이다. (improt와 함께)

- export 키워드는 선언문 앞에 사용하며 변수, 함수, 클래스등의 식별자에 export 할 수 있다.
    
    ```jsx
    // lib.mjs
    //? EX6에서 import, export로 모듈을 사용할 수 있다
    
    // 상수 내보내기
    export const p = Math.PI;
    
    // class 내보내기
    export class Hello {
      constructor(message) {
        this.message = message;
      }
    }
    
    // export 대상을 하나의 객체로 구성할 수 있다.
    const r = 3;
    const pi = 3.141592;
    export { pi, r };
    
    ----------
    
    // index.mjs
    import { pi, r } from "./lib.mjs"; // 확장자를 생략하면 안 된다
    import { Hello as Hi } from "./lib.mjs"; // as 로 며칭 부여 가능
    
    const hello = new Hi("HiHiHi");
    
    console.log(pi);
    console.log(r);
    console.log(hello.message);
    ----------
    결과
    3.141592
    index.mjs:8 3
    index.mjs:9 HiHiHi
    ```
    
    그리고 아래와 같이 Html에 script 태그를 추가해주고 라이브서버로 확인하면 import되는 것을 확인 가능하다.
    
- 아래와 같이 한 번에 객체로 export도 가능하가
    
    ```jsx
    // export default 하나의 모듈에서는 하나만 가능하다
    export default function () {
      console.log("export default");
    }
    ```
    

### 3. NodeJs에서 사용하는 module.exports와 exports의 관계

[참고사이트](https://www.geeksforgeeks.org/difference-between-module-exports-and-exports-in-node-js/#:~:text=1-,When%20we%20want%20to%20export%20a%20single%20class%2Fvariable%2Ffunction,2.)

[node공식문서](https://nodejs.org/en/knowledge/getting-started/what-is-require/) 에서도 나와있듯이, NodeJs는 CommonJS의 모듈 시스템을  따른다. 그리고 Node.js에서는 builtin function인  require를 사용하여 </br>모듈을 추가할 수 있다. </br>그리고 바로 전 포스팅에서도 언급 했듯이 require는 exports 객체를 Return 한다.  지난번에 참고했던 [이 사이트](https://medium.com/@chullino/require-exports-module-exports-%EA%B3%B5%EC%8B%9D%EB%AC%B8%EC%84%9C%EB%A1%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-1d024ec5aca3) 의 예제를 다시 빌려오자면

```jsx
var require = function(src){                 //line 1
    var fileAsStr = readFile(src)            //line 2
    var module.exports = {}                  //line 3
		// eval(fileAsStr)
    const a = 10                             //line 4.1
    exports.a = a;                           //line 4.2
    return module.exports                    //line 5
}
```

위위 코드는 require함수를 간략화한 코드이다.  eval과정을 펼치면 위와같이 const a=10이 할당되고 exports.a=10으로 할당된다. 4.2 line에서 exports의 key로 a로 하고 값을 할당한다. 

그리고 line5에서 module.exports 객체를 return 한다.  이는 exports와 module.exports는 같은 객체를 바라보고있기 때문이다.  exports는 module.exports를 참조한다 (call by reference) 공식문서의 표현에 따르면 exports는 module.exports의 shortcut일 뿐이다. 

단순히 shortcut일 뿐이라면 왜 구분하여 사용할까 ?  둘의 차이는 아래와 같이 나타낼 수 있다.

1. module.exports
    
    module.exports는 한 개의 class,변수,함수를 export할 때 사용한다. 
    
    ```jsx
    // calculator.js
    class Calculator {
        constructor(a, b) {
            this.a = a;
            this.b = b;
        }
      
        add() {
            return this.a + this.b;
        }
        subtract() {
            return this.a - this.b;
        }
    };
    module.exports = Calculator
    
    // main.js
    
    const Calculator = require("./calculator");
    
    const calculator = new Calculator(100, 300);
    console.log(calculator.add());
    console.log(calculator.subtract());
    ```
    

1. exports 
    
    module.exports와는 다르게 다수의 모듈을 export할 때 사용한다.
    
    ```jsx
    // calculator.js
    exports.add = (a, b) => a + b;
    exports.devide = (a, b) => a / b;
    
    // main.js
    
    const calculator = require("./calculator");
    
    console.log(calculator.add(1, 100));
    console.log(calculator.devide(4, 2));
    ```
    

두 번째의 차이점으로는   

1. module.export의 경우 require()에서 object의 reference를 리턴 하고
2. exports의 경우 require()에 의해 return되지 않는다는 것이다. 

이게 무슨 의미일까 ?? 

아까 위에서 exports는 module.exports를 참조하고 있고 했다. exportx → module.exports → object 와 같은 관계인 것이다. </br>그렇기 때문에 exports.key=value 형식의 접근은 module.exports의 property로 접근하고, require()애 의해 return되는 것은 module.export이다.

아래와 같은 예제가 module.exports로 export한 경우이다. 객체 자체를 가리키기 때문에 단순히 값을 가져오는 것이 아닌 object가 return되는 것이다.

```jsx
const express = require('express')
const app=express()
```

정리를 마치고 보니 시간이 꾀나 걸렸다.

그래도 정리를 하고나니 export를 할 때 헷갈리지 않을 수 있을 것 같다.