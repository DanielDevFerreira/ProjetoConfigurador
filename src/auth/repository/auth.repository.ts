import { EntityRepository, getRepository, Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { tb_usuario_login } from "../entity/auth.entity";
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { TokenConfirmDTO } from "../dto/tokenConfirmDto";
import { ChangePasswordDto } from "../dto/change-password.dto";


@EntityRepository(tb_usuario_login)
export class AuthRepository extends Repository<tb_usuario_login>{

//================================================================================
    
    async createUser(createUserDto: CreateUserDto): Promise<tb_usuario_login>{

        const {login, email, password} = createUserDto;
        const userExist = await this.findOne({email});

        if(userExist){
            throw new ConflictException('Email já cadastrado na Base de Dados!');
        } else {

            const{
                id_tipo_login,
                login,
                password,
                name,
                email,
                observacao,
                id_login_insert
            } = createUserDto;

            // colocando hash no password
            // vai gerar uma pequena hash aleatória como prefixo da hash do password do usuário
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = this.create({
                id_tipo_login,
                login,
                password: hashedPassword,
                name,
                email,
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

//================================================================================

    async emailActive(tokenConfirmDto: TokenConfirmDTO): Promise<{message: string}>{
        const { token } = tokenConfirmDto;
        const sql = await this.createQueryBuilder('user')
        .where("user.tokenConfirm = :token", {token: token})
        .getOne();

        if(sql){
             const updataEmailConfirm = await this.createQueryBuilder('user')
            .update(tb_usuario_login)
            .set({ confirm_email: 1, tokenConfirm: null })
            .where(`tokenConfirm =  ${token}`)
            .execute();

            if(updataEmailConfirm){
                return { message: "Sua conta foi ativado com sucesso!"}
            }
        }else{
            return {message: "Error ao ativa sua conta, tente novamente !"}
        }
    }

//================================================================================

    async changePassword(changePasswordDto: ChangePasswordDto){
        const { password, email } = changePasswordDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log(changePasswordDto)
        const sql = await this.createQueryBuilder('user')
        .where("user.email = :email", {email: email})
        .getOne();

        console.log(sql);

        if(sql){
            const updatePassword = await this.createQueryBuilder('user')
            .update(tb_usuario_login)
            .set({password: hashedPassword})
            .where("email = :email", { email: email })
            .execute();

            if(updatePassword){
                return { message: "Sua senha foi alterado com sucesso!"}
            }
        }else {
            return { message: "Erro ao alterar a senha!"}
        }
    }
 
}