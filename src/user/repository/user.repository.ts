import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { tb_usuario } from "../entity/user.entity";

@EntityRepository(tb_usuario)
export class UserRepository extends Repository<tb_usuario>{

    async createUser(createUserDto: CreateUserDto): Promise<tb_usuario>{
        const {
           nome,
           email,
           cpf_cnpj,
           id_status,
           id_tipo_usuario,
           observacao,
           id_login_insert
        } = createUserDto;

        const user = this.create({
           nome,
           email,
           cpf_cnpj,
           id_status,
           id_tipo_usuario,
           observacao,
           id_login_insert
        });

        try {

            await this.save(user);
            return user;

        } catch (error) {
            throw new InternalServerErrorException('Error com a conexão com o Bando de Dados'); 
        } 

        
    }
}