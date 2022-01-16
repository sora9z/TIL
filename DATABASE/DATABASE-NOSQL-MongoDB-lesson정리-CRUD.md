# DATABASE-NOSQL-MongoDB-lesson정리-CRUD

Category: DATABASE
Chapter: Database
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2022년 1월 16일 오후 6:21

## DB-NOSQL-MONGODB CRUD

— lesson 정리

### Achievement Goals

- MongoDB에서 CRUD하기
    - Insert(C), Find(R), Update(U), Delete(D)에 대한 qury작성
    - 연산자, 프로젝션 사용 (Projection)
    - 배열,Sub document query
- aggration Framework사용하여 aggregate 명명여 쿼리
    - $match, $project, $grop, 연산자 사용 할 수 있다.
    

### 0. 실습을 위한  Sample Data 받기

[Load Sample Data](https://docs.atlas.mongodb.com/sample-data/)

1. 위의 사이트를 참고하여 sample data를 받는다
2. Terminal에서 mongodb 접속하기 : 
    
    mongosh “mongodb+srv://cluster0.4ence.mongodb.net/practice” —username username
    
3. show dbs로 database를 확인해보면 sample data가 들어온 것을 볼 수 있다.

### 1. CREATE - insert 명령어

고유값인 _id와 새로운 document를 추가하는 방법에 대해서 알아보자

참고 : [db.collection.insert()](https://docs.mongodb.com/manual/reference/method/db.collection.insert/#mongodb-method-db.collection.insert) 

- document _id :
    - 모든 MongoDB document는 _id 필드를 기본값으로 갖고있어야 하며 document를 구별하는 역할을 한다.
    - _id가 다르면 다른 document로 간주한다.
    - _id가 같으면 (필드가 달라도) 서로 같은 document로 여겨 error를 발생
    - _id 앖에 임의적으로 고유값을 생성하여 넣을 수 있지만 보통 ObjectId를 사용한다.
    - document를 추가할 때 필드와 값을 특정하지 않는다면 자동으로 _id 필드가 생성되고  ObjectId 타입이 할당된다.
    
- insert()
    - db.collection.insert( document or array, {writeConcern: document,ordered:boolean})
    - ordered: false가 없다면 순서와 무관하게 고유한 _id 만 갖고있는 document만 모두 collection에 삽입된다.
    - 만약 존재하지 않는 collection에 insert가 되었다면 그와 동시에 collecrion이 만들어지게된다.
    

### [2.READ](http://2.READ) - find 명령어

일정 조건에 따라 데이터를 조회하는 방법과 조회한 데이터의 수를 세는 방법 알아보기

참고 [: **db.collection.count(query, options)](https://docs.mongodb.com/manual/reference/method/db.collection.count/#mongodb-method-db.collection.count)  , [db.collection.find(query, projection)](https://docs.mongodb.com/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) , [cursor.pretty()](https://docs.mongodb.com/manual/reference/method/cursor.pretty/#mongodb-method-cursor.pretty), [db.collection.findOne(query, projection)](https://docs.mongodb.com/manual/reference/method/db.collection.findOne/#mongodb-method-db.collection.findOne)**

- db.collecetion.find(query, projection)
    - query : type = document selection filter 생략하거나 {} 빈 parameter로 주면  모든 documents를 출력한다(select *  같은 효과)
- example
    
    아래의 실습을 통해 확인해보자.
    
    - 사용 db : sample_training  : use sample_training 명령어로 db를 선택한다.
    - collection 확인   : show collection를 입력하면 sample_training DB안에 있는 collection들의 리스트를 볼 수 있다.
    - find 명령어를 사용하여 zips collection의 데이터를 조회한다.
        - db.zips.find({”state”:”NY”)} 를 해보면 아래와 같이 결과가 나온다.
        
        ```bash
        Atlas atlas-ce8c1z-shard-0 [primary] sample_training> db.zips.find({"state":"NY"})
        [
          {
            _id: ObjectId("5c8eccc1caa187d17ca72f89"),
            city: 'FISHERS ISLAND',
            zip: '06390',
            loc: { y: 41.263934, x: 72.017834 },
            pop: 329,
            state: 'NY'
          },
          {
            _id: ObjectId("5c8eccc1caa187d17ca72f8a"),
            city: 'NEW YORK',
            zip: '10001',
            loc: { y: 40.74838, x: 73.996705 },
            pop: 18913,
            state: 'NY'
          },
          {
            _id: ObjectId("5c8eccc1caa187d17ca72f8b"),
            city: 'NEW YORK',
            zip: '10003',
            loc: { y: 40.731253, x: 73.989223 },
            pop: 51224,
            state: 'NY'
          },
          ...
        	...
        	...
        ]
        Type "it" for more
        ```
        
        - 이미 사용 할 db에 들어갔기 때문에 db의 이름을 특정하지 않아도 된다.
        - 랜덤하게 정렬되지않은 무작위 20개의 결과물만 출력이된다.
        - 다음 20개를 조회하려면 it(iterate)을 입력하면 된다.
        - db.zips.find({"state":"NY","city":"ALBANY"}) 과 같이 속성 추가도 가능
        
- pretty()를 사용하면 document의 구조와 각 field,value를 가독성있게 출력해준다.
- count()를 사용하면 데이터의 수를 조회할 수 있다.
    - **db.collection.count(query, options**

```bash
Atlas atlas-ce8c1z-shard-0 [primary] sample_training> db.zips.find().count()
29470
```

- findOne()
    - **db.collection.findOne(query, projection)**
    - 특정한 한 개의 데이터만을 조회한다.
    - 아무 query도 쓰지 않을 경우 무작위로 1개의 데이터만 가져온다

```bash
db.zips.findOne({"_id":ObjectId("5c8eccc1caa187d17ca6ed16")}) 
{
  _id: ObjectId("5c8eccc1caa187d17ca6ed16"),
  city: 'ALPINE',
  zip: '35014',
  loc: { y: 33.331165, x: 86.208934 },
  pop: 3062,
  state: 'AL'
}

```

### 3. Update

document update를 하는 방법에 대하여 알아본다.

참고 : [db.컬렉션이름.updateOne()](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne) , [db.컬렉션이름.updateMany()](https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/#mongodb-method-db.collection.updateMany) , 연산자들 ($inc , $set, $push)

update를 하는 명령어는 document한 개만 업데이트하는 updateOne과 다수의 document를 업데이트하는 updateMany가 있다.

- updateOne : 주어진 기준에 맞는 다수의 document중 첫 번째 document 한 개만 업데이트
    - **db.collection.updateOne(filter, update, options**
    - zip field가 12534인 데이터의 현재 인구수는 6,235명이다. 이 데이터를 업데이트 해보자
        - current data 조회
        
        ```bash
        Atlas atlas-ce8c1z-shard-0 [primary] sample_training> db.zips.findOne({"zip":"12534"})
        {
          _id: ObjectId("5c8eccc1caa187d17ca73239"),
          city: 'HUDSON',
          zip: '12534',
          loc: { y: 42.246978, x: 73.755248 },
          pop: 21205,
          state: 'NY'
        }
        ```
        
        - 현재 data의 인구수는 21205 이므로 6235로 업데이트 하려면 $set 연산자를 사용하면 된다
        - $set 연산자는 주어진 필드에 지정된 값을 업데이트한다.
        
        ```bash
        Atlas atlas-ce8c1z-shard-0 [primary] sample_training> db.zips.updateOne({"zip":"12534"},{"$set":{"pop":6235}})
        
        {
          acknowledged: true,
          insertedId: null,
          matchedCount: 1,
          modifiedCount: 1,
          upsertedCount: 0
        }
        
        // Check update 완료
        
        Atlas atlas-ce8c1z-shard-0 [primary] sample_training> db.zips.findOne({"zip":"12534"})
        {
          _id: ObjectId("5c8eccc1caa187d17ca73239"),
          city: 'HUDSON',
          zip: '12534',
          loc: { y: 42.246978, x: 73.755248 },
          pop: 6235,
          state: 'NY'
        }
        ```
        

- updateMany : query문과 일치하는 모든 document를 업데이트
    - **db.collection.updateMany(filter, update, options)**
    - 만약 city : ALPINE의 인구가 각 10명 씩 늘어 pop필드를 10씩 늘려보도록 하자
        
        ```bash
        db.zips.updateMany({"city":"ALPINE"},{"$inc":{"pop":10}})
        # 첫 번쨰 인자 : 업데이트 할 document
        # 두 번쨰 인자 : 발생할 업데이트 내용
        ```
        
    - {”city”:”ALPINE”} : 업데이트 할 document를 결정하는 조건
    - {$inc”:{”pop”:10}} : MQL(MongoDB Quey Language)연산자 $inc를 사용하여 특정한 field값을 주어진 만큼 증가시킨다.
    - 결과는 아래와 같다.
        
        ```bash
        Atlas atlas-ce8c1z-shard-0 [primary] sample_training> db.zips.updateMany({"city":"ALPINE"},{"$inc":{"pop":10}})
        {
          acknowledged: true,
          insertedId: null,
          matchedCount: 8,
          modifiedCount: 8,
          upsertedCount: 0
        }
        
        # matchedCount : 첫 번째 인자로 들어간 조건을 충족하는 document의 수
        # modidiedCount : 두 번째 인자로 들어간 업데이트 연잔사$inc로 인해 수정된 document의 수
        ```
        
    - 아래와 같이 $inc 연산자는 다양한 필드값을 동시에 업데이트 할 수 있다.
        
        ```bash
        {$inc”:{”pop”:10, “field”:”increment value”, “field3”:”increment value”,..}} 
        ```
        
    - 전 후 비교
        
        ```bash
        // Before
        
        Atlas atlas-ce8c1z-shard-0 [primary] sample_training> db.zips.find({"city":"ALPINE"})
        [
          {
            _id: ObjectId("5c8eccc1caa187d17ca6ed16"),
            city: 'ALPINE',
            zip: '35014',
            loc: { y: 33.331165, x: 86.208934 },
            pop: 3062,
            state: 'AL'
          },
          {
            _id: ObjectId("5c8eccc1caa187d17ca6f0d8"),
            city: 'ALPINE',
            zip: '85920',
            loc: { y: 33.827878, x: 109.12829 },
            pop: 243,
            state: 'AZ'
          },
        	...
        	...
        ]
        
        // After
        
        Atlas atlas-ce8c1z-shard-0 [primary] sample_training> db.zips.find({"city":"ALPINE"})
        [
          {
            _id: ObjectId("5c8eccc1caa187d17ca6ed16"),
            city: 'ALPINE',
            zip: '35014',
            loc: { y: 33.331165, x: 86.208934 },
            pop: 3072,
            state: 'AL'
          },
          {
            _id: ObjectId("5c8eccc1caa187d17ca6f0d8"),
            city: 'ALPINE',
            zip: '85920',
            loc: { y: 33.827878, x: 109.12829 },
            pop: 253,
            state: 'AZ'
          },
         ...
         ...
        ]
        
        ```
        
        비교를 해보면 증가된 것을 확인할 수 있다.
        
    
- 만약 필드 이름을 작못 적었을 경우 Error가 나지 않고 그 필드가 그대로 추가돤디.
- 배열로 이루어진 필드에 값을 저장하는 방법
    - $push연산자는 배열로 이루어진 필드의 값에 요소를 추가하기 워한 연산자이다.
    - sample_training DB에서 grades Collection의 scores 부분에 extra credit을 추가해보자.
    - extra credit은 class_id = 339 , student_id = 250인 학생에게 준다고 가정한다.
    
    ```bash
    Atlas atlas-ce8c1z-shard-0 [primary] sample_training> db.grades.updateOne({"student_id":250,"class_id":339},{"$push":{"scores":{"type":"extra credit","score":100}}})
    {
      acknowledged: true,
      insertedId: null,
      matchedCount: 1,
      modifiedCount: 1,
      upsertedCount: 0
    }
    
    // check 업데이트 완료
    Atlas atlas-ce8c1z-shard-0 [primary] sample_training> db.grades.findOne({"student_id":250})
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
    ```
    
    - {"student_id":250,"class_id":"339} : 업데이트 할 document 지정 조건
    - {"scores":"{"type":"extra credit","score":100} 추가 할 서브 document를 $push를 써서 업데이트

### 4. Delete

document와 collection을 삭제하는 방법

참고 [db.컬렉션이름.deleteOne()](https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/#mongodb-method-db.collection.deleteOne), [db.컬렉션이름.deleteMany()](https://docs.mongodb.com/manual/reference/method/db.collection.deleteMany/#mongodb-method-db.collection.deleteMany) , [db.컬렉션이름.drop()](https://docs.mongodb.com/manual/reference/method/db.collection.drop/#mongodb-method-db.collection.drop)

update 부분과 작도 방식은 비슷하다.

1. document 삭제
- deleteMany()
    - 기준을 충족하는 document가 많을 경우 사용
    
    ```bash
    # 아래의 데이터를 삭제해보자.
    Atlas atlas-ce8c1z-shard-0 [primary] practice> db.test.find()
    [
      { _id: ObjectId("61e3fce64df3a767ddb04ad4"), test: '1' },
      { _id: ObjectId("61e3fce64df3a767ddb04ad5"), test: '2' },
      { _id: ObjectId("61e3fce64df3a767ddb04ad6"), test: '3' },
      { _id: ObjectId("61e4227f8ba0df3317da5d78"), test: '1' },
      { _id: ObjectId("61e4227f8ba0df3317da5d79"), test: '3' }
    ]
    # 삭제 기준 : de.test.deleteMany({"test":"1"}) , {teset:3}
    # delete count가 2개인 것을 볼 수 있다.
    Atlas atlas-ce8c1z-shard-0 [primary] practice> db.test.deleteMany({"test":"1"})
    { acknowledged: true, deletedCount: 2 }
    
    Atlas atlas-ce8c1z-shard-0 [primary] practice> db.test.deleteMany({"test":"3"})
    { acknowledged: true, deletedCount: 2 }
    
    #결과 1개의 데이터만 남는다.
    Atlas atlas-ce8c1z-shard-0 [primary] practice> db.test.find()
    [ { _id: ObjectId("61e3fce64df3a767ddb04ad5"), test: '2' } ]
    ```
    

- deleteOne()
    - 주어진 기준에 맞는 하나를 삭제한다. 만약 조건에 맞는 것이 많다면 의도하지 않은 랜덤의 document가 삭제됨
    - deleteOne의 경우는 _id값으로 삭제하는 것이 좋은 방향
    
    ```bash
    Atlas atlas-ce8c1z-shard-0 [primary] practice> db.test.deleteOne({"_id":ObjectId("61e3fce64df3a767ddb04ad5")})
    # delete count = 1임을 확인할 수 있다.
    { acknowledged: true, deletedCount: 1 }
    ```
    
1. collection 삭제
- db.collection_name.drop()을 사용한다.
    
    ```bash
    Atlas atlas-ce8c1z-shard-0 [primary] practice> show collections
    # 아래의 collection을 지워보자
    test
    
    # drop
    Atlas atlas-ce8c1z-shard-0 [primary] practice> db.test.drop()
    true
    
    # 결과 -> 아무것도 나오지 않음
    Atlas atlas-ce8c1z-shard-0 [primary] practice> show collections
    
    ```