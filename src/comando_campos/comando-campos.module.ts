import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandFieldsController } from './controller/comando-campos.controller';
import { CommandFieldsRepository } from './repository/comando-campos.repository';
import { CommandFieldsService } from './service/comando-campos.service';




@Module({
  imports:[
    TypeOrmModule.forFeature([
      CommandFieldsRepository
    ]),
  ],
  controllers: [CommandFieldsController],
  providers: [CommandFieldsService]
})
export class CommandFieldsModule {}
