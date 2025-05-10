import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { GeneralExceptionFilter } from './common/filters/general-exception.filter';
import helmet from 'helmet';
import { LoggerService } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const logger = new LoggerService();

  app.useGlobalFilters(
    new HttpExceptionFilter(logger),
    new GeneralExceptionFilter(logger),
  ); // Use the custom exception filter

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v', // Prefix for the versioned routes
  });

  app.use(helmet()); // Use helmet for security

  app.enableCors({
    origin: ['http://localhost:3000'], // replace with your frontend domain(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Start the app and catch any potential rejection
  await app.listen(process.env.PORT ?? 3000).catch((err) => {
    console.error('Error starting server:', err);
  });
}
// Wrap the call to bootstrap with a rejection handler
bootstrap().catch((err) => {
  console.error('Unhandled rejection in bootstrap:', err);
});
