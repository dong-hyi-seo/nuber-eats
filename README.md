# Nuber Eats

The Backend of Nuber Eats clone


### Install Graphql for nestjs
```bash
npm i @nestjs/graphql graphql-tools graphql apollo-server-express
```

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
          jwtMiddleware 역할을 auth guard에서 하면됨 !!
        

