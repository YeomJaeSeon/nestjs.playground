import { BadGatewayException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, map, Observable, tap, throwError } from "rxjs";

@Injectable()
export class NothingInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('NothingInterceptor') 
        return next.handle(); //handle()실행안하면 진짜 핸들러메서드 실행앋뇌네
        // return null;
    }

}

@Injectable()
export class LoggingInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // throw new Error("Method not implemented.");
        console.log('Before...')
        const now = Date.now();

        // 이렇게 핸들러 메서가 실행되는 시간을 출력할수도있따.. 되게신기

        //Observable rxjs는 함수형프로그래밍으로, 메서드 체이닝방식이 가능한건가?
        return next
        .handle()
        .pipe(
          tap(() => console.log(`After... ${Date.now() - now}ms`)),
        );
    }

}

export interface Response<T>{
    data: T
}

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, Response<T>>{
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> | Promise<Observable<Response<T>>> {
        console.log('응답 데이터 매핑 인터셉터')
        return next.handle().pipe(map(data => ({ data })));
    }

}

@Injectable()
export class ErrorsInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next
        .handle()
        .pipe(
            catchError(err => throwError(new BadGatewayException()))
        )
    }

}