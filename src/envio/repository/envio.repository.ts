import { EntityRepository, Repository } from "typeorm";
import { EnvioEntity } from "../entity/envio.entity";

@EntityRepository(EnvioEntity)
export class EnvioRepository extends Repository<EnvioEntity>{

}