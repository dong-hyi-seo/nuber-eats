import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gql, useLazyQuery } from '@apollo/client';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import {
  searchRestaurant,
  searchRestaurantVariables,
} from '../../__generated__/searchRestaurant';
const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts #restaurants query를 공통적으로 많이사용하기때문에 src 하위에 fragement로 생성해줌 (단! 사용할경우 쿼리밑에 fragment추가 !)
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;
/**
 * 해당 component에서는 lazy query (게으른 쿼리) 사용할때만 주는 쿼리를 사용한다 (apollo client)
 *
 * @constructor
 */
export const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [callQuery, { loading, data, called }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);
  useEffect(() => {
    const [_, query] = location.search.split('?term=');
    console.log(query);
    if (!query) {
      navigate('/');
    }
    callQuery({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, [navigate, location]);
  console.log(loading, data, called);
  return (
    <h1>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      Search Page
    </h1>
  );
};
