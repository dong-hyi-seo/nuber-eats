import { Args, Mutation, Resolver, Query, Subscription } from '@nestjs/graphql';
import { Order } from './entities/order.entity.';
import { OrderService } from './orders.service';
import { CreateOrderInput, CreateOrderOutput } from './dtos/created-order.dto';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { Role } from '../auth/role.decorator';
import { GetOrdersInput, GetOrdersOutput } from './dtos/get-orders.dto';
import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto';
import { EditOrderInput, EditOrderOutput } from './dtos/edit-order.dto';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

@Resolver((of) => Order)
export class OrdersResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation((returns) => CreateOrderOutput)
  @Role(['Client'])
  async createOrder(
    @AuthUser() customer: User,
    @Args('input') createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    return this.orderService.createOrder(customer, createOrderInput);
  }

  @Query((returns) => GetOrdersOutput)
  @Role(['Any'])
  async getOrders(
    @AuthUser() user: User,
    @Args('input') getOrdersInput: GetOrdersInput,
  ): Promise<GetOrdersOutput> {
    return this.orderService.getOrders(user, getOrdersInput);
  }

  @Query((returns) => GetOrderOutput)
  @Role(['Any'])
  async getOrder(
    @AuthUser() user: User,
    @Args('input') getOrderInput: GetOrderInput,
  ): Promise<GetOrderOutput> {
    return this.orderService.getOrder(user, getOrderInput);
  }

  @Mutation((returns) => EditOrderOutput)
  @Role(['Any'])
  async editOrder(
    @AuthUser() user: User,
    @Args('input') editOrderInput: EditOrderInput,
  ): Promise<EditOrderOutput> {
    return this.orderService.editOrder(user, editOrderInput);
  }

  //subscription은 websocket 설정을 해야한다. app.module.ts에 가서 groupql module에
  //installSubscriptionHandlers: true, 이와같은 설정을 줘야함.
  //또한 HTTP route를 거치지 않고 web socket route를 거친다.
  //또한 websocket은 연결을 유지하고 req, header, cookie 이런게 없다,!
  //PubSub는 publish and subscribe를 의미하며 이걸로 app 내부에서 메시지를 교환 할수 있음
  //websocket은 jwtMiddleware가 별도로 무언가를 처리하지는 않는다.. 좀 바꿔야함...
  //jwtMiddleware 역할을 auth guard에서 하면됨 !!

  @Mutation((returns) => Boolean)
  potatoReady() {
    //hotPotatos 이함수는 subscription trigger와 같아야함
    pubsub.publish('hotPotatos', {
      readyPotato: 'Your potato is ready, love you.',
    });
    return true;
  }

  @Subscription((returns) => String)
  @Role(['Any'])
  readyPotato(@AuthUser() user: User) {
    console.log('user : ', user);
    return pubsub.asyncIterator('hotPotatos');
  }
}
