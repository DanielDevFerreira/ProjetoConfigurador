import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CommandFieldsDto } from '../dto/create-comando-campos.dto';
import { UpdateCommandFieldsDto } from '../dto/update-comando-campos.dto';
import { tb_comando_campos } from '../entity/comando-campos.entity';
import { CommandFieldsRepository } from '../repository/comando-campos.repository';

@Injectable()
export class CommandFieldsService {

    commandFieldsUpdate: any;

  constructor(private commandFieldsRepository: CommandFieldsRepository) {}

  //==========================================================================================

  async createCommandFields(commandFieldsDto: CommandFieldsDto) {
    return await this.commandFieldsRepository.createCommandFields(
      commandFieldsDto,
    );
  }

  //==========================================================================================

  async getAll(): Promise<tb_comando_campos[]> {
    return await this.commandFieldsRepository.find();
  }

  //==========================================================================================

  async getCommandFieldsById(id: number): Promise<tb_comando_campos> {
    const found = await this.commandFieldsRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`O comando com ID ${id} não encontrado!`);
    }

    return found;
  }

  //==========================================================================================

  async getForeignKeyCommandoByIdUpdate(id: number): Promise<tb_comando_campos[]> {
    return await this.commandFieldsRepository
      .createQueryBuilder('campos')
      .innerJoinAndSelect('campos.comando', 'comando')
      .select(['label', 'campo', 'tipo', 'obrigatorio', 'id_comando_campos', 'comando.id_comando'])
      .where('comando.id_comando =:id', { id: id })
      .getRawMany();
  }

  //==========================================================================================

  async updateCommandFields(id: number, updateCommandFieldsDto: UpdateCommandFieldsDto)
  {
    const commandFields = await this.getForeignKeyCommandoByIdUpdate(id);

    const { quantities } = updateCommandFieldsDto;

    for (let index = 0; index < quantities.length; index++) {

        if(commandFields[index]){

            commandFields[index].campo = quantities[index].campo;
            commandFields[index].label = quantities[index].label;
            commandFields[index].tipo = quantities[index].tipo;
            commandFields[index].obrigatorio = quantities[index].obrigatorio;
            commandFields[index].id_comando_campos = commandFields[index].id_comando_campos;
    
            await this.commandFieldsRepository.save(commandFields[index]); 

        }else {
            const commandFields = this.commandFieldsRepository.create({
                campo: quantities[index].campo,
                label: quantities[index].label,
                tipo: quantities[index].tipo,
                obrigatorio: quantities[index].obrigatorio,
                comando: id,
              });
              
            await this.commandFieldsRepository.save(commandFields); 
        }
           
    } 
  }

  //==========================================================================================

  async deleteCommandFields(id: number) {

    const command = this.getForeignKeyCommandoById(id)
    //const command = await this.commandFieldsRepository.findOne(id);
      console.log(command);
    if (!command) {
      throw new NotFoundException(`O comando com ID ${id} não encontrado!`);
    } else {
      try {
        const result = await this.commandFieldsRepository.createQueryBuilder('delete')
        .innerJoinAndSelect('delete.comando', 'comando')  
        .softDelete()
        .where('comando.id_comando = :id', {id: id} )
		.execute();

        if (!result) {
          throw new NotFoundException(`Erro ao deletar o tipo comando`);
        } else {
          return true;
        }
      } catch (error) {
        throw new InternalServerErrorException(
          'Falha ao deletar o tipo comando!',
        );
      }
    }
  }

  async getForeignKeyCommandoById(id: number): Promise<tb_comando_campos[]> {
    return await this.commandFieldsRepository
      .createQueryBuilder('campos')
      .innerJoinAndSelect('campos.comando', 'comando')
      .select(['label', 'campo', 'tipo', 'obrigatorio', 'id_comando_campos'])
      .where('comando.id_comando =:id', { id: id })
      .getRawMany();
  }
}
