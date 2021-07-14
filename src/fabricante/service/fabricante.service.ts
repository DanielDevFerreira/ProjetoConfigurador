import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ManufacturerDto } from '../dto/createManufacturer.dto';
import { UpdateManufacturerDto } from '../dto/updateManufacturer.dto';
import { tb_fabricante } from '../entity/fabricante.entity';
import { ManufacturerRepository } from '../reporsitory/fabricante.repository';

@Injectable()
export class ManufacturerService {

    constructor(
        private manufacturerRepository: ManufacturerRepository
    ){}

//==========================================================================================

    async createManufacturer(manufacturerDto: ManufacturerDto): Promise<tb_fabricante>{
       return await this.manufacturerRepository.createManufacturer(manufacturerDto);  
    }

//==========================================================================================

    async getAll(): Promise<tb_fabricante[]>{
        return await this.manufacturerRepository.find();
    }

//==========================================================================================

    async getManufacturerById(id:number): Promise<tb_fabricante>{
        const found = await this.manufacturerRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Fabricante com ID ${id} não encontrado!`);
        }

        return found;
    }

//==========================================================================================

    async updateManufacturer(id:number, updateManufacturerDto: UpdateManufacturerDto): Promise<tb_fabricante>{
        const manufacturer = await this.getManufacturerById(id);

        manufacturer.fabricante = updateManufacturerDto.fabricante;
        manufacturer.id_status = updateManufacturerDto.id_status;
        manufacturer.observacao = updateManufacturerDto.observacao;
        manufacturer.observacao = updateManufacturerDto.observacao;
        manufacturer.id_login_update = updateManufacturerDto.id_login_update;
        manufacturer.dt_update = new Date();
        
        try {
            await this.manufacturerRepository.save(manufacturer)
            return manufacturer;
        } catch (error) {
            throw new InternalServerErrorException('Falha ao atualizar os dados do fabricante!')
        }
    } 

//==========================================================================================

    async deleteManufacturer(id:string) {

        const manufacturer = await this.manufacturerRepository.findOne(id);

        if(!manufacturer){
            throw new NotFoundException(`Fabricante com ID ${id} não encontrado!`);
        }else {
            try {
                const result = await this.manufacturerRepository.softDelete(id);
                if(result.affected === 0){            
                    throw new NotFoundException(`Erro ao deletar o fabricante`);
                }else {
                    return true;
                }
            } catch (error) {
                throw new InternalServerErrorException('Falha ao deletar o fabricante!')
            }
        }

       
    }
}
