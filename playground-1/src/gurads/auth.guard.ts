import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';


@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    this.validateRequest(request);

    return true;
  }

  validateRequest(request: Request) {
    if (
      !request.headers.authorization ||
      request.headers.authorization != 'password'
    ) {
      console.error('권한 없음!');
      throw new UnauthorizedException(); 
    }
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflactor: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflactor.get<string[]>('roles', context.getHandler);
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (roles === user.roles) return true;
    return false;
  }

}
