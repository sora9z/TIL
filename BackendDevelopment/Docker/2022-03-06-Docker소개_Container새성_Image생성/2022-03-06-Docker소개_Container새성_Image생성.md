# Docker소개\_Container새성\_Image생성

Chapter: Docker
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2022년 2월 27일 오후 10:05

# Docker소개\_Container새성\_Image생성

Docker에 대해 공부한 내용 정리

## 1.About Docker

- docker는 application을 빠르게 구축하고, 테스트, 배포까지 할 수 있는 플랫폼이다. 컨테이너라는 표준화된 유닛에 소프트웨어를 실행하기 위한 모든 것이 들어있다. Docker는 이런 Container를 만들고 관리하는 도구이다.

  - docker는 리눅스 컨테이너 기술이다. 리눅스로 되어있다.

  ### [컨테테이너](https://www.docker.com/resources/what-container) 구성

  [그림출처](https://www.docker.com/resources/what-container)

  ![Untitled](./img/Untitled.png)

- 컨테이너란, 프로세스가 격리된 공간에서 동작하게 하는 기술이다. VM와 같이 OS를 가상화 하는 것이 아니라, 단순히 프로세스를 격리하는 방식을 사용한다.
- application이 네트워크 환경, 파일 시스템 등의 컴퓨팅 환경에 구애받지않고 빠르고 안정적으로 실행될 수 있도록 해준다.
- Docker Container Image는 Application을 실행할 수 있는 모든 것을 포함하는 실행형 sofeware package이다. </br>이 이미지를 사용하여 Infrastructure와 무관하게 Container를 빠르고 안정적이게 실행할 수 있다.
- 여러 Container가 동일 시스템이서 실행될 수 있도고 OS kernal을 다른 Container와 공유할 수 있다.

### Container 장점

1. VM과 다르게 OS를 포함하지 않기 떄문에 빠르다 → application의 배포를 쉽고 빠르게 가능하게 함
2. 개발과 배포 환경을 일치시킨다. → 수평 확장이 쉽다 , 새로운 내용 배포가 쉽다.
3. Docker Container를 개발 환경과 무관하게 실행가능하게 한다 → 의존성, 충돌 문제 해결

- Container에 의해 격리되어 개별적으로 소유할 수 있는 자원
  - 프로세스 Process :
    - 특정 컨테이너에서 작동하는 프로세스는 그 컨테이너 내에서만 엑세스 할 수 있다.
    - 다른 컨테이너의 프로세스에 영향을 줄 수 없다.
  - 네트워크 Network : 컨테이너당 한 개의 IP주소 할당
  - 파일 시스템

### Docker 구성

[그림 참조](https://iotbytes.wordpress.com/basics-of-container-registry-repository-tags-and-docker-hub/)

![https://iotbytes.files.wordpress.com/2017/09/registry.png?w=222&h=349](https://iotbytes.files.wordpress.com/2017/09/registry.png?w=222&h=349)

- 레지스트리(Registry)
  - 도커이미지를 관리하는 공간(Docker Hub : default registry or AWS ECR)
- 레포지토리(Repository)
  - Rergistry내에 Docker image가 저장되는 공간
  - 이미지 이름이 사용되기도 한다
- 태크(Tag)
  - 이미지가 같아도 버전 별로 안의 내용이 다를 수 있음
  - 주로 해당 이미지를 설명하는 version정보를 넣는다
  - default는 latest
- docker/whalesay:latest 의 의미는 : Docker Hub라는 레지스트리에서 , docker라는 유저가 등록한 whalesay 이미지 또는 레포지토리에서 latest tag를 가진 이미지를 말한다.

### Docker command

→ 이 부분은 따로 빼서 정리를 다시 하였다.

## 2. Docker 조작

### 1. Docker Image를 받아서 Container 생성하기

```bash
docker run --name 컨테이너_이름 -d -p 3000:80 container
```

### 2. Docker 이미지에 파일을 추가하고 도커이미지를 만들기

1. Docker Container에 파일 복사

   docker container에 파일을 복사하는 방법은 두 가지가 있다.

   1. CP : 호스트와 컨테이너 사이에 파일을 복사
      - [docker container cp](https://docs.docker.com/engine/reference/commandline/container_cp/) 명령은 앞 경로의 파일을 뒤 경로에 복사
        ```bash
        docker container cp ./ 컨테이너_이름:/usr/local/apache2/htdocs/
        ```
        현재 경로가 cp를 할 dir이므로 “./ “ 로 지정
   2. Volume : 호스트와 컨테이너 사이에 공간을 Mount : 저장 공간을 다른 장치에서 접근할 수 있도록 경로를 허용하여 마치 하나의 공간을 이용하는 것 처럼 보이게 함

### 3. Docker 이미지 만들기

- 이미지로 만들어 놓으면 좋은 점
  - 이전에 작업한 내용을 다시 수정하지 않아도 된다
  - 배포, 관리 유용

1. **구동한 Docker Container를 이미지로**

   1. [\*\*docker container commit](https://docs.docker.com/engine/reference/commandline/container_commit/) 명령을 이용\*\* : Create a new image from a container’s changes

      ```docker
      docker container commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]

      ex) docker container commit 컨테이너_이름 my_pacman:1.0
      ```

   b. **Docker Image 빌드를 위한 파일인 Dockerfile로 만드는 방법 → 많이 사용하는 방법이다.**

   [Dockerfile 공식 문서](https://docs.docker.com/engine/reference/builder/)

   - DockerFile을 만들고 Dockerfile대로 이미지를 build하는 방법이다
   - Dockerfile은 이미지 파일의 설명서라고 생각하면 됨
   - DockerFile (공식문서 내용임)
     - Docker can build images automatically by reading the instructions from a `Dockerfile`
       - DockerFile에 적혀있는 안내?에 따라 image를 build할 수 있다.
     - A `Dockerfile`  is a text document that contains all the commands a user could call on the command line to assemble an image.
       - Image를 만들기 위해 user가 command line에서 호출할 수 있는 모든 command를 포함하고있는 text document이다.
     - Using `[docker build](https://docs.docker.com/engine/reference/builder/)` users can create an automated build that executes several command-line instructions in succession.
       - docker build를 사용하여 사용자는 자동화된 build를 만들 수 있다.

   **c. Dockerfile로 image [build](https://docs.docker.com/engine/reference/commandline/build/)**

   ```docker
   docker build [OPTIONS] PATH | URL | -

   ex ) docker build --tag my_pacman:2.0 .
   ```

   - —tag는 name:tag 형식으로 이미지를 생성할 수 있다
   - 지정한경로에 있는 docke file을 찾아서 빌드한다.
   - 마지막에 “ . “ 필수

---

<정리>

- 컨테이너 기술이란 Application이 실해할 수 있는 모든 환경을 Container의 Image로 저장해 놓는 기술을 말한다.
- 이 Container에는 Application이 실행할 수 있는 환경이 이미 포함되어있기 때문에 사용자의 런타임 버전, 언어의 버전, OS가 (= Infrascructure) 무엇이든 상관 없이 실행이 가능하다. 즉, 의존성, 충돌성 문제를 해결해준다.
- 개발과 배포의 환경이 다르지 않기 때문에 수평 확장성이 좋다
