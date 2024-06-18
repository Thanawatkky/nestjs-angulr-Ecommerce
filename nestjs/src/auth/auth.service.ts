import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { exit } from 'process';
import { Role } from './role/role.enum';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
    ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUser(email);
    if (user && (await bcrypt.compare(pass,user.password))) {
      const { password, ...result } = user;
      return result;
    }
    if(!user){
      throw new UnauthorizedException({
        msg: "Email is wrong!"

      });
    }
    if(! await bcrypt.compare(pass,user.password)) {
      throw new UnauthorizedException({
        msg: "Password is wrong!"

      });
    }
    return null;
  }
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.user_role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}