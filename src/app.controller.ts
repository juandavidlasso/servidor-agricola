import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
    @Get('/')
    root(@Res() res: Response): void {
        res.status(200).send('Pagina no accesible, ingrese a https://agricola-cliente.vercel.app/user/login');
    }
}
