# Node.js에서 SQL 사용하기

Category: Computer Science
Chapter: Database
강의: Self Study
블로깅: No
유형: Refer
작성일시: 2021년 12월 29일 오후 2:56

### NODE.JS에서 SQL 사용하기

sql을 배우면서 기록하고싶은 쿼리문을 정리해 보았다.

SCHEMA는 아래와 같다.

![img](https://user-images.githubusercontent.com/70902065/147802799-fdd2c80d-7108-4415-84a2-ec48dd063e39.png)

### 1. INSERT INTO

1. _user 테이블에 데이터를 추가하기 위한 SQL을 작성_

   - ( )안에 속성과 값을 넣어준다. 값을 넣을 때에 문자열의 경우 ‘ ‘ or “”

   ```jsx
   const query =
     "INSERT INTO user (name, email) VALUES ('sora','sora9z.kang@kakao.com')";
   ```

b. _content의 데이터를 추가하기 위한 SQL을 작성해주세요._

- NOW() 함수는 Return current date and time: 을 의미
- auto increment의 경우 속성, 값 써주지 않아도된다.

```jsx
const query =
  "INSERT INTO content (title,body,created_at,userId) VALUES ('about backend','backend is',now(),1)";
```

### 2. JOIN

1. _어느 role에도 속하지 않는 user의 모든 컬럼 데이터를 찾기위한 SQL을 작성해주세요_

   - 어느 곳에도 속하지 않는 것을 찾을 경우 null인 것을 찾으면 된다.

   ```jsx
   const query = "SELECT * FROM user WHERE roleId is NULL";
   ```

### 3. 관계의 이해 ! N:M의 경우 1:M 1:N 이 되도록 테이블을 만들어서 과리한다. 이 경우 쿼리문은 아래와 같이 사용하여 질의한다.

a. _JjiSungPark이 작성한 content의 title을 찾기위한 SQL을 작성해주세요_

```jsx
const query =
  "SELECT content.title FROM content WHERE userId=(SELECT id FROM user WHERE name='jiSungPark')";
```

b. _JiSungPark이 작성한 content의 category name을 찾기위한 SQL을 작성해주세요._

- 이 문제는 content, category 의 관계를 이용한 질의이며 이 두 테이블을 묶어주는 content_category과 join을 하여 질의를 하였다.
- category에서 name=’soccer’인 id를 서브질의 후 content와 content_category를 IINNER JOIN 을 한 TABLE에서 categoryId와 서브질의 결과와 같은 튜플의 titla, body, created_at을 추출한다.

```jsx
const query =
  'SELECT name FROM category INNER JOIN content_category AS cc ON cc.categoryId=category.id WHERE cc.contentId=(SELECT content.id FROM content INNER JOIN user ON user.id=content.userId WHERE user.name="jiSungPark")';
```

c. _category의 name이 soccer인 content의 title, body, created_at, user의 name을 찾기위한 SQL을 작성해주세요._

- 이 문제는 user, content, category 세 개의 테이블의 관계를 이용한 질의이며, content와 user는 서로 FK를 사용하여 inner join 하여 연결하고 이 테이블과 content_category table을 join하여 공통 테이블을 만든다. 이 테이블의 categoryId와 category에서 name=’soccer’인 id가 같은 title, body, created_at, user.name을 추출한다.

```jsx
const query =
  'SELECT  title, body, created_at, user.name FROM content INNER JOIN user ON user.id=userId INNER JOIN content_category AS cc ON content.id=cc.contentId WHERE cc.categoryId=(SELECT id FROM category WHERE name="soccer")';
```

d. _duRiCha가 작성한 글의 개수 (컬럼명: ContentCount)를 출력하기 위한 SQL을 작성해주세요._

- user Table과 content Table의 관꼐를 이용한 질의.
- user의 name이 duRiCha 인 user의 id를 서브질의 한 후 그 결과와 content의 userId가 같은 튜플들의 수를 count()로 계산하여 출력한다.

```jsx
const query =
  "SELECT count(*) AS ContentCount FROM content WHERE userId=(SELECT id FROM user WHERE name='duRiCha')";
```

c. _각 user(컬럼명: name)가 작성한 글의 개수 (컬럼명: ContentCount)를 출력하기 위한 SQL을 작성해주세요._

- user별로 작성한 글의 개수를 추출하기 이해 기준이 되는 user.name과 count를 추출해야한다.
- content와 user를 Join하는데 user를 기준으로 한다. (content가 없는 user도 추출되어야 하므로)
- user별로 그룹화 한다. (GROUP BY)

```jsx
"SELECT user.name AS name ,count(content.userId) AS ContentCount FROM content RIGHT JOIN user ON user.id=content.userId GROUP BY user.id";
```

처음엔 JOIN 을 하면서 서브쿼리를 같이 섞고 WHERE절 까지 넣는 것이 힘들었지만 몇 번 하다보니 구조가 보이는 것 같다.
