import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async create(data: any) {
    return this.prisma.product.create({
      data: {
        name: data.name,
        price: Number(data.price),
        description: data.description,
        categoryId: Number(data.categoryId),
      },
    });
  }

  async findAll(search?: string) {
    const where = search
      ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
        ],
      }
      : {};

    return this.prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { id: 'desc' },
    });
  }

  async getCategories() {
    return this.prisma.category.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: any) {
    return this.prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        price: Number(data.price),
        description: data.description,
        categoryId: Number(data.categoryId),
      },
    });
  }

  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
