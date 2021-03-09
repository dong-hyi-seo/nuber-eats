import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dto/create-account.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>
  ) {}

  async createAccount({ email, password, role }: CreateAccountInput)
  : Promise<[boolean, string?]>{
    try {
      const exists = await this.users.findOne({ email });
      if(exists){
        return [false, 'There is a user with that email already'];
      }

      //create는 단지 entity를 create할뿐..
      await this.users.save(this.users.create({email, password, role}));

      return [true];
    } catch(e) {
      //make error
      return [false, 'Could not create account'];
    }
    //hash the password
  }
}
