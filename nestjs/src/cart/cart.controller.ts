import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
@Controller('api')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly jwtService: JwtService
  ) {}

  @Post('cart')
  create(@Body() createCartDto: CreateCartDto, @Req() request) {
    const cookie = request.cookies["accessToken"];
    const payload = this.jwtService.decode(cookie);
    return this.cartService.create(createCartDto, payload.sub); 
  }

  @Get('cart')
  findAll(@Req() req) {
    const cookie = req.cookies["accessToken"];
  const payload = this.jwtService.decode(cookie);
    return this.cartService.findAll(payload.sub);
  }

  @Get('cart/:id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch('cart')
  update(@Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(updateCartDto);
  }
  @Patch('addQty')
  addQty(@Body() updateCartDto: UpdateCartDto) {
    return this.cartService.addQty(updateCartDto);
  }
  @Delete('cart/:id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
