/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS for all routes
  app.enableCors({
    origin: (origin, callback) => {
      // Check if the request origin is allowed
      const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(","); // Add more URLs as needed
      if (!origin || allowedOrigins?.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        console.error(`CORS policy blocked request from: ${origin}`); // Log blocked origins for debugging
        callback(new Error('Not allowed by CORS')); // Deny the request
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow sending cookies
  });

  // Serve static files directly from NestJS
  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Uncomment if you need global validation pipes
  // app.useGlobalPipes(new ValidationPipe());

  // Start the server
  await app.listen(process.env.DB_PORT);
}

bootstrap();
