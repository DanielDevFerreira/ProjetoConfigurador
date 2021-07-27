import {IsNotEmpty} from "class-validator";

export class CommandFieldsDto {

    @IsNotEmpty({message: 'Erro ao cadastrar!'})
    id_comando: any;

    @IsNotEmpty({message: 'Informa os campos do comando!'})
    quantities: any
}