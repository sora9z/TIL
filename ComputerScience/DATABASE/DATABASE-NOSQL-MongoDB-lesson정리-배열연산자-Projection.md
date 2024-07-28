# DATABASE-NOSQL-MongoDB-lesson정리-배열연산자\_Projection

Category: DATABASE
Chapter: Database
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2022년 1월 20일 오전 11:42

## DATABASE-NOSQL-MongoDB-lesson정리-배열연산자,Projection

— lesson 정리

### Achievement Goals

- MongoDB에서 CRUD하기
  - 프로젝션 사용 (Projection)
  - 배열,Sub document query
- aggration Framework사용하여 aggregate 명명여 쿼리
  - $match, $project, $grop, 연산자 사용 할 수 있다.

### 0. 실습을 위한 Sample Data 받기

[Load Sample Data](https://docs.atlas.mongodb.com/sample-data/)

1. 위의 사이트를 참고하여 sample data를 받는다
2. Terminal에서 mongodb 접속하기 :

   mongosh “mongodb+srv://cluster0.4ence.mongodb.net/practice” —username username

3. show dbs로 database를 확인해보면 sample data가 들어온 것을 볼 수 있다.

위의 Sample로 배열열산자 그리고 projection에 대해 알아본다.

## 1. 배열 연산자

### **Reference**

- [$push](https://docs.mongodb.com/manual/reference/operator/aggregation/push/) : 배열의 마지막 위치에 element를 넣는다. 배열이 아닐 field에 사용할 경우, field의 타입을 배열로 바꾼다.
- [$all](https://docs.mongodb.com/manual/reference/operator/query/all/#mongodb-query-op.-all) :
  - { “array_field”:{ “$all”:{array}}}
  - 지정된 배열 필드에 배열 순서와 무관하게 지정된 모든 요소가 포함된 모든 document들이 있는 커서를 반환한다.
- [$size](https://docs.mongodb.com/manual/reference/operator/query/size/#mongodb-query-op.-size) :
  - {”array_field”:{ “$size”:{number}}}
  - 이 연산자는 지정된 배열 필드가 주어진 길이와 정확히 일치하는 모든 document들이 있는 커서를 반환한다.

---

여기서, MongoDB에서 cursor란? ([MongoDB document](https://docs.mongodb.com/manual/reference/glossary/#term-cursor))

**cursor**

A pointer to the result set of a [query](https://docs.mongodb.com/manual/reference/glossary/#std-term-query). Clients can iterate through a cursor to retrieve results. By default, cursors not opened within a session automatically timeout after 10 minutes of inactivity. Cursors opened under a session close with the end or timeout of the session. See [Iterate a Cursor in `mongosh`](https://docs.mongodb.com/manual/tutorial/iterate-a-cursor/#std-label-read-operations-cursors).

[What is a Cursor in MongoDB?](https://stackoverflow.com/questions/36766956/what-is-a-cursor-in-mongodb)

---

Sample_airbnb의 listingsAndReviews Collection을 사용하였다.

### $push

- listingsAndReview Collection에는 amenities 필드가 있고 이 필드는 배열로 되어있다.
- amenities가 Shampoo이 필드를 쿼리해보면 아래와 같다.
  MongoDB는 배열의 필드 값으로 Shampoo만 담긴 배열을 찾기때문에 {"amenities":["Shampoo"]} 하지 않아도 된다.
  ```bash
  sample_airbnb> db.listingsAndReviews.find({"amenities":"Shampoo"}).count()
  3709
  ```

### $all

- 배열의 요소의 순서에 맞게 쿼리를 해야핰다.
- 배열 요소의 순서에 상관없는 document를 반환받기 위해서는 $all을 사용한다.
- $all은 배열 요소의 순서와 상관없이 지정된 요소가 포함된 모든 document를 찾을 수 있다.
  ```bash
  sample_airbnb> db.listingsAndReviews.find({"amenities":{"$all":["Wifi","Internet","Kitchen","Heating"]}}).count()
  1083
  ```
- accommodations Collection의 amenities 필드에서 “Free parking on permissions”,”Air conditioning”,”Wifi”를 포함하면 2개 이상의 침실이 있는 숙소를 찾는 쿼리
  ```bash

  ```

### $size

배열의 길이로 결과를 제한할 수 있다.

위의 결과에서 $size:20 정확하게 20개의 amenities를 갖고 지정한 요소가 모두 배열에 포함된 document를 반환해보자

```bash
db.listingsAndReviews.find({"amenities":{"$size":20,"$all":["Wifi","Internet","Kitchen","Heating"]}})
....
....
[

		beds: 1,
    number_of_reviews: 29,
    bathrooms: Decimal128("2.0"),
    amenities: [
      'TV',
      'Internet',
      'Wifi',
      'Air conditioning',
      'Kitchen',
      'Free parking on premises',
      'Breakfast',
      'Heating',
      'Family/kid friendly',
      'Washer',
      'Smoke detector',
      'First aid kit',
      'Essentials',
      'Shampoo',
      'Lock on bedroom door',
      'Hangers',
      'Hair dryer',
      'Iron',
      'Laptop friendly workspace',
      'Bathtub'
    ],
    price: Decimal128("40.00"),
    cleaning_fee: Decimal128("18.00"),
    extra_people: Decimal128("0.00"),
    guests_included: Decimal128("1"),
....
....
]
```

특정 조건이 없다면, 배열의 길이로만 쿼리하여 사이즈를 맞출 수도 있다.

## 2. 배열 연산자와 Projection

- Projection은 find의 두 번재 인자이다.
- 위에서 실습한 sample_airbnb의 경우 document내에 상당히 많은 정보가 있어서 알아보기 어렵다.
  이를 위해 projection 인자를 추가하여 관심있는 필드만 결과로 가져올 수 있다.
- 특정 필드만 price와 address 필드만 결과 커서에 포함해보자

```bash
sample_airbnb> db.listingsAndReviews.find({"amenities":{"$size":20,"$all":["Wifi","Internet","Kitchen","Heating"]}},{"price":1,"address":1}).pretty()
[
  {
    _id: '10459480',
    price: Decimal128("999.00"),
    address: {
      street: 'Greenwich, NSW, Australia',
      suburb: 'Greenwich',
      government_area: 'Lane Cove',
      market: 'Sydney',
      country: 'Australia',
      country_code: 'AU',
      location: {
        type: 'Point',
        coordinates: [ 151.18563, -33.8289 ],
        is_location_exact: true
      }
    }
  },
  {
    _id: '11602050',
    price: Decimal128("133.00"),
    address: {
      street: 'New York, NY, United States',
      suburb: 'Manhattan',
      government_area: 'Upper East Side',
      market: 'New York',
      country: 'United States',
      country_code: 'US',
      location: {
        type: 'Point',
        coordinates: [ -73.95735, 40.78465 ],
        is_location_exact: true
      }
    }
  },
...
...
]
```

- find의 첫 번째 인자는 찾으려는 document의 조건이고, 두 번째 인자는 찾고있는 필드를 구체적으로 설명한다.
- 위의 쿼리문에서 projection (두 번쨰 인자)인 {"price":1,"address":1} 에서 1은 지정한 필드를 포함한다는 의미이다. 0은 지정한 필드를 제외한다.
- 한 번의 프로젝션에 0과 1을 혼용할 수 없다.
  ```bash
  db.collecion.find({qyery},{"field1":1, "field2":1})
  db.collecion.find({qyery},{"field1":0, "field2":0})
  ```
- 하지만 default로 포한되는 \_id의 경우 예외적으로 0,1혼용이 가능하다
  이런 요청이 없다면 기본적으로 \_id 필드가 포함될 것이기때문.
  ```bash
  db.collection.find({query},{"field1":1,"_id":0})
  ```

### Advanced Projection

### **Reference**

아$elemMatch는 find 명령의 쿼리 및 프로젝션 부분에서 모두 사용할 수 있는 배열연산자이다.

- [$elemMatch(projection)](https://docs.mongodb.com/manual/reference/operator/projection/elemMatch/) : 지정된 쿼리와 일치하는 요소가 하나 이상이 있는 배열 필드를 갖고있는 모든 document를 찾는다.
- [$elemMatch(query)](https://docs.mongodb.com/manual/reference/operator/query/elemMatch/) : 지정된 기준과 일치하는 요소가 하나 이상 있는 배열 요소만을 프로젝션한다. (모든 필드를 프로젝션하지 않는다)

- sample_training의 grades collection에서 모든 유형의 평가에서 85점 이상의 성적을 받고 413수업을 수강하는 모든 학생을 찾아보자.
  - 쿼리를 할 필드가 어떻게 생겼나 알아보자
    ```bash
    sample_training> db.grades.findOne()
    {
      _id: ObjectId("56d5f7eb604eb380b0d8d8cf"),
      student_id: 0,
      scores: [
        { type: 'exam', score: 91.97520018439039 },
        { type: 'quiz', score: 95.80410375967175 },
        { type: 'homework', score: 89.62485475572984 },
        { type: 'homework', score: 51.621532832724846 }
      ],
      class_id: 350
    }
    ```
  - scores의 과목들의 점수가 85점 이상인 학생을 찾아야한다 ( + class_id가 413)
  - scores는 배열이므로 (sub document)의 요소에 접근하기 위해서는 배열 연산자인 $ememMath를 사용한다.
    ```bash
    sample_training> db.grades.find({"class_id":431},{"scores":{"$elemMatch":{"score":{"$gt":85}}}}).pretty()
    [
      { _id: ObjectId("56d5f7eb604eb380b0d8d8fb") },
      {
        _id: ObjectId("56d5f7eb604eb380b0d8dca5"),
        scores: [ { type: 'homework', score: 96.91641379652361 } ]
      },
      { _id: ObjectId("56d5f7eb604eb380b0d8dbf2") },
      {
        _id: ObjectId("56d5f7eb604eb380b0d8de16"),
        scores: [ { type: 'exam', score: 86.41243160598542 } ]
      },
      {
        _id: ObjectId("56d5f7eb604eb380b0d8e640"),
        scores: [ { type: 'exam', score: 86.58727609342327 } ]
      },
      {
        _id: ObjectId("56d5f7eb604eb380b0d8e789"),
        scores: [ { type: 'quiz', score: 88.34543956073009 } ]
      },
      { _id: ObjectId("56d5f7eb604eb380b0d8e7f6") },
      { _id: ObjectId("56d5f7eb604eb380b0d8e95c") },
      {
        _id: ObjectId("56d5f7eb604eb380b0d8eb0b"),
        scores: [ { type: 'exam', score: 88.38390090500901 } ]
      },
    ```
  - 위킈 쿼리문은 scores필드의 score필드의 값이 85이상인 document를 의미한다. 조건에 맞는 요소가 여러 개인 경우 첫 번쨰 요소만 projection한다.
  - 위의 결과는 쿼리와 일치하는 모든 document이지만, 모든 필드의 값을 가져오지는 않았다.
  - 또한 \_id만 있는 document는 score field가 85이상이 아닌 document라서 \_id만 가져옴.
  - $elemMatch는 지정한 배열 필드가 document에 존재하고 조건에 맞는 요소가 있는 경우에만 해당 필드를 결과에 포함시민다( \_id는 default)
- $elemMatch는 find명령의 쿼리부분에서도 사용할 수 있다.
  - 어떤 수업이든 extra credit을 받은 모든 학생을 찾아본다. (type 필드의 값이 extra credit인 것을 찾는다)
    ```bash
    sample_training> db.grades.find({"scores":{"$elemMatch":{"type":"extra credit"}}}).pretty()
    [
      {
        _id: ObjectId("56d5f7eb604eb380b0d8e292"),
        student_id: 250,
        scores: [
          { type: 'exam', score: 3.6641013617826124 },
          { type: 'quiz', score: 16.099760154050923 },
          { type: 'homework', score: 18.069138737846245 },
          { type: 'homework', score: 66.16407292421133 },
          { type: 'extra credit', score: 100 }
        ],
        class_id: 339
      }
    ]
    ```
    위의 쿼리문은 scores의 type이 extra credit이 속한 모든 document의 필드를 보여준다.

## 3. 배열과 Sub Dcouemt query

MongoDB는 Sub Document 또는 배열로 저장한다.

### **Reference**

- [$regex](https://docs.mongodb.com/manual/reference/operator/query/regex/)

sample_training DB의 trips collecion을 사용하여 실습한다.

먼저 Collecion의 document를 살펴보자

```bash
sample_training> db.trips.findOne()
{
  _id: ObjectId("572bb8222b288919b68abf5a"),
  tripduration: 379,
  'start station id': 476,
  'start station name': 'E 31 St & 3 Ave',
  'end station id': 498,
  'end station name': 'Broadway & W 32 St',
  bikeid: 17827,
  usertype: 'Subscriber',
  'birth year': 1969,
  'start station location': { type: 'Point', coordinates: [ -73.97966069, 40.74394314 ] },
  'end station location': { type: 'Point', coordinates: [ -73.98808416, 40.74854862 ] },
  'start time': ISODate("2016-01-01T00:00:45.000Z"),
  'stop time': ISODate("2016-01-01T00:07:04.000Z")
}
```

위의 document에는 sub document로start station locaion과 end station location 두 field가 있다.

### Sub document를 쿼리하는 방법?

- Doc notation 사용 : “start station location.typ”:”Point” 과 같이 Sub Decouemt의 필드에 접근할 수 있다.

### 배열에 있는 document를 쿼리하는 방법?

companies collection을 사용하여 실습한다.

relationships 필드의 배열에는 각 사람의 정보다 들어있는 document가 있고 title, is_past(현재 상태), person(이름과 성 정보)를 담고있는 필드가 있다.

```bash
relationships: [
      {
        is_past: false,
        title: 'President & CEO',
        person: {
          first_name: 'Mark',
          last_name: 'Ranalli',
          permalink: 'mark-ranalli'
        }
      },
      {
        is_past: false,
        title: 'VP Content & Community',
        person: {
          first_name: 'Janice',
          last_name: 'Brand',
          permalink: 'janice-brand'
        }
      },
```

- 여기서 특성 사람의 이름 last_name필드를 이용해 쿼리를 해보자(last_name:"Zuckerberg”)
  ```bash
  sample_training> db.companies.find({"relationships.0.person.last_name":"Zuckerberg"},{"name":1}).pretty()

  [ { _id: ObjectId("52cdef7c4bab8bd675297d8e"), name: 'Facebook' } ]
  ```
  - 0 : 배열의 첫 번째 요소
  - person : 중첩 객체를 값으로 갖고있는 필드
  - last_name: sub document person의 필드
  - “Zuckerberg” : 찾는 값
  - {”name”:1} : Projection . 결과에 name만 포함
- relationships 배열에서 이름이 Mark인 CEO가 몇 명인지 확인해보자.

  (fitst_name : Mark} title에 CEO문자열이 포함되어있는 조건 찾기

  - $regex를 사용하여 포함되어있는 문자열이 있는 필드를 찾을 수 있다.

  ```bash
  sample_training> db.companies.find({"relationships.0.person.first_name":"Mark","relationships.0.title":{"$regex":"CEO"}},{"name":1}).pretty()

  [
    { _id: ObjectId("52cdef7c4bab8bd675297d8e"), name: 'Facebook' },
    { _id: ObjectId("52cdef7c4bab8bd675297dd3"), name: 'iSkoot' },
    { _id: ObjectId("52cdef7c4bab8bd675297efc"), name: 'Helium' },
    { _id: ObjectId("52cdef7c4bab8bd675297fb5"), name: 'Feedjit' },
    { _id: ObjectId("52cdef7c4bab8bd675297fbf"), name: 'Avvo' },
    { _id: ObjectId("52cdef7c4bab8bd6752980ed"), name: 'Bloglines' },
    { _id: ObjectId("52cdef7c4bab8bd675298077"), name: 'eXelate' },
    { _id: ObjectId("52cdef7c4bab8bd6752983f1"), name: 'Surf Canyon' },
    { _id: ObjectId("52cdef7c4bab8bd675298543"), name: 'SignalDemand' },
    { _id: ObjectId("52cdef7c4bab8bd67529838c"), name: 'HipLogic' },
    { _id: ObjectId("52cdef7c4bab8bd675298655"), name: 'Wiredset' },
    {
      _id: ObjectId("52cdef7d4bab8bd675298c18"),
      name: 'Market Sentinel'
    },
    {
      _id: ObjectId("52cdef7d4bab8bd675298e2b"),
      name: 'Courtland Brooks'
    },
    {
      _id: ObjectId("52cdef7d4bab8bd675298ec2"),
      name: 'Are You Watching This?!'
    },
    { _id: ObjectId("52cdef7d4bab8bd67529906d"), name: 'SNASM' },
    { _id: ObjectId("52cdef7d4bab8bd675298ff0"), name: 'Gay Ad Network' },
    { _id: ObjectId("52cdef7d4bab8bd67529914b"), name: 'Bitly' },
    { _id: ObjectId("52cdef7d4bab8bd6752991fa"), name: 'N-Play' },
    { _id: ObjectId("52cdef7d4bab8bd6752992c2"), name: 'SAVO' },
    { _id: ObjectId("52cdef7d4bab8bd6752993d7"), name: 'AirMe' }
  ]
  ```

- relationships 배열에 있는 Mark중 현재 회사를 떠난 사람을 찾아보자.
  (is_past가 true 인지 false인지를 통해 알 수 있다 treu 이면 떠났다는 의미)
  ```bash
  sample_training> db.companies.find({"relationships":{"$elemMatch":{"is_past":true,"person.first_name":"Mark"}}},{"name":1}).count()
  256

  ```
  is_past가 true이고 fitst_name이 Mark인 relationships 배열의 요소를 가진 회사는 256개이다.
