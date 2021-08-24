import { Body, Controller, Post } from '@nestjs/common';
import { SendCommandDto } from '../dto/send-command.dto';
import { EnvioService } from '../service/envio.service';
import { Client } from 'node-rest-client';

@Controller('envio')
export class EnvioController {

    constructor(
        private envioService: EnvioService
    ){}

    @Post()
    sendCommand(@Body() sendDto: SendCommandDto){

        const {telefone, comando} = sendDto;
        const client = new Client();

        const args = {
            data: {
              content: comando,
              receivers: telefone
            },
            headers: {
              "Content-Type": "application/json",
              "auth-key": '365e2eb8-21de-4a3e-8ee5-811b6507d22d'
            }
          };
      
         client.post("https://sms.comtele.com.br/api/v2/send", args, function(data) {
            console.log(data);
          });   

          if(client){
              return "Comando enviado com sucesso!";
          }
    }
}
