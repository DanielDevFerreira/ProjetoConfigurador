import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
        ConfigModule.forRoot({
            envFilePath: [`.env.stage.dev`]
        }),
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions:{
                    expiresIn: 32400,
                }
            }),
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
