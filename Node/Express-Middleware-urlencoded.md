# Express-Middleware-urlencoded-작성중

Category: JavaScript
Visibility: Public
강의: CodeStates
블로깅: No
유형: Sprint
작성일시: 2022년 1월 7일 오후 5:54

[4.x API](https://expressjs.com/en/api.html)

# Express.urlencoded([option])

urlencoded는 Express의 내장되어있는 Middleware이며 Express Version 4.16.0부터 지원이 된다.

urlencoded moddleware는 urlencoded body만을 parsing하며(구문분석) Content-type header 가 type option과 매칭되는 요청만 확인하는 middleware를 반환한다.

또한 이 parser는 UTF-8 encodint만을 받으며 gizip 또는 deplate encoding을 자동으로 지원한다.

parsing된 데이터를 담은 새로운 body 객체가 middleware 이후에 요청 객체에 채워진다. 만약 parsing된body가 없거나 Content-type과 맞지 않는다면 빈 객체가 들어가거나 error를 발생시킨다.

이 새로운 객체는 key-value 쌍을 갖게되며 extened가 false이면 value는 string 또는 array이며 extended가 true라면 어떠한 type이든지 vale로 올 수 있다.

| Propertye      | Description                                                                                                                                             | type    | default                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------- |
| extended       | extended는 다수의 object 또는 array가 url-encoded format으로 encoding될 수 있게 해준다.                                                                 | Boolean | true                                |
| inflate        | 압축된 body를 다루는 것을 허가 또는 허용 (false인 경우 압충된 body는 거절)                                                                              | Boolean | true                                |
| limit          | 최대 request body의 최대 사이즈를 데한한다. (number or stirng...)                                                                                       | Mixed   | "100kb”                             |
| parameterLimit | URL-eocoded data에 ptarameter의 최대 수를 제한한다. 제한 이상의 파라미터가 들어오면 err                                                                 | Number  | 1000                                |
| type           | Middleware가 parse할 type을 정할 떄 사용된다. string, 또는 string 의 배열 또는 함수가 가능하다.함수라면 : 이 함수가 trury value라면 요청이 parsing된다. | Mixed   | "application/x-www-form-urlencoded” |

verify : This option, if supplied, is called as verify(req, res, buf, encoding), where buf is a Buffer of the raw request body and encoding is the encoding of the request. The parsing can be aborted by |throwing an error. | function | undefined |
