import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { RoleInterceptor } from 'src/auth/role/role.interceptor';
import { AuthService } from 'src/auth/auth.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    Repository,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService]
})
export class UsersModule {
  findOne(id: number) {
    throw new Error('Method not implemented.');
  }
}
