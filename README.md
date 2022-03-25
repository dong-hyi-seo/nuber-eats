# Nuber Eats

The Backend of Nuber Eats clone


### Install Graphql for nestjs
```bash
npm i @nestjs/graphql graphql-tools graphql apollo-server-express
```
### nest js module 추가 방법
- nest g mo payments

### 인증로직순서
- subscription(websocket 적용전)
    - app.module.ts(graphqlForRoot) -> authguard -> jwtmiddleware
- subscription 적용 후
    - app.module.ts(graphqlForRoot) -> authguard
    - 상세설명
        - subscription은 websocket 설정을 해야한다. app.module.ts에 가서 groupql module에
          installSubscriptionHandlers: true, 이와같은 설정을 줘야함. 
          또한 HTTP route를 거치지 않고 web socket route를 거친다.
          또한 websocket은 연결을 유지하고 req, header, cookie 이런게 없다,!
          PubSub는 publish and subscribe를 의미하며 이걸로 app 내부에서 메시지를 교환 할수 있음
          websocket은 jwtMiddleware가 별도로 무언가를 처리하지는 않는다.. 좀 바꿔야함...
          jwtMiddleware 역할을 auth guard에서 하면됨 !
    - pubsub
        - pubsub는 위와 같이설명을 하였고, 단일서버에서는 new PubSub() 사용하면 되지만 만약 10개의 서버로
          clustering 했을경우 분리된 서버를 사용해야한다 (ex :redis) ..
        - lib : npm install graphql-redis-subscriptions
        - 위 라이브러리는 redis-client도 제공
### Type orm
- Eager relations
  - eager relation은 db에서 entity를 load할 때마다 자동으로 load되는 relationship을 말한다.
### Payments
- 결제모듈
  - Paddle 사용(https://www.paddle.com/)
    - 해당 결제 시스템은 회사를 설립을 하지않더라도 등록이 가능하며 오로지 디지털내용물만 판매 가능하다.
    - 물건같은것은안됨 only 디지털!
        

