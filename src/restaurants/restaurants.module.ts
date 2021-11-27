import { Module } from '@nestjs/common';
import { CategoryResolver, RestaurantsResolver } from './restaurants.resolve';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';
import { CategoryRepository } from './repositories/CategoryRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, CategoryRepository])],
  providers: [RestaurantsResolver, CategoryResolver, RestaurantService],
})
export class RestaurantsModule {}
