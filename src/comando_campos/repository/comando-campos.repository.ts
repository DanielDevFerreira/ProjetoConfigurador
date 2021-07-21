import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CommandFieldsDto } from "../dto/create-comando-campos.dto";

import {  tb_comando_campos } from "../entity/comando-campos.entity";


@EntityRepository(tb_comando_campos)
export class CommandFieldsRepository extends Repository<tb_comando_campos>{
    async createCommandFields(commandFieldsDto: CommandFieldsDto): Promise<tb_comando_campos>{
        const {
            campo,
            label,
            tipo,
            obrigatorio,
            id_status,
            observacao,
            id_login_insert,
            id_comando
        } = commandFieldsDto

        const commandFields = this.create({
            campo,
            label,
            tipo,
            obrigatorio,
            id_status,
            observacao,
            id_login_insert,
            comando: id_comando
        })

        try {

            await this.save(commandFields);
            return commandFields;

        } catch (error) {
            throw new InternalServerErrorException('Error ao cadastrar o(s) campo(s) do comando!'); 
        } 
    }
}