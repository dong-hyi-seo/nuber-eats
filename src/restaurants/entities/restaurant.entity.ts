import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Create graphql restaurant field = @ObjectType()
 * AND postgresql entity 동시생성 = @Entity() - 자동 DB에 마이그레이션 진행
 * 즉, graphql field, postgresql field 동시에 정의
 */
@ObjectType()
@Entity()
export class Restaurant {

  @Field(type => Number)
  @PrimaryGeneratedColumn()
  id: number

  @Field(type => String)
  @Column()
  name: string;

  @Field(type => Boolean, {nullable: true})
  @Column()
  isVegan: boolean;

  @Field(type => String)
  @Column()
  address: string;

  @Field(type => String)
  @Column()
  ownerName: string;

  @Field(type => String)
  @Column()
  categoryName: string;


}
