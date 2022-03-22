import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity, Column, OneToMany } from 'typeorm';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Restaurant } from './restaurant.entity';

/**
 * Create graphql Category field = @ObjectType()
 * AND postgresql entities 동시생성 = @Entity() - 자동 DB에 마이그레이션 진행
 * 즉, graphql field, postgresql field 동시에 정의
 * 위 graphql, postgresql field 뿐만아니라 create restaurant input dtos 역할도 동시에 해줄수있다 (@InputType)
 */
@InputType('CategoryInputType', { isAbstract: true }) //createRestaurant 가 다른타입으로 상속받아 추상화 적용
@ObjectType()
@Entity()
export class Category extends CoreEntity {
  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  coverImg: string;

  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  slug: string;

  //카테고리는 많은 레스토랑을 가진다 (카테고리를 지울때 mapping된 레스토랑의 category를 빈값으로 셋팅해줘야함)
  @Field((type) => [Restaurant], { nullable: true })
  @OneToMany((type) => Restaurant, (restaurant) => restaurant.category)
  restaurants: Restaurant[];
}
