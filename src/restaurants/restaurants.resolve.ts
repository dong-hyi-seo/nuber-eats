import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantService } from './restaurants.service';

/**
 * Resolver : Graphql 결과 정의
 * Resolver => postgresql repository
 */
@Resolver(of => Restaurant)
export class RestaurantsResolver {
  constructor( private readonly restaurantService: RestaurantService ) {
  }

  @Query(returns => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }
  @Mutation(returns => Boolean)
  createRestaurant(
    @Args()
      createRestaurantInput: CreateRestaurantDto,
  ): boolean {
    console.log(createRestaurantInput);
    return true;
  }
}
