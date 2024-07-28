# WEB-SERVER-NODE.js HTTPS 서버 구현하기

Category: WEB SERVER
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2022년 1월 21일 오후 8:41

# NODE.js HTTPS 서버 구현하기

### HTTPS 서버 구현하기

1. 인증서 만들기 
    1. [mkcert](https://github.com/FiloSottile/mkcert) 라는 프로그램을 이용하여 local에서 신뢰할 수 있는 인증서를 만든다.
        
        MAC의 경우 Hombrew를 통해 mkcert 설치가 가능하다.
        
        ```bash
        brew install mkcert
        
        # fireFox의 경우 
        brew install nss
        ```
        
    2. 인증서 생성
        
        ```bash
        mkcert -install
        # 로컬을 인증서 발급기관으로 추가한다.
        # Result
        Sudo password:
        The local CA is now installed in the system trust store! ⚡️
        ```
        
    3. 로컬 환경에 대한 인증서 만들기 
        
        ```bash
        $ mkcert -key-file key.pem -cert-file cert.pem localhost 127.0.0.1 ::1
        
        # Result
        The certificate is at "cert.pem" and the key at "key.pem" ✅
        ```
        
        - cert.pem , key.pem이라는 파일이 생성된다.
        - cert는 공개키이며 인증기관의 서명을 포함하고 있으므로 공개되어도 상관 없다.
        - key.pem의 경우 개인키이기 때문에 암호처럼 다루어야함.
    
2. HTTPS 서버 작성하기
    - Node.js의 https 모듈 사용하는 방식
    
    ```bash
    //! Node 모듈인 https 모듈을 이용하여 서버를 만든다
    
    const https = require("https");
    const fs = require("fs");
    
    const options = {
      key: fs.readFileSync("key.pem 의 경로", "utf-8"),
      cert: fs.readFileSync("cert.pem 의 경로", "utf-8"),
    };
    
    https
      .createServer(options, function (req, res) {
        res.write("Comgrates!!! You made https server new :)");
        res.end();
      })
      .listen(3001);
    ```
    
    - express를 사용하는 방식
    
    createServer의 두 번째 파라미터의 callback에 미들웨어를 넣어주면된다.
    
    ```bash
    const https = require("https");
    const fs = require("fs");
    const express = require("express");
    
    const app=express();
    
    const options = {
        key: fs.readFileSync("/Users/gangsola/key.pem", "utf-8"),
        cert: fs.readFileSync("/Users/gangsola/cert.pem", "utf-8"),
      };
    
    https.createServer(options,app.use('/',(req,res)=>{
        res.end("Congrets!! You made https server now by express;)");
    })).listen(3001);
    ```
    

### 터널링 해보기

[ngrok](https://ngrok.com/) 를 사용하여 위의 Server를 터널링 시켜보자.

ngrok은 HTTP로 만들어진 서버를 HTTPS 프로토콜로 터널링 해주는 프로그램이다.