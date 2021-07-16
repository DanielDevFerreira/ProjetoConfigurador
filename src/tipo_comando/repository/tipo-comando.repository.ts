import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CommandTypeDto } from "../dto/create-tipo-comando.dto";
import {  tb_tipo_comando } from "../entity/tipo-comando.entity";

@EntityRepository(tb_tipo_comando)
export class CommandTypeRepository extends Repository<tb_tipo_comando>{
    async createCommandType(commandTypeDto: CommandTypeDto): Promise<tb_tipo_comando>{
        const {
            tipo_comando,
            id_status,
            observacao,
            id_login_insert,
            id_modelo
        } = commandTypeDto

        const commandType = this.create({
            tipo_comando,
            id_status,
            observacao,
            id_login_insert,
            modelo: id_modelo
        })

        try {

            await this.save(commandType);
            return commandType;

        } catch (error) {
            throw new InternalServerErrorException('Error ao cadastrar o tipo de comando!'); 
        } 
    }
}