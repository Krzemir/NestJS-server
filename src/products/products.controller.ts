import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ProductsService } from './products.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {
    this.productsService = productsService
  }

  @Get('/')
  public getAny(): any {
    return this.productsService.getAll()
  }

  @Get('/:id')
  public getById(
    @Param('id', new ParseUUIDPipe()) id: string
    ) {
      if (!this.productsService.getById(id)) 
      throw new NotFoundException('Product not found');
    return this.productsService.getById(id)
  }

  @Delete('/:id')
  public removeById(@Param('id', new ParseUUIDPipe()) id: string
  ) {
    if (!this.productsService.getById(id)) 
    throw new NotFoundException('Product not found');
    this.productsService.removeById(id)
    return { success: true }
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData)
  }

  @Put('/:id')
  public updateById(
    @Param('id', new ParseUUIDPipe()) id: string, 
    @Body() productData: UpdateProductDTO
    ) {
      if (!this.productsService.getById(id)) 
        throw new NotFoundException('Product not found');
      this.productsService.updateById(id, productData);
      return { success: true }
  }    
}
