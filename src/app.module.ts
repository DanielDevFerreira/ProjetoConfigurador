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


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'configurador',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    MailModule,
    ModeloModule,
    FabricanteModule,
    CommandTypeModule,
    CommandModule,
    CommandFieldsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
