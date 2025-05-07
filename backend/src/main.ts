import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip out properties that are not defined in the DTO
      forbidNonWhitelisted: true, // Throw error if properties are not in the DTO
      transform: true, // Automatically transform payloads into DTO instances
    }),
  );

  // Start the app
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
