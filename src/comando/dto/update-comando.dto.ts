import { IsOptional } from "class-validator";

export class UpdateCommandDto{
    
    @IsOptional()
    comando: string;

    @IsOptional()
    id_status: number;
    
    @IsOptional()
    observacao: string;

    @IsOptional()
    id_login_update: number;

    @IsOptional()
    id_tipo_comando: number;

    @IsOptional()
    id_modelo: number;

    dt_update: Date;
}