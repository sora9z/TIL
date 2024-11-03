## 2. Postgresql의 Full text Search

### 2-1 Text preprocess(전처리)

postgresql에서는 full text search를 어떻게 지원하는지 알아보자

문서를 확인해보면 postgresql에서는 text search를 위해 아래와 같은 단계를 통해 텍스트에 대해 전처리를 한다. 텍스트 검색시 이 전처리된 데이터를 통해 검색을 함으로써 전문검색이 가능하도록 한다.

단계별로 확인해보자

1. Parsing documents into tokens(토큰화) : 문서를 작은 단위로 나누는 것을 의미한다. 작은 단위는 숫자, 단어, 복합어, 이메일주소 등 다양한 형태일 수 있으며 'Parser' 를 사용하여 토큰화를 한다. 기본적으로 표준 파서가 제공되며 사용자 정의 파서 또한 만들 수 있다

2. Converting tokens into lexemes(토큰 정규화) :
   Lexem이란 같은 의미를 가진 단어들을 하나의 형태로 통일한 것을 의미한다. 검색에 유용하지 않는 불용어(is, a 등)s,es등의 접미사를 제거하여 단어의 변형된 형태들을 통일시킨다. postgresql은 이 작업을 위해 사전(dictionary)를 사용한다. 표준사전이 존재하며 사용자 정의 사전도 만들 수 있다. 이 작업을 통해 비슷한 의미의 단어의 다양한 변형을 통일시킬 수 있다.

3. Storing preprocessed documents optimized for searching. : 이렇게 전처리가 된 문서는 검색에 최적화된 형태로 저장된다. 정렬된 렉셈 배열로 저장하거나 위치 정보를 같이 저장하여 검색시 밀집된 문서가 흩어진 문서보다 더욱 높은 쉰위를 받을 수 있도록 한다.

### 2-2 Text Search Type

[공식문서-Text Search Types](https://www.postgresql.org/docs/current/datatype-textsearch.html)
postgresql에서는 full text search를 위해 `tsvector`, `tsquery` 두 가지 타입을 제공한다.

위의 단계를 통해 가공된 문서는 `tsvector` 라는 데이터 타입으로 저장이 된다. 그리고 `tsquery` 유형을 통해 쿼리를 처리한다.

1.  tsvector
    tsvector 타입은 토큰화된 단어(lexem)와 그 위치 정보를 저장한 자료구조이다. 여러 단어는 정렬되어있으며 중복되지 않는다. 여기서 단어의 위치란 문서 내에서 해당 단어나 나타나는 위치(토근의 순서)를 나타낸다.

        - `::tsvector`는 텍스트를 tsvector 타입으로 casting할 때 사용한다. 단순히 형식을 바꾸는 것이며 정규화 등은 하지 않는다. 중복 제거 및 정렬만 한다. 아래는 . 그 예시를 보여준다

            ```sql!
            mydatabase=# SELECT '홍시 맛이 나서 홍시라 생각한 것이온데 왜 홍시 맛이 난다고 하시면'::tsvector;
                                             tsvector
            --------------------------------------------------------------------------
             '것이온데' '나서' '난다고' '맛이' '생각한' '왜' '하시면' '홍시' '홍시라'
            ```

        - `to_tsvector`는 주어진 텍스트를 `파싱하, 정규화, 불용어를 제거, tsvector 형식으로 변환`하는 함수이다. parser와 dictionary를 사용하여 토큰화, lexem등의 처리가 수행되며 검색에 사용 할 문서 전처리시 사용한다. 아래의 예시를 보자
            ```sql!
            mydatabase=# SELECT to_tsvector('english', 'The Fat Rats');
           to_tsvector
            -----------------
             'fat':2 'rat':3
             ```
            하지만 아쉽게도 to_tsvector는 한글 지원은 되지 않는다. 확인해보면 korean은 없다
            ```sql!
            mydatabase=# \dF
                   List of text search configurations
               Schema   |    Name    |              Description
            ------------+------------+---------------------------------------
             pg_catalog | arabic     | configuration for arabic language
             pg_catalog | armenian   | configuration for armenian language
             pg_catalog | basque     | configuration for basque language
             pg_catalog | catalan    | configuration for catalan language
             pg_catalog | danish     | configuration for danish language
             pg_catalog | dutch      | configuration for dutch language
             pg_catalog | english    | configuration for english language
             pg_catalog | finnish    | configuration for finnish language
             pg_catalog | french     | configuration for french language
             pg_catalog | german     | configuration for german language
             pg_catalog | greek      | configuration for greek language
             pg_catalog | hindi      | configuration for hindi language
             pg_catalog | hungarian  | configuration for hungarian language
             ...
             ...

            (29 rows)
            ```

- tsqyery
