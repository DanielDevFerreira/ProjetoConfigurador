import { IsNotEmpty } from "class-validator";

export class SendCommandDto{

    //telefone para enviar o sms
    @IsNotEmpty({message: 'Erro ao cadastrar!'})
    telefone: any;

    //mensagem a ser enviado para o telefone informado
    @IsNotEmpty({message: 'Informa os campos do comando!'})
    comando: string;
    
    
}