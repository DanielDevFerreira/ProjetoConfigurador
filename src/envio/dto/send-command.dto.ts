import { IsNotEmpty } from "class-validator";

export class SendCommandDto{

    //telefone para enviar o sms
    @IsNotEmpty({message: 'Erro ao cadastrar!'})
    telefone: any;

    //mensagem a ser enviado para o telefone informado
    @IsNotEmpty({message: 'Informa os campos do comando!'})
    comando: string;

    @IsNotEmpty({message: 'Informar o modelo!'})
    id_modelo: number;

    @IsNotEmpty({message: 'Informa o tipo comando!'})
    id_tipo_comando: number;

    @IsNotEmpty({message: 'ID usuário inválido!'})
    id_usuario: number;   
}