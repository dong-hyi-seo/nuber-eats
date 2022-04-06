import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    //localstate를 cache에 저장하는방법
    typePolicies: {
      Query : {
        fields: {
          isLoggedIn: {
            read() {
              return false;
            }
          }
        }
      }
    }
  }),
});
export default client;
