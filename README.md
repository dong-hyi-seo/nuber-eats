# Getting Started with Nuber eats frontend (React App)

dependency lib list
===
### 1. autoprefixer
- 클래스 이름에 접두사 호환성울 추가해주는 library 
- firefox, chrome, ms 등의 CSS 호환되지않는것들..

### 2. Apollo client()
- Reactive variables
  - Local-only fields
    - Graphql 서버의 스키마에 정의되지 않은 것을 말함.
    - local state 란?
      - server에는 없지만 application에는 있기를 바라는 그런 state

### 3. React Hook Form
  - 순수 html로 login 구현할때 state값 그리고 validation 다 적용해야 하는데
해당 React Hook Form을 사용하면 편리해짐.

### 4. apollo-tooling
- 링크 : https://github.com/apollographql/apollo-tooling
- 설치시 주의
  - apollo version, graphql version 잘 맞추어야하며, npm보다는 yarn으로 하길 추천
  - 해도 안되면 해당 강의 다시듣길 바란다. (#15.7)
- apollo-tooling 이란 ?
  > Graphql 서버에서 만든 쿼리와 뮤테이션을 Typescript에서 활용하려면 사용할 여러가지 변수에 타입을 다시 지정해주어야한다. apollo-tooling을 사용하면, 코드, tsx, 리액트 컴포넌트로가서 쿼리와 뮤테이션을 찾고, 자동으로 인터페이스(타입)을 만들 수 있다.
- apollo-tooling의 필요성
  > API(스키마)에 있는 모든 것을 위해 타입스크립트 타입을 만든다.(변수, 리턴타입 등) Apollo를 콘솔에서 부를 수 있게 할 수 있다. Graphql에 작성되어 있는 타입을 그대로 옮겨오면,
  > typescript로 이루어진 프론트에서 타입을 재작성 해야하는 번거로움을 줄일 수 있다.
- apollo-tooling 설치 주의사항
  - npm 으로 설치하지말고 yarn으로 설치해준다. yarn이 호환성 맞쳐줌..
  - 그리고 반드시 devDependencies에 있도록 설치 (옵션 -D)
    - `yarn -D add apollo apollo-codegen-core apollo-language-server`
- apollo-tooling 작업
  - apollo.config.js 파일을 만들어 설정 한다.
  - apollo 명령어 날려보면 /src/pages/mytypes.d.ts/ 안에 각각 schema interface가 생성된것이 보임 (판타스틱!)
    - 모든변수둘의 interface를 만들어줌!!
    - `apollo client:codegen --target=typescript --outputFlat`
    - 위와같이 실행하면은 root 디렉토리에 __generated__폴더가 생기며 하위에 각 schema interface 들이 정의된 ts파일들이 존재하게 된다.

