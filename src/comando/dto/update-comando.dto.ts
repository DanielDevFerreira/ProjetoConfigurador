import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateCommandDto{
    
    @IsNotEmpty({message: 'Campo modelo obrigatório'})
    comando: string;

    @IsOptional()
    campos_do_comando: any;

    @IsOptional()
    id_status: number;
    
    @IsOptional()
    observacao: string;

    @IsOptional()
    id_login_update: number;

    @IsNotEmpty({message: 'Obrigatório informar o tipo do comando'})
    id_tipo_comando: number;

    @IsNotEmpty({message: 'Obrigatório informar o modelo'})
    id_modelo: number;

    dt_update: Date;
}