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
import {
  NEW_COOKED_ORDER,
  NEW_ORDER_UPDATE,
  NEW_PENDING_ORDER,
  PUB_SUB,
} from '../common/common.constants';
import { Inject } from '@nestjs/common';
import { OrderUpdatesInput } from './dtos/order-updates.dto';
import { TakeOrderInput, TakeOrderOutput } from './dtos/take-order.dto';

@Resolver((of) => Order)
export class OrdersResolver {
  constructor(
    private readonly orderService: OrderService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

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

  @Subscription((returns) => Order, {
    // filter 두번째 인자는 원래 args 인데 '_"를 쓴이유는 사용안하겠다를 나타낸다.
    filter: ({ pendingOrders: { ownerId } }, _, { user }) => {
      //이부분에서 context 값의 user 데이터를 활용하여 order가 만들어진 restaurant이 user의 restaurant 인지 확인!
      return ownerId === user.id;
    },
    resolve: ({ pendingOrders: { order } }) => order,
  })
  @Role(['Owner'])
  pendingOrders() {
    return this.pubSub.asyncIterator(NEW_PENDING_ORDER);
  }

  @Subscription((returns) => Order, {
    filter: (payload, _, context) => {
      console.log('payload : ', payload);
      return true;
    },
  })
  @Role(['Delivery'])
  cookedOrders() {
    return this.pubSub.asyncIterator(NEW_COOKED_ORDER);
  }

  @Subscription((returns) => Order, {
    filter: (
      { orderUpdates: order }: { orderUpdates: Order },
      { input }: { input: OrderUpdatesInput },
      { user }: { user: User },
    ) => {
      console.log('order = ', order);
      if (
        order.driverId !== user.id &&
        order.customerId !== user.id &&
        order.restaurant.ownerId !== user.id
      ) {
        return false;
      }
      return order.id === input.id;
    },
  })
  @Role(['Any'])
  orderUpdates(@Args('input') orderUpdatesInput: OrderUpdatesInput) {
    return this.pubSub.asyncIterator(NEW_ORDER_UPDATE);
  }

  @Mutation((returns) => TakeOrderOutput)
  @Role(['Delivery'])
  takeOrder(
    @AuthUser() driver: User,
    @Args('input') takeOrderInput: TakeOrderInput,
  ): Promise<TakeOrderOutput> {
    return this.orderService.takeOrder(driver, takeOrderInput);
  }

  //subscription은 websocket 설정을 해야한다. app.module.ts에 가서 groupql module에
  //installSubscriptionHandlers: true, 이와같은 설정을 줘야함.
  //또한 HTTP route를 거치지 않고 web socket route를 거친다.
  //또한 websocket은 연결을 유지하고 req, header, cookie 이런게 없다,!
  //PubSub는 publish and subscribe를 의미하며 이걸로 app 내부에서 메시지를 교환 할수 있음
  //websocket은 jwtMiddleware가 별도로 무언가를 처리하지는 않는다.. 좀 바꿔야함...
  //jwtMiddleware 역할을 auth guard에서 하면됨 !!
  @Mutation((returns) => Boolean)
  async potatoReady(@Args('potatoId') potatoId: number) {
    //hotPotatos 이함수는 subscription trigger와 같아야함
    await this.pubSub.publish('hotPotatos', {
      readyPotato: potatoId,
    });
    return true;
  }

  @Subscription((returns) => String, {
    filter: ({ readyPotato }, { potatoId }) => {
      //해당 filter를 통하여 받으려고 하는 값만 받을수있음!!
      //payload는 potatoReady에서보낸 message : 첫번째인자
      //variables 값은 subscription(readyPotato input 값) : 두번째인자
      //context 는 auth token 등의 값 (guard 에서 추가한것들) : 세번째인자
      return readyPotato === potatoId;
    },
    //resolve 이건 사용자가 받는 update 알림의 형태를 바꿔주는 일을 한다.
    //즉 filter를 거쳐 결과값나온걸 아래의 text 안에 값을 넣어 보여줄것임!
    resolve: ({ readyPotato }) =>
      `Your potato with the id ${readyPotato} is ready`,
  })
  @Role(['Any'])
  readyPotato(@Args('potatoId') potatoId: number) {
    return this.pubSub.asyncIterator('hotPotatos');
  }
}
