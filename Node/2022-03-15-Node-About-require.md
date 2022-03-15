# About_require()

Category: JavaScript
Visibility: Public
강의: Self Study
블로깅: No
유형: Self Study
작성일시: 2022년 3월 14일 오후 9:12

# About require()

node.js에서는 module을 불러올 때 require를 사용한다. 그리고 로컬에 작성한 파일을 다른 파일에서 사용하기 위헤 꼭 export를 해야한다. </br> 지금까지 사용을 하면서 단순히 exports를 하면 require를 할 수 있다고만 알고 있었다. 글이 길어질듯 하니 먼저 require를 하면 내부적으로 어떤 작업이 이루어지는이 알아보자.

### 1. require()는 module.exports를 return 한다.

[노드 사이트 참고](https://nodejs.org/en/knowledge/getting-started/what-is-require/)

위의 문서에 따르면, require는 기본적으로 Javascript file을 읽고, 그 파일을 실행시킨 후 exports 객체를 return 한다.

공식 사이트에 있는 예제를 예로 들면

```jsx
// example module

var invisible = function () {
  console.log("invisible");
};

exports.message = "hi";

exports.say = function () {
  console.log(exports.message);
};
```

그리고 다른 파일에서 const example = require(’/example.js”) 를 실행한다면 example.js는 아래와같이 message와 say를 키로하고 “hi”와 함수를 값으로 가지는 객체가 된다.

```jsx
{
  message: "hi",
  say: [Function]
}
```

만약 exports 객체를 함수 또는 새로운 객체로 설정하려면 module.exports 객체를 사용해야 한다.

```jsx
module.exports = function () {
  console.log("hello world");
};

require("./example2.js")(); //require itself and run the exports object
```

exports 객체는 cached되기 때문에 require를 통해 여러 번 호출하고 다음 호출때는 cached된 데이터를 재사용 한다. </br>

### 2. require가 실행되면 아래 5단계의 step을 밟는다

[참고사이트1](https://www.thirdrocktechkno.com/blog/how-nodejs-require-works/) [참고사이트](https://www.geeksforgeeks.org/nodejs-require-module/?ref=gcse)2

위의 두 사이트를 참고하여 복잡한 require의 과정을 정리해 보았다.

![https://s3-ap-south-1.amazonaws.com/trt-blog-ghost/2020/03/63-2.png](https://s3-ap-south-1.amazonaws.com/trt-blog-ghost/2020/03/63-2.png)

1. Resolution : 받아온 인자를 통해 파일의 경로를 찾는 과정이다. </br> 파일을 찾는 과정은 module이 빌트인 모듈인지, 개발자 모듈인지, 타사 모듈인지에 따라 찾는 규칙이 있다. </br>이에 대한 자세한 사항은 [the official docs](https://nodejs.org/docs/v0.4.2/api/modules.html#all_Together...) 를 참고하면 수도 코드도 볼 수 있다.
2. Loading : 찾은 path에 있는 소스파일을 읽어서 가져오는 과정
3. Wrapping : Node.js 파일들은 실행되기 전에 아래와 같은 함수로 래핑된다. </br>이렇게 함으로써 인자로 들어온 exports와 require객체, module, \_\_filename 등 인자로 전달된 값을 사용할 수 있다. [Node공식문서-Wrapper](https://nodejs.org/api/modules.html#the-module-wrapper)

   exports와 require 객체는 module에서 값을 내보네는데 사용된다.

   ```jsx
   (function (exports, require, module, __filename, __dirname) {
     // Module code actually lives in here
   });
   ```

4. Evaluating : VM module로 보내지고 module이 평가된다.
5. Caching : require.cache module에 캐시되고 다음 require호출 시 캐시된 모듈을 불러온다. [Node 공식문서 - require.cache](https://nodejs.org/api/modules.html#requirecache)

### 3. require 함수 요약한 코드

문서에서 가져온 실제 require의 동작을 간단하게 요약한 코드이다 [Node 공식문서 - module-shortcut](https://nodejs.org/api/modules.html#exports-shortcut)

```jsx
function require(/* ... */) {
  const module = { exports: {} };

  ((module, exports) => {
    // Module Code가 들어간다. (이 예시에서는 함수를 정의한다)
    function someFunc() {}
    exports = someFunc;
    // 이 시점에서, exports는 더이상 module.exports의 shorcut이 아니다.
    // 아직 빈 객체를 export한다
    module.exports = someFunc;
    //  아 사점에서, module 은 default obj가 아닌 someFunc를 export한다.
  })(module, module.exports);

  return module.exports;
}
```

물론 이 사이에 위에서 언급한 Resolution, Loading, Wapping, Evaluation, Caching의 단계가 있을 것이다.

찾아보다 아래의 사이트에서 요약을 해놓은 글을 보았다. 간략히 정리하면 아래와 같다.

[참고한 사이트](https://medium.com/@chullino/require-exports-module-exports-%EA%B3%B5%EC%8B%9D%EB%AC%B8%EC%84%9C%EB%A1%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-1d024ec5aca3)

```jsx
var require = function(src){                 // src인자를 받아온다
    var fileAsStr = readFile(src)            // src파일을 읽어서 저장한다
		// resolution, loading의 단계라고 생각된다.

    var module.exports = {}                  // module.exports라는 빈 해시를 생성한다
		// 이 부분이 위의 요약한 코드에 포함되지 않을까 싶다

    eval(fileAsStr)                          // evaluation 단계
		// 이 과정은 단순히 src를 복붙하는 과정이라고 생각하면 쉽다고 한다.

    return module.exports                    //line 5
}
```

### 4. 정리

오늘 정리한 내용의 핵심만 정리하면 아래와 같겠다.

1. require()는 module.exports 객체를 return 하므로 아래와 같이 사용할 수 있다.

   ```jsx
   //foo.js
   const a = 10;
   exports.a = a;
   ```

   ```jsx
   // use foo
   const foo = require("./foo.js");
   console.log(foo.a);
   ```

1. require()는 내부적으로 resolution → loading → wrapping → evaluation → caching 단계를 거친다

다음 글에서 export에 대해 정리를 해보겠다.
