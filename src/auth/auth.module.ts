import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './jwt-strategy.ts/jwt-strategy';
import { AuthRepository } from './repository/auth.repository';
import { AuthService } from './service/auth.service';
@Module({
    imports:[
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: 'rastreeiFaleFlex',
            signOptions:{
                expiresIn: 3600,
            }
        }),
        TypeOrmModule.forFeature([
            AuthRepository
        ]),
        MailModule
    ],
    controllers:[AuthController],
    providers:[AuthService, JwtStrategy],
    exports:[JwtStrategy, PassportModule]
})
export class AuthModule {}
