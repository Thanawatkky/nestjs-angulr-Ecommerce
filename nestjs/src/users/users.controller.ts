import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata, UseInterceptors, UploadedFile,Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/role.enum';
import { RoleInterceptor } from 'src/auth/role/role.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { number } from '@hapi/joi';
import { endWith } from 'rxjs';
import { Request } from 'supertest';
import { JwtService } from '@nestjs/jwt';

@Controller('api')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService
    ) {}

  @Post('signUp')
  @UseInterceptors( FileInterceptor("profile", { dest: "../images/profile" }))
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.create(createUserDto,file);
  }
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(RoleInterceptor)
  @Roles(Role.Admin)
  @Get('admin')
    findAllres() {
      return "this is admin";
    }
    @UseGuards(JwtAuthGuard)
    @Get('users')
    findAll(@Req() req: Request) {

      const token = req.cookies['accessToken'];
      const payload = this.jwt.decode(token);
      return this.usersService.findOne(payload.sub)
    }
  @UseGuards(JwtAuthGuard)
  @Get('user/:email')
  findOne(@Param('email') email: string) {
    return this.usersService.findUser(email);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('user/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
