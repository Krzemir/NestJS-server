import { Controller, Get, Put, Param, ParseUUIDPipe, NotFoundException, Delete, Post, Body } from '@nestjs/common';
import { CreateOrderDTO } from 'src/products/dtos/create-order.dto';
import { UpdateOrderDTO } from 'src/products/dtos/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe) id: string) {
    if (!this.ordersService.getById(id))
      throw new NotFoundException('Order not found');
    return this.ordersService.getById(id);
  }

  @Delete('/:id')
  public removeById(@Param('id', new ParseUUIDPipe()) id: string
  ) {
    if (!this.ordersService.getById(id))
      throw new NotFoundException('Order not found');
    this.ordersService.removeById(id);
    return { success: true };
  }

  @Post('/')
  create(@Body() orderData: CreateOrderDTO) {
    return this.ordersService.create(orderData);
  }

  @Put('/:id')
  public updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO
  ) {
    if (!this.ordersService.getById(id))
      throw new NotFoundException('Order not found');
    this.ordersService.updateById(id, orderData);
    return { success: true };
  }
  
}
