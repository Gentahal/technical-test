import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse<Response>(); 

    const user = (request.session as any).user;

    if (user) {
      response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      response.header('Expires', '-1');
      response.header('Pragma', 'no-cache');
      
      return true;
    }

    response.redirect('/auth/login');
    return false;
  }
}