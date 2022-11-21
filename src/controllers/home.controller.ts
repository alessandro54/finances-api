import { Controller, Request, Get } from '@nestjs/common';

@Controller()
export class HomeController {
  @Get()
  greet(): { message: string } {
    return {
      message: 'Welcome to the Leasing API',
    };
  }
}
