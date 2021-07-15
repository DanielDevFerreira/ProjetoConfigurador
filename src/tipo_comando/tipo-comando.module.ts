import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandTypeController } from './controller/tipo-comando.controller';
import { CommandTypeRepository } from './repository/tipo-comando.repository';
import { CommandTypeService } from './service/tipo-comando.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([
      CommandTypeRepository
    ]),
  ],
  controllers: [CommandTypeController],
  providers: [CommandTypeService]
})
export class CommandTypeModule {}
