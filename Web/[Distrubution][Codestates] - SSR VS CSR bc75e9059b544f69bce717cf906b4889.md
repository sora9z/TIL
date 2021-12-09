# [Distrubution][Codestates] - SSR VS CSR

Chapter: Distribution
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2021년 12월 9일 오후 8:38

# Client Build and Distribution

## Achievement Goals

1. 정적 웹사이트와 동적 웹사이트의 차이를 이해한다.
2. 빌드가 무엇인지 이해한다
3. 왜 빌드과정이 필요한지 이해한다
4. 정적 웹사이트를 배포하는 방법을 익힌다
5. 정적 웹사이트 배포시 발생하는 문제를 이해하고 해결하는 방법을 익힌다.

### SSR vs CSR

- SSR : Server Side Rendering
    
    ![https://www.growth-rocket.com/wp-content/uploads/2020/07/Server-Side-Rendering-Flowchart.jpg](https://www.growth-rocket.com/wp-content/uploads/2020/07/Server-Side-Rendering-Flowchart.jpg)
    
    - Web page를 Server에서 Rendering을 한다.
    - 브라우저가 Get 요청을 보내면, server는 Web page를 Browser로 전송한다. 이 page가 Client에 도착하면 완전히 Rendering하게 된다.
    - Database의 Data가 필요한 경우, Server는 Database의 Data를 불러온 다음  완전히 Rendering된 페이지로 변활 후 Browser에 response로 보낸다.
    - 사용자가 브라우저의 다른 경로로 이동을 하면, 서버는 동작을 다시 수행한다.
    

### CSR : Client Side Rendering

![https://www.growth-rocket.com/wp-content/uploads/2020/07/Client-Side-Rendering-Flowchart.jpg](https://www.growth-rocket.com/wp-content/uploads/2020/07/Client-Side-Rendering-Flowchart.jpg)

- CSR은 Browser에서 page를 Rendering한다.
- Browser의 요청을 서버로 보내면 서버는 웹 페이지의 공격이 되는 단일 page를 보낸다. 이때 Server는 page와 함께 JavaScript File을 보낸다. 이는 Browser에서 완전이 Rendering된 페이지로 바꾼다.
- Database에 저장된 내용인 경우, Browser는 API를 사용하여 Database의 데이터를 요청한다.
- 사용자가 브라우저의 다른 경로로 이동을 하면, 브라우저는 서버로 다시 요청을 보내지않고 요청 경로에 따라 page를 다시 Rendering 한다.

### Understandig Difference

![https://www.growth-rocket.com/wp-content/uploads/2020/07/pros-and-cons.jpg](https://www.growth-rocket.com/wp-content/uploads/2020/07/pros-and-cons.jpg)

1. Page Load Time 
    
    Page Load Time은 server에 요청을 보내고 Browser에 Rendering 하는 시간을 의미한다.  긴 page load time은 site의 UX에 좋지 않다.
    
    - Initial Load Time
        
        Initial load time은 처음 site를 rendering까지 하는 시간의 평균 시간이다. CSR을 사용할 때, 브라우저는 HTML을 브라우저에 compliling 하기 전에 HTML, CSS, Javascript를 load하기때문에 SSR은 첫 화면 rendering이 빠르며 단일 파일의 용량도 작다.
        
    - Subsequent Load Time
    Subsequent Load Time은 다른 page로 이동할 때의 시간을 의미한다.CSR에서는 이미 필요한 자원이 로드됭 상태이기 때문에 page load time이 빠르다. SSR의 경우 다른 page로 이동할 경우 server에 같은 같은 요청을 하기 때문에 page loading이 느리다.

1. Caching Impact

    - caching은 file의 사본을 저장하여 더울 빠르게 접근할 수 있도록 하는 기술이다. Sever와 Browser는 사용자에 저장되어있는 scripts를 재사용 하기 Caching machanism을 사용한다. 결과적으로 이 기술을 사용한다면 SSR 또는 CSR에서의 전반적인 load time을 개선시킬 수 있다.
    - CSR은 한 번 Server에 요청을 하면 다시 요청을 하지 않기 때문에, internet이 없어도 실행이 가능하다.
    - SSR은 server에 늘 요청을 해야하므로, 매우 높은 load time을 보이지만 caching machanism을 사용하면 renderin speed를 높일 수 있다.

1. Impact on SEO
    
    검생엔진에 최적화가 되기 위해서는, web site는 검색엔진에 적합한 metadata를 반영해야한다. 
    
    - CSR을 사용하는 site는 JS를 통해 content가 생성된다. 이는 한 페이지에서 다른 페이지로 metadag를 변경하는 것이 JS 실행에 의존적이라는 의미가 된다. 그러므로, 페이지마다 metadata를 rendering하기 위해서는 plug-in 이나 library module를 사용해야 한다.
    - 반면, SSR은 server로부터 반복적인 요청을 하므로,  JS의 사용과 관계없이 적합한 metadata가 rendering 된다.
    
    ### When to use SSR and CSR
    
    1. Dynamic Content Loading : SSR
    server는 매우 많은 요청을 처리해야 하므로 빠른 속도의 networking과 높은 computing Power에 상주해있다. 반면, 사용자의 컴퓨터 또는 노트북은 제한된 computing power를 갖고있다.
    이는 완전하게 content를 rendering 하기 위해서 더욱 많은 시간을 필요로 한다는 것을 의미한다. 그렇기 떄문에, site가 반복적인 content rendering을 한다면 **SSR이 좋은 선택이 된다.**
    
    2. Web APP UX, Site UX : CSR
    Web Application은  data 입력, report 생성 등과 같은 작업을 사용자가 필요로 하므로 interaction을 요구하지만 Web site는 단순히 정보를 제공해주는 page 이다. 
    
    Web App의 경우 빠른 rendering이 가능한 CSR이 적합하며 , SSR은 정확한 metadata를 보장하므로 적합하다. 즉, 사용자와 interaction이 적은 경우에는 SSR이, 많은 경우에는 CSRd이 적합하다.
    
    EX )
    
    - 네이버 블로그와 같은 경우 SSR이 적합하다. 블로그의 경우 사용자와의 상호작용이 많지 않고 검색엔진에 최대한 노출 되는 것이 유리하기 때문이다.  구글, 네이버와 같은 검색엔진 크롤러가 html에 접근하여 쉽게 내용을 가져할 수 있다.
    - 아고다 같은 예약 사이트는 CSR을 사용한다. Server에서 Rendering을 하는 것은 user와의 상호작용이 많아질수록 server에 많은 부하가 걸린다. 반면, CSR은 server에 부담이 적고 SPA를 기반으로 변경된 부분만 빠르게 rendering을 하기 때문에 UX에 유리하다. 
    하지만, CSR은 html이 빈 페이지이므로 SEO에는 매우 불리하다.
    
    ** 참고사이트 **
    
    [SSR vs CSR: Which Method Works Best? - Growth Rocket](https://www.growth-rocket.com/blog/a-closer-look-at-client-side-server-side-rendering/)
    

# Static Web Sice VS Dynamic Web Site

- static
    - static site : file 은 절대 변하지 않는다. 항상 이미 만들어져 있는 file을 갖고있다.
    - content는 server가 아닌 browser에서  javascript를 통해 변한다.
    - static은 page가 절대 변하지 않는다는 것이 아니라 개발 중에 미리 구축된다.
    - Security에 취약하므로 더욱 복잡하다.
    - only a static host is needed ( ex it only needs to serve HTML , Js, CSS)
    - 
- dynamic
    - Server-side language (ex Node)
    - content가 server-side language를 통해 생성된다. (PHP or Node.js)
    - page는 동적으로 생성되고 server는 이 HTML을 return 한다.
    - Dynamic page는 각 요청마다 동적으로 built한다.
    - Host needs ro support the chosen server-side language