import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin:'https://front-end-9tr2.onrender.com ', // Specify the allowed origin(s)
    methods: 'GET,PUT,POST,DELETE', // Specify which methods are allowed
    allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers
    credentials: true, // Allow sending cookies or other credentials
  }
  );
  await app.listen(5000);
}
bootstrap();
