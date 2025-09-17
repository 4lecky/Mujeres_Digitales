import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // Endpoint original
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Nuevo endpoint de prueba (No olvidar el servicio en app.service.ts)
  @Get ('status')
  getStatus(): string {
    return 'Holla, todo bien';
  }


}
