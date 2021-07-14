import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { SignInDto } from 'src/auth/dto/signin.dto';
import { tb_usuario_login } from 'src/auth/entity/auth.entity';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { SignUpDto } from '../dto/signup.dto';
import { TokenConfirmDTO } from '../dto/tokenConfirmDto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { verifyToken } from '../dto/verifyToken.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authServive: AuthService
    ){}

//================================================================================

    @Post('createUser')
    @UseGuards(AuthGuard())
    createUser(@Body() createUserDto: CreateUserDto): Promise<tb_usuario_login>{
        return this.authServive.createUser(createUserDto);
    }

//================================================================================

    @Post('signup')
    async signup(@Body() signDto: SignUpDto, @Res({passthrough: true}) response: Response){
        const result =  await this.authServive.signUp(signDto);
        response.status(HttpStatus.OK).json({
            result: result
        }) 
    }

//================================================================================

/**
 * 
 * Caso precisar pegar somento 1 parâmetro, existe 3 maneiras de realizar o processo
 * 1º usando DTO
 * 2º usando posição ex: tokenConfirm['tokenConfirm']
 * 3º usando decorator @param(), passando o parâmetro na URL e no @param
 */
    @Post('email-active')
    async emailActive(@Body() tokenConfirmDto: TokenConfirmDTO, @Res({passthrough: true}) response: Response){
        const { token } = tokenConfirmDto;
        const result = await this.authServive.emailActive(token);
        response.status(HttpStatus.OK).json({
            result: result
        }) 
    }

    // @Post('email-active/:token')
    // async emailActive(@Param("token") token:number){
    //     console.log(token);
    //     // console.log(tokenConfirm['tokenConfirm']);
    //     //return this.authServive.emailActive(tokenConfirm);
    // }

    // @Post('email-active')
    // async emailActive(@Body() tokenConfirm: number): Promise<{message: string}>{
    //     return this.authServive.emailActive(tokenConfirm)      
    // }

//================================================================================

    @Post('forgot-password')
    async forgetPassword(@Body() forgotPasswordDTO: ForgotPasswordDto){
        await this.authServive.forgotPassword(forgotPasswordDTO);
    }

//================================================================================

    @Post('change-password')
    async changePassword(@Body() changePasswordDto: ChangePasswordDto){
      // console.log(changePasswordDto);
        await this.authServive.changePassword(changePasswordDto);
    }

//================================================================================

    @Post('verify-token')
    async verifyToken(@Body() tokendto: verifyToken): Promise<boolean>{
      //  console.log(await this.authServive.verifyToken(tokendto));
        return this.authServive.verifyToken(tokendto);
    }
//================================================================================

    @Post('reset-password')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto){
        return this.authServive.resetPassword(resetPasswordDto);
    }


//================================================================================

    @Post('signin')
    async signIn(@Body() authSignInDto: SignInDto, @Res({passthrough: true}) response: Response){
        const token =  await this.authServive.signIn(authSignInDto);

        // response.cookie('token', token, {httpOnly: true});
        response.status(HttpStatus.OK).json({
            token: token
        })    
    }
//====================================================================================
    @Get('/:id')
    async userAccount(@Param('id') id:string): Promise<tb_usuario_login>{
       // console.log(await this.authServive.userAccount(id));
        return await this.authServive.userAccount(id);
    }
//======================================================================================
    @Patch('/:id')
    async updateAccount(@Param('id') id:string, @Body() myAccount: UpdateAccountDto){
       // console.log(myAccount);
        return this.authServive.updateAccount(id, myAccount);
    }

}

