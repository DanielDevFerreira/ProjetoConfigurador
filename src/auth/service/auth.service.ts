import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, MethodNotAllowedException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { SignInDto } from 'src/auth/dto/signin.dto';
import { tb_usuario_login } from 'src/auth/entity/auth.entity';
import { AuthRepository } from 'src/auth/repository/auth.repository';
import * as bcript from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/jwt-interface/jwt-payload.interface';
import { SignUpDto } from '../dto/signup.dto';
import { MailService } from 'src/mail/mail.service';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { verifyToken } from '../dto/verifyToken.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository,
        private jwtService: JwtService,
        private mailService: MailService
    ){}

//============================================================================

// function para o administrador criar um usuário
    async createUser(createUserDto: CreateUserDto): Promise<tb_usuario_login>{
        return this.authRepository.createUser(createUserDto);
    }

//============================================================================

// function para auto cadastramento do usuário
async signUp(signUpDto: SignUpDto){

    const{
        id_tipo_login = 2,
        username,
        password,
        name,
        email,
        observacao,
        id_login_insert
    } = signUpDto;  

    const userExist = await this.authRepository.findOne({email});

    if(userExist){
        throw new ConflictException('Email já cadastrado na Base de Dados!');
    } else {
        
        // gerar a senha do usuário com a hash
        const salt = await bcript.genSalt();
        const hashedPassword = await bcript.hash(password, salt);

        // gerar codigo de validação de email
        const tokenConfirm = Math.floor(1000 + Math.random() * 9000).toString();

        //email do email para o usuário recem cadastrado
        await this.mailService.sendUserConfirmation(name, email, tokenConfirm)

        const userSignUp = this.authRepository.create({
            id_tipo_login,
            username,
            password: hashedPassword,
            name,
            email,
            observacao,
            id_login_insert,
            tokenConfirm: tokenConfirm
        });
    
        try {
            await this.authRepository.save(userSignUp);
            //console.log(await userSignUp);
            return "Usuário cadastrado com sucesso!";

        } catch (error) {
            throw new InternalServerErrorException('Error com a conexão com o Bando de Dados'); 
        }
    }
}
//============================================================================

    // function para mudar o valor da coluna emailconfirm no banco, para ativa a conta do usuário
    async emailActive(token: string): Promise<{message: string}>{
       return this.authRepository.emailActive(token);      
    }

//============================================================================


    async forgotPassword(forgotPasswordDto: ForgotPasswordDto){
        let { id, email } = forgotPasswordDto;
        //console.log(email);
        const user  = await this.authRepository.findOne({email})

        id = user.id_usuario_login;

        // caso o email informado não existe no banco de dados
        if(!user){
            throw new BadRequestException('Email Inválido!')
        }

        // caso o usuario ainda não ativou a conta pelo o email de verificação
        if(user.confirm_email == 0){
            throw new MethodNotAllowedException('Sua conta ainda não foi ativada. Por favor ative sua conta primeiro!');
        }

        const payload: JwtPayload = { id, email };
        const acessToken = await this.jwtService.sign(payload);
        //console.log(acessToken)

        // atualizando o token no Banco de Dados
        user.tokenConfirm = acessToken;

        // // atualizando a data de validação do token
         user.dt_token_validation = new Date();

        try {
            await this.authRepository.save(user);
            //email do email para o usuário recem cadastrado
            await this.mailService.sendForgotPassword(user.name, user.email, user.tokenConfirm);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Error com a conexão com o Bando de Dados'); 
        }
    }

//============================================================================

    async verifyToken(tokendto: verifyToken): Promise<boolean>{
        const { tokenConfirm } = tokendto;
        const result  = await this.authRepository.findOne({tokenConfirm});

            if(result){
                return true;
            }else {
                throw new NotFoundException(`Token não cadastrado na Base de dados`);
            }  
    }

//============================================================================

    async changePassword(changePasswordDto: ChangePasswordDto){
        await this.authRepository.changePassword(changePasswordDto);
      
    }

//============================================================================

async resetPassword(resertPasswordDto: ResetPasswordDto){
    let { id, email } = resertPasswordDto;
    //console.log(email);
    const user  = await this.authRepository.findOne({email})

    id = user.id_usuario_login;
    user.id_status = 0;

    // caso o email informado não existe no banco de dados
    if(!user){
        throw new BadRequestException('Email Inválido!')
    }

    // caso o usuario ainda não ativou a conta pelo o email de verificação
    if(user.confirm_email == 0){
        throw new MethodNotAllowedException('Sua conta ainda não foi ativada. Por favor ative sua conta primeiro!');
    }

    const payload: JwtPayload = { id, email };
    const acessToken = await this.jwtService.sign(payload);
    //console.log(acessToken)

    // atualizando o token no Banco de Dados
    user.tokenConfirm = acessToken;

    // // atualizando a data de validação do token
     user.dt_token_validation = new Date();

    try {
        await this.authRepository.save(user);
        //email do email para o usuário recem cadastrado
        await this.mailService.sendForgotPassword(user.name, user.email, user.tokenConfirm);
    } catch (error) {
        console.log(error);
        throw new InternalServerErrorException('Error com a conexão com o Bando de Dados'); 
    }
}


//=============================================================================

async signIn(signInDto: SignInDto){
    const {  email, password } = signInDto;
    //console.log(email, password)
    //verificar se existe o login
    const userLogin = await this.authRepository.findOne({ email });

    if(userLogin && userLogin.id_status == 0 && userLogin.confirm_email == 1 && (await bcript.compare(password, userLogin.password))){
        return false;
    }else if(userLogin && userLogin.confirm_email == 0 && (await bcript.compare(password, userLogin.password))){
        throw new UnauthorizedException('Conta não ativada!');
    }else if(userLogin && userLogin.confirm_email == 1 && (await bcript.compare(password, userLogin.password))){
        // geraldo o token para o login
        const id = userLogin.id_usuario_login;
        const payload: JwtPayload = { id, email };
        const acessToken = await this.jwtService.sign(payload);
        return  acessToken;
    }else{
        throw new UnauthorizedException('Por Favor, verificar as credendiais do login');
    }
}


    // async signIn(signInDto: SignInDto){
    //     const {  email, password } = signInDto;
    //     //console.log(email, password)
    //     //verificar se existe o login
    //     const userLogin = await this.authRepository.findOne({ email });

    //     //caso o login exista e a senha esteja correta, faça
    //     if(userLogin && userLogin.confirm_email == 1 && (await bcript.compare(password, userLogin.password))){
    //         // geraldo o token para o login

    //         const id = userLogin.id_usuario_login;
    //         const payload: JwtPayload = { id, email };
    //         const acessToken = await this.jwtService.sign(payload);
    //         return  acessToken;
    //     //conta ainda não ativada pelo email    
    //     }else if(userLogin && userLogin.confirm_email == 0 && (await bcript.compare(password, userLogin.password))){
    //         throw new UnauthorizedException('Conta não ativada!');
    //     }else{
    //         throw new UnauthorizedException('Por Favor, verificar as credendiais do login');
    //     }
    // }
}
