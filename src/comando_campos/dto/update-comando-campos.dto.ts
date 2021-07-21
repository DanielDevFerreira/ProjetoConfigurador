import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateCommandFieldsDto{
    
    @IsNotEmpty({message: ' Informe o campo!'})
    campo: string;

    @IsNotEmpty({message: ' Informe o label!'})
    label: string;

    @IsNotEmpty({message: ' Informe o tipo!'})
    tipo: string;

    @IsNotEmpty({message: ' Informe se o campo é obrigatório!'})
    obrigatorio: string;

    @IsOptional()
    campos_do_comando: any;

    @IsOptional()
    id_status: number;
    
    @IsOptional()
    observacao: string;

    @IsOptional()
    id_login_update: number;

    dt_update: Date;

    @IsNotEmpty({message: 'informar o id do comando!'})
    id_comando: number
}