import { Module } from '@nestjs/common';
import { RestaurantsResolver } from './restaurants.resolve';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';
import { CategoryRepository } from './repositories/CategoryRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, CategoryRepository])],
  providers: [RestaurantsResolver, RestaurantService],
})
export class RestaurantsModule {}
