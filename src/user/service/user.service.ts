import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { tb_usuario_login } from 'src/auth/entity/auth.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { tb_usuario } from 'src/user/entity/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
    ){}

//=====================================================
    async getAllUser(): Promise<tb_usuario[]>{
        return this.userRepository.find();
    }

//=====================================================
    async getUserById(id:string): Promise<tb_usuario>{
        const found = await this.userRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Usuario com ID ${id} não encontrado!`);
        }

        return found;
    }

//=====================================================
    createUser(createUserDto : CreateUserDto): Promise<tb_usuario>{
        return this.userRepository.createUser(createUserDto);
    }

//=====================================================

    async deleteUser(id:string) {
        const result = await this.userRepository.delete(id);
        if(result.affected === 0){            
            throw new NotFoundException(`Usuario com ID ${id} não encontrado`);
        }
    }

//=====================================================

    async updateUser(id:string, updateUserDto: UpdateUserDto): Promise<tb_usuario>{
        const user = await this.getUserById(id);

        user.name = updateUserDto.name;
        user.email = updateUserDto.email;
        user.cpf_cnpj = updateUserDto.cpf_cnpj;
        user.id_status = updateUserDto.id_status;
        user.id_tipo_usuario = updateUserDto.id_tipo_usuario;
        user.observacao = updateUserDto.observacao;
        user.id_login_update = updateUserDto.id_login_update;
        user.dt_update = new Date();


        try {
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            throw new InternalServerErrorException('Error com a conexão com o Bando de Dados'); 
        }
    }

//=====================================================

}
