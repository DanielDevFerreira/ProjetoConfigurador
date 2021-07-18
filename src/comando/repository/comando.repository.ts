import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CommandDto } from "../dto/create-comando.dto";

import { tb_comando } from "../entity/comando.entity";


@EntityRepository(tb_comando)
export class CommandRepository extends Repository<tb_comando>{
    async createCommand(commandDto: CommandDto): Promise<tb_comando>{
        const {
            comando,
            id_status,
            observacao,
            id_login_insert,
        } = commandDto

        const command = this.create({
            comando,
            id_status,
            observacao,
            id_login_insert,
        })

        try {

            await this.save(command);
            return command;

        } catch (error) {
            throw new InternalServerErrorException('Error ao cadastrar o tipo de comando!'); 
        } 
    }
}