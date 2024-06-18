import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('api')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly jwtService: JwtService
  ) {}

  @Post('order')
  create(@Body() createOrderDto: CreateOrderDto, @Req() request) {
    const cookie = request.cookies['accessToken'];
    const payload = this.jwtService.decode(cookie);
    return this.orderService.create(createOrderDto, payload.sub);
  }
  @Get('orderUser')
  findAll(@Req() req) {
    const cookie = req.cookies['accessToken'];
    const payload = this.jwtService.decode(cookie);
    return this.orderService.findAllForUser(payload.sub);
  }
@Get("countActive")
  countActive(@Req() req) {
    const cookie = req.cookies['accessToken'];
    const payload = this.jwtService.decode(cookie);
    return this.orderService.countActiveOrder(payload.sub);
  }
@Get("countComplete")
  countComplete(@Req() req){
    const cookie = req.cookies['accessToken'];
    const payload = this.jwtService.decode(cookie);
    return this.orderService.countCompleteOrder(payload.sub);
  }
@Get("countCancel")
  countCancel(@Req() req){
    const cookie = req.cookies['accessToken'];
    const payload = this.jwtService.decode(cookie);
    return this.orderService.countCancelOrder(payload.sub);
  }
  @Get('allOrder')
  findAllOrder() {
    return this.orderService.findAll();
  }

  @Patch('confirmOrder/:id')
  confirm(@Param('id') id: string) {
    return this.orderService.confirmOrder(+id);
  }
  @Patch('orderSending/:id')
  sending(@Param('id') id: string) {
    return this.orderService.sendingOrder(+id);
  }
  @Patch('orderComplete/:id')
  complete(@Param('id') id: string) {
    return this.orderService.completeOrder(+id);
  }
  @Patch('orderCancel/:id')
  cancel(@Param('id') id: string) {
    return this.orderService.cancelOrder(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
