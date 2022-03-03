# 9. 에러 처리 하기

Done Date: 2022년 3월 3일
Due Date: 2022년 2월 28일
Note: 정리 완료 TIL
Status: Done 🙌

1. Intro

- Exception Error는 예상하지 못한 error를 의미한다
- Error처리를 통해 안정성 , 유지 보수성 높일 수 있다.
- 예상할 수 있는 Error: errors State 라고 한다
- 예상할 수 있는 Error인지, Execption인지 구분해서 사용할 필요가 있다.
- Error : 예상 가능 Error expected
- Exception : unexpected
- JAVA에는 Exception이라는 Class가 있고 JS에는 Error Class를 사용한다.

1. Error를 Compile 단계에서 발견할 수 있도록 프로그래밍을 하자!

   - 예를 들면 아래와 같이 switch문을 사용하는 경우 마지막에는 default로 인자에 없는 값이 있는 경우 error로 처리하는 구문을 만들 수 있다. <br>case 이외의 인자는 default로 들어가게 되고 thow Error를 던진다.

     ```tsx
     switch (num) {
       case "+":
         num += 1;
         break;
       case "-":
         num -= 1;
         break;
       case "*":
         num *= 1;
         break;
       case "%":
         num %= 1;
         break;
       default:
         throw new Error(`unknown number`);
     }
     ```

   - 하지만 위의 코드는 위의 코드가 실행되고 나서야 Error를 던진다. 아해와 같이 수정하면 compile 단계에서 Error을 잡을 수 있다.
     ```tsx
     switch (num) {
       case "+":
         num += 1;
         break;
       case "-":
         num -= 1;
         break;
       case "*":
         num *= 1;
         break;
       case "%":
         num %= 1;
         break;
       default:
         const invalid: never = num;
         // default case로 오게되면 invalid에서 error가 뜬다.
         // 이렇게  컴파일 단계에서 애러를 잡을 수 있다.
         throw new Error(`unknown direction${invalid}`);
     }
     ```
   - never type으로 num을 받게하면 컴파일 단계에서 “Type 'string' is not assignable to type 'never’ “ 와 같은 Error를 보여주기 때문에 미리 방지할 수 있다.
   - 솔직히 아직 타입 기반의 코딩이 익숙하지 않기 때문에 이런 방법을 즉각 생각하기에는 아직 미숙한 것 같다.</br> 타입을 사용하여 본격적으로 코딩을 하게 될 때 다시 강의를 정리한 내용을 통해 복습을 해주면서 익혀두여야 할 내용.
   - 참고로, Error는 디테일하게 error관련 정보까지 넣어주는 것이 좋다. 어디서 Error가 발생했는지, 무엇때문에 발생했는지 등의 힌트가 될 수 있는 정보를 넣어주자

2. Try Catch를 사용하자 !
   - Try Catch 구조는 다른 프로그래밍 언어(이전에 파이썬에서 다뤄본 적이 있다)에서 다뤄본 적이 있어서 이해하는데 어려움이 있지는 않았다.</br> 다만, 이를 남발하지 않고 적재적소에 사용할 수 있도록 연습이 필요한 부분이라 생각한다.
   - 이 구문은 Try - Catch - Finally 부분으로 구분된다. 아래 예시를 통해 확인해보자
     ```tsx
     try {
       console.log(readFile(fileName));
     } catch (error) {
       console.log(`catched!!`); // --> 적절한 뒷처리
     } finally {
       closeFile(fileName); // 파일을 읽었다면 꼭 닫아주어야 하기 떄문에 finally에서 실행해주는 것이 좋다
       console.log("finally!!"); // try가 실패하든 성공하든 Finally는 호출ㅇ됨
     }
     console.log(`!!!!`);
     ```
     - try : error가 발생할 수도 있는 부분에 try를 하는 부분이다.
     - catch : 만약 error가 발생한다면 처리할 코드를 작성하는 부분
     - finally : try가 실패하든 성공하든 호출된다.
       - finally를 쓰는 이유는, 만약 catch문에서 더이상 코드를 실행하지 않고 return을 한다던가 추가적인 Error가 나올 때 error 발생과는 무관하게 필수적으로 처리해야햐는 코드들이 있는데 이를 실행하지 못하는 경우가 있기때문.
       - 예를 들어 file을 open하는 함수의 경우 file을 닫아주는 함수 또한 처리를 해주어야 한다. 이런 경우 finally에 넣어서 처리를 해주는 것이 적절하다.
         → Try문을 넣을 때에는 error를 “우아하게" Handling 할 수 있는 곳에서 Try를 하는 것이 바람직하다!!!
