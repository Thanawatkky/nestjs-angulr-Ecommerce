import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private cateRepo: Repository<Category>
  ) {}
 async create(createCategoryDto: CreateCategoryDto) {
    if(!createCategoryDto.c_name) {
      return {status: false, msg: "โปรดกรอกข้อมูลให้ครบถ้วน", type: "warning"}
    }
    const haved = await this.cateRepo.findOneBy({c_name: createCategoryDto.c_name})
    if(haved) {
      return {status: false, msg: "มีหมวดหมู่สินค้านี้อยู่แล้ว", type: "warning"}
    }
    const saveToDatabase = await this.cateRepo.save({
      c_name: createCategoryDto.c_name,
      description: createCategoryDto.description
    });
    if(saveToDatabase) {

      return {status: true, msg: "เพิ่มหมวดหมู่สินค้าสำเร็จ", type: "success"};
    }
    if(!saveToDatabase) {
      return {status: false, msg: "เพิ่มหมวดหมู่สินค้าไม่สำเร็จ", type: "error"};

    }
  }

  findAll() {
    return this.cateRepo.find();
  }

  findOne(id: number) {
    return this.cateRepo.findOneBy({id});
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const update = await this.cateRepo.update(id, {
      c_name: updateCategoryDto.c_name,
      description: updateCategoryDto.description
    });
    if(update) {
      return {status: true, msg: "แก้ไขข้อมูลสินค้าสำเร็จ", type: "success"}
    }
    if(!update) {
      return {status: false, msg: "แก้ไขข้อมูลสินค้าไม่สำเร็จ", type: "error"}
    }
  }

 async remove(id: number) {
    const Isdel = await this.cateRepo.delete(id);
    if(Isdel) {
      return {status: true, msg: "ลบหมวดหมู่อาหารสำเร็จ", type: "success"}
    }
    if(!Isdel) {
      return {status: false, msg: "ลบหมวดหมู่อาหารไม่สำเร็จ", type: "error"}

    }
  }
}
