import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, Unique } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { UsersModule } from './users.module';
import { take } from 'rxjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private useRepository: Repository<User>
    ) {}
  async create(userDto: CreateUserDto, file: Express.Multer.File) {
   try {
    if(userDto.password !== userDto.confirmPassword) {
      return {"stutus":false, "msg": "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน","type": "error"}
    }
    if(!userDto || !userDto.password || !userDto.email || !userDto.firstname || !userDto.lastname) {
      return {"status":false, "msg": "กรุณากรอกข้อมูลให้ครบถ้วน", "type": "error"};
    }
    const isHaveUser = await this.useRepository.findOneBy({email: userDto.email});
    if(isHaveUser) {
      return {"status":false, "msg": "มีอีเมลนี้อยู่ในระบบแล้ว ลองอีกครั้ง","type":"error"}
    }
    const files = {
      fieldname: "profile",
      originalname: "profile.jpg",
      encoding: "7bit",
      mimetype: "image/jpeg",
      buffer: Buffer.from(userDto.profile),
    };
    
    const passhash = await bcrypt.hash(userDto.password, 10);
    if(await this.useRepository.save({
      firstname: userDto.firstname,
      lastname: userDto.lastname,
      email: userDto.email,
      password: passhash,
      profile: files.buffer
    })) {
      return {"status":true, "msg": "สมัครสมาชิกสำเร็จ", "type":"success"}
    }
   } catch (error) {
      throw new ConflictException({
        message: "สมัครสมาชิกไม่สำเร็จ"
      });
   }
 }

  findAll() {
    return this.findAll();
  }

  findOne(id: number) {
    return this.useRepository.findOne({where: {id: id}});
  }
  async findUser(email: string): Promise<User | undefined> {
    const user = await this.useRepository.findOne({where: {email: email}});
    return user;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
