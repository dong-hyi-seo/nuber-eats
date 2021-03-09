import { BeforeInsert, Column, Entity } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { IsEmail, IsEnum } from 'class-validator';


enum UserRole {
  Owner,
  Client,
  Delivery,
}
// graphql enum
registerEnumType(UserRole, {name:"UserRole"})

@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class User extends CoreEntity {

  @Column()
  @Field(type => String)
  @IsEmail()
  email: string;

  @Column()
  @Field(type => String)
  password: string;

  @Column( { type: 'enum', enum: UserRole })
  @Field(type => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  /**
   * DB insert 전에 수행함 (패스워드 암호화)
   */
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10)
    } catch(e) {
      Logger.error(e);
      throw new InternalServerErrorException();
    }
  }
}
