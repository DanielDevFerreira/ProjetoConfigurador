import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ManufacturerDto } from '../dto/createManufacturer.dto';
import { UpdateManufacturerDto } from '../dto/updateManufacturer.dto';
import { tb_fabricante } from '../entity/fabricante.entity';
import { ManufacturerService } from '../service/fabricante.service';

@Controller('fabricante')
export class ManufacturerController {

    constructor(
        private manufacturerService: ManufacturerService
    ){}

    @Post()
    async createManufacturer(@Body() manufacturerDto: ManufacturerDto): Promise<tb_fabricante>{
        return this.manufacturerService.createManufacturer(manufacturerDto);
    }

//==========================================================================================

    @Get()
    async getAll(): Promise<tb_fabricante[]>{
        return this.manufacturerService.getAll();
    }

//==========================================================================================

    @Get('/:id')
    async getManufacturerById(@Param('id') id: number): Promise<tb_fabricante>{
        return this.manufacturerService.getManufacturerById(id);
    }

//==========================================================================================

    @Patch('/:id')
    async updateManufacturer(@Param('id') id: number, @Body() updateManufacturerDto: UpdateManufacturerDto): Promise<tb_fabricante>{
        return this.manufacturerService.updateManufacturer(id, updateManufacturerDto);
    }

//==========================================================================================

    @Delete('/:id')
    deleteManufacturer(@Param('id') id:string){
        return this.manufacturerService.deleteManufacturer(id);
    }
//==========================================================================================
}
