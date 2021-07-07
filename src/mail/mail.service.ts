import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';


@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(name: string, email: string, tokenConfirm: string) {
    
    const url = `http://localhost:4200/account/two-step-verification`;
    const anoAtual = new Date().getFullYear();
 
    await this.mailerService.sendMail({
      to: email,
      from: '"Bem vindo ao Configurador" <daniel.ferreira@rastreei.com>', // override default from
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
    
    const url = `http://localhost:4200/account/change-password?token=${tokenConfirm}`;
    const anoAtual = new Date().getFullYear();

    await this.mailerService.sendMail({
      to: email,
<<<<<<< HEAD
      from: '"Configurador Recuperação de senha" <daniel.ferreira@rastreei.com>', // override default from
=======
      from: '"Recuperação de senha Configurador" <daniel.ferreira@rastreei.com>', // override default from
>>>>>>> aaab561ac2e7750f161635cf8243fc4f682a7f42
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