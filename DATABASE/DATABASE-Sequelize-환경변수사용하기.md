# DATABASE-Sequelize - 환경변수 사용하기

Category: DATABASE
Chapter: Database
강의: Self Study
블로깅: No
유형: LESSON
작성일시: 2022년 1월 13일 오후 1:28

## Sequelizse-Config에 환경변수 사용하기

민감한 정보들은 .env에 작성하여 사용한다. config.json에서는 환경변수를 사용하지 못한다. 

현재 dir의 Tree구조는 아래와 같다.

```jsx
./
├── README.md
├── app.js
├── bin
├── config
├── controllers
├── example.env
├── migrations
├── models
├── modules
├── node_modules
├── package-lock.json
├── package.json
├── routes
└── seeders
```

### 1. config 파일 수정

먼저, sequelize-cli init하면 config 폴더가 생성되고 그 안에 config.json이 생성되어있다.

```jsx
// 기본적으로 설정되어있는 config.json
// default 언어로는 mysql로 설정되어있다.
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

json파일에서는 다른 파일을 불러올 수가 없다. host가 바뀔 때마다 작성을 해주어야 하므로 매우 번거로운 일이 아닐 수 없으며 이런 정보들은 민감한 정보이기 때문에 .env에서 관리를 해주어야 한다.

그러기 위해서는 config.json을 index.js로 변경하고 아래의 코드와 같이 변경해준다.  환경변수를 사용하려면 dotenv 모듈이 필요하므로 꼭 require 해주고 package.json에 추가해주자.

```jsx

// package.json
"dependencies": {
    "dotenv": "^11.0.0",
...
}

// config file/index.js
const config = require("dotenv").config();
const env = process.env;

const development = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: "127.0.0.1",
  dialect: "mysql",
};

const test = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: "127.0.0.1",
  dialect: "mysql",
};

const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: "127.0.0.1",
  dialect: "mysql",
};

module.exports = { development, production, test };
```

### 2. models.index.js 수정

models.index.js를 살펴보면 정의되어있는 model들을 통해 model Instance를 만들고 config 설정을 가져와서 DB와 연결을 해주는 역할을 하는 것 같다. 우리는 위에서 config파일의 확장자를 변경했으므로 config를 가져오는 코드를 수정해야한다. 아래와 같이 수정해주자.

```jsx
// default 로 설정되어있는 코드
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + '/../config/config.json')[env];

// 변경된 코드
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config")[env];
```

### 3. .sequelizerc file 을 통해 config path 수정

[Sequelize](https://sequelize.org/master/manual/migrations.html#the--code--sequelizerc--code--file)

위의 공식문서에서 나와있는 설명과 같이 root 디렉토리에서 .sequelizerc를 생성한다. 

이 파일에서 설정되어있는 경로를 통해 configuration들이 실행이 된다. 아래와 같이 설정을 해주자.

```jsx
// .sequelizerc

const path = require("path");

module.exports = {
  config: path.join("./config"),
  "models-path": path.resolve("./models"),
  "seeders-path": path.resolve("./seeders"),
  "migrations-path": path.resolve("./migrations"),
};
```

.env파일을 만들고 환경변수를 넣어주면 문제 없이 작동됨을 확인하였다.

---