import { IsNotEmpty, IsOptional } from "class-validator";

export class ManufacturerDto{
    
    @IsNotEmpty({message: 'Campo fabricante obrigatório'})
    fabricante: string;

    @IsOptional()
    id_status: number;
    
    @IsOptional()
    observacao: string;

    @IsOptional()
    id_login_insert: number;

    dt_insert: Date;
}