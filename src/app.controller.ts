import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home') 
  root() {
    return { 
      title: 'Technical Test App',
      year: new Date().getFullYear()
    };
  }
}
