import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ModelDto } from '../dto/create-model.dto';
import { UpdateModelDto } from '../dto/update-model.dto';
import { tb_modelo } from '../entity/modelo.entity';
import { ModelService } from '../service/modelo.service';

@Controller('modelo')
export class ModelController {

    
    constructor(
        private modelService: ModelService
    ){}

    @Post()
    async createModel(@Body() modelDto: ModelDto): Promise<tb_modelo>{
        return this.modelService.createManufacturer(modelDto);
    }

//==========================================================================================

    @Get()
    async getAll(): Promise<tb_modelo[]>{
        return this.modelService.getAll();
    }

//==========================================================================================

    @Get('/:id')
    async getManufacturerById(@Param('id') id: number): Promise<tb_modelo>{
        return this.modelService.getModelById(id);
    }

//==========================================================================================

    @Patch('/:id')
    async updateModel(@Param('id') id: number, @Body() updateModelDto: UpdateModelDto): Promise<tb_modelo>{
        return this.modelService.updateModel(id, updateModelDto);
    }

//==========================================================================================

    @Delete('/:id')
    deleteModel(@Param('id') id:string){
        return this.modelService.deleteModel(id);
    }
//==========================================================================================

     @Get('get/sendModel/:id?')
    getSendModel(@Param('id') id?: number) {
        return this.modelService.getSendModel(id);
    }

}
