import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from '../../__generated__/restaurantsPageQuery';
import { Restaurant } from '../../components/restaurant';

/**
 * rem은 최상위 요소인 html요소에 비례하여 크기를 가지는 상대적인 길이를 말한다.
 * 즉 html 요소에 font-size를 고정값으로 지정해 두면 그 비율에 따라 크기가 계산된다.
 * rem은 IE9 ~ IE11 버전까지 지원이 된다.
 *
 * group-hover:bg-gray-100 이거는 class group 명을 가진거에 대해서 모두 hover 기능이 작동하게끔 한다.
 * 예를들어 category cover img 아래의 category name에 hover해도 hover:bg-gray-100이 작동됨
 */

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;
export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  return (
    <div>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          type="Search"
          className="input rounded-md border-0 w-3/12"
          placeholder="Search Restaurants..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl mx-auto mt-8">
          <div className="flex justify-around max-w-sm mx-auto">
            {data?.allCategories.categories?.map((category, index) => (
              <div className="flex flex-col group items-center cursor-pointer m-4">
                <div
                  key={index}
                  className="w-16 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
                  style={{
                    backgroundImage: `url(${category.coverImg})`,
                  }}
                />
                <span className="mt-1 text-sm text-center font-medium">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <div className="grid mt-10 grid-cols-3 gap-x-5 gap-y-10">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                id={restaurant.id + ''}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {page > 1 ? (
              <button
                className="focus:outline-none font-medium text-2xl"
                onClick={onPrevPageClick}>
                &larr;
              </button>
            ) : (
              <div />
            )}
            <span>
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <>
                <button
                  className="focus:outline-none font-medium text-2xl"
                  onClick={onNextPageClick}>
                  &rarr;
                </button>
              </>
            ) : (
              <div />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
