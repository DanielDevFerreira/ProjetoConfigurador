import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { ManufacturerDto } from "../dto/createManufacturer.dto";
import { tb_fabricante } from "../entity/fabricante.entity";

@EntityRepository(tb_fabricante)
export class ManufacturerRepository extends Repository<tb_fabricante>{

    async createManufacturer(manufacturerDto: ManufacturerDto): Promise<tb_fabricante>{
        const {
            fabricante,
            id_status,
            observacao,
            id_login_insert,
        } = manufacturerDto

        const manufacturer = this.create({
            fabricante,
            id_status,
            observacao,
            id_login_insert,
        })

        try {

            await this.save(manufacturer);
            return manufacturer;

        } catch (error) {
            throw new InternalServerErrorException('Error ao cadastrar fabricante!'); 
        } 
    }
}