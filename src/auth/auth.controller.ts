import { Controller, Get, Post, Body, Render, Res } from '@nestjs/common';
import type { Response } from 'express';
import { PrismaService } from '../prisma.service';

@Controller('auth')
export class AuthController {
  constructor(private prisma: PrismaService) {}

  @Get('login')
  @Render('login') 
  loginPage() {
    return { message: null };
  }

  @Post('login')
  async login(@Body() body: any, @Res() res: Response) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && user.password === password) {
      return res.redirect('/products');
    }

    return res.render('login', { message: 'Email atau Password salah!' });
  }
}