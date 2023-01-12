import { gql, useQuery } from '@apollo/client';

/**
 * me query(graphql)는 router, header에서 두번 부를경우
 * apollo에서 cache 기능이 있어 한번만 부름
 */
const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;
export const useMe = () => {
  return useQuery(ME_QUERY);
};
