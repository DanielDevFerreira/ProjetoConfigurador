import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandFieldsDto } from '../dto/create-comando-campos.dto';
import { UpdateCommandFieldsDto } from '../dto/update-comando-campos.dto';
import { tb_comando_campos } from '../entity/comando-campos.entity';
import { CommandFieldsService} from '../service/comando-campos.service';

@Controller('comando-campos')
export class CommandFieldsController {
    
    constructor(
        private commandFieldsService: CommandFieldsService
    ){}

    @Post()
    async createCommandFields(@Body() commandFieldsDto: CommandFieldsDto): Promise<tb_comando_campos>{
        return this.commandFieldsService.createCommandFields(commandFieldsDto);
    }

//==========================================================================================

    @Get()
    async getAll(): Promise<tb_comando_campos[]>{
        return this.commandFieldsService.getAll();
    }

//==========================================================================================

    @Get('/:id')
    async getCommandFieldsById(@Param('id') id: number): Promise<tb_comando_campos>{
        return this.commandFieldsService.getCommandFieldsById(id);
    }

//==========================================================================================

    @Patch('/:id')
    async updateCommandFields(@Param('id') id: number, @Body() updateCommandFieldsDto: UpdateCommandFieldsDto): Promise<tb_comando_campos>{
        return this.commandFieldsService.updateCommandFields(id, updateCommandFieldsDto);
    }

//==========================================================================================

    @Delete('/:id')
    deleteCommandFields(@Param('id') id:string){
        return this.commandFieldsService.deleteCommandFields(id);
    }
//==========================================================================================
}
