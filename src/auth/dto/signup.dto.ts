import { IsDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MATCHES } from "class-validator";

export class SignUpDto {
    
    id_tipo_login: number;

    @IsNotEmpty({message: 'Campo login obrigatório'})
    username: string;

    @IsNotEmpty({message: 'Campo senha obrigatório'})
    //Mínimo de oito caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial:
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{
        message: 'Senha inválida, verifique as solicitações para criar a senha!'
    }) 
    password: string;

    @IsNotEmpty({message: 'Campo nome obrigatório'})
    name: string;

    @IsNotEmpty({message: 'Campo email obrigatório'})
    email: string;

    @IsString()
    @IsOptional()
    observacao: string;

    @IsOptional()
    id_login_insert: number;

    dt_insert: string;
    
}