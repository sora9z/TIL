- monorepo 구축을 위해 공식문서를 보고 정리

### worspace

- nestjs의 monorepo는 workspace라는 개념을 사용한다. worspace는 project들로 이루어져있다
- 각 프로젝트튼 application or library일 수 있다
- application은 bootstrap을 하고 main.ts를 갖고있는 app이고 library는 다른 프로젝트에서 사용할 수 있는 다양한 기능등들을 패키징한다.
- library는 main.ts가 없고 실행될 수도 없다
- 모든 worspace는 default project(application)가 있다. 이는 nest-cli의 "root" property에서 정의된다
- default project는 project name이 지정되지 않을 때 nest start, nest build 등에 사용된다

### application

- nestjs 에서 application은 실행하고 배포까지 할 수 있는 완전한 nest application이다
- nest generate app으로 생성할 수 있다
- monorepo에서의 application project는 package dependency(package.json과 같은) 또는 .prettierrc나 eslint.config.등 configuration artifacts가 없다.대신 monorepo-wide dependencies와 cinfig files가 사용된다
- 대신 각 project의 root folder에 프로젝트 별 project tsconfig.app.json을 생성한다
  - 이 cinfig file은 컴파일 옵션 뿐 아니라 build option까지 자동으로 설정한다.
  - 그리고 이 파일은 top level의 tsconfig.json 파일을 extends할 수 있어서 전역 설정도 관리할 수 있고 프로젝트 별로 필요에 따라 override할 수 있다

### Libraries

- nest generate library 명령어를 통해 library type을 생성할 수 있다
- 여기서 더 확인해보자 https://docs.nestjs.com/cli/libraries

### CLI properties

- nest-cli.json은 nestjs 프로젝트의 구성, 빌드, 배포에 필요한 metadat를 보관한다

```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "apps/my-project/src",
  "monorepo": true,
  "root": "apps/my-project",
  "compilerOptions": {
    "webpack": true,
    "tsConfigPath": "apps/my-project/tsconfig.app.json"
  },
  "projects": {
    "my-project": {
      "type": "application",
      "root": "apps/my-project",
      "entryFile": "main",
      "sourceRoot": "apps/my-project/src",
      "compilerOptions": {
        "tsConfigPath": "apps/my-project/tsconfig.app.json"
      }
    },
    "my-app": {
      "type": "application",
      "root": "apps/my-app",
      "entryFile": "main",
      "sourceRoot": "apps/my-app/src",
      "compilerOptions": {
        "tsConfigPath": "apps/my-app/tsconfig.app.json"
      }
    }
  }
}
```

- nest-cli의 구성은 두 가지 section으로 분리된다
  - 전역 section
  - 각 project의 metadata를 정의하는 projects section
    - 이 구조는 monorepo 구조에서만 존재한다
- 각 section의 구성에 대해 알아보자

  - top level

    - collection : component를 생성하는데 사용되는 collection of schematics를 설정한다. 일반적으롭 변경하지 않느다
    - sourceRoot : single standard mode에서는 root source code를 가리키고, monorepo 구조에서는 default project를 가리킨다
    - compilerOptions: 컴파일러 옵셩을 설정(아래 정리)
    - generateOptions: 전역 설정을 지정하는 설정(아래 정리)
    - monorepo : monorepo only , monorepo 인 경우 true
    - root: monorepo only, default project의 root project를 가리킨다

    - global compiler option

      - 사용 할 compiler , nest build, nest start의 실행의 부분에 영향을 주는 옵션을 지정한다.
      - tsc나 webpack과 간은 컴파일러에 관계없이 적용된다

      - webpack : true인 경우 webpack compiler 사용한다. 없거나 false인 경우 tsc사용. monorepo에서는 default true이다
      - tsConfigPath : monorepo only, nest build나 nest start등이 project name없이 오출될 때 가리키는 taconfig.json의 경로를 가리킨다
      - webpackConfigPath : webpack option file의 경로. nesst는 webpack.cinfig.js 파일을 찾는다.
      - deleteOutDir : true인 경우 compilser가 활성화 될 때 compile out dir을 제거한다. tsconfig.json에 지정되어있다. default는 ./dist
      - assets : ts가 아닌 assets들을 커뮤ㅏ이 할 때마다 자동으로 enables됨.
      - watchassets : true인 경우 watch-mode에서 확인 가능함
      - manualRestart : true인 경우 shortcut "rs"로 restart가능 default false
      - builder : 프로젝트 컴파일에 사용 할 builder를 지정
      - typecheck : WC 기반 프로젝트에 대한 타입 검사를 활성화

    - global generate options

      - nest generate commaned에 사용되는 일반적인 generate options를 명시한다
        - spec : true라면 spec을 생성 아니면 생성아함
        - flat : true -> 모든 generate command는 flat structure를 생성한다

      ```json
      {
      		"generateOptions": {
      			"spec": {
      					"service": false
          }
        },
        ...
      }

      ```

      - 이렇게 하면 service에서만 spec이 생성되지 않는다

  - Project-specific generate options
    - 각 프로젝트에서도 재정의 할 수 잇다

```json

{
  "projects": {
    "cats-project": {
      "generateOptions": {
        "spec": {
          "service": false
        }
      },
      ...
    }
  },
  ...
}
```

- webpack vs tsc
  - tsc는 순수typescript compiler로 ts를 js로 컴파일한다
    - 파일 구조가 그대로 유지된다
    - 모듈 해석이 단순함
    - tsc는 각 파일을 독립적으로 컴파일 하므로 패키지 간 의존성 추적이 어렵다
  - webpack은 번들링과 complie을 동히에 수행한다
    - 복잡한 모듈 해석(alias, path mapping등)
    - HMR(Hot Module Replacement)지원
    - @libs/common 등 복잡한 import문을 처리하는데 필요하다
    - 전체 dependency graph를 분석해서 필요한 모든 모듈을 포함한다

## libraty https://docs.nestjs.com/cli/libraries

- nest g library my-library 통해서 가능하다
- library 로 package분리를 하면 각 app내의 코드와의 커플링을 줄일 수 있고 여러 프로젝트에서 재사용이 가능하다
- root tsconfig를 extend한 tsconfig.lib.json 가 생성된다

### app에서의 사용법

- library를 추가할 때 nestjs는 root tsconfig의 path를 update한다

```json

"paths": {
    "@app/my-library": [
        "libs/my-library/src"
    ],
    "@app/my-library/*": [
        "libs/my-library/src/*"
    ]
}
```

- webpack 컴파일러를 사용하므로 admin이 import하는 모든 libs도 함께 번들링됨

- 이제 하나 만들어보고 블로그 글 작성 -> 모노래포 구축하기
