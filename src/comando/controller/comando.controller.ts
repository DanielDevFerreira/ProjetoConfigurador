import { Query, UseGuards } from '@nestjs/common';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommandDto } from '../dto/create-comando.dto';
import { UpdateCommandDto } from '../dto/update-comando.dto';
import { tb_comando } from '../entity/comando.entity';
import { CommandService } from '../service/comando.service';

@UseGuards(AuthGuard())
@Controller('comando')
export class CommandController {

    constructor(
        private commandService: CommandService
    ) { }

    @Post()
    async createCommand(@Body() commandDto: CommandDto): Promise<tb_comando> {
        return this.commandService.createCommand(commandDto);
    }

    //==========================================================================================

    @Get()
    async getAll(): Promise<tb_comando[]> {
        return this.commandService.getAll();
    }

    //==========================================================================================

    @Get('/:id')
    async getCommandById(@Param('id') id: number): Promise<tb_comando> {
        return this.commandService.getCommandById(id);
    }

    //==========================================================================================

    @Patch('/:id')
    async updateCommand(@Param('id') id: number, @Body() updateCommandDto: UpdateCommandDto): Promise<tb_comando> {
        return this.commandService.updateCommand(id, updateCommandDto);
    }

    //==========================================================================================

    @Delete('/:id')
    deleteCommand(@Param('id') id: string) {
        return this.commandService.deleteCommand(id);
    }
    //==========================================================================================

    @Get('get/model/:id?')
    getModelByTypeCommand(@Param('id') id?: number) {
        return this.commandService.getModelByTypeCommand(id);
    }
    //==========================================================================================

    @Get('get/typecommand/:id?')
    getTypeCommandByModel(@Param('id') id?: number) {
        return this.commandService.getTypeCommandByModel(id);
    }
    //==========================================================================================
    @Get('get/command/send')
    SendModelOrTypeCommand(@Query('id_modelo') id_modelo: any, @Query('id_tipo_comando') id_tipo_comando: any){
        return this.commandService.SendModelOrTypeCommand(id_modelo, id_tipo_comando);
    }
}
