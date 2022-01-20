# DATABASE-NOSQL-MongoDB-lesson정리-CRUD-ADVANCED-Operator

Category: DATABASE
Chapter: Database
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2022년 1월 19일 오후 4:30

## DB-NOSQL-MONGODB CRUD Adcanced-Operator

— lesson 정리

### Achievement Goals

- MQL 연산자
  - 비교연산자
  - 논리연산자
  - 표현연산자

### 0. 실습을 위한 Sample Data 받기

[Load Sample Data](https://docs.atlas.mongodb.com/sample-data/)

1. 위의 사이트를 참고하여 sample data를 받는다
2. Terminal에서 mongodb 접속하기 :

   mongosh “mongodb+srv://cluster0.4ence.mongodb.net/practice” —username username

3. show dbs로 database를 확인해보면 sample data가 들어온 것을 볼 수 있다.

위의 Sample로 비교연산자, 논리연산자, 표현연산자 에 대해 알아본다.

그리고 배열과 서브 도큐먼트쿼리에 대해 배운다.

### 1. 비교 연산자

비교연산자를 사용하면 특정 범위 내에서 데이터를 찾을 수 있다.

db중 sample_training의 trips Collection을 사용하여 실습해본다. 이 collection은 뉴욕 자전거 대여 업체인 Citi Bike의 오픈소스 데이터 sample이다.

- 문법 {<field>:{<operator>:<value>}} 와 같은 문법을 사용한다.
- [비교 연산자](https://docs.mongodb.com/manual/reference/operator/query-comparison/)

  - $eq = EQual to
  - $gt > GreaterThan
  - $gte ≥ Greater Then or Equal to
  - $ne ≠ Not Equal to
  - $lt < Less Than
  - $lte ≤ Less Than or Equal to

  1. trips 에서 tripduration이 70 이하인 사람이 있는지 찾아본다 (70초 이내로자전거를 차는 사람이 있는지확인)

  ```bash
  sample_training>  db.trips.find({"tripduration":{"$lte":70}})

  [
    {
      _id: ObjectId("572bb8222b288919b68ac2d4"),
      tripduration: 61,
      'start station id': 3150,
      'start station name': 'E 85 St & York Ave',
      'end station id': 3150,
      'end station name': 'E 85 St & York Ave',
      bikeid: 22299,
      usertype: 'Subscriber',
      'birth year': 1989,
      'start station location': { type: 'Point', coordinates: [ -73.94803392, 40.77536905 ] },
      'end station location': { type: 'Point', coordinates: [ -73.94803392, 40.77536905 ] },
      'start time': ISODate("2016-01-01T02:43:19.000Z"),
      'stop time': ISODate("2016-01-01T02:44:21.000Z")
    },
    {
      _id: ObjectId("572bb8222b288919b68ac37b"),
      tripduration: 70,
      'start station id': 3113,
      'start station name': 'Greenpoint Ave & Manhattan Ave',
      'end station id': 3115,
      'end station name': 'India St & Manhattan Ave',
      bikeid: 23229,
      usertype: 'Subscriber',
      'birth year': 1980,
      'start station location': { type: 'Point', coordinates: [ -73.95394, 40.73026 ] },
      'end station location': { type: 'Point', coordinates: [ -73.9550858, 40.73232194 ] },
      'start time': ISODate("2016-01-01T03:23:45.000Z"),
      'stop time': ISODate("2016-01-01T03:24:55.000Z")
    },
  ,,,,
  ,,,,
  ]

  sample_training> db.trips.find({"tripduration":{"$lte":70}}).count()
  10
  ```

  약 10명의 사람이 자전거를 70초 이내로 타고다. 2. 여기에 조건을 추가하여 userType에서 Subscriber가 아닌 사람의 수를 구해보자.

  ```bash
  sample_training> db.trips.find({"tripduration":{"$lte":70},"usertype":{"$ne":"Subscriber"}}).count()
  1
  sample_training> db.trips.find({"tripduration":{"$lte":70},"usertype":{"$ne":"Subscriber"}})
  [
    {
      _id: ObjectId("572bb8232b288919b68af7cd"),
      tripduration: 66,
      'start station id': 460,
      'start station name': 'S 4 St & Wythe Ave',
      'end station id': 460,
      'end station name': 'S 4 St & Wythe Ave',
      bikeid: 23779,
      usertype: 'Customer',
      'birth year': '',
      'start station location': { type: 'Point', coordinates: [ -73.96590294, 40.71285887 ] },
      'end station location': { type: 'Point', coordinates: [ -73.96590294, 40.71285887 ] },
      'start time': ISODate("2016-01-02T11:49:11.000Z"),
      'stop time': ISODate("2016-01-02T11:50:18.000Z")
    }
  ]
  ```

  한 명이 검색된다.

### 2. 논리 연산자

sample_training db의 inspections collection을 사용해본다.

논리연산자를 사용하면 데이터 검색을 보다 더 세분화할 수 있다.

- 문법 :
  - {<operator>:[{statement1},{statement2}...]} → $and , $or, $nor
  - {$not:{statement1}} : not
- [논리연산자](https://docs.mongodb.com/manual/reference/operator/query-logical/)
  - $and : 주어진 모든 쿼리절을 충족하는 document를 반환
  - $or : 주어진 쿼리절 중 하나라도 일치하는 document가 있다면 해당 document를 반환
  - $nor : 주어진 모든 쿼리절과 일치하는 않는 document반환
  - $not : 뒤의 조건을 만족하지 않는 모든 document를 반환

1. Violation issues와 No violation issued를 필터링하고 다른 result값을 알아본다.

```bash
sample_training> db.inspections.find({$nor:[{result:"Violation Issued"},{result:"No Violation Issued"}]})
[
  {
    _id: ObjectId("56d61033a378eccde8a83555"),
    id: '102-2015-UNIT',
    certificate_number: 10003479,
    business_name: 'SOUTH BRONX AUTOMOTIVE CORP',
    date: 'May 28 2015',
    result: 'Pass',
    sector: 'Tow Truck Company - 124',
    address: { city: '', zip: '', street: '', number: '' }
  },
  {
    _id: ObjectId("56d61033a378eccde8a83564"),
    id: '10465-2015-CMPL',
    certificate_number: 9289037,
    business_name: 'UNNAMED HOT DOG WAGON  NO LICENSE NUMBER PROVIDED',
    date: 'Jul 23 2015',
    result: 'Unable to Locate',
    sector: 'Mobile Food Vendor - 881',
    address: { city: '', zip: '', street: '', number: '' }
  },
...
...
]
```

나온 결과에서 result는 Violation issues와 No violation issued 를 제외한 결과만 출력된다.

2. **$and** 연산자는 연산자가 지정되지 않았을 때 **기본연산자**로 사용이 된다.

find({selector: 'Tow Truck Company - 124' , result : “Pass”} 는 and연산이 함축되어 있는 것이다.

→ Routes Collection에서 “ICN을 통과하는 CR2및 A81 비행기의 수를 쿼리해보자

dst_airport = ICN & airplane=CR2 or dst_airport=ICN & airplane=A81 인 것을 쿼리해야한다.

이 경우 아래와 같이 두 개의 $or연산을 and로 묶어주어야 한다.

```bash
{$or:[{"dst_airpoty":"ICN"},{"airplane":"CR2"}]}
{$or:[{"airplane":"CR2"},{"airplane":"A81"}]}
```

이런 경우에는 아래와 같이 명시적으로 $and를 추가해주어야 한다.

```bash
db.routes.find({$and:[{$or:[{"dst_airpoty":"ICN"},{"airplane":"CR2"}]},{$or:[{"airplane":"CR2"},{"airplane":"A81"}]}]}).count()
296
```

**즉, 동일한 연산자를 쿼리에 두 번 이상 포함해야 하는 경우, $and를 명시적으로 사용해야 한다.**

-

### 3. 표현 연산자

[$expr](https://docs.mongodb.com/manual/reference/operator/query/expr/#mongodb-query-op.-expr)

expr 이라는 연산자는 아양성을 가지고있다.

- 쿼리 내에서 집계 표현식(Aggregation Expression)을 사용할 수 있다. {$expr:{ espression}} 구문 사용
- $expr를 이용하여 변수와 조건문을 사용할 수 있다.
- $expr를 사용하여 같은 document내 필드들을 서로 비교할 수 있다.

1. tips Collection에서 자전거를 대여한 곳에 다시 자전거를 반납하는 사람이 얼마나 많은지 알아보자

```bash
sample_training> db.trips.find({"$expr":{"$eq":["$start station id","$end station id"]}})
[
  {
    _id: ObjectId("572bb8222b288919b68abf70"),
    tripduration: 110,
    'start station id': 439,
    'start station name': 'E 4 St & 2 Ave',
    'end station id': 439,
    'end station name': 'E 4 St & 2 Ave',
    bikeid: 24021,
    usertype: 'Customer',
    'birth year': '',
    'start station location': { type: 'Point', coordinates: [ -73.98978041, 40.7262807 ] },
    'end station location': { type: 'Point', coordinates: [ -73.98978041, 40.7262807 ] },
    'start time': ISODate("2016-01-01T00:10:24.000Z"),
    'stop time': ISODate("2016-01-01T00:12:15.000Z")
  },
  {
    _id: ObjectId("572bb8222b288919b68ac12a"),
    tripduration: 136,
    'start station id': 401,
    'start station name': 'Allen St & Rivington St',
    'end station id': 401,
    'end station name': 'Allen St & Rivington St',
    bikeid: 24253,
    usertype: 'Customer',
    'birth year': '',
    'start station location': { type: 'Point', coordinates: [ -73.98997825, 40.72019576 ] },
    'end station location': { type: 'Point', coordinates: [ -73.98997825, 40.72019576 ] },
    'start time': ISODate("2016-01-01T01:24:00.000Z"),
    'stop time': ISODate("2016-01-01T01:26:17.000Z")
  },
...
...
]
```

위의 구문은 station id와 end id가 같은 것만을 출력하라는 쿼리이다. 해당 값이 어떤 필드와 같아야 하는지 직접 지정하지 않아도 비교할 수 있다.

- “ $ “ 기호는 MQL에서 많은 기능을 갖고있다. 계속 보았듯이 연산자를 나타낼 때 사용할 수 있고, 위의 코드 쿼리에서와 같이 필드 이름 자체가 아닌 필드 “값”을 가리키고 있음을 나타낸다. 이를 사용하여 필드의 값을 변수처럼 비교할 수 있다.

- tips Collection에서 1200초 이상 자전거를 타고 다시 시작점에 자전거를 반납한 사람의 수를 쿼리해보자
  - MQL에서는 비교연산자는 아래와같이 먼저 필드를 작성하고난 다음 비교연산자를 작성한다
  ```bash
  {<field>:{<operator>:<value>}}
  {total_price:{"$gt":25}}
  ```
  - 하지만 Aggregation syntax에서는 연산자를 먼저 작성 후 다음으로 필드와 값을 작성한다.
  ```bash
  {<operator>:{<field>:<value>}}
  ```
  Aggregation Systax로 위의 쿼리를 작성해보면 아래와 같다.
  ```bash
  sample_training> db.trips.find({"$expr":{"$and":[{"$gt":["$tripduration",1200]},{"$eq":["$end station id","$start station id"]}]}}).count()
  173
  ```
- 회사의 설립 연도보다 현재 임직원 수가 더 많은 회사의 수를 쿼리

```bash
db.companies.find({"$expr":{"$lt":["$founded_year","$number_of_employees"]}}).count()

324

# 또는
db.companies.find({"$expr":{"$gt":["$number_of_employees","$founded_year"]}}).count()

324
```
