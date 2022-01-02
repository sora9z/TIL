# [JS/Node]  Regular Expressions

Category: JavaScript
Visibility: Public
강의: Self Study
블로깅: Yes
유형: Self Study
작성일시: 2021년 9월 10일 오후 10:33
참고자료: https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions

알고리즘 문제를 풀면서 정규식을 사용하면 코드를 더 간결하고, 불필요한 반복문 또는 조건문을 줄일 수 있다는 것을 알게 되었다.  20줄이 넘는 코드를 단 10줄도 안되는 코드로 작성된 것을 보고 충격을 받은 이래로 정규식에 대해 조금 더 알고있으면 좋을 것 같다는 생각을 했다. MDN을 읽어보고 정규 표현식의 사용법을 간단하게 소개한 후  기호의 사용화 메서드의 사용 위주로 포스팅을 진행하겠다.

> 정규표현식 엔진이 언어 별로 달라 일부 표현이나 문법이 다르다고 한다. 이 포스팅은 JavaScript를 기준으로 작성되었다.
> 

## 1. 정규식에 대하여

정규표현식 (Regular Expression, 이하 정규식) 이란 **문자열에 포함된 특정 문자열을 조작하기 위해 사용하는 패턴이다.**  정규식을 사용하는 이유는 아래와 같이 예를 들 수 있다. 

- 수많은 데이터에서 사용자가 입력한 ID 또는 정보가 올바르게 입력 되었는지 검증하고 싶을 때
- 특정 조건에 따라 문자열을 제거하거나 문자열을 filtering 하고 싶을 때
- 문자열에서 특정 문자만을 치환하고 싶을 때
- 복잡한 과정을 통해 문자열을 조작하는 부분을 정규식을 사용하여 단순하게 표현하고 싶을 때

등등의 다양한 경우가 있겠다.  위의 경우들은 모두 문자열의 **검색**과 **조작**을 통해 정보를 더욱 효율적이고 간단하게  처리한다.  즉, 정규식을 통해 우리는 어려운 문제를 간단하게 해결할 수 있고 시간과 노력을 아낄 수 있다.

## 2. 정규식 패턴 활용하기

정규식은 리터럴을 사용하는 방법과 RegExp 객체의 생성자를 호출하는 두 가지 방법으로 만들 수 있다. 

[(1) 정규표현식을 표현하는 두 가지 방법](https://www.notion.so/515477c5f20c4ff0b6465680f5806c7e)

### (2) 정규식의 사용

정규식 패턴은 /abc/ 와 같이 단순 문자로 구성되거나 /[^\w-_.]/ 과 같이 단순 문자 + 특수문자의 조합으로 구성될 수 있다.

### - 단순 패턴

문자를 있는 그대로 대응 시키고자 할 때 사용한다. 

아래의 코드와 같이 name 에서 Kang이 대응되지만 nema2의 K ang은 대응되지 않는다.

![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled.png)

### - 특수 문자 사용

특수문자를 사용하여 다양한 패턴의 문자열 조합을 대응시킬 수 있다.

1. **기호** : \   ^  $  *  +   ?  .

(1) " \ "

- 단순문자 앞에 "\"이  사용될 경우 , 보통의 문자가 아닌 다른 의미로 해석된다.
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%201.png)
    

- 특수문자 알에 "\"이 사용될 경우, 특수문자를 단순 문자로 해석한다.
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%202.png)
    

- RefExp("pattern") 에서 " \ "는 문자열에서도 이스케이프 문자열 이므로,  \ 자체를 이스케이프 해야한다. 
아래와 같이 쓰면 안되고
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%203.png)
    
    이래와 같이 써야한다
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%204.png)
    

(2) " ^ " 

- 입력된 문자의 첫 번째 문자와 대응된다. 첫 번째 문자가 해당 문자인지만 확인한다.
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%205.png)
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%206.png)
    

(3) " $ "

- ^과는 반대로 입력된 문자의 끝 부분과 대응된다. 마지막 문자가 해당 문자인지 확인한다.
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%207.png)
    

(4) " * "

- 앞의 표현식이 0회 이상 연속으로 반봅되는 부분과 대응된다.
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%208.png)
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%209.png)
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2010.png)
    

(5) " + "

- 앞의 표현식이 1회 이상 연속으로 반복되는 부분과 대응되다. 위의 *은 0개 이상인데 + 는 개 이상이여야 한다
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2011.png)
    

 

(6) " ? "

이 문자는 잘 사용하면 조건문을  대체할 수 도 있을 것 같다.

- 이 문자는 앞의 표현식이 0 또는 1회 등장하는 부분과 대응된다.
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2012.png)
    

(7) " . "

- 개행 문자 (줄바꿈 문자)를 제외한 모든 단일 문자와 대응된다.
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2013.png)
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2014.png)
    

1. **괄호**를 사용한 표현들 ( )  (?:x)   x(?=y)   x(?!y)   x|y 

(1)  (x)

- 괄호는 포획괄호 (capturing parentheses) 라고 불린다.
- ()의 내용과 대응된다.
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2015.png)
    
    - ()안의 내용을 기억될 수 있고, 정규표현식 내에서 사용할 경우 \숫자  의 형태로 사용한다.
        
        ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2016.png)
        
    
    - 저장된 그룹에 인덱스로 접근할 수 있다
        
        ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2017.png)
        
        ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2018.png)
        
    
    - replace 와 같은 메소드 같은 곳에서는 $숫자 의 형태로 쓴다.
        
        ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2019.png)
        

(2) (?:x)

- x에 대응 되지만 저장되지 않는다.
- 비포획 괄호(non-capturing parentheses)라고 불린다.
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2020.png)
    

(3) x(?=y)

- 앞에 ()안의 문자가 있는  앞 문자에 대응된다.
- (?=y) 에 해당되는 y는 대응 문자에 포함되지 않는다. 앞의 문자만 대응이 된다.
- lookahead 라고 불린다.
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2021.png)
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2022.png)
    

(4) x(?!y)

- 위와는 반대로 x뒤에 y가 없는 x에만 일치한다.
- nefated lookahead 라고 불린다.
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2023.png)
    

(5) x|y

- x 또는 y에 대응된다.
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2024.png)
    

1. 중**괄호,대괄호**를 사용한 표현들 : {n}  {n,m}  [xyz]  [^xyz]  [\b]

(1) 중괄호 : 여러 문자

 {n} 앞의 문자 n번에 대응한다

 {n,m} 앞의 문자 최소 n에서 최대 m번 대응한다.

 {n,} 앞의 문자 최소 n에서 무한대 번 대응 한다.

![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2025.png)

(2) 대괄호   : 문자셋(Chracter set) [ ] , [^ ] , [/b]

- [ ] 안데 들어가 있는 값을 대응한다.
- 특수문자는 문자셋 내부에서는 특수문자가 아니기 때문에 이스케이프 시키지 않아도 된다.
- "-"는 범위를 나타낸다
- [^]은 부정 문자셋 (negated chracter)이다. 괄호 내부의 어떠한 문자와 대응 되지 않는 문자들과 대응된다.
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2026.png)
    

- [/b]는 백스페이스와 매칭된다. 백스체이스 문자에 일치 시키려면 대괄호를 이용해야 한다.

1. 백슬레쉬 " \ " 를 사용한 표현들 :  \b  \B  \cX  \d  \D  \f  \n  \r  \s  \S  \t  \v  \w  \w  \0  \xhh  \uhhhh

(1) 단어 경계 :  단어 문자가 앞이나 뒤에 등장하지 않는 위치에 대응된다. (단어의 경계는 대응 결과에 포함되지 않는다) 

- \b : 단어 문자가 아닌 값에 대응된다.
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2027.png)
    

- \B  : 단어 문자인 값에 대응된다 . [a-zA-Zo-9] 와 같다
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2028.png)
    

(2) cX 문자열 내부의 제어문자에 대응된다. X는 A~Z 까지의 문자 중 하나이다.

     /\cM/ 은 문자열에서 control-M (U+000D)에 대응된다.

(3) 숫자 일치  

- \d : 숫자문자인 [0-9]에 대응된다
- \D : 숫자 문자가 아닌 [^0-9]에 대응된다.

(4) \f \n \r

- \f 폼피드 ((U+000C) 문자에 대응된다
- \n 줄바꿈 (U+000A)
- \r 캐리지 리턴(U+000D) 문자에 대응된다.
참고로 캐리지 리턴이란 : 커서의 위치를 앞으로 이동시키는 것

(5) 문자 일치 

- \s : 공백 , 탭, 개형 문자에 대응된다.
- \S : 공백 문자가 아닌 문자에 대응된다
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2029.png)
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2030.png)
    

- \w : 숫자, 소대문자, 밑줄을 포함한 [A-Za-z0-9]에 대응된다.
- \W : 숫자 , 소대문자, 밑줄이 아닌 문자에 대응 된다 [^A-Za-z0-9]
    
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2031.png)
    

(6) 널 문자에 대응

- \0 널((U+0000) 문자에 대응한다.
- 다른 숫자를 뒤에 쓰면 8신 이스케이프 시퀀스 이다.

(7) 16진수와 대응하는 표현식

- \xhh : 모드아 hh(두 16진수)인 문자에 대응된다
- \uhhhh 코드아 hhhh(네개의 16진수)인 문자에 일치한다.

(8) 사용자 입력을 정규식 내부에서 문자 그대로 취흡해야 하는 경우 치환하여 사용한다.

```jsx
function escapeRegExp(string){
return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") 
}
// $&는 일치한 전체 문자열을 의미한다.
```

![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2032.png)

## 3. 메서드와 함께 사용

정규식은 RegExp , test, exec, String, match, replace, split 메소드와 함께 쓰인다.

**(1) 문자열 내의 대응 되는 패턴 확인 : test  , search**

- test
    - 대응되는 문자열이 있는지 검사
    - true or false 반환
- search
    - 대응되는 문자열이 있는지 검사하는 **String** 메서드
    - 대응되는 부분의 인덱스를 반환
    - 문자열을 찾이 못하면 -1 반환
        
        ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2033.png)
        

**(2) 단순 확인 이상의 정보를 확인하고 싶은 경우 :   exec , metch** - 실행이 느리다

- exec
    - 대응되는 문자열을 찾는 메소드
    - 정보를 갖고있는 배열을 반환
    - 문자열을 찾지 못하면 null 반환
    
- metch
    - 대응되는 문자열을 찾는 **String** 메소드
    - 정보를 갖고있는 배열을 반환
    - 문자열을 찾지 못하면 null 반환
        
        ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2034.png)
        

(5) replace

- 대응되는 문자열을 찾아 다른 문자열로 치완하는 **String** 메서드

![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2032.png)

(6) split

- 정규식 혹은 문자열을 나누어 배열로 반환하는 **String** 메서드
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2035.png)
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2036.png)
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2037.png)
    
    $ 표시는 맨 뒤의 문자열을 가리키므로 맨 뒤의 공백을 의미
    
    ![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2038.png)
    

## 4. 정규식 플래그

- 정규식은 6개의 플래그를 설정해줄 수 있다.
- 플래그는 정규식을 정의할 때 설정해야한다. 이후에 추가 또는 삭제가 불가능하다.

```jsx
// flag를 사용하여 정규식을 만들 수 있다.

let re=/pattern/flags

let re= new RegExp("pattern","flags");
```

[정규식 flags](https://www.notion.so/7c6c49465adb4549b8e229ab2f5e9af4)

(1) g 플래그를 이용한  전역 검색

- 매치이되는 모든 문자열을 가져온다.
- g를 사용하지 않는다면 처음으로 매칭되는 값만 가져온다.

![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2039.png)

(2) i 플래그를 이용하여 대소문자 구별없이 검색

![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2040.png)

(3) m 플래그를 이용하여 다중 시작/끝 문자 검색

![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2041.png)

줄바꿈이 2개인 경우

![Untitled](%5BJS%20Node%5D%20Regular%20Expressions%205fd95e80e64b436796ffe81b395f087e/Untitled%2042.png)

(4) y 플래그를 이용하여 검색 위치 조정

문자 내 특정 위치에서 검색을 진행하는 sricky 모드를 활성화 시킨다고 한다.

나중에 더 공부해보자

[Sticky flag "y", searching at position](https://ko.javascript.info/regexp-sticky)

## 5. 예제 문제

프로그래머스 L1의 문제이다. 적절히 정규표현식을 사용하여 풀었지만, 정체를 정규식으로 풀 수 있을 것 같다. 

다음 포스팅에서 이어서 해보자.

```jsx
// 1단계 new_id의 모든 대문자를 대응되는 소문자로 치환합니다.
// 2단계 new_id에서 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.)를 제외한 모든 문자를 제거합니다.
// 3단계 new_id에서 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환합니다.
// 4단계 new_id에서 마침표(.)가 처음이나 끝에 위치한다면 제거합니다.
// 5단계 new_id가 빈 문자열이라면, new_id에 "a"를 대입합니다.
// 6단계 new_id의 길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다.
// 만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거합니다.
// 7단계 new_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙입니다.
```