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

        // vai trazer o modelo do rastreador pelo id tipo comando 
        async getModelByTypeCommand(id: number){
            return this.commandRepository
            .createQueryBuilder('models')
            .innerJoinAndSelect('models.modelo', 'modelo')
            .innerJoinAndSelect('models.tipo_comando', 'tipo_comando')
            .select(['modelo.modelo'])
            .where('tipo_comando.id_tipo_comando =:id', { id: id })
            .getRawMany();
        }

//==========================================================================================

        // vai pegar o tipo comando pelo id do modelo do rastreador
        async getTypeCommandByModel(id: number){
            return this.commandRepository
            .createQueryBuilder('type')
            .innerJoinAndSelect('type.tipo_comando', 'tipo_comando')
            .innerJoinAndSelect('type.modelo', 'modelo')
            .select(['tipo_comando.tipo_comando'])
            .where('modelo.id_modelo =:id', { id: id })
            .getRawMany();
        }

//==========================================================================================

    async createCommand(commandoDto: CommandDto): Promise<tb_comando>{
       return await this.commandRepository.createCommand(commandoDto);  
    }

//==========================================================================================

    async getAll(): Promise<tb_comando[]>{
        return await this.commandRepository.find();
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
        command.id_status = updateCommandDto.id_status;
        command.observacao = updateCommandDto.observacao;
        command.id_login_update = updateCommandDto.id_login_update;
        command.dt_update = new Date();
        command.modelo = updateCommandDto.id_modelo;
        command.tipo_comando = updateCommandDto.id_tipo_comando;
        
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
                const result = await this.commandRepository.delete(id);
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