3. Try구문은 우아하게 처리할 수 있는 곳에 넣어야한다

   사용자가 Error처리를 확인할 수 있는 곳, 또는 error 처리를 의미있게 전달할 수 있는 곳에 넣어야 한다. 이런 부분은 코드를 많이 쳐보면서 익혀야 하는 부분이라 생각한다.

4. 세부적인 error를 쓰는 경우에는 error state를 쓰는 것이 좋다!

   - 예를 들면, 아래와 같이 특정 Error를 세분화해서 객체로 만드는 경우보다 type으로 만드는 것이 더욱 적절하다.

     ```tsx
     class TimeoutError extends Error {} // timeout이 발생하는 경우
     class FailureError extends Error {} // network이 없는 경우

     // 어떤 함수에서 ..
     try {
       login();
     } catch (error) {
       // catch로 error를 받는 순간 any type이 되어 타입 정보가 사라진다
       // show dialog to user
       if (error instanceof FailureError) {
         // 따라서 Instanceof는 ts에서 catch안에서는 사용할 수 없다.
       }
     }
     ```

     - 로그인의 경우 Error를 예측할 수 있으므로 try catch를 사용하였다.
     - 위의 경우 error가 catch의 인자로 들어오는 경우 instanceof를 사용하여 FailureError인 경우를 if문으로 처리하였다. </br>하지만 catch로 error를 받게되면 error는 any type이 되므로 타입 정보가 사라지게되므로 instanceof를 사용할 수 없는 문제가 있다. (typescript에서는 그렇다)

   - Error State를 만들어서 세부적인 Error를 설정하는 것이 적절하다
     예를 들어 아래와 같이 error가 발생할 수 있는 부분에 대해서는 return type으로 어떤 상태가 되는지 만드는 것이 더 좋은 방법이다

     ```tsx
     class Response {
       response(): ResultState {}
     }
     ```

     - Client에 Response를 보내는 Class가 있을 경우 response가 failed인 경우와 success인 경우를 예측할 수 있다. 이런 경우 response를 보냈을 때 ResultState의 타입을 return하는 방향으로 코딩하는 것이 좋음.
     - ResultState는 다음과 같이 성공인 경우와 실패인 경우의 타입을 갖는 타입이다.
       ```tsx
       type ResultState = SuccessState | FailureState;
       ```
     - SuccessState와 FailureState는 같은 result라는 key를 갖고있고 failure의 경우 reson union으로 설정해 둠으로써 예상 가능한 Error들을 설정할 수 있다

       ```tsx
       type FailureState = {
         result: "fail";
         reason: "offline" | "down" | "timeout"; // error reason을 union으로 설정해두면 적절하게 사용자에게 보내줄 수 있다.
       };

       type SuccessState = {
         result: "success";
       };
       ```

       Error처리를 할때마다 위의 예시를 참고하자!!
       → Error처리는 항상 습관화를 하는 것이 중요하다는 말을 많이 들었다. </br>try catch 구문과 type을 사용한 Error 세분화를 적절히 사용하는 습관을 들이자! 이 습관이 읽기 좋은 클린 코드를 만드는 길이다!
