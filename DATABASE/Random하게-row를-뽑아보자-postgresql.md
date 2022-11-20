## 개요

부하테스트를 위해 랜덤한 주소가 필요했음.

플래닝 중 5만개 정도의 주소를 부하테스트를 할 때마다 랜덤하게 쿼리하고, 그 데이터를 사용하는 것으로 결정됨.

### Random하게 search하는 쿼리문

- 시나리오..
    - 5만개를 뽑는다
    - attribute는 `siDo` `siGunGu` `eupMyeonDong` `mainLandNumber` `subLandNumber` `rodaName` `mainBuildingNumber` `sybBuildingNumber` `buildingName` `location`

1. `order by RANDOM()` 
    
    ```sql
    SELECT *
        FROM ADDRESSES A 
        order by RANDOM()
        LIMIT 200
    ```
    
    [이 StackOverlow 답변](https://dba.stackexchange.com/questions/261549/order-by-random-meaning-postgresql)에 따르면  `ORDERY BY random()` 은 각 row에 random number(0.0~0.1)를 생성하고 이를 기준으로 정렬한 다음 select를 한다.  아무래도 sequential 탐색이다보니 매우 느림
    
    그런데, 위와 같은 방법은 좀 느리다. 200개를 query하는데도 23-24s가 걸린다
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d2ad2a8d-03c9-4d49-91a8-6658c25a329f/Untitled.png)
    
    그리고 10,000개 까지는 쿼리가 되지만 그 이상은 아래와 같은 error발생함
    
    ```bash
    SQL Error [53100]: ERROR: could not write block 239049 of temporary file: No space left on device
    ```
    
    [stackoverflow](https://stackoverflow.com/questions/56812618/how-to-resolve-could-not-write-block-of-temporary-file-no-space-left-on-device) 의 답변에 따르면 Data가 work-memory에 맞지 않는다면 postgresQL은 이를 temporary desk에 저장한다고 한다, 아무래도 너무 많은 양의 쿼리를 하려고해서 그런듯함..
    
    500개씩 10번 할 수 있지만 random으로 검색이 되기 때문에 X
    

2. `DISTINCT`  + `random()` 을 사용해보자
    
    [참고한 Stack Overflow](https://www.notion.so/Random-search-e24653a2a76c4a2ca2070ec55ac2ee3e)
    
    ```sql
    explain analyze 
    SELECT DISTINCT ("originSeq" + TRUNC(RANDOM()*10)::integer) as id, "roadAddress" ,"roadAddress"   
        FROM ADDRESSES A 
        limit 200
    ```
    
    음 이것도 SQL Error [53100]: ERROR: could not write block 239049 of temporary file: No space left on device..
    
3. Partition별로 random 검색을 해보자
    
    파티션이 되어있으므로 각 파티션마다 검색을 해서 가져와보자. 
    
    그리고 이걸 자바스크립트에서 병렬로 처리를 해보자
    
    ```jsx
    // 각 파티션 테이블 명을 리스트로 만들고
    const partitionList = [
        ...
            ...
      ];
    
    const options = {
        attributes: [...],
        order: Models.sequelize.random(),
        limit: 3000,
      };
    
    const searchList = partitionList.map(async (siDo) => {
        const where = {"파티션 명};
        return await readAddresses(where, options);
      });
    
    // Promose.allSatteled로 병렬처리
    const results = await Promise.allSettled(searchList).then((promiseResults) => promiseResults.map((result) => result.value));
    
    ```
    
    Promise.all을 사용하려고 하였지만, Promise.all의 경우 하나라도 fail이면 다 faile이다. 어차피 테스트용 데이터를 가져오는 것이므로 한 두개 정도 fail되어도 크게 상관없다 생각되어 Promise.allSatteled를 사용. (순서도 딱히 상관이 없기에..)

4. [TABLESAMPLE](https://www.postgresql.org/docs/current/sql-select.html) 을 사용보자

3번 방법도 너무 느리다. locust test를 하는데 쿼리를 하는 시간이 길어서 많은 요청이 계속 fail… 

훈님께서 추천해주신..postgresql의 TABLESAMPLE 을 사용해보았다

```jsx
TABLESAMPLE sampling_method ( argument [, ...] ) [ REPEATABLE ( seed ) ]
```

- TABLE name 뒤에 TABLESAMPLE를 작성하는데, sampling_method 에 지정된 방법을 사용하여 행의 집합을 검색한다.
- 이 방법은 WHERE보다 더 우선한다.
- sampling_method 두 가지가 있다 (standard임..다른 방법들은 extension에 리스트 되어있다는데..?)
    - 아래의 두 경우 모두 `백분율`로 표시되는 테이블의 비율인 단일 인수를 허용한다. (5는 모든 테이블에서 5%만 가져오겠다..) 그리고 `random`으로 가져온다고 한다!!
    - BERNOULLI
        - The `BERNOULLI`
         method scans the whole table and selects or ignores individual rows independently with the specified probability.
            
            전체 테이블을 스캔하고 개별 행을 독립적으로 지정된 확률로 선택 또는 무시한다고 한다. 
            
            → 이 방법도 빠르지는 않을 것 같은데 그래도 RANDOM보다는 빠르겠다
            
    - SYSTEM
        - 블록수준의 샘플링 이라고 한다. 선택한 각 블록의 모든 행이 반환된다.
        - 작은 백분율의 경우 BERNOULL 방법보다 빠르지만 클러스터링 효과로 램덤성은 조금 떨어질 수 있다.
    
    → 이런게 있구나..! 랜덤성이 그렇게 크게 중요하지 않으므로 후자인 SYSTE으로 진행
    
    - (2000 * 100)/10633124.0) 이것은 전체 데이터에서 2000개만 뽑기 위해 그것을 백분율로 만든 것이다.
    
    ```jsx
    const result = await Models.sequelize.query('SELECT * FROM addresses TABLESAMPLE SYSTEM ((2000 * 100)/10633124.0);');
    ```
    
5. 그런데,, 부하테스트를 하면서 계속 죽기도하고, 테스트 데이터를 가져오는 시간이 성능 측정에 상당히 방해가 된다.. 그래서 테스트 데이터를 가지고오는 쿼리를 production이 아닌 dev 환경에서 가져오기로 하였다 → 훨씬 좋아졌다 굿