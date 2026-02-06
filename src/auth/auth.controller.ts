import { Controller, Get, Post, Body, Render, Res, Req } from '@nestjs/common';
import type { Response, Request } from 'express';
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
  async login(@Body() body: any, @Res() res: Response, @Req() req: Request) { 
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && user.password === password) {
      (req.session as any).user = { id: user.id, email: user.email };
      
      return res.redirect('/products');
    }

    return res.render('login', { message: 'Email atau Password salah!' });
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {
      res.redirect('/');
    });
  }
}