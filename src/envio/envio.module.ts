import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EnvioController } from './controller/envio.controller';
import { EnvioRepository } from './repository/envio.repository';
import { EnvioService } from './service/envio.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EnvioRepository
    ]),
    AuthModule
  ],
  controllers: [EnvioController],
  providers: [EnvioService]
})
export class EnvioModule {}
