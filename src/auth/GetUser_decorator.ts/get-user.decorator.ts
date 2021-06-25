import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { tb_usuario_login } from "../entity/auth.entity";


export const GetUser = createParamDecorator((data, ctx: ExecutionContext): tb_usuario_login =>{
    const req= ctx.switchToHttp().getRequest();
    return req.user;
});