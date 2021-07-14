import { IsNotEmpty, IsOptional } from "class-validator";

export class ModelDto {
    @IsNotEmpty()
    modelo:string;

    @IsOptional()
    id_status: number;
    
    @IsOptional()
    observacao: string;

    @IsOptional()
    id_login_insert: number;

    @IsNotEmpty({message: 'Obrigatório informar o fabricante'})
    id_fabricante: number;

    dt_insert: Date;
}