import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message : 'Informar o campo nome'})
    @IsString()
    nome: string;

    @IsNotEmpty({message: "Informar o campo email"})
    @IsEmail()
    email: string

    @IsNotEmpty({ message : 'Informar o campo CPF/CNPJ'})
    @IsString()
    cpf_cnpj: string;

    @IsNotEmpty({ message : 'Informar o campo id status'})
    id_status: number

    @IsNotEmpty({ message : 'Informar o campo id tipo usuario'})
    id_tipo_usuario: number

    @IsString()
    @IsOptional()
    observacao: string;
    
    @IsNotEmpty({ message : 'Informar o campo id login insert' })
    id_login_insert: number;


    dt_insert: Date;

    @IsOptional()
    id_login_update: number;

    
    @IsDate()
    @IsOptional()
    dt_update: string;

}