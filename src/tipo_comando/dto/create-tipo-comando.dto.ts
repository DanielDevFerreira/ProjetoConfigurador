import { IsNotEmpty, IsOptional } from "class-validator";

export class CommandTypeDto {
    @IsNotEmpty()
    tipo_comando:string;

    @IsOptional()
    id_status: number;
    
    @IsOptional()
    observacao: string;

    @IsOptional()
    id_login_insert: number;

    dt_insert: Date;
}