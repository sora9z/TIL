# Design-Pattern-MVC-Intro

Category: Computer Science
Chapter: Database
강의: Self Study
블로깅: No
유형: Refer
작성일시: 2022년 1월 1일 오후 2:03

## Design-Pattern-MVC-Intro

Before You Learn

- Server & Node
    - routing의 개념과 구현
    - Express 활용
- Database
    - schema 설계 방법
    - table간 relation 개념

Achievement Goal

- MVC pattern
    - MVC 디자인 패턴과 같이, 코드를 다른 부분으로 나누어 작성하는 방법에 대해 이해한다
    - Model, View, Controller 각각의 역할에 대해 이해한다
- Cmarket Database
    - SQL을 Node.js에서 쿼리한다
    - Client의 HTTP 요청에 따라 CRUD API를 구현한다 (Create, Read, Update, Delete)
- ORM의 장점을 이해한다
- Sequelize ORM과 관련 CLI 툴을 공식문서를 보고 사용한다
    - Sequelize를 이용하여 모델을 작성한다.
    - Sequelize를 이용하여 마이그레이션을 할 수 있다.
- MVC pattern의 한계를 이해한다.

### MVC Design pattern 이란?

[Model-View-Controller(MVC) architecture for Node applications - GeeksforGeeks](https://www.geeksforgeeks.org/model-view-controllermvc-architecture-for-node-applications/)

MVC(Model-View-Controller) 의 약자로 UI와 비지니스 로직, Model을 분리하여 개발하는 소프트웨어 공학의 방법론이다.   MVC는 매우 큰 appllication을 각각의 특정 기능을 담당하는 section으로 나누는 방식이다. 이 방식을 사용함으로써 Application을 안전한 안전한 방식으로 논리적인 설계가 가능하다.

![https://www.duplicatetransaction.com/wp-content/uploads/2020/06/model-view-controller-mvc-pattern.png](https://www.duplicatetransaction.com/wp-content/uploads/2020/06/model-view-controller-mvc-pattern.png)

1. Model : DATA와 연결이 되어있다. DATA를 갖고있거나, DB에 연결이 되어있으며 data의 구조, format, 데이터가 저장되는 제약조건을 나타낸다. Application의 DB 부분이라고 할 수 있다.  그 데이터를 Controller와 같이 상호작용을 한다. Controller에 데이터를 요청하거나 데이터를 반환한다.
2. View : Visual Representation of a model  사용자가 보는 화면을 보여주게 하는 역할 (wheb brower의 경우 HTML OR CSS로 이루어진 것 등이 있다) Controller와 만 상호작용을 한다 사용자의 action등을 Controller로 전달하고, Controller로 부터 사용자가 원하는 format으로 데이터를 표시하는 역할을 한다.
3. Controller : VIEW에서 일어나는 Action & Event (Request)를 받고 적절한 가공을 거치고 Model로 전달한다. Controller는 요청된 Data의 response를 Controller에게 전달해주고, 이 가공된 Data를 View에게 전달하여 화면에 출력하도록 한다.

정리를 해보면 아래와 같다.

- Model 은 Data part
- View는 User Interpafe Part
- Controller는 request-response part

Web Application을 예로 들어보자.

USER ⇒ Browser ⇒ Router ⇒ Controller ⇒Model ⇒ DB ⇒ Controller ⇒ VIEWE

OR USER ⇒ Browser ⇒ Router ⇒ Controller ⇒ VIEWEV

Browser에서 User의 action이 발생하면 Router 쪽으로 특정 End point들을 Routing(분기)를 하고 각 Router는 End point에 맞는 Controller 함수들을 호출한다. Controller는 Viewe로 바로 보내줄 수도 있고, 어떤 Data의 요청이 있다면 Model을 거쳐 데이터를 받고 다시 VIEW로 보내줄 수도 있다.

아래의 간단한 PSEUDO COD로 예를 들어보자

```jsx
end_point = http://users/profile/1  // get request 

// routers
	users/profile/:id=Users.getProfile(id) // Users라는 controller의 getprofile 함수를 호출

// contrillers
	class Users{
			function getProfile(id){
				profile= thie.UserModel.getProfile(id)
				// UserModel에 있는 getprofile을 호출하고 

				renderView(`users/profile`,profiles)
				// View에 render 해준다
	}

// models
	class UserModel{
		// 직접 db에 접근한다. db에 쿼리를 전달하여 getProfile로 받은 id를 
			// query 문에 추가하고 받은 응답을 return 한다.
			function getProfile(id){
				data=this.db.get(`SELECT * FROM users WHERE id = id`)
				return data;
			}

// views
	//users
		//profile
		<h1>{{profile.name}}</h1>
		<ul>
				<li>Email : {{profile.email}}</li>
				<li>Phone : {{profile.phone}}</li>
		</ul>
	
	
```