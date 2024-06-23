/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS for all routes
  app.enableCors({
    origin: (origin, callback) => {
      // Check if the request origin is allowed
      const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(","); // Add more URLs as needed
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error('Not allowed by CORS')); // Deny the request
      }
    }, // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow sending cookies
  });

  // Serve static files directly from NestJS
  app.useStaticAssets(join(__dirname, '..','..', 'uploads'), {
    prefix: '/uploads/',
  });

  //app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
