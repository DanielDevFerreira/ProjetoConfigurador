import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeloController } from './controller/modelo.controller';
import { ModeloEntity } from './repository/modelo.repository';
import { ModeloService } from './service/modelo.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      ModeloEntity
    ]),
  ],
  controllers: [ModeloController],
  providers: [ModeloService]
})
export class ModeloModule {}
