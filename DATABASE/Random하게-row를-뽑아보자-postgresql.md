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
    

1. `DISTINCT`  + `random()` 을 사용해보자
    
    [참고한 Stack Overflow](https://www.notion.so/Random-search-e24653a2a76c4a2ca2070ec55ac2ee3e)
    
    ```sql
    explain analyze 
    SELECT DISTINCT ("originSeq" + TRUNC(RANDOM()*10)::integer) as id, "roadAddress" ,"roadAddress"   
        FROM ADDRESSES A 
        limit 200
    ```
    
    음 이것도 SQL Error [53100]: ERROR: could not write block 239049 of temporary file: No space left on device..
    
2. Partition별로 random 검색을 해보자
    
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