# Docker-CLI기본명령어정리

Chapter: Docker
강의: Self Study
블로깅: No
유형: LESSON
작성일시: 2022년 3월 6일 오후 3:25

# Docker CLI 기본 명령어 정리

- Pull an image or repository from a registroy
    - registor로부터  이미지 또는 respository를 가져온다.
    
    ```docker
    docker image pull docker/whalesay:latest
    # 최신 이미지를 가져온다.
    ```
    

- 저장된 도커 이미지 삭제
    - docker image rm docker/whalesay
        - image rm : 지정된 docker 이미지 삭제 (docker rmi도 동일)

- [docker container run](https://docs.docker.com/engine/reference/commandline/container_run/)
    
    ```bash
     docker container run [OPTIONS] IMAGE [COMMAND] [ARG...]
    ```
    
    - whalesay 라는 이름을 갖는 컨테이너를 실행한다
        
        ```docker
        docker container run --name whalesay docker/whalesay:latest cowsay boo
        ```
        
    
    ```docker
    docker container run --name httpdserver --rm -p 818:80 httpd
    ```
    
    - -d : background에서 실행하게 해준다
    - -p 옵션 : 로컬 호스트의 포트 818과  컨테이너의 포트를 연결한다(80)
    
    - -it : -i , -t를 동시에 사용한 옵션이다.  사용자와 컨테이너 간 Interaction이 필요한 경우 사용
        
        ```bash
        docker container run -it --rm danielkraic/asciiquarium:latest
        ```
        
        - -i :  `Keep STDIN open even if not attached`
        - -t : `Allocate a pseudo-tty`
        
    - 세 가지 작업을 한 번에 실행
        - 하나의 이미지를 받아옴 → 컨테이너로 실행 → 컨에티너와 관련된 리소스 삭제 한번에 가능
        
        ```bash
        docker container run --name whalesay --rm docker/whalesay cowsay boo
        ```
        
        - run : container를 실행한다. 이미지가 없다면 이미지를 pull하고 실행한다
        - —rm : 컨테이너를 일회성으로 실행한다. 컨테이너가 중지 또는 종료될 때 컨테이너의 관련된 리소스 모두 제거
        
- 컨테이너의 리스트를 출력한다
    
    ```docker
    docker container ps
    
    docker container ps -a
    ```
    
    - -a : Default로 실행되는 컨테이너지만 동료된 컨테이너를 포함한 모든 컨테이너 출력
    
- Container 내부로 접속
    - `docker exec -it 컨테이너_이름 bash`
     명령어를 통해 컨테이너 내부 터미널로 접속할 수 있다.
- Container와 Local 사이에서 파일 또는 폴더를 복사한다 [docker container cp](https://docs.docker.com/engine/reference/commandline/container_cp/)
    
    ```docker
    docker container cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-
    ```
    
- docker Compose CLI
    - define and run multi-container applications with Docker(두 개 이상의  docker container를 연결)
    - docker-compose up : docker-compose.yaml에 정의된 이미지를 컨테이너로 실행
    - docker-compose down : docker-compose.yaml에 정의된 이미지를 이용해 실행된 컨테이너를 종료한다.
    - docker-compose up 특정 이미지 : 특정 이미지만 컨테이너로 실행