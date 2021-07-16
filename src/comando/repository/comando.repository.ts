import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CommandDto } from "../dto/create-comando.dto";

import { tb_comando } from "../entity/comando.entity";


@EntityRepository(tb_comando)
export class CommandRepository extends Repository<tb_comando>{
    async createCommand(commandDto: CommandDto): Promise<tb_comando>{
        const {
            comando,
            campos_do_comando,
            id_status,
            observacao,
            id_login_insert,
            id_modelo,
            id_tipo_comando
        } = commandDto

        const command = this.create({
            comando,
            campos_do_comando,
            id_status,
            observacao,
            id_login_insert,
            modelo: id_modelo,
            tipo_comando: id_tipo_comando
        })

        try {

            await this.save(command);
            return command;

        } catch (error) {
            throw new InternalServerErrorException('Error ao cadastrar o tipo de comando!'); 
        } 
    }
}