import { EntityRepository, Repository } from "typeorm";
import { tb_modelo_tipo_comando } from "../entity/modelo.entity";

@EntityRepository(tb_modelo_tipo_comando)
export class ModelCommandTypeRepository extends Repository<tb_modelo_tipo_comando>{
    
}