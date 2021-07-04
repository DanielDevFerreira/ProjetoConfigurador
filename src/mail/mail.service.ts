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
      from: '"Time Fale Flex" <daniel.ferreira@rastreei.com>', // override default from
      subject: 'Bem vindo ao Fale Flex! Confirme seu Email',
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
      from: '"Time Fale Flex" <daniel.ferreira@rastreei.com>', // override default from
      subject: 'Recuperação de senha Fale Flex',
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