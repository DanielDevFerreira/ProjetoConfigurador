import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateModelDto{
    
    @IsNotEmpty({message: 'Campo modelo obrigatório'})
    modelo: string;

    @IsOptional()
    id_status: number;
    
    @IsOptional()
    observacao: string;

    @IsOptional()
    id_login_update: number;

    @IsNotEmpty({message: 'Obrigatório informar o fabricante'})
    id_fabricante: number;

    dt_update: Date;
}