import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateCommandTypeDto{
    
    @IsNotEmpty({message: 'Campo modelo obrigatório'})
    tipo_comando: string;

    @IsOptional()
    id_status: number;
    
    @IsOptional()
    observacao: string;

    @IsOptional()
    id_login_update: number;

    dt_update: Date;
}