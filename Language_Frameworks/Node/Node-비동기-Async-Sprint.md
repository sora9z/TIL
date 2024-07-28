# [JS/Node][Codestates] 비동기 - Async Sprint

Category: JavaScript
Visibility: Public
강의: CodeStates
블로깅: Yes
유형: Sprint
작성일시: 2021년 10월 10일 오후 11:53

# Async

이번 포스팅은 이번주 진행했던 Pair Programming 으로 진행한 Async Sprint에 대한 리뷰로 작성하였다. 

이번 Sprint의 목표는 1. Node.js의 fs module을 사용하여 비동기 코드를 Callback , Promise, Asyn키워드로 코드를 작성하는 것과   2. fetch API를 활용한 Network 요청과 처리에 대한 간단한 코드를 짜보는 것이다. 

구글링이나 강의를 통해 이해했던 것보다 훨씬 공부가 되었던 시간이었다.  

## 1. 비동기 - fs 모듈을 사용한 파일 읽기

이번 Sprint에서 사용 할 Node.js 모듈인 fs.readFile에 대해 간단히 정리해보자.

**fs.readFile**

[공식문서](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_readfile_path_options_callback) 를 참고하였다.

```jsx
**fs.readFile(path[, options], callback)**
```

- 파일을 [options]의 방식으로 읽은 후 callback으로 전달된 함수를 비동기적으로 호출시킨다.
- 인자로 전달된 경로의 파일의 전체 내용을 읽어온다
- Parameters
    - path : filename or file descriptor  네 가지 타입이 있지만 일반적으로 string 타입으로 넘긴다.
    - callback(eerr,data) : callback은 파일을 읽고난 후 비동기적으로 실행된다.  error가 발생되지 않으면 err는 null을 갖는다. data는 파일의 내용이며 문자열 또는 Buffer Object가 전달된다.
    - oprions : Object || String 타입을 갖는다. 데이터를 어떻게 인코딩을 하는지 정하는 옵션. 문자열인 경우 encoding을 넘긴다.

실행 예시 

```jsx
fs.readFile('test.txt', 'utf8', (err, data) => {
  if (err) {
    throw err; // 에러가 발생하면 err를 던집니다.
  }
  console.log(data);
});
```

## 1. fs 모듈을 활용한 파일 읽기

file의 경로를 통해 파일을 읽어 반환하는 함수를 만든다. 먼저 callback 함수로 구현을 해보고 Promise 객체를 사용하여 구현을 한다.

### 1) callback함수

```jsx
const getDataFromFile = function (filePath, callback) {
 
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) callback(err, null);
    else callback(null, data);
  });
};

getDataFromFile("README.md", (err, data) => {
  console.log(data);
});
```

callback 함수는 일반적으로 첫 번쨰 인자로 error를 넣는다. 어떤 요인에 의해 비동기 함수에서 error 발생 시 첫 번째 인자와 함께 callback 함수를 실행시켜 error handling을 하기 위함이다. 

만약 error가 발생하면 callback 함수의 첫 번째 인자가  전달되고, 두 번째 인자에는 null을 전달한다. 

error가 발생하지 않다면 callback함수의 첫 번째 인자로 null을 전달하고 두 번째 인자에는 data를 전달해준다.

### 2) Promise 객체

```jsx
const getDataFromFilePromise = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (data === undefined) reject(err);
      else resolve(data);
    });
  });
};

getDataFromFilePromise("README.md")
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

Promise 객체는 callback 함수를 선언할 수 있고 , resolve와 reject를 인자로 받는다.  resolve는 error가 발생되지 않았을 때 실행하게 되며 then()을 이용해서 처리 결과 값을 받는다.

위의 getDataFromFlePromise는 file의 경로를 받고 Promise 객체를 return 한다. Promise의 callback으로 fs.readFile이 실행되고 인자로 받은 filePath를 읽어온다. 만약 data가 undefined이면 error이므로 reject로 error를 넘겨주고 , 정상적으로 파일의 내용을 받아오면 resolve를 통해 data를 넘겨준다. 

getDataFromFilePromise의 실행문을 보면, then을 통해 resolve로 넘겨받은 data를 console로 출력한다. 

만약 data가 없다면 catch로 error를 넘겨받아 err를 출력한다.

## 2. 비동기 처리

위에서 작성한 getDataFromPromise를 사용하여 두 개의 json format 파일을 불러오고, 두 파일을 합쳐서 두 객체가 담긴 배열을 만드는 코드를 작성한다. 1) Promise Chaining 2) Promise.all 3) async, await 세 가지 방법으로 작성해보자.

### 1) Promise Chaining

 Promise와 then 키워드를 사용하여 순서대로 비동기 처리를 할 수 있다

- 사용한 module : path
    - path.join([...paths]) : 인자로 주어진 path들을 하나의 경로로 join 한다
    - __dirname : 현재 실행중인 파일이 들어있는 directory의 절대경로를 반환해준다.

```jsx
// 필요한 module을 불러온다.
const path = require("path");  
const { getDataFromFilePromise } = require("./02_promiseConstructor"); 

