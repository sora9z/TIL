# OpenAPI-everytine-VS-store-to-DB-ing

Category: WEB SERVER
Chapter: Web Server
강의: Study
블로깅: No
유형: Self Study
작성일시: 2022년 4월 9일 오전 11:38

# OpenAPI-everytine-VS-store-to-DB

[참고 StackOverfloA](https://softwareengineering.stackexchange.com/questions/312813/which-is-better-to-call-api-or-database)

현재 하고있는 프로젝트는 Open-api의 영화를 불러와서 DB에 저장하고 클라이언트의 요청 시 DB에 있는 데이터를 보내주는 방식으로 서버를 구성하였다. 무한스크롤을 통해 스크롤이 내려갈 때마다 서버에 요청을 하면 20개씩 DB에서 가져와서 뿌려주는 방식으로 진행하였다.

 처음에 이렇게 설계를 한 이유는 매번 open api에서 데이터를 요청해야 했기때문이다. open api에서 장르를 필터해주고 response 형식에 맞게 각 영화의 데이터를 가공하여 client에게 보내주어야 하는데, 매번 api에서 호출하면 속도가 느려질 것이 뻔하기 때문이었다. 또한 최신 영화만을 보여주는 사이트이기 때문에 저장되는 영화는 한정되어 있어서 메모리에 대한 고민은 크게 필요 없었기 때문이었다.

프로젝트를 진행하면서 생각을 해보니 최신 영화라는 주제는 최신화를 늘 해주어야 하는 주제이다. 따라서 주기적으로 api call을 해워 최신화를 해야하는 경우가 있었다. 

물론  DB에 저장된 데이터를 한 달에 한번 꼴로 업데이트를 해주는 방식이었는데 가능은 할 것 같다고 생각 했고 아직 구현은 하지 않았다. 이러다 문득 이런 경우 어떤 방식으로 하는지 찾아보다 stack overflow에 나와 같은 고민을 하는 글을 보았다. 

채택이 된 답변으로는 1. Redish같은 Cash를 사용하라는 것 이었고 2. 캐싱된 데이터의 timestamp를 유지하다가 마지막 유효날에 캐시를 업데이트 하라는 것이었다. 요즘 하드웨어의 발전 속도가 빠르고 ram 가격 또한 낮아졌기 때문에 redis를 사용하는 방법도 속도도 높일수 있는 좋은 방법이란 생각이 들었다. 

다음에 진행할 인턴 프로젝트 에서는 이런 방법을 고려해 봐야겠다.