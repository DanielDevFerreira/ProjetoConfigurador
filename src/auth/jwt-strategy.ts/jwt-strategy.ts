import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { AuthRepository } from "../repository/auth.repository";
import { JwtPayload } from "../jwt-interface/jwt-payload.interface";
import { tb_usuario_login } from "../entity/auth.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository,
    ){
        super({
            secretOrKey: 'rastreeiFaleFlex',
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

        async validate(payload: JwtPayload): Promise<tb_usuario_login>{
            const { email } = payload;
            const auth: tb_usuario_login = await this.authRepository.findOne({ email })

            if(!auth){
                throw new UnauthorizedException('Solicitação não autorizado!');
            }

            return auth;
        }
}