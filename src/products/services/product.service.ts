// src/services/product.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../models/product.entity';
import { Stock } from '../models/stock.entity';
import { CreateProductDto } from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create({
      title: createProductDto.title,
      description: createProductDto.description,
      price: createProductDto.price,
    });

    const savedProduct = await this.productRepository.save(product);

    const stock = this.stockRepository.create({
      product_id: savedProduct.id,
      count: createProductDto.stockCount,
    });

    await this.stockRepository.save(stock);

    return savedProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['stock'],
    });
  }

  async findOne(id: string): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['stock'],
    });
  }
}
