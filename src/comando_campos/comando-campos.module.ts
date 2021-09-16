import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommandFieldsController } from './controller/comando-campos.controller';
import { CommandFieldsRepository } from './repository/comando-campos.repository';
import { CommandFieldsService } from './service/comando-campos.service';




@Module({
  imports:[
    TypeOrmModule.forFeature([
      CommandFieldsRepository
    ]),
    AuthModule
  ],
  controllers: [CommandFieldsController],
  providers: [CommandFieldsService]
})
export class CommandFieldsModule {}
