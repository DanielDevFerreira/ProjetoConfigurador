import { EntityRepository, Repository } from "typeorm";
import { tb_modelo } from "../entity/modelo.entity";

@EntityRepository(tb_modelo)
export class ModeloEntity extends Repository<tb_modelo>{

}