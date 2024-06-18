import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { Role } from "./role.enum";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(
    private jwt: JwtService,
    private authService: AuthService,
    private userService: UsersService
    ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies['accessToken'];
    const payload = this.jwt.decode(token);
    const user = await this.userService.findOne(payload.sub);
    if (user.user_role === Role.Admin) {
      // ให้ผู้ใช้งานทำงานต่อไป
      return next.handle();
    } else {
      // ไม่อนุญาตให้ผู้ใช้งานทำงาน
      throw new UnauthorizedException('Access denied');
    }
  }
}
