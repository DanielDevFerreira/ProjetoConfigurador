import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateAccountDto {
    @IsNotEmpty({ message : 'Informar o campo nome'})
    @IsString()
    name: string;

    @IsNotEmpty({message: "Informar o campo email"})
    @IsEmail()
    email: string

    @IsNotEmpty({ message : 'Informar o campo CPF/CNPJ'})
    @IsString()
    cpf_cnpj: string;

    @IsNotEmpty({ message : 'Informar o campo id status'})
    id_status: number

    @IsString()
    @IsOptional()
    telefone: string;

    @IsString()
    @IsOptional()
    dt_nascimento: Date;

    @IsString()
    @IsOptional()
    observacao: string;

    @IsOptional()
    id_login_update: number;

    
    @IsDate()
    @IsOptional()
    dt_update: string;

}