import { Body, Controller, Get, Post, Redirect, Res, UseGuards } from '@nestjs/common';
import { SendCommandDto } from '../dto/send-command.dto';
import { EnvioService } from '../service/envio.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('envio')
export class EnvioController {

    constructor(
        private envioService: EnvioService
    ){}

    // @Post()
    // async sendCommand(@Res() response: Response, @Body() sendDto: SendCommandDto): Promise<any>{

    //     const {telefone, comando} = sendDto;
    //     const client = new Client();

    //     const args = {
    //         data: {
    //           content: comando,
    //           receivers: telefone
    //         },
    //         headers: {
    //           "Content-Type": "application/json",
    //           "auth-key": '365e2eb8-21de-4a3e-8ee5-811b6507d22d'
    //         }
    //       };
      
    //       await client.post("https://sms.comtele.com.br/api/v2/send", args, async function(data) {
    //         response.status(200).send(data);
    //       });   
    // }

    @Post()
    sendCommand(@Res() res: Response, @Body() sendDto: SendCommandDto){
       this.envioService.saveCommand(res, sendDto);  
    }
}
