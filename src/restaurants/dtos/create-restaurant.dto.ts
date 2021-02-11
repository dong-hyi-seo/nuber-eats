import { ArgsType, Field, InputType, OmitType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';

/**
 * Restaurant entity에서 id를 제외하고 상속받는다
 */
@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, ["id"]) {}
