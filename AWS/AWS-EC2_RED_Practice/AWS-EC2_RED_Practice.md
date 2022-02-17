# AWG-EC2 Instance-RDS연결Practice

Chapter: Linux
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2022년 2월 17일 오후 2:08

# AWG EC2 Instance

- EC2 Instance 연결은 로컬 터미널에서 SSH 프로토콜을 이용해서 인스턴스와 연결이 가능하다.
- private.pem key 의 접근 권한이 400 인지 확인한다. 아니라면 chmod 400 path/private.pem 으로 변경
- ssh 명령어를 통해 인스턴스에 접근한다

  ```bash
  ssh -i "AWS_Deploy_Practice.pem" ubuntu@ec2-52-72-93-130.compute-1.amazonaws.com
  ```

  - ssh : ssh 프로토콜을 통해
  - -i “AWS_Deploy_Practice.pem” : “AWS_Deploy_Practice.pem” 라는 이름의 key를 가지고
  - ubuntu : ubuntu 라는 사용자 이름으로
  - @ec2-52-72-93-130.compute-1.amazonaws.com : 이 주소의 가상 PC에 접속한다

- EC2 Instance에서 git clone 시 login Error
  ```bash
  remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
  ```
  위와 같은 Error 가 발견됨. 비밀번호로 인증하는 것이 2021-8-13일부터 종료되었으므로 개인 access token을 사용하라는 error이다. 즉, 비밀번호가 아닌 ssh 나 토큰으로 인증을 해야한다.
  git 에서 ssh키를 만들어서 로그인을 해보자 \***\*[Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)\*\***
  [참고 블로그](https://velog.io/@loakick/2019-11-19-0011-%EC%9E%91%EC%84%B1%EB%90%A8-2ck34lupye)
- Prosess Manegement tool
  - PM2 npm inatall pm2 -g 로 설치
  - pm2 start app.js를 이용하여 백그랑룬드로 앱을 실행 할 수 있다.
    - 이렇게 되면 Terminal을 종료해도 node.js application이 프로세스로 실행이 된다.
  - pm2 stop : process 중지
  - pm2 restart : process 재시작
  - pm2 ls : process 목록 보기
  - pm2 log : process log 보기
- 1024 아래의 포트 번호를 이용해서 서버를 실행시키는 경우 관리자 권한이 필요하다.
  - pm2 log로 확인하면 아래와 같은 error가 뜨는데, 이는 관리자 권한으로 실행하지 못해서 생긴 문제이다.
    ![Untitled](./img/Untitled.png)
    ![Untitled](./img/Untitled%201.png)
  - 이를 위해 authbind 하는 package를 추가적으로 설치해야 한다.
    ```bash
    $ sudo touch /etc/authbind/byport/80
    $ sudo chown ubuntu /etc/authbind/byport/80
    $ sudo chmod 755 /etc/authbind/byport/80
    $ authbind --deep pm2 update
    ```
    - 만약 이미 관리자 권한을 부여하기 전에 프로세스가 실행되고 있었다면, pm2 delete app.js 를 통해 삭제를 해주어야 한다. (authbind 설치 전에 실행된 프로세스는 관리자 우너한을 부여하지 못했기 때문)
    - pm2에 관리자 권한을 부여하기 위해서는 authbind —deep pm2 start app.js를 서버를 다시 실행하며 ㄴ딘다.
- Error → 이 문제의 경우 RDS를 생성하고 연결을 해주니 ;; 해경 되었다 ;; 당연한 것이 아직 어떤 DB와도 연결이 안 되어 있으니 나오는 문제이다 ;;
  참고한 아고라 스테이츠 키워드 : Error: getaddrinfo EAI_AGAIN mysql
  [https://github.com/codestates/agora-states/discussions/2236](https://github.com/codestates/agora-states/discussions/2236)
  [https://okky.kr/article/882507](https://okky.kr/article/882507)

  - pm2까지 마친 후 서버 실행 : 아래 스샷처럼 성공
    ![Untitled](./img/Untitled%202.png)
  - pm2 ls
    ![Untitled](./img/Untitled%203.png)
  - pm2 log : Error code들이 생겨있음

    ![Untitled](./img/Untitled%204.png)

  - node 문서에서 [https://nodejs.org/api/dns.html#dns_dns_lookup_hostname_options_callback](https://nodejs.org/api/dns.html#dns_dns_lookup_hostname_options_callback)
    On error, `err`
     is an `[Error](https://nodejs.org/api/errors.html#class-error)`
     object, where `err.code`
     is the error code. Keep in mind that `err.code`
     will be set to `'ENOTFOUND'`
     not only when the host name does not exist but also when the lookup fails in other ways such as no available file descriptors.

## AWS RDS 연결

mysql에서 DB Instance에 접속하려면 아래와 같은 정보를 입력한다.

```bash
mysql -u [마스터 이름] --host [엔드 포인트 주소] -P 13306(포트 번호) -p
```

- ERror : ERROR 2003 (HY000) 발생
  - 보안상의 이슈라고 한다.
  - Security Group의 default의 source를 Al로 추가한다

일단 여기까지 EC2 생성 및 연결을 하고 RDS 연결까지 실습을 완료하였다.
