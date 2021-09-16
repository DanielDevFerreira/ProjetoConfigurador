import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ModeloModule } from './modelo/modelo.module';
import { FabricanteModule } from './fabricante/fabricante.module';
import { CommandTypeModule } from './tipo_comando/tipo-comando.module';
import { CommandModule } from './comando/comando.module';
import { CommandFieldsModule } from './comando_campos/comando-campos.module';
import { EnvioModule } from './envio/envio.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.dev`]
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),        
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
    UserModule,
    AuthModule,
    MailModule,
    ModeloModule,
    FabricanteModule,
    CommandTypeModule,
    CommandModule,
    CommandFieldsModule,
    EnvioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
