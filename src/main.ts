import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = parseInt(process.env.PORT, 10) || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
  await app.listen(PORT);
}
bootstrap();
