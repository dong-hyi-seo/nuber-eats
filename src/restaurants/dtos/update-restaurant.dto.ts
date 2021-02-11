import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantDto } from './create-restaurant.dto';

/**
 * Update Restaurant DTO
 * PartialType 사용하여 CreateRestaurantDto 에서 id를 가져옴
 */
@InputType()
export class UpdateRestaurantInputType extends PartialType(CreateRestaurantDto) {}

@ArgsType()
export class UpdateRestaurantDto {

  @Field(type => Number)
  id: number;

  @Field(type => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType
}
