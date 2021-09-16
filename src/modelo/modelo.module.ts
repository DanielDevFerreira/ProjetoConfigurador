import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ModelController } from './controller/modelo.controller';
import { ModelRepository } from './repository/model.repository';
import { ModelService } from './service/modelo.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      ModelRepository
    ]),
    AuthModule
  ],
  controllers: [ModelController],
  providers: [ModelService]
})
export class ModeloModule {}
