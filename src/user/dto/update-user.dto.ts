import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
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

    @IsNotEmpty({ message : 'Informar o campo id tipo usuario'})
    id_tipo_usuario: number

    @IsString()
    @IsOptional()
    observacao: string;

    @IsOptional()
    id_login_update: number;

    
    @IsDate()
    @IsOptional()
    dt_update: string;

}