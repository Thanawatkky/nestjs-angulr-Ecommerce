import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';

@Injectable()
export class OrderService {
  
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>
  ){}
  async create(createOrderDto: CreateOrderDto, userId: number) {
    if(!createOrderDto.total_price) {
      throw new BadRequestException("invalid data process");
      
    }
    const saveOrder = await this.orderRepository.save({
      cus_name: userId,
      total_price: createOrderDto.total_price
    });
    if(saveOrder) {
      const maxOrder = await this.orderRepository.createQueryBuilder('order').select('MAX(order.id)','max').getRawOne();
      if(!maxOrder) {
        throw new InternalServerErrorException("OrderMax not found.");
      }
      const updateToCart = await this.cartRepository.createQueryBuilder().update('cart').set({ca_order: maxOrder.max}).where('ca_user',{ userId }).andWhere('ca_order IS NULL').execute();
      if(!updateToCart) {
        throw new BadRequestException("Failed to update cart.");
      }
     
    return {status: true, msg: "สั่งซื้อรายการสินค้าสำเร็จ", type: "success"};

    }

    
  }
  countActiveOrder(user_id: number) {
    return this.orderRepository.createQueryBuilder('order').where('cus_name',{user_id}).andWhere('order_status IS NULL OR order_status < :status',{status: 3}).getCount();
  }
  countCompleteOrder(user_id: number) {
    return this.orderRepository.count({where: {cus_name: user_id, order_status: 3}});
  }
  countCancelOrder(user_id: number) {
    return this.orderRepository.count({where: {cus_name: user_id, order_status: 9999}});
  }
  findAllForUser(user_id: number) {
  return this.cartRepository.createQueryBuilder('cart').leftJoinAndSelect('cart.ca_order', 'order').leftJoinAndSelect('cart.ca_product','product').where('cart.ca_user',{user_id}).getMany();
  }
  confirmOrder(id:number) {
    return this.orderRepository.update(id, {order_status: 1});
  }
  cancelOrder(id: number) {
    return this.orderRepository.update(id, {order_status: 999});
  }
  sendingOrder(id: number){
    return this.orderRepository.update(id, {order_status: 2});
  }
  completeOrder(id: number) {
    return this.orderRepository.update(id, {order_status: 3});
  }
  findAll() {
    return this.cartRepository.createQueryBuilder('cart').leftJoinAndSelect('cart.ca_order','order').leftJoinAndSelect('cart.ca_product','product').leftJoinAndSelect('cart.ca_user','user').getMany();
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
