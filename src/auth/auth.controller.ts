/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, Post, Body, Render, Res } from '@nestjs/common';
import type { Response } from 'express';
import { PrismaService } from '../prisma.service';

@Controller('auth')
export class AuthController {
  constructor(private prisma: PrismaService) {}

  @Get('login')
  @Render('login') // Render file views/login.hbs
  loginPage() {
    return { message: '' };
  }

  @Post('login')
  async login(@Body() body: any, @Res() res: Response) {
    const user = await this.prisma.user.findUnique({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      where: { email: body.email },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (user && user.password === body.password) {
      return res.redirect('/products');
    }

    // Login gagal -> Render ulang dengan error
    return res.render('login', { message: 'Email atau password salah!' });
  }
}
