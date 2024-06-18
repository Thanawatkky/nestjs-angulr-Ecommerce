import { Controller, Request, Post, UseGuards, Get, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local/local.auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { request } from 'http';

@Controller('api')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwt: JwtService
    ){}
  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async login(@Request() req, @Res({ passthrough: true }) res) {
    const { access_token } = await this.authService.login(req.user);
      res.cookie('accessToken',access_token,{
        httpOnly: true,
      });
     
      const payload = await this.jwt.decode(access_token);
    return {status:true, msg:"logged in successful.",type: "success",role: payload.role};
  }
  @UseGuards(LocalAuthGuard)
  @Post('adminSignIn')
  async adminlogin(@Request() req, @Res({ passthrough: true }) res) {
    const { access_token } = await this.authService.login(req.user);
      res.cookie('accessToken',access_token,{
        httpOnly: true,
      });

    return {status:true, msg:"logged in successful.",type: "success"};
  }
  @Get('logout')
  logout(@Res({ passthrough: true}) res) {
    res.clearCookie('accessToken');
    res.status(200);
    return {status: true , msg: "ออกจากระบบสำเร็จ"};
  }

}