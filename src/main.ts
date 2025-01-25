import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import { AppModule } from './app.module';

async function bootstrap() {
    // Dev
    // const app = await NestFactory.create(AppModule, { cors: { origin: 'http://localhost:3001' } });
    // Prod
    const app = await NestFactory.create(AppModule, { cors: { origin: 'https://agricola-cliente.vercel.app/' } });

    app.enableCors({ origin: 'https://agricola-cliente.vercel.app/' });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true
        })
    );

    await app.listen(process.env.PORT || 3000);
}
bootstrap();
