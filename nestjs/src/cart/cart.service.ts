import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>
  ){}
  async create(createCartDto: CreateCartDto, user_id: number) {
    if(!createCartDto) {
      throw new Error("Product Id haven't active");
      
    }
    const data = await this.cartRepository.findOne({where: {
      ca_product: createCartDto.pro_id, 
      ca_order: null
    }});
    if(data === undefined || !data) {
      if(await this.cartRepository.save({
        ca_user: user_id,
        ca_product: createCartDto.pro_id,
        ca_qty: 1,
      
      })) {
        return { status: true, msg: "เพิ่มสินค้าเข้าตะกร้าสำเร็จ", type: "success"};
      }
      if(data !== undefined){
        return { status: false, msg: "เพิ่มสินค้าเข้าตะกร้าไม่สำเร็จ", type: "error"};
      }
    }else{
      return { status: false, msg: "มีสินค้าอยู่ในตะกร้าของคุณแล้ว โปรดตรวจสอบตะกร้าของคุณ", type: "error"};
    }
   
  }

  findAll(user_id: number) {
    return this.cartRepository.createQueryBuilder('cart').leftJoinAndSelect('cart.ca_product', 'product').where('cart.ca_user=:user_id',{user_id}).andWhere('cart.ca_order IS NULL').getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async update(updateCartDto: UpdateCartDto) {
    const cart = await this.cartRepository.findOne({where: {id: updateCartDto.id}});
    const update = await this.cartRepository.update(updateCartDto.id, {
      ca_qty: cart.ca_qty - 1
    });
    if(update) {
      return {status: true};
    } 
    if(!update) {
      return {status: false};
    }
  }
  async addQty(updateCartDto: UpdateCartDto) {
    const cart = await this.cartRepository.findOne({where: {id: updateCartDto.id}});
    const update = await this.cartRepository.update(updateCartDto.id, {
      ca_qty: cart.ca_qty + 1
    });
    if(update) {
      return {status: true};
    } 
    if(!update) {
      return {status: false};
    }
  }

  remove(id: number) {
    const del = this.cartRepository.delete(id);
    if(del) {
      return {status: true};
    }
    if(!del) {
      throw new BadRequestException(`Don't remove where cart ${id}`);
    }
  }
}


