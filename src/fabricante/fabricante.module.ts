import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ManufacturerController } from './controller/fabricante.controller';
import { ManufacturerRepository } from './reporsitory/fabricante.repository';
import { ManufacturerService } from './service/fabricante.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([
      ManufacturerRepository
    ]),
    AuthModule
  ],
  controllers: [ManufacturerController],
  providers:[ManufacturerService]
})
export class FabricanteModule {}
