import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandDto } from '../dto/create-comando.dto';

import { UpdateCommandDto } from '../dto/update-comando.dto';
import { tb_comando } from '../entity/comando.entity';
import { CommandService } from '../service/comando.service';

@Controller('comando')
export class CommandController {
    
    constructor(
        private commandService: CommandService
    ){}

    @Post()
    async createCommand(@Body() commandDto: CommandDto): Promise<tb_comando>{
        return this.commandService.createCommand(commandDto);
    }

//==========================================================================================

    @Get()
    async getAll(): Promise<tb_comando[]>{
        return this.commandService.getAll();
    }

//==========================================================================================

    @Get('/:id')
    async getCommandById(@Param('id') id: number): Promise<tb_comando>{
        return this.commandService.getCommandById(id);
    }

//==========================================================================================

    @Patch('/:id')
    async updateCommand(@Param('id') id: number, @Body() updateCommandDto: UpdateCommandDto): Promise<tb_comando>{
        return this.commandService.updateCommand(id, updateCommandDto);
    }

//==========================================================================================

    @Delete('/:id')
    deleteCommand(@Param('id') id:string){
        return this.commandService.deleteCommand(id);
    }
//==========================================================================================
}
