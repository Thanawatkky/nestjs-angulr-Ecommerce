import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { any, date, number } from '@hapi/joi';
import { extname } from 'path';
import * as sharp from 'sharp';
import { take } from 'rxjs';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { InjectAws } from 'aws-sdk-v3-nest';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectAws(S3Client) 
    private readonly s3: S3Client
  ){}
  async create(createProductDto: CreateProductDto,file: Express.Multer.File) {
    if(!createProductDto) {
      return {status: false, msg: "โปรดกรอกข้อมูลให้ครบถ้วน", type: "error"}
    }
    const haveProduct = await this.productRepo.findOneBy({pro_name: createProductDto.pro_name});
    if(haveProduct) {
      const changeQty = haveProduct.pro_qty + createProductDto.pro_qty
    const query =  await this.productRepo.update(haveProduct.id, {pro_qty: changeQty});
      if(query) {
        return {status: true, msg: "เพิ่มรายการสินค้าสำเร็จ", type: "success"}
      }
    }
    const newFileName = `${Date.now()}${extname(file.originalname)}`;
      await this.s3.send(
        new PutObjectCommand({
          Bucket: "nekogedgets",
          Key: newFileName,
          Body: file.buffer
        })
      )
    const saveToDatabase = await this.productRepo.save({
      pro_name: createProductDto.pro_name,
      pro_detail: createProductDto.pro_detail,
      pro_price: createProductDto.pro_price,
      pro_sale: createProductDto.pro_sale,
      category: parseInt(createProductDto.category),
      pro_img: newFileName,
      pro_qty: createProductDto.pro_qty
    });
    if(saveToDatabase) {
      return {status: true, msg: "เพิ่มรายการสินค้าสำเร็จ", type: "success"}
    }
    if(!saveToDatabase) {
      return {status: true, msg: "เพิ่มรายการสินค้าไม่สำเร็จ", type: "success"}

    }
  }

  async findAllPagination(page: number, limit: number = 6) {
    const [data, total] = await this.productRepo.createQueryBuilder('product').leftJoinAndSelect('product.category', 'category').skip((page - 1) * limit).take(limit).getManyAndCount();
    return { data, total}
  }
  findAll() {
    return this.productRepo.createQueryBuilder('product').leftJoinAndSelect('product.category', 'category').getMany();
  }

  findCategory(id: number) {
    return this.productRepo.createQueryBuilder('product').leftJoinAndSelect('product.category', 'category').where('product.category = :id',{ id }).getMany();
  }

  findOne(id: number): Promise<Product | null> {
    return this.productRepo.createQueryBuilder('product').leftJoinAndSelect('product.category', 'category').where('product.id = :id', { id }).getOne();
}


  async update(id: number, updateProductDto: UpdateProductDto, file: Express.Multer.File) {
    let fileOriginal: any;
    let newFileName: any;
      if(file === undefined) {
         const product = await this.productRepo.findOneBy({id});
         fileOriginal = product.pro_img
      }else {
        fileOriginal = file.originalname;
         newFileName = `${Date.now()}${extname(fileOriginal)}`;
        await this.s3.send(
          new PutObjectCommand({
            Bucket: "nekogedgets",
            Key: newFileName,
            Body: file.buffer
          })
        )
      

      }
      const update = await this.productRepo.update(id, {
        pro_name: updateProductDto.pro_name,
        pro_detail: updateProductDto.pro_detail,
        pro_price: updateProductDto.pro_price,
        pro_qty: updateProductDto.pro_qty,
        pro_sale: updateProductDto.pro_sale,
        pro_img: newFileName,
      });
      if(update) {
        return {status: true, msg: "แก้ไขข้อมูลสินค้าสำเร็จ", type: "success"};

      }
      if(!update) {
        return {status: true, msg: "แก้ไขข้อมูลสินค้าไม่สำเร็จ", type: "error"};

      }
  }

  async remove(id: number) {
    const Isdel = await this.productRepo.delete(id);
    if(Isdel) {
      return {status: true, msg: "ลบรายการสินค้าสำเร็จ", type: "success"}
    }
    if(!Isdel) {
      return {status: false, msg: "ลบรายการสินค้า่ไม่สำเร็จ", type: "error"}
    }
  }
}
