import { Controller, Get, Post, Body, Render, Res, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import type { Response } from 'express';

@Controller('products')
export class ProductsController {
  [x: string]: any;
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  @Render('products/index')
  async findAll(@Query('search') search: string) {
    const products = await this.productsService.findAll(search);
    return { products, search };
  }

  @Get('create')
  @Render('products/create')
  async createPage() {
    const categories = await this.productsService.getCategories();
    return { categories };
  }

  @Post()
  async create(@Body() body: any, @Res() res: Response) {
    await this.productsService.create(body);
    return res.redirect('/products');
  }

  @Get('edit/:id')
  @Render('products/edit')
  async editPage(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);
    const categories = await this.productsService.getCategories();

    return { product, categories };
  }

  @Post('edit/:id')
  async update(@Param('id') id: string, @Body() body: any, @Res() res: Response) {
    await this.productsService.update(+id, body);
    return res.redirect('/products');
  }

  @Get('delete/:id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.productsService.remove(+id);
    return res.redirect('/products');
  }
}