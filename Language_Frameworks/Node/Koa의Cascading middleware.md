# Koa 의 Cascading middleware

# Koa 의 Cascading middleware

## 개요

---

koa를 공부하기 위해 공식 홈페이지에서 **“Koa invoke "downstream", then control flows back "upstream"** 이라는 설명을 보았다. Express는 한 방향(downstream)으로만 미들웨어가 실행되는데 koa는 downstream 과 upstream이 가능하다는 것이다. 지금까지 Express에 익숙해져 있기 때문에 한 번은 정리를 해볼 필요성을 느껴 글을 작성하게 되었다.

먼저, [Koa github의 가이드](https://github.com/koajs/koa/blob/master/docs/guide.md)를 참고하여 이해를 했고, 잘 이해한 것이 맞는지 확인하기 위해 [Stackoverflow](https://stackoverflow.com/questions/53039365/how-is-koa-middleware-different-from-express-middleware) , [블로그](https://www.cmsdrupal.com/blog/koa-vs-express-how-koa-middleware-different-express-middleware)들을 참고하였다.

### Koa 와 Express의 next()

**Express**의 next()는 middleware 호출의 마지막에 호출된다.

즉, 첫 번째 미들웨어의 실행 ⇒ 두 번째 미들웨어 실행...(Downstream)으로 코드가 실행된다.

그러다 보니, 마지막에 위치한 middleware가 request를 전송하는 담당을 하게 된다.

하지만 **Koa**의 next()는 Express와는 달리 다음 middleware의 결과를 return 하게 된다.

Koa는 stack-like manner로 실행이 되고, 이런 구조로 인해 아래의 코드 (공식문서의 예시 코드)는 downstram과 upstream으로의 실행도 가능하게 된다.

```jsx
const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  await next(); // 실행 순서 : 1
  const rt = ctx.response.get('X-Response-Time'); // 5
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now(); // 2
  await next();
  const ms = Date.now() - start; // 4
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async (ctx) => {
  ctx.body = 'Hello World'; // 3
});

app.listen(3000);
```

### async/await 키워드

koa는 async / await을 지원한다 (이 때문에 node v7.6.0 이상을 요구한다) 위와 같은 실행은 async await 키워드를 사용하기에 가능하다.

직접 위의 코드가 call stack에 어떻게 담기고 어떻게 실행되는지 순서대로 작성해 보면 아래와 같다

1. logger가 callstack에 쌓인다.
2. await 키워드를 만나게 되고 next()를 실행하고 다음 미들웨어인 X-response-time이 call stack에 올라간다.
3. X-response-time이 await 키워드를 만나기 전까지 코드가 실행된다.
4. await키워드를 만나면 next()가 실행되고 다음 미들웨어인 response가 call stack에 올라간다.
5. response 실행이 종료되면 call stack에서 제거되고 X-response-time이 실행됨과 동시에 await 키워드를 만난다.
6. X-response-time은 await 키워드를 만났기 때문에 call stack에서 제거되고 마이크로큐에 들어가게 된다.
7. 콜스텍에 남은 logger가 실행되고 동시에 await 키워드를 만나게 된다.
8. logger 또한 call stack에서 제거되고 마이크로큐에 들어가게 된다.
9. call stack이 비워졌으므로 이벤트 루프는 마이크로큐에 첫 번째로 있는 X-response-time을 call stack에 넣는다.
10. 실행이 종료되면 call stack에서 제거되면서 call stack은 다시 비워지게 된다.
11. call stack이 비워져 있으므로 이벤트 루프는 마이크로 큐의 logger 미들웨어를 call stack에 push 한다.
12. logger가 마지막으로 실행되고 call stack은 비워지게 된다.

## 마치며

---

koa를 공부하려고 먼저 공식 문서의 **Introduction**을 읽었을 때 같이 있던 예시 코드의 실행이 이해가 안 되었다. express를 기반으로 이해를 하려고 하니 왜 미들웨어의 실행이 한 방향이 아닌지 당황스러웠었다. 조금 시간을 내서 알아보고 조금 길지만 이렇게 작성하고 보니 공식문서 언급했던 **“Koa invoke "downstream", then control flows back "upstream"**의 의미를 어느 정도 이해할 수 있었다.

부족한 부분은 댓글로 작성해 주시면 수정하도록 하겠습니다.
