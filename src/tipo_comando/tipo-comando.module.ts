import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommandTypeController } from './controller/tipo-comando.controller';
import { CommandTypeRepository } from './repository/tipo-comando.repository';
import { CommandTypeService } from './service/tipo-comando.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([
      CommandTypeRepository
    ]),
    AuthModule
  ],
  controllers: [CommandTypeController],
  providers: [CommandTypeService]
})
export class CommandTypeModule {}
