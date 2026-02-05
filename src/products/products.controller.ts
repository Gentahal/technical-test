import { Controller, Get, Post, Body, Render, Res, Param, Query } from '@nestjs/common';
import type { Response } from 'express';
import { PrismaService } from '../prisma.service';

@Controller('products')
export class ProductsController {
  constructor(private prisma: PrismaService) {}

  // 1. READ & SEARCH (Page List)
  @Get()
  @Render('products/index')
  async findAll(@Query('search') search: string) {
    const where = search ? {
      OR: [
        { name: { contains: search } }, // Hapus mode insensitive jika pakai SQLite
        { description: { contains: search } },
      ],
    } : {};

    const products = await this.prisma.product.findMany({
      where,
      include: { category: true }, // Join tabel
    });
    
    return { products, search };
  }

  // 2. CREATE PAGE (Form)
  @Get('create')
  @Render('products/create')
  async createPage() {
    const categories = await this.prisma.category.findMany();
    return { categories };
  }

  // 3. CREATE ACTION
  @Post()
  async create(@Body() body: any, @Res() res: Response) {
    await this.prisma.product.create({
      data: {
        name: body.name,
        price: Number(body.price),
        description: body.description,
        categoryId: Number(body.categoryId),
      },
    });
    return res.redirect('/products');
  }

  // 4. DELETE ACTION
  @Get('delete/:id') // Pakai GET biar mudah ditaruh di link href
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.prisma.product.delete({ where: { id: Number(id) } });
    return res.redirect('/products');
  }
  
  // NOTE: Buat Update Page & Action dengan pola yang sama seperti Create
}