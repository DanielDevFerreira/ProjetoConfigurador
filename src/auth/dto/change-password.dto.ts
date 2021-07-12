import { IsNotEmpty, Matches } from "class-validator";

export class ChangePasswordDto {

    @IsNotEmpty({message: ' '})
    //Mínimo de oito caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial:
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{
        message: 'Senha inválida, verifique as solicitações para criar a senha!'
    }) 
    password: string;

    @IsNotEmpty()
    id: number;

}