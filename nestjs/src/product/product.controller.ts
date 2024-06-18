import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';
import { InjectAws } from 'aws-sdk-v3-nest';
import { Category } from 'src/category/entities/category.entity';
import { LocalAuthGuard } from 'src/auth/local/local.auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('api')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}
  @Post("AddProduct")
  @UseInterceptors(FileInterceptor("pro_img"))
  create(@Body() createProductDto: CreateProductDto ,@UploadedFile( new ParseFilePipe({
    validators: [
      new FileTypeValidator({fileType: 'image/png'}),
      
    ],
  }),) file: Express.Multer.File) {
    return this.productService.create(createProductDto, file);
  }
  @Get("Product/:page")
  findAllPagination(@Param('page') page: string) {
    return this.productService.findAllPagination(+page);
  }
  @Get("Product")
  findAll() {
    return this.productService.findAll();
  }


  @Get('productOne/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Get('productCategory/:id')
  findProductCategory(@Param('id') id: string) {
    return this.productService.findCategory(+id);
  }

  @Patch('product/:id')
  @UseInterceptors(FileInterceptor("pro_img"))
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @UploadedFile() file: Express.Multer.File) {

    return this.productService.update(+id, updateProductDto,file);
  }

  @Delete('product/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
