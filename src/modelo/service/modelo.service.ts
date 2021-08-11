import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ModelDto } from '../dto/create-model.dto';
import { UpdateModelDto } from '../dto/update-model.dto';
import { tb_modelo } from '../entity/modelo.entity';
import { ModelRepository } from '../repository/model.repository';

@Injectable()
export class ModelService {

    constructor(
        private modelRepository: ModelRepository
    ){}

//==========================================================================================

    async createManufacturer(modelDto: ModelDto): Promise<tb_modelo>{
       return await this.modelRepository.createModel(modelDto);  
    }

//==========================================================================================

    async getAll(): Promise<tb_modelo[]>{
        return await this.modelRepository.find({relations:['fabricante']});
    }

//==========================================================================================

    async getModelById(id:number): Promise<tb_modelo>{
        const found = await this.modelRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Fabricante com ID ${id} não encontrado!`);
        }

        return found;
    }

//==========================================================================================

    async updateModel(id:number, updateModelDto: UpdateModelDto): Promise<tb_modelo>{
        const model = await this.getModelById(id);

        model.modelo = updateModelDto.modelo;
        model.id_status = updateModelDto.id_status;
        model.observacao = updateModelDto.observacao;
        model.observacao = updateModelDto.observacao;
        model.id_login_update = updateModelDto.id_login_update;
        model.fabricante = updateModelDto.id_fabricante;
        model.dt_update = new Date();
        
        try {
            await this.modelRepository.save(model)
            return model;
        } catch (error) {
            throw new InternalServerErrorException('Falha ao atualizar os dados do fabricante!')
        }
    } 

//==========================================================================================

    async deleteModel(id:string) {

        const manufacturer = await this.modelRepository.findOne(id);

        if(!manufacturer){
            throw new NotFoundException(`Fabricante com ID ${id} não encontrado!`);
        }else {
            try {
                const result = await this.modelRepository.softDelete(id);
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

    async getSendModel(id: any = null): Promise<tb_modelo[]> {
        const sql =  this.modelRepository.createQueryBuilder('modelo')
            .select([
                'modelo.id_modelo',
                'modelo.modelo']);
            if (id != null){
                console.log(id)
                 sql.where(`modelo.id_modelo =:id`, { id: id }) 
            }               
                return sql.getMany();
    }
}
