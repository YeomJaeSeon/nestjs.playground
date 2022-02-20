import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        this.validateRequest(request)

        return true;
    }

    validateRequest(request : Request){
        if(!request.headers.authorization || request.headers.authorization != 'password'){
            throw new UnauthorizedException()
        }
    }
}
