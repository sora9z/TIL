# WEB-AboutWebGarbageCollection

Category: WEB SERVER
Chapter: Web Server
강의: codestates
블로깅: No
유형: LESSON
작성일시: 2022년 2월 8일 오후 9:32

# AboutWebGarbageCollection

Garbage collector에 대한 이해가 아직 많이 부족한 상태에서 이 글 저 글 찾아보면서 개념만 정리해본 글.  다른 자료들을 찾아보고 더 정리를 해야할듯하다.

# 1. Garbage Collection은 무엇이고 어떤 방법이 있는가?

Garbage Collection이란, 프로그램 상에서 더 이상 사용하지 않는 메모리를 자동으로 정리해주는 기능이다. JAVa, C#, Javascript 등이 대표적이로 이 기능을 사용한다. 

대표적인 Gabage Collection 방법으로는 1. 트레이싱 2. 레퍼런스 카운팅 이 있다. 

1. Tracing (wiki 참고)
    
    한 객체에 flag를 두고 가비지 컬렉션 사이클마다 flag에 표시 후 삭제하는 방법이다. 객체에 in-use-flag를 두고 사이클마다 메모리 관리자가 모든 객체를 추적해서 사용 중인지 아닌지를 mark한다. 그 후 표시되지 않은 객체를 삭제(Sweep)하는 단계를 통하여 메모리를 해제한다.
    
    - ****Naïve mark-and-sweep****
        
        <p><a href="[https://commons.wikimedia.org/wiki/File:Animation_of_the_Naive_Mark_and_Sweep_Garbage_Collector_Algorithm.gif#/media/File:Animation_of_the_Naive_Mark_and_Sweep_Garbage_Collector_Algorithm.gif](https://commons.wikimedia.org/wiki/File:Animation_of_the_Naive_Mark_and_Sweep_Garbage_Collector_Algorithm.gif#/media/File:Animation_of_the_Naive_Mark_and_Sweep_Garbage_Collector_Algorithm.gif)"><img src="[https://upload.wikimedia.org/wikipedia/commons/4/4a/Animation_of_the_Naive_Mark_and_Sweep_Garbage_Collector_Algorithm.gif](https://upload.wikimedia.org/wikipedia/commons/4/4a/Animation_of_the_Naive_Mark_and_Sweep_Garbage_Collector_Algorithm.gif)" alt="Animation of the Naive Mark and Sweep Garbage Collector Algorithm.gif"></a><br>By <a href="[https://en.wikipedia.org/wiki/User:M17](https://en.wikipedia.org/wiki/User:M17)" class="extiw" title="en:User:M17">M17</a> - I drew the image myself using the paint program on my computer. The animation actually consists of eight different images all put together to form an animation. I retain the originals of the "frames".
        Previously published: No, I have not previously published this image., <a href="[http://creativecommons.org/publicdomain/zero/1.0/deed.en](http://creativecommons.org/publicdomain/zero/1.0/deed.en)" title="Creative Commons Zero, Public Domain Dedication">CC0</a>, <a href="[https://commons.wikimedia.org/w/index.php?curid=30960924](https://commons.wikimedia.org/w/index.php?curid=30960924)">Link</a></p>
        
    - ****Tri-color marking****
        
        <p><a href="[https://commons.wikimedia.org/wiki/File:Animation_of_tri-color_garbage_collection.gif#/media/File:Animation_of_tri-color_garbage_collection.gif](https://commons.wikimedia.org/wiki/File:Animation_of_tri-color_garbage_collection.gif#/media/File:Animation_of_tri-color_garbage_collection.gif)"><img src="[https://upload.wikimedia.org/wikipedia/commons/1/1d/Animation_of_tri-color_garbage_collection.gif](https://upload.wikimedia.org/wikipedia/commons/1/1d/Animation_of_tri-color_garbage_collection.gif)" alt="Animation of tri-color garbage collection.gif"></a><br>By <a href="[//commons.wikimedia.org/w/index.php?title=User:Squbidu&amp;action=edit&amp;redlink=1](notion://commons.wikimedia.org/w/index.php?title=User:Squbidu&amp;action=edit&amp;redlink=1)" class="new" title="User:Squbidu (page does not exist)">Squbidu</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="[https://creativecommons.org/licenses/by-sa/4.0](https://creativecommons.org/licenses/by-sa/4.0)" title="Creative Commons Attribution-Share Alike 4.0">CC BY-SA 4.0</a>, <a href="[https://commons.wikimedia.org/w/index.php?curid=47792760](https://commons.wikimedia.org/w/index.php?curid=47792760)">Link</a></p>
        

1. Reference Counting
    
    한 객체를 참조하는 변수의 수를 추적하는 방법이다.  객체를 참조하는 변수의 값이 바뀌거나 변수의 스코프를 벗어나면 reference count는 줄어든다. reference count가 0이되면(그 객체에 대한 레퍼런스가 없다는 말) 그 객체와 관련한 메모리는 비울 수 있다. 
    

# 2. Cheom Browser, Node.js의 V8 엔진의 Garbage Collection

[공부한 자료](https://developer.chrome.com/docs/devtools/memory-problems/memory-101/) 

[잘 정리되어있는 Slide](http://slides.com/gruizdevilla/memory#/5/11)

[Shallow and retained sizes](https://www.yourkit.com/docs/java/help/sizes.jsp)

### 1. Shallow size & Retained size

- Shallow size
    - 객체 자체가 보유한 메모리이다.(참조되는 객체는 포함하지 않음)
    - 배열이 아닌 객체의 shallow size는 field의 수와 이 field의 type에 의존적이다.
    - 배열의 shallow size는 배열의 길이와 element의 타입에 따라 다르다.
    - 일반적으로 Array와 String의 Shallow size는 크다.
- Retained size
    - 종속된 객체와 함께 객체가 삭제될 때 해제되는 메모리의 크기이며, GC의 root로부터 도달할 수 없는 객체를 의미한다.
        - root는 Browser에서 window일 수도 있고 Node.js에서는 Global object일 수 있다.
    - Rertainig path른 GC로부터 특정 Object 까지의 경로이다.
    
    ![https://wd.imgix.net/image/admin/j931F7akeLF5NYMv5QYT.png?auto=format&w=500](https://wd.imgix.net/image/admin/j931F7akeLF5NYMv5QYT.png?auto=format&w=500)
    

### 2. Objects retainig tree

Heap은 객제들이 상호연결되어있는 network이다. 이 구조는 memory graph라고도 부르며 위의 그림과 같이 표현할 수 있다. Graph는 node와 edge로 구성되어있다.

- nodes (or objects) : 생성자 함수의 이름으로 labeling된다.
- Edges : 속성의 이름으로 labeling 된다.

### 3. Dominators

[읽어볼 페이지](http://kohlerm.blogspot.com/2009/02/memory-leaks-are-easy-to-find.html)

Dominator Objects는 Tree구조로 구성된다. 

아래의 그림에서 #7은 #10의 dominator이다. 만약 #7 노드가 메모리에서 삭제된다면 더 이상 #10에 접근할 수 있는 경로가 사라지게 되고 #10은 GC에 의해 수거된다.

![https://wd.imgix.net/image/admin/zh4nucauCn5WkDElv9MZ.gif?auto=format&w=845](https://wd.imgix.net/image/admin/zh4nucauCn5WkDElv9MZ.gif?auto=format&w=845)

### 4. V8 specifics

- Javascript Object representation
    - 원시타입 (primative types)인 Numbers, Boolean, String은 다른 값을 참조할 수 없기 때문에 항상 leaf node 또는 terminating node이다.
        - Number는 1. small integers(SMIs) 인 31비트 정수 값 2. heap numbers라 불리는 heap object로 저장된다.
        - heap number는 SMI 형식에 맞지 않는 double  또는 값을 속성 설정과 함께 boxing 해야하는 경우의 값을 저장할 때 사용된다.
        - String은 1. VM heap 또는 외부적으로 renderer’s memory에 저장될 수 있다.
        - Wrapper 객체는 VM heap에 복사되지 않고 Web으로부터 받은 script 또는 content가 저장되는 외부 저장소에 access하기 위해 생성된다.
    - 새로운 JS objects를 위한 메모리는 VM heap 또는 전용 JS heap에 할당된다.  이런 객체들은 V8 engine의 Garbage collector에 의해 관리가 된다.
    - Native Object
        - JS heap에 없는 모든 것들을 Native Object라고 한다.(String(), Number(), Error()등의 내장객체 )
        - V8 Garbage collector를 통해 관리되지 않는다.
        - JS wapper object를 사용하여 Javascript로만 접근이 가능하다
    - Cons string
        - Cons string은 저장 후 결합된 문자열 쌍으로 구성된 객체이다. concatenation의 결과이다.
    - Array
        - numeric key를 갖고있는 Object이다.
        - V8 VM 에서 대용량 데이터를 저장하기 위해 사용된다.
    
    음... 솔직히 이정도의 설명으로는 V8에서의 Garbage Collector에 대해서 이해하기 힘들 것 같다. 조금 더 자료를 찾아보고 공부한 후에 설명을 보충하도록 하자.