import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CommandFieldsDto } from '../dto/create-comando-campos.dto';

import { tb_comando_campos } from '../entity/comando-campos.entity';

@EntityRepository(tb_comando_campos)
export class CommandFieldsRepository extends Repository<tb_comando_campos> {

  async createCommandFields(commandFieldsDto: CommandFieldsDto){
    const { quantities, id_comando } = commandFieldsDto;

    quantities.forEach((element: any) => {
      const commandFields = this.create({
        campo: element.campo,
        label: element.label,
        tipo: element.tipo,
        obrigatorio: element.obrigatorio,
        comando: id_comando,
      });

      try {
        this.save(commandFields);
        return commandFields;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException('Error ao cadastrar o(s) campo(s) do comando!');
      }
    });
  }
}
