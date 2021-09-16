import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommandTypeDto } from '../dto/create-tipo-comando.dto';
import { UpdateCommandTypeDto } from '../dto/update-tipo-comando.dto';
import { tb_tipo_comando } from '../entity/tipo-comando.entity';
import { CommandTypeService } from '../service/tipo-comando.service';

@UseGuards(AuthGuard())
@Controller('tipo-comando')
export class CommandTypeController {

    constructor(
        private commandTypeService: CommandTypeService
    ) { }

    @Post()
    async createCommandType(@Body() commandTypeDto: CommandTypeDto): Promise<tb_tipo_comando> {
        return this.commandTypeService.createCommandType(commandTypeDto);
    }

    //==========================================================================================

    @Get()
    async getAll(): Promise<tb_tipo_comando[]> {
        return this.commandTypeService.getAll();
    }

    //==========================================================================================

    @Get('/:id')
    async getCommandTypeById(@Param('id') id: number): Promise<tb_tipo_comando> {
        return this.commandTypeService.getCommandTypeById(id);
    }

    //==========================================================================================

    @Patch('/:id')
    async updateCommandType(@Param('id') id: number, @Body() updateCommandTypeDto: UpdateCommandTypeDto): Promise<tb_tipo_comando> {
        return this.commandTypeService.updateCommandType(id, updateCommandTypeDto);
    }

    //==========================================================================================

    @Delete('/:id')
    deleteCommandType(@Param('id') id: string) {
        return this.commandTypeService.deleteCommandType(id);
    }
    //==========================================================================================

    @Get('get/sendType/:id?')
    getSendType(@Param('id') id?: number) {
        return this.commandTypeService.getSendType(id);
    }
}
