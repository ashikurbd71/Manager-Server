/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

// Load environment variables
dotenv.config();

async function bootstrap() {
  // Ensure uploads directory exists
  const uploadsDir = join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS for all routes
  app.enableCors({
    origin: (origin, callback) => {
      // Hardcoded allowed origins
      const allowedOrigins = [
        'http://localhost:5173',
        'https://manager-beta.vercel.app'
      ];
      if (!origin || allowedOrigins.includes(origin)) {
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
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Uncomment if you need global validation pipes
  // app.useGlobalPipes(new ValidationPipe());

  // Start the server
  await app.listen(3000);
}

bootstrap();
