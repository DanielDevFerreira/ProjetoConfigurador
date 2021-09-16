import { Injectable, InternalServerErrorException, Res } from '@nestjs/common';
import { Response } from 'express';
import { SendCommandDto } from '../dto/send-command.dto';
import { EnvioRepository } from '../repository/envio.repository';
import { Client } from 'node-rest-client';

@Injectable()
export class EnvioService {

    constructor(
        private envioRepository: EnvioRepository
    ) { }

    async saveCommand(@Res() res: Response, sendDto: SendCommandDto) {
        const result = await this.envioRepository.save(sendDto);

        try {
            if (result) {
              // this.sendCommand(res, result);
            }
        } catch (error) {
            throw new InternalServerErrorException('Erro na conexão com o Bando de dados!');
        }
    }

    async sendCommand(@Res() res: Response, result: any) {
        const { telefone, comando, id_envio } = result;
        const client = new Client();

        const args = {
            data: {
              "authentication": {
                  "username": "FeliepL3F",
                  "password": "Fc@q1w2e3!123"
              },
              "messages": [{
                "sender": "Sender",
                "text": comando,
                "recipients": [{
                 "gsm": `55${telefone}`,
                 "messageId": id_envio
                }]
               }]
              },
            headers: {
              "Content-Type": "application/json",
            }
          };
      
          await client.post("https://api.infobip.com/api/v3/sendsms/json", args, async function(data) {
            res.status(200).send(data);
          });
    }

}
