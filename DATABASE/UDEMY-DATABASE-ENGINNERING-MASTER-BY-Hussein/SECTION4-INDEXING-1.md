# 개요

- Udemy 강의 중 데이터베이스 엔지니어링 마스터 강의를 듣고 정리한 내용
- [데이터베이스 엔지니어링](https://barogo.udemy.com/course/database-engineering-korean/learn/lecture/40778704#overview)
- Section4 DATABASE INDEXING

# 강의 정리

- index란 기본적으로 테이블을 조회하고 분석하여 요약함으로써 일종의 지금길을 만들어낸다. 
- index는 현재로서 B-tree와 LSM tree가 있다.
- 어떻게 구성되어있을까? 나중에 개별적으로 찾아보자	
 
- 만약 정보가 index에 있다면 좋은 쿼리다 왜냐면 추가적인 heap facth 같은 scan을 하지 않아도 되기 때문이다. index에 있는 데이터를 사용하면 되기 때문이다.

- 만약 다른 column을 찾는다고 했을 때 id(indexing되어있는)를 찾은 다음 disk로 이동하려고 시도한다.
(ssd를 사용한다면 이 정보가 있는 page로 이동하여 disk에서 정보를 검색한다.) disk에서의 또 다른 읽기이다. 동일한 작업을 한번 더 실행하면 caching을 하기때문에 더 빠르긴 할 것이다.
ssd 캐시 database 캐시 모두 캐싱을 한다.
- index를 걸었을 때 like query로 했을 때는 인덱스를 타지 않는다.like ('%aA%') 이 것은 표현식을 만족시킬 인덱스가 없기 때문이다. 이 표현식에 대한 index를 검색할 수 없기 때문임.
- 즉 index가 있다고해서 데이터베이스가 항상 그것을 사용하지 않는다. plan에 따라 database planner가 index를 사용할지 여부를 결정한다. database가 Index를 사용할지 말지에 대한 hint는 이를 사용하는 enginner에게 달려있다. 
- select * 은 일반적으로 나쁜 쿼리이다. 실제 디스크로 이동해서 정보를 가져오는 비용이 비싸기 때문이다. 필요하지 않은 컬럼이 geometry 과 같은 많은 정볼르 포함하고 있다면 특히 그렇다. 필요한 것만 요청하도록 하자. index에 있는 컬럼이라면 요청하자 -> 왜? 이걸 타게 하려고?

## Postgres Query plan 
- cost : 두 개의 숫자로 구분된다. 첫 번째 숫자는 첫 번째 page를 가져오는데 걸린 시간(ms)를 의미한다. 실제로 작업을 수행하기 전에 하는 작업들이다. 만약 이 숫자가 증가한다면 가져오기 전에 많은 작업을 하고 있음을 의미한다.
두 번째 숫자는 database가 미리 예상하는 총 소요시간을 의미한다.
- rows: 대략적인 수치이며 가져올 행의 수를 나타낸다. 
- width : 행의 폭 모든 열의 바이트 합계를 의미한다. 이 숫자가 클수록 더 많은 네ㅡ트워크를 사용하게 되고 tcp 패킷이 더 많아지게 된 

- order by를 사용해보면 coust가 올라간 것을 볼 수 있다. order by의 기준이 되는 열에 index가 걸려있다면 이 인덱스를 미리 정렬한다.
- 정렬 작업에는 데이터의 접, 데이터의 이동 등의 작업이 있다고한다. 이것도 개별적으로 알아보자

## 24. 비트맵 인덱스 스캔 vs 인덱스 스캔 vs 테이블 스캔 
- seq table sacn
- index sacn
- beimap index sacn (postgres)
 
- index sacn은 index를 읽은 다음에 table을 읽는다
 - 찾은 각각의 값에 대해 그 행이 존재하는 page를 찾고 힙으로 돌아가서 해당 page를 가져와서 해당 값을 추출한다.이것을 random access라고 한다. 
- postgres는 행이 많다면 seq sacn을 수행 할 것이고 행이 적다면 Inex sacn을 수행할 것이다. 
- bitmap sacn
	- postgres는 bitmap을 만들 것인데 기본적으로 bit의 배열이며 값은 page의 번호를 나타낸다. 찾는 행이 있다면 bitmap의 해당 비트를 1로 설정한다 (예를 들면 행을 찾앗는데 그 행이 9번 페이지에 속하는 경우 9번 비트를 1로 설정)
한 번에 힙 테이블로 이동하여 모든 페이지를 가져올 수 잇는 btmap이 생긴다.
- bitmap index sacn의 장점은 여러 index를 scan할 수 있으며 이를 bitmap에 추가하여 하나의 bitmap을 만들고 heap으로 이동할 수 있다는 점이다.

## 25 Key VS None-Key
- index를 생성할 떄 해당 b-tree를 생성하기 위해 하나 이상의 필드를 지정한다.
이 식별자는 검색 목적으로 사용된다. 
- None-key index는 일부 열들을 검색하려는 것이 아니라 포함하기 위한 none-key


