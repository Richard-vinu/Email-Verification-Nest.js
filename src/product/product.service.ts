import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
// import { AbilityFactory } from './ability.factory';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    // private readonly abilityFactory: AbilityFactory,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.price = createProductDto.price;

    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const options: FindOneOptions<Product> = { where: { id } };
    return await this.productRepository.findOne(options);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const options: FindOneOptions<Product> = { where: { id } };
    const product = await this.productRepository.findOne(options);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const updatedProduct = {
      ...product,
      ...updateProductDto,
    };

    return this.productRepository.save(updatedProduct);
  }

  async remove(id: number): Promise<void> {
    const options: FindOneOptions<Product> = { where: { id } };
    const product = await this.productRepository.findOne(options);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // if (!this.ability.can('delete', product)) {
    //   throw new ForbiddenException(
    //     `You are not authorized to delete this product`,
    //   );
    // }

    await this.productRepository.remove(product);
  }
}
