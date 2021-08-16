import { Module } from '@nestjs/common';
import { EnvioController } from './controller/envio.controller';
import { EnvioService } from './service/envio.service';

@Module({
  controllers: [EnvioController],
  providers: [EnvioService]
})
export class EnvioModule {}
