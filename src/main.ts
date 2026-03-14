import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable compression middleware
  app.use(compression());

  // Set global prefix for routes
  app.setGlobalPrefix('api/v1');

  // Enable CORS for all origins
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('EXETAT Mastery API')
    .setDescription('API for EXETAT Prep App - NestJS with Sequelize')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  });

  // Serve Swagger UI at /api/v1/docs (matches the global prefix)
  SwaggerModule.setup('api/v1/docs', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server running on http://localhost:${process.env.PORT ?? 3000}`);
}
void bootstrap();
