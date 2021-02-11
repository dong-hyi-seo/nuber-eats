import { Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';


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

  createRestaurant (
    createRestaurantDto: CreateRestaurantDto
  ): Promise<Restaurant> {
    const newRestaurant = this.restaurants.create(createRestaurantDto);
    return this.restaurants.save(newRestaurant);
  }

  updateRestaurant ({ id, data }: UpdateRestaurantDto) {
    this.restaurants.update(id, {...data});
  }

};
