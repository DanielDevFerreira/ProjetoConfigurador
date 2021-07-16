import { IsNotEmpty, IsOptional } from "class-validator";

export class CommandDto {
    @IsNotEmpty()
    comando:string;

    @IsNotEmpty({ message: 'Obrigatório informa o campos do comando!'})
    campos_do_comando: any

    @IsOptional()
    id_status: number;
    
    @IsOptional()
    observacao: string;

    @IsOptional()
    id_login_insert: number;

    dt_insert: Date;

    @IsNotEmpty({message: 'Obrigatório informar o tipo do comando'})
    id_tipo_comando: number;

    @IsNotEmpty({message: 'Obrigatório informar o modelo'})
    id_modelo: number;
}