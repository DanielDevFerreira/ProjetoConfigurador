import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandController } from './controller/comando.controller';
import { CommandRepository } from './repository/comando.repository';
import { CommandService } from './service/comando.service';



@Module({
  imports:[
    TypeOrmModule.forFeature([
      CommandRepository
    ]),
  ],
  controllers: [CommandController],
  providers: [CommandService]
})
export class CommandModule {}
