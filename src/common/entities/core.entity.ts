import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Field } from '@nestjs/graphql';

export class CoreEntity {

  @PrimaryGeneratedColumn()
  @Field(type => Number)
  id: number;

  @Field(type => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(type => Date)
  @UpdateDateColumn()
  updatedAt: Date;

}
