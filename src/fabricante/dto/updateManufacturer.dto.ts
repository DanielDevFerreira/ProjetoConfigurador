import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateManufacturerDto{
    
    @IsNotEmpty({message: 'Campo fabricante obrigatório'})
    fabricante: string;

    @IsOptional()
    id_status: number;
    
    @IsOptional()
    observacao: string;

    @IsOptional()
    id_login_update: number;

    dt_update: Date;
}