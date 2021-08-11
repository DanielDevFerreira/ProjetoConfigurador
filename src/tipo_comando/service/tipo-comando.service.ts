import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CommandTypeDto } from '../dto/create-tipo-comando.dto';
import { UpdateCommandTypeDto } from '../dto/update-tipo-comando.dto';
import { tb_tipo_comando } from '../entity/tipo-comando.entity';
import { CommandTypeRepository } from '../repository/tipo-comando.repository';

@Injectable()
export class CommandTypeService {

    constructor(
        private commandTypeRepository: CommandTypeRepository
    ){}

//==========================================================================================

    async createCommandType(commandoTypelDto: CommandTypeDto): Promise<tb_tipo_comando>{
       return await this.commandTypeRepository.createCommandType(commandoTypelDto);  
    }

//==========================================================================================

    async getAll(): Promise<tb_tipo_comando[]>{
        return await this.commandTypeRepository.find();
    }

//==========================================================================================

    async getCommandTypeById(id:number): Promise<tb_tipo_comando>{
        const found = await this.commandTypeRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Tipo comando com ID ${id} não encontrado!`);
        }

        return found;
    }

//==========================================================================================

    async updateCommandType(id:number, updateCommandTypeDto: UpdateCommandTypeDto): Promise<tb_tipo_comando>{
        const commandType = await this.getCommandTypeById(id);

        commandType.tipo_comando = updateCommandTypeDto.tipo_comando;
        commandType.id_status = updateCommandTypeDto.id_status;
        commandType.observacao = updateCommandTypeDto.observacao;
        commandType.observacao = updateCommandTypeDto.observacao;
        commandType.id_login_update = updateCommandTypeDto.id_login_update;
        commandType.dt_update = new Date();
        
        try {
            await this.commandTypeRepository.save(commandType)
            return commandType;
        } catch (error) {
            throw new InternalServerErrorException('Falha ao atualizar os dados do tipo comando!')
        }
    } 

//==========================================================================================

    async deleteCommandType(id:string) {

        const commandoType = await this.commandTypeRepository.findOne(id);

        if(!commandoType){
            throw new NotFoundException(`Tipo comando com ID ${id} não encontrado!`);
        }else {
            try {
                const result = await this.commandTypeRepository.softDelete(id);
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

    
    async getSendType(id: any = null): Promise<tb_tipo_comando[]> {
        const sql =  this.commandTypeRepository.createQueryBuilder('type')
            .select([              
                'type.tipo_comando',
                'type.id_tipo_comando']);
            if (id != null){
                console.log(id)
                 sql.where(`type.id_tipo_comando =:id`, { id: id }) 
            }               
                return sql.getMany();
    }
}