// json 파일을 불러와 선언한 변수에 할당한다.
const user1Path = path.join(__dirname, "files/user1.json");
const user2Path = path.join(__dirname, "files/user2.json");

// Chaining을 통한 구현
const readAllUsersChaining = () => {
  return new Promise((resolve, reject) => {
    resolve(
      getDataFromFilePromise(user1Path)
        .then(JSON.parse)
        .then((obj1) => {
          return getDataFromFilePromise(user2Path)
            .then(JSON.parse)
            .then((obj2) => [obj1, obj2]);
        })
    );
  });
};

readAllUsersChaining().then((result) => console.log(result));
```

먼저, readAllUsersChaining은 Promise 객체를 반환하고, resolve로 여러 Promise Chaining된 Promise를 전달한다. 

 resolve로 전달되는 Chaining을 보자. getDataFromFilePromise로 첫 번째 json 파일을 읽어 data를 반환하고, then을 통해 JSON.parse로 객체로 변환한다. 그것의 반환값을 obj1으로 그 다음 실행 될 then으로 넘겨주고 getDataFromFilePromise로 두번째 json 파일을 읽어 data를 반환 후 다시 JSON.parse로 객체로 변환 후 ..... 이전에 받은 obj1 과 함께 배열로 return 된다....... 상당히 가독성이 좋아보이지 않는다.  callback hell과 같은 느낌의 지옥이 느껴지는 코드이다. 이를 해결하기 위해 Promise.all을 사용할 수 있다.

### 2) Promise.all

Promise.all은 다수의 Promise를 병렬로 처리할 때 유용하게 쓰인다고한다. 바로 위의 예제 처럼 다수의 promise를 chaining 하여 사용할 때 Promise.all을 사용하면 더욱 간단하게 코드 작성이 가능하다.

어떤 코드가 성공적으로 완료되기 위해 필요한 비동기적인 작업이 있을 때, Promise.all()을 사용하여 병렬적으로 실행할 수 있다.

**참고 사이트** 

[언제 Promise.all을 사용해야 될까?](https://code-masterjung.tistory.com/91)

```jsx
Promise.all([promise1,promise2,promise3...]).then((value)=>{
	console.log(value);
}));
```

이를 사용하여 코드를 작성하면 아래와 같이 작성할 수 있다.

```jsx
const readAllUsers = () => {
  return Promise.all([getUser1, getUser2]).then((values) => [
    values[0],
    values[1],
  ]);
};

const getUser1 = getDataFromFilePromise(user1Path).then((json) =>
  JSON.parse(json)
);

const getUser2 = getDataFromFilePromise(user2Path).then((json) =>
  JSON.parse(json)
);

readAllUsers().then((result) => console.log(result));
```

Promise.all은 인자로 배열을 받는데, 배열의 요소는 Promise이다. 

getUser1, getUser2는 json 파일을 getDataFromFilePromise을 사용하여 읽어오고 바로 JSON.parse를 사용하여 객체로 변환한다. 

두 개의 promise를 promise.all의 배열 인자로 넣어주고 then을 통해 values로 받아와 처리를 해준다. 

바로 위의 Promise chaining을 통해 구현했던 코드보다 훨씩 가도성이 좋다.  

### 3) async , await keyword

async , await은 Promise 객체를 반환한다. 이는 Promise 객체에서 사용하던 then 또한 사용할 수 있음을 의미한다. new Promise로 Promise 객체를 만들고 resolve와 reject로 값을 전달하는 과정없이 (는 아니고 자동으로 만들어 준다)  async 키워드를 통해 함수를 Promiose로 return 해주는 함수를 만들 수 있다.  또한 resolve를 사용하지 않고도 return 으로 값 전달이 가능하다.

await은 비동기 처리가 가능하게 해준다. await 키워드가 있다면 해당 코드가 완료된 후 다름 코드가 실행되도록 한다. 

async, await 을 통해 작성된 코드는 아래와 같다.

```jsx
const readAllUsersAsyncAwait = async () => {
 
  const user1 = await getUserData(user1Path);
  const user2 = await getUserData(user2Path);
  return [user1, user2];
};

function getUserData(userPath) {
  return getDataFromFilePromise(userPath).then(JSON.parse);
}

readAllUsersAsyncAwait();
```

async를 사용하여 readAllUsersAsyncAwait를 Promise를 return 하는 함수로 만든다.

getUserData()는 파일의 경로를 입력받으면 getDataFromFilePromise()를 사용해 파일을 읽어오고 객체로 반환하는 Promsie를 return한다. 

readAllUsersAsyncAwait() 안에서 await 으로 비동기 처리가 진행되고 값을 return 한다. 

Promise.all을 사용했을 때보다 더욱 간단하고 마치 동기적으로 구동되는 모습과 비슷하다. 

코드를 짜면서 error 처리를 따로 해주지 않았는데, 원래는 해주어야한다..!!!! 

이렇게 세 가지 버전으로 코드를 구성해보았다.  솔직히 async 키워드를 사용하는 것이 제일 좋은 것 같지만 상황에 따라 다른 방법으도로 구현을 할 수 있어야 한다고 한다.  적재적소에 사용하는 방법은 앞으로 코드를 많이 쳐보면서 알게되지 않을까 싶다.