import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelCommandTypeRepository } from './repository/model.repository';


@Module({
  imports:[
    TypeOrmModule.forFeature([
      ModelCommandTypeRepository
    ]),
  ],
  controllers: [],
  providers: []
})
export class ModeloCommandTypeModule {}
