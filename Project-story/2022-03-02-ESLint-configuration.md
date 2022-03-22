# Firstproject-TIL-ESLint

Team project에서 lint 규칙을 설정해야했다. 깃으로 규칙에 대해 언급만 할까 하다가 이전에 sprint과제에서 eslint json이 사용되었던 것을 생각하고 이것으로 적용해야 겠다 생각하고 설정하는 방법에 대해서 간단하게 알아보았다. [ESLint getting started](https://eslint.org/docs/user-guide/getting-started) 참고

- 우선, ESLint란 자바스크립트의 코드를 분석하여 문법적이 오류나 pattern을 발견하여 버그를 줄일 수 있도록 하는 정적분석 도구이다.

- ESLInt가 동작하는 방식 간략화 ([Kakao Tech 사이트 참고](https://tech.kakao.com/2019/12/05/make-better-use-of-eslint/))
    
    ![https://tech.kakao.com/wp-content/uploads/2019-11-25__8.13.19-1024x300.png](https://tech.kakao.com/wp-content/uploads/2019-11-25__8.13.19-1024x300.png)
    

- eslintrc를 작성하는 방법 [eslint configuration files](https://eslint.org/docs/user-guide/configuring/configuration-files)
    1. vscode에서 eslint를 사용할 것이기 때문에 extension을 설치해 주어야 한다.
    2. npm install 또는 yarn으로 eslint를 설치해준다.(extenstion만 설치한다고 되는게 아니였다..)
    3. .eslintrc는 아래와 같이 구성되어있다 (eslint 사이트의 예시이다)
        
        ```jsx
        {
            "root": true, 
            "extends": [
                "eslint:recommended",
                "plugin:@typescript-eslint/recommended"
            ],
            "parser": "@typescript-eslint/parser",
            "parserOptions": { "project": ["./tsconfig.json"] },
            "plugins": [
                "@typescript-eslint"
            ],
            "rules": {
                "@typescript-eslint/strict-boolean-expressions": [
                    2,
                    {
                        "allowString" : false,
                        "allowNumber" : false
                    }
                ]
            },
            "ignorePatterns": ["src/**/*.test.ts", "src/frontend/generated/*"]
        }
        ```
        
        - root : true로 해놓으면 특정 프로젝트(현재 디렉터리)안에서만 eslintrc파일을 찾는다. true가 아니라면 pc의 root 디렉터리까지 가서 찾는다.
        - extends : sharable configuration을 사용하게 해준다. eslint:recommended 는 해당 cofiguration이 기본으로 제공된다.
        - plugin : 많은 종류가 있다. 리엑트 전용 플러그인, Nest 전용 플러그인 등 npm이나 yarn을 통해 설치가 가능하다. 배열에 추가하면 여러 플로그인을 사용할 수 있다.
        - parser : 코드를 검사하는 파서를 설정한다. 기본 파서는 espree라고 한다. "@typescript-eslint"과 같이 다른 플러그인에서 제공하는 파서 사용도 가능하다.
        - rules : rule을 설정한다. extends를 통해 제공되는 기본 rule 말도고 끄거나 추가할 수 있다.
        
        플러그인을 쓸 때 각 플러그인의 doc를 들어가보면 설명이 잘 되어있다.
        
- 현재 프로젝트에는 Js standard를  기준으로 진행할 것이기 때문에 JS standard가 적용된 sharable config를 찾아보니 아래와 같이 제공되어있었다. https://github.com/standard/eslint-config-standard 이 config는****[JavaScript Standard Style](http://standardjs.com/)****을 따른다.
    
    물론 Eslint말고 [standard.js](https://standardjs.com/)를 사용할 수도 있긴 하지만 룰을 변경할 수 없다고 한다. 예를들면 세미콜론의 경우 허용을 하고싶은데 위의 표준에서는 쓰지 않게 되어있다는 문제가 있어서 lint를 사용하기로 하였다. 
    
    몇 가시 테스트를 해보았고 script에 linting issue를 fix해주는 script를 추가 작성하여 일차적인 테스트를 맞췄다. 
    
    나중에 참고를 할 수 있도록 미리 메모를 해두자 참고 [stack overflow](https://stackoverflow.com/questions/40271230/how-to-run-eslint-fix-from-npm-script)
    
    ```jsx
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "lint:fix": "eslint --fix --ext .js,.jsx .",
        "lint": "eslint ."
      },
    
    "devDependencies": {
        "eslint": "^7.32.0",
        "eslint-config-standard": "^16.0.3",
        "eslint-plugin-import": "^2.25.4",
        "eslint-plugin-n": "^15.0.1",
        "eslint-plugin-promise": "^5.2.0"
      }
    ```