import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    nome: string;

    @IsOptional()
    cpf_cnpj: string;

    @IsOptional()
    nome_tts: string;

    @IsOptional()
    id_status: number

    @IsOptional()
    id_tipo_usuario: number

    @IsOptional()
    endereco: string;

    @IsOptional()
    subdominio: string;

    @IsOptional()
    responsavel_financeiro: string;

    @IsOptional()
    telefone_financeiro: string;

    @IsOptional()
    email_financeiro: string;

    @IsOptional()
    responsavel_tecnico: string;

    @IsOptional()
    telefone_tecnico: string;

    @IsOptional()
    email_tecnico: string;

    @IsOptional()
    observacao: string;
    
    @IsOptional()
    id_login_insert: number;

    @IsOptional()
    dt_insert: string;

    @IsOptional()
    id_login_update: number;

    dt_update: string;

}