import 'dotenv/config';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';

import { AppController } from './app.controller';
import { ProductController } from './products/product.controller';

import { ProductService } from './products/services/product.service';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { Product } from './products/models/product.entity';
import { Stock } from './products/models/stock.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Product, Stock]),
    AuthModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController, ProductController],
  providers: [ProductService],
})
export class AppModule {}
