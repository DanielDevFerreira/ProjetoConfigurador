import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelController } from './controller/modelo.controller';
import { ModelRepository } from './repository/model.repository';
import { ModelService } from './service/modelo.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      ModelRepository
    ]),
  ],
  controllers: [ModelController],
  providers: [ModelService]
})
export class ModeloModule {}
