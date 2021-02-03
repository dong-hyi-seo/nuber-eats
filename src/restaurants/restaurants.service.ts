import { Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class RestaurantService {

  constructor(
    @InjectRepository(Restaurant) // decorator 사용 = (const restaurantRepository = connection.getRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}
  getAll(): Promise<Restaurant[]> {
    // find는 async method기 때문에 Promise를 추가
    return this.restaurants.find();
  }

};
