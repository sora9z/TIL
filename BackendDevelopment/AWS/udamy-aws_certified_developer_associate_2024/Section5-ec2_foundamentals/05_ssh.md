[⬅️ BACK ](./README.md)

# SSH

### SSH overview

- ssh는 command line interface를 제공하는 utility이다.
  - mac, linux, windows >=10 에서 사용 가능하다
- window 10 이전에서는 Putty를 사용한다.(어떤 버전의 윈도우에서도 사용 가능하다)
- EC2 Instance Connect
  [EC2 Instance Connect](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/ec2-instance-connect-methods.html)
  - 이 방법은 EC2인스턴스에 접근하기 위해 ssh키를 저장하고 관리할 필요가 없다.
  - ssh 키를 생성하고 60초동안 유지한다.
  - 리눅스, 맥, 윈도우 모든 버전에서 사용 가능하다.
  - 하지만 지금은 아마존 NX2 인스턴스에서만 사용 가능하다.

### How to use SSH using Linux or Mac

- SSH는 command line을 통해 remote machine에 접근하고 제어 할 수 있게한다.

  - 기본 명령어는 아래와 같다

  ```
  ssh -i <프라이빗 키 파일 경로> <사용자>@<서버 IP 또는 도메인>

  ```

  - `<사용자>`: SSH 접속 시 사용할 사용자 이름. AWS EC2에서는 일반적으로 ec2-user를 사용.
  - `<서버 IP 또는 도메인>`: 접속하려는 서버의 IP 주소 또는 도메인.

- 터미널에서 ssh 파일이 있는 곳에 위치해야한다

```
ls
EC2Tutorial.pem

```

- 권한을 변경해야한다

```
# 소유자만 읽기 가능하도록 바꾼다
chmod 0400 EC2Tutorial.pem

# .pem의 권하이 너무 느슨하면 아래와같은 애러 발생

Permissions 0644 for 'EC2Tutorial.pem' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.

# 아래와 같이 바뀐다
-r--------@  1 jegne9  staff  1678 11 29 16:31 EC2Tutorial.pem

```

- ssh 명령어를 입력하면 로그인이 된다

```
ssh -i EC2Tutorial.pem ec2-user@{ec2의 public ip}


   ,     #_
   ~\_  ####_        Amazon Linux 2023
  ~~  \_#####\
  ~~     \###|
  ~~       \#/ ___   https://aws.amazon.com/linux/amazon-linux-2023
   ~~       V~' '->
    ~~~         /
      ~~._.   _/
         _/ _/
       _/m/'

```

- 주의할 점은 EC2가 재시작되면 Public ip도 바뀐다.
