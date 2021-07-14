import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { ModelDto } from "../dto/create-model.dto";
import { tb_modelo } from "../entity/modelo.entity";

@EntityRepository(tb_modelo)
export class ModelRepository extends Repository<tb_modelo>{
    async createModel(modelDto: ModelDto): Promise<tb_modelo>{
        const {
            modelo,
            id_status,
            observacao,
            id_login_insert,
            id_fabricante
        } = modelDto

        const manufacturer = this.create({
            modelo,
            id_status,
            observacao,
            id_login_insert,
            fabricante: id_fabricante
        })

        try {

            await this.save(manufacturer);
            return manufacturer;

        } catch (error) {
            throw new InternalServerErrorException('Error ao cadastrar fabricante!'); 
        } 
    }
}