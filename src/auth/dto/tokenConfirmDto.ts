import { IsNotEmpty } from "class-validator";

export class TokenConfirmDTO{
    @IsNotEmpty({message: 'É obrigatório informar o token !'})
    token: string;
}