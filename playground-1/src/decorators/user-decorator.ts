import { applyDecorators, createParamDecorator, ExecutionContext, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/gurads/auth.guard";

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext): string => {
        const request = ctx.switchToHttp().getRequest();

        const user = request?.user;

        return data ? user[data] : user;
    }
)

export function Auth(...roles){
    return applyDecorators(
        UseGuards(AuthGuard),
    )
}