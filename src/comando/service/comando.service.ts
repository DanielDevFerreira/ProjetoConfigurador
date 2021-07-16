import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CommandDto} from '../dto/create-comando.dto';
import { UpdateCommandDto } from '../dto/update-comando.dto';
import { tb_comando } from '../entity/comando.entity';
import { CommandRepository} from '../repository/comando.repository';

@Injectable()
export class CommandService {

    constructor(
        private commandRepository: CommandRepository
    ){}

//==========================================================================================

    async createCommand(commandoDto: CommandDto): Promise<tb_comando>{
       return await this.commandRepository.createCommand(commandoDto);  
    }

//==========================================================================================

    async getAll(): Promise<tb_comando[]>{
        return await this.commandRepository.find({relations:['modelo', 'tipo_comando']});
    }

//==========================================================================================

    async getCommandById(id:number): Promise<tb_comando>{
        const found = await this.commandRepository.findOne({
            relations: ['modelo', 'tipo_comando'],
            where: {
                id_comando: id
            }
        });

        if(!found){
            throw new NotFoundException(`O comando com ID ${id} não encontrado!`);
        }

        return found;
    }

//==========================================================================================

    async updateCommand(id:number, updateCommandDto: UpdateCommandDto): Promise<tb_comando>{
        const command = await this.getCommandById(id);

        command.comando = updateCommandDto.comando;
        command.campos_do_comando = updateCommandDto.campos_do_comando;
        command.id_status = updateCommandDto.id_status;
        command.observacao = updateCommandDto.observacao;
        command.observacao = updateCommandDto.observacao;
        command.id_login_update = updateCommandDto.id_login_update;
        command.modelo = updateCommandDto.id_modelo
        command.tipo_comando = updateCommandDto.id_tipo_comando
        command.dt_update = new Date();
        
        try {
            await this.commandRepository.save(command)
            return command;
        } catch (error) {
            throw new InternalServerErrorException('Falha ao atualizar os dados do comando!')
        }
    } 

//==========================================================================================

    async deleteCommand(id:string) {

        const command = await this.commandRepository.findOne(id);

        if(!command){
            throw new NotFoundException(`O comando com ID ${id} não encontrado!`);
        }else {
            try {
                const result = await this.commandRepository.softDelete(id);
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
