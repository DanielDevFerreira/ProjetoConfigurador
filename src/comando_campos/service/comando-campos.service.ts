import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CommandFieldsDto } from '../dto/create-comando-campos.dto';
import { UpdateCommandFieldsDto } from '../dto/update-comando-campos.dto';
import { tb_comando_campos } from '../entity/comando-campos.entity';
import { CommandFieldsRepository} from '../repository/comando-campos.repository';

@Injectable()
export class CommandFieldsService {

    constructor(
        private commandFieldsRepository: CommandFieldsRepository
    ){}

//==========================================================================================

    async createCommandFields(commandFieldsDto: CommandFieldsDto){
       return await this.commandFieldsRepository.createCommandFields(commandFieldsDto);  
    }

//==========================================================================================

    async getAll(): Promise<tb_comando_campos[]>{
        return await this.commandFieldsRepository.find();
    }

//==========================================================================================

    async getCommandFieldsById(id:number): Promise<tb_comando_campos>{
        const found = await this.commandFieldsRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`O comando com ID ${id} não encontrado!`);
        }

        return found;
    }

//==========================================================================================

    async updateCommandFields(id:number, updateCommandFieldsDto: UpdateCommandFieldsDto): Promise<tb_comando_campos>{
        const commandFields = await this.getCommandFieldsById(id);

        commandFields.campo = updateCommandFieldsDto.campo;
        commandFields.label = updateCommandFieldsDto.label;
        commandFields.tipo = updateCommandFieldsDto.tipo;
        commandFields.obrigatorio = updateCommandFieldsDto.obrigatorio;
        commandFields.comando = updateCommandFieldsDto.id_comando
        
        try {
            await this.commandFieldsRepository.save(commandFields)
            return commandFields;
        } catch (error) {
            throw new InternalServerErrorException('Falha ao atualizar os dados do comando!')
        }
    } 

//==========================================================================================

    async deleteCommandFields(id:string) {

        const command = await this.commandFieldsRepository.findOne(id);

        if(!command){
            throw new NotFoundException(`O comando com ID ${id} não encontrado!`);
        }else {
            try {
                const result = await this.commandFieldsRepository.softDelete(id);
                if(result.affected === 0){            
                    throw new NotFoundException(`Erro ao deletar o tipo comando`);
                }else {
                    return true;
                }
            } catch (error) {
                throw new InternalServerErrorException('Falha ao deletar o tipo comando!')
            }
        } 
    }
}
