import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantService } from './restaurants.service';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';

/**
 * Resolver : Graphql 결과 정의
 * Resolver => postgresql repository
 */
@Resolver(of => Restaurant)
export class RestaurantsResolver {
  constructor( private readonly restaurantService: RestaurantService ) {
  }

  /**
   * 레스토랑 정보 모두 가져오기
   */
  @Query(returns => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }

  /**
   *
   * @param createRestaurantDto
   * 레스토랑 생성
   */
  @Mutation(returns => Boolean)
  async createRestaurant(
    @Args('input')
      createRestaurantDto: CreateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(createRestaurantDto)
      return true;
    } catch(e){
      console.log(e)
      return false;
    }
  }

  @Mutation(returns => Boolean)
  async updateRestaurant( @Args('input') updateRestaurantDto: UpdateRestaurantDto ): Promise<boolean> {
    try {
      await this.restaurantService.updateRestaurant(updateRestaurantDto);
      return true;
    } catch(e){
      console.log(e);
      return false;
    }
  }
}
