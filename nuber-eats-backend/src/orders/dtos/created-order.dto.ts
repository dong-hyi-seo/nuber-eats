import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { Order } from '../entities/order.entity.';
import { CoreOutput } from '../../common/dtos/output.dto';
import { DishOption } from '../../restaurants/entities/dish.entity';
import { OrderItemOption } from '../entities/order-item.entity';

@InputType()
class CreatedOrderItemInput {
  @Field((type) => Int)
  dishId: number;

  @Field((type) => [OrderItemOption], { nullable: true })
  options?: OrderItemOption[];
}

//Pick 은 해당 입력 유형해서 속성 집합을 선택하여 새로운 유형(클래스)를 생성한다.
@InputType()
export class CreateOrderInput {
  @Field((type) => Int)
  restaurantId: number;

  @Field((type) => [CreatedOrderItemInput])
  items: CreatedOrderItemInput[];
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {}
