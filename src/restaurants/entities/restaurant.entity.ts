import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
  OneToMany,
} from 'typeorm';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Category } from './category.entity';
import { User } from '../../users/entities/user.entity';
import { RestaurantService } from '../restaurants.service';
import { Dish } from './dish.entity';
import { Order } from '../../orders/entities/order.entity.';

/**
 * Create graphql restaurant field = @ObjectType()
 * AND postgresql entities 동시생성 = @Entity() - 자동 DB에 마이그레이션 진행
 * 즉, graphql field, postgresql field 동시에 정의
 * 위 graphql, postgresql field 뿐만아니라 create restaurant input dtos 역할도 동시에 해줄수있다 (@InputType)
 */
@InputType('RestaurantInputType', { isAbstract: true }) //createRestaurant 가 다른타입으로 상속받아 추상화 적용
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field((type) => String, { defaultValue: '강남' })
  @Column()
  @IsString()
  address: string;

  /**
   * 레스토랑을 최초생성시 카테고리가 없는 레스토랑으로 생성되게끔
   */
  @Field((type) => Category, { nullable: true })
  @ManyToOne((type) => Category, (category) => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.restaurants, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @RelationId((restaurant: Restaurant) => restaurant.owner)
  ownerId: number;

  @Field((type) => [Dish])
  @OneToMany((type) => Dish, (dish) => dish.restaurant)
  menu: Dish[];

  @Field((type) => [Order])
  @OneToMany((type) => Order, (order) => order.restaurant)
  orders: Order[];
}
