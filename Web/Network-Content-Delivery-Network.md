# Codestates-Network-Content-Delivery-Network

Chapter: Network
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2022년 2월 13일 오후 6:04

# Content-Delivery-Network (CDN)

![https://blog.leaseweb.com/uploads/2014/04/cdn-graph.jpg](https://blog.leaseweb.com/uploads/2014/04/cdn-graph.jpg)

콘텐츠를 좀 더 빠르고 효율적으로 제공하기 위해 등장한 서비스

- 특징
    - 원본을 복사하여 저장할 여러 개의 캐시 서버로 구성된다.
    - 콘텐츠를 요청받은 경우 데이터를 전달하기 가장 유리한 캐시 서버에서 관련 콘텐츠를 제공한다.
        - 제공할 콘텐츠를 갖고있으며 위치 상으로 가장 가까운 캐시 서버가 우선순위를 갖는다.
- Flow
    - 가장 가까이에 위치한 Data center에 해당 콘텐츠가 있는지 확인한다.
    - 만약 해당 Data center가 콘텐츠를 갖고있지 않다면 다른 데이터 센터가 해당 콘텍츠를 갖고있는지 확인한다(지리적으로 가장 가까운 데이터 센터를 선택)
    - 모든 Data center가 콘텐츠를 가지고 있지 않다면, 원본이 저장된 서버에서 콘텐츠를 제공해야 한다.
    - 위와 같은 경우에 콘텐츠를 데이터 센터에 저장하게 된다. (요청한 곳과 가장 가까운 데이터센터에 저장한다.)
    
- CDN이 다룰 수 있는 콘테느
    - 정적 콘텐츠 (Static contents) : 내용이 거의 변하지 않는 것
        - HTML , 동영상
        - 개인화 되지 않은 대중적인 콘텐츠 : ex 뉴스기사
    - 동적 콘텐츠 (Dynamic Contents) : 접속할 떄마다 내용이 바뀌거나 사용자 마다 다른 내용을 보여주는 콘텐츠
        - 위치, IP주소 등 접근할 때마다 내용이 달라지는 콘텐츠이다.
        - 카드번호, 전화번호 등 개인화된 정보 관련 콘텐츠가 해당됨
        - 내용이 자주 바뀌는 동적 콘텐츠 자체는 CDN 네트워크가 지원하기 어렵다. → 동적 콘텐츠 자체를 저장하기 보다는 공통적인 HTML 파일 부분을 저장한다.
        
- CDN을 사용하는 이유 ?
    - DDoS공격에 대해 어느 정도 대응 가능
        - Distribute Denial of Service attack 은 서버의 수용량보다 훨씬 많은 요청을 보내 서버를 사용 불가능하게 만든다.
        - CDN중 하나가 사용이 불가능해지면 다른 데이터센터는 동작을 하기때문에 문제가 되지 않는다.
    - 로딩속도 감소로 인한 UX 향상
    - 트래픽 분산으로 인한 트래픽 관련 비용 절감
        - 한 개의 서버에서 모든 요청을 처리한다면 서버의 성능은 고성능의 인터넷 수용력이 필요하며 이는 비용의 증가를 초래한다.
        - 하지만 서버를 세계 곳곳으로 분산 시키면 낮은 성능의 인터넷과 서버로 감당할 수 있다. → 로딩시간을 단출 시키고 사용자 경험 향상과 비용 절감을 가져온다.
        
- CDN이 서버를 분산하는 방식
    - Scattered  : 최대한 낮은 응답시간에 집중
        - 세계에 최대한 많은 캐시 서버를 제공
        - 낮은 수용량의 데이터 센터 및 캐시 서버
        - 매우 높은 관리비용, 사용자 요금 (클라우드 제공자는 이 비용을 사용자에게 전가하므로)
        - 연결 수요가 적은 지역 대상으로 적절함
    - Consolidated  : 여러 서버를 통합하여 운용하는 방식
        - 다수의 고성능 서버로 통합하여 운용하는 방식이다
        - 응답시간 증가 , 관리 및 유지 비용이 낮아진다.
        - 연결 수요가  많은 지역을 대상으로 적절