import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { AwsSdkModule } from 'aws-sdk-v3-nest';
import { S3Client } from '@aws-sdk/client-s3';
import { CartModule } from './cart/cart.module';
import { CartController } from './cart/cart.controller';
import { Cart } from './cart/entities/cart.entity';
import { CartService } from './cart/cart.service';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';




@Module({
  imports: [
    Repository,
    UsersModule,
     TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs',
      entities: [User,Product, Category, Cart, Order],
      synchronize: true
     
     }),
     AuthModule,
     ProductModule,
     CategoryModule,
     CartModule,
     ConfigModule.forRoot({ isGlobal: true }),
     AwsSdkModule.register({
      isGlobal: true,
        client: new S3Client({
          region: 'ap-southeast-2',
        })
      }
     ),
     CartModule,
     OrderModule,
    ],
  controllers: [AppController, ProductController],
  providers: [AppService, AuthService],
})
export class AppModule {}
