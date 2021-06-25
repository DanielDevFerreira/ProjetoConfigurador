import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';


@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(name: string, email: string, tokenConfirm: string) {
    
    const url = `example.com/auth/confirm`;
    const anoAtual = new Date().getFullYear();
 
    await this.mailerService.sendMail({
      to: email,
      from: '"Configurador" <daniel.ferreira@rastreei.com>', // override default from
      subject: 'Bem vindo ao Configurador! Confirme seu Email',
      template: './confirmation', // ✅ template found again in v1.6.0
      context: {
        name: name,
        url,
        tokenConfirm,
        anoAtual
      },
    });
  }

  async sendForgotPassword(name: string, email: string, tokenConfirm: string) {
    
    const url = `http://localhost:4200/auth/forgotPassword?token=${tokenConfirm}`;
    const anoAtual = new Date().getFullYear();

    await this.mailerService.sendMail({
      to: email,
      from: '"Configurador" <daniel.ferreira@rastreei.com>', // override default from
      subject: 'Recuperação de senha Configurador',
      template: './forgotPassword', // ✅ template found again in v1.6.0
      context: {
        name: name,
        url,
        tokenConfirm,
        anoAtual
      },
    });
  }
}