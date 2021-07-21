import { IsNotEmpty, IsOptional } from "class-validator";

export class CommandFieldsDto {
    @IsNotEmpty()
    campo:string;

    @IsNotEmpty()
    label:string;

    @IsNotEmpty()
    tipo:string;

    @IsNotEmpty()
    obrigatorio:string;

    @IsOptional()
    id_status: number;
    
    @IsOptional()
    observacao: string;

    @IsOptional()
    id_login_insert: number;

    dt_insert: Date;

    @IsNotEmpty({message: 'informar o id do comando!'})
    id_comando: number
}