# [Linux] - 사용자권한

Chapter: Linux
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2021년 12월 11일 오후 12:51

# 사용자 권한 (Permission)

### Achievement Goals

- 사용자 권한과 소유자에 대해 이해하고, 사용 권한을 변경할 수 있다.
  - ls-l : 파일의 소유자와 파일에 적용된 권환을 확인
  - chmod : 파일에 적용된 사용 권한 변경

### Read, Write, Execute 권한

- ls 명령어는 현재 위치에 있는 내용(디렉토리, 허가,소유,파일 등등)을 확인할 수 있게 해주는 명령어이다. ls -l은 ls 명령어의 long listing option으로 파일 또는 폴더의 권한을 보여준다.

- Ownership and Permissions
  **Overview**
  Linux의 파일 또는 폴더는 단일 사용자와 단일 그룹이 소유하고 고유한 엑세스 권한이 있다. Terminal에 node로 js파일 한 개와 directory 를 한개 만들고 ls-l을 입력하면 아래와 같이 출력되는 것을 볼 수 있다.

```c
-rw-r--r--  1 gangsola  staff    33B 12 11 15:33 helloworld.js
drwxr-xr-x  2 gangsola  staff    64B 12 11 15:35 test/
```

차례대로 file 또는 directory의 Persmission을 보여주는 Mode와 username, 그룹, File Size, Last Modified , Filename 을 보여준다 .

![https://assets.digitalocean.com/articles/linux_basics/ls-l.png](https://assets.digitalocean.com/articles/linux_basics/ls-l.png)

**Mode에** 대해서 조금 더 알아보자.

![https://assets.digitalocean.com/articles/linux_basics/mode.png](https://assets.digitalocean.com/articles/linux_basics/mode.png)

- File type

  - Normal file : data를 담을 수 있는 일반 파일을 의미한다. 이런 파일든 Permission Classes의 맨 앞의 File type에 " - " 으로 표기한다 .
  - Special files : 앞에 " - " 이 아닌 문자로 판별하며 OS에서 다르게 취급된다. 일반적으로 " d " 는 directory 파일 유형을 의미한다.

- Permission Classes
  - User : 이 파일의 소유자가 갖는 권한을 의미한다
  - Group : 파일의 그룹 맴버가 갖는 권한을 의미한다.
  - Other : 소유자 또는 맴버가 아닌 다른 사용자의 권한을 의미한다. global 권한이라고도 한다
  - Symbolic Permissions
    - Read : 읽기 권한, r로 표기한다.
      - file : 파일의 내용 읽기 가능
      - directory : directory 내에 있는 파일의 이름만 읽기 가능하다
    - Write : 쓰기 권한, w로 표기한다.
      - file : 파일의 수정, 삭제 가능
      - directory : directory 삭제 , 내용 수정 (directory 내부에 있는 파일의 생성, 삭제 , 이름변경)가능
    - Execute : 실행 권한, x
      - file : 파일 실행 가능. 단, 읽기 권한 또한 갖고있어야 한다.
      - directory : 사용자가 directory에 access 하거나, 디렉토리의 파일에 대한 metadata(ls -l 과 같은 정보)에 엑세스 할 수 있다.
  - Example of Modes
    - -rw———- : 파일이며 사용자 에게만 읽기와 쓰기가 가능하다
    - -rwxr-xr-x : 파일이며 모든 사용자가 실행 가능한 파일
    - drwxr-xr-x : directory이며 모든 사용자가 읽고 접근할 수 있다.
    - drwxrwx—- : directory이며 소유자와 그룹 맴버가 읽기,쓰기,실행 권한을 갖는다.

## 권한,소유권 수정

- chown [참고](https://www.ibm.com/docs/ko/i/7.3?topic=directories-chown) 파일 소유권 변경

  - **chown [-R [ -H | -L | -P ]] [ -h ]** *owner*[*:group*] *file*
  - 파일 소유자를 소유자가 지정한 사용자 ID 또는 프로파일로 설정할 수 있으며, 파일의 그룹을 그룹이 지정한 ID 또는 프로파일로 설정할 수도 있다.
  - 파일의 소유자를 변경하려면 ALLOBJ 라는 특수 권한이 있어야 하고, 현재 사용자가 소유자여야 한다.
  - 파일의 그룹을 변경하려면 현재 사용자가 ALLOBJ라는 특수 권한을 갖고있어야 하며, 파일의 소유자이면서 아래 중 하나에 해당해야 한다
    - 작업의 1차 그룹이 그룹이다.
    - 작업의 보충 그룹 중 하나가 그룹이다.
  - 현재 사용자는 새 사용자에 대한 USE 권한이 있어야 한다.

- chgrp [참고](https://www.ibm.com/docs/ko/i/7.3?topic=directories-chgrp) - 파일 그룹 소유권 변경
  - **chgrp [-R [ -H | -L | -P ]] [ -h ]** *group* *file*
  - 파일의 그룹을 그룹이 지정한 그룹 ID 또는 프로파일로 설정할 수 있다.
  - chown 과 비슷하게 현재 사용자는 ALLOBJ 이라는 특수 권한이 있어야 하고 현재 그룹이 작업의 1차 그룹이거나 작업의 보충 그룹 중 하나여야 한다.
  - 또한, 변경 하려는 그룹에 대한 USE 권한이 있어야 한다.
- chmod [참고](https://www.ibm.com/docs/ko/i/7.3?topic=directories-chmod) - 파일 모드 변경
  - **chmod [ -R [-H | -L | -P] ] [ -h ]** *mode file*
  - OS에 로그인한 사용자와 폴더나 파일의 소유자가 같은 경우 권한 변경 가능
  - 같지 않은 경우에는 " sudo " 를 사용하여 관리자 권한 획득 명령어를 통해 폴더나 파일의 권한을 변경할 수 있다.
  - 권한을 변경하는 방법
    - Symbolic method
      - relative method 라고도 불린다
      - +,-,=, Access type을 표기하여 변경한다(모두 한 글자의 단일 문자로 표기)
      - Access Class, Operator, Access Type 세 부분으로 구성된다.
      | Access class       | Operator            | Access Type |
      | ------------------ | ------------------- | ----------- |
      | u(user)            | +(add access)       | r(read)     |
      | g(group)           | -(remove access)    | w(write)    |
      | o(other)           | =(set exact access) | x(execute)  |
      | a(all : u,g and o) |                     |             |
    - 예시
    ```c
    chmod a+r filename // 모든 class에 read 권한 추가

    chmod +r filename // class를 생략하면 default로 all이 적용된다

    chmod go-rw filename // 다수의 class 명시 가능. group과 other class에 읽기, 쓰기 권한 remove

    chmod a-w+r filename // Operator를 여러 개 사용 가능하며 한 줄로 권한을 삭제하고 더할 수 있다.

    chmod go=r filename // = 연산자를 사용하여 group과 other 사용자의 권한을 명시적으로 명시할 수 있다.

    chmod -R o+x dirname // -R을 옵션을 추가하여 지정된 directory에서 하위 directory의 권한을 재귀적으로 변경할 수 있다.
    ```
    ** Home directory에서 권한을 설정할 때에는 조심해야한다 **
    - Absolute form
    Absolute form은 숫자 7까지 나타내는 3bits의 합으로 표기한다. 사용자, 그룹, 또는 다른 사용자나 그룹마다 rwx가 나타나고 각 영역의 boolean 값으로 표기할 수 있다.
    | Permission | Number |
    | ---------- | ------ |
    | r          | 4      |
    | w          | 2      |
    | x          | 1      |

```c
// 사용자 -> r,e,x 부여 (4+2+1) , group -> r,x 권한 부여 (4+1) , other -> x 궈한 부여 (1)
chmod 751 filename

chmod 700 // 현재 directory에 r,w,x 권한을 부여

```

** Reference **

[An Introduction to Linux Permissions | DigitalOcean](https://www.digitalocean.com/community/tutorials/an-introduction-to-linux-permissions)

[Manage file permissions on Unix-like systems](https://kb.iu.edu/d/abdb)
