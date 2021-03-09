import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

/**
 * Create graphql restaurant field = @ObjectType()
 * AND postgresql entity 동시생성 = @Entity() - 자동 DB에 마이그레이션 진행
 * 즉, graphql field, postgresql field 동시에 정의
 * 위 graphql, postgresql field 뿐만아니라 create restaurant input dtos 역할도 동시에 해줄수있다 (@InputType)
 */
@InputType({isAbstract: true}) //createRestaurant 가 다른타입으로 상속받아 추상화 적용
@ObjectType()
@Entity()
export class Restaurant {

  @Field(type => Number)
  @PrimaryGeneratedColumn()
  id: number

  @Field(type => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field(type => Boolean, { nullable: true }) //해당 값을 안보내도 true로 자동셋
  @Column({ default: true })
  @IsOptional()
  @IsBoolean()
  isVegan: boolean;

  @Field(type => String, {defaultValue: "강남"})
  @Column()
  @IsString()
  address: string;
}
