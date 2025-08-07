import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MicroserviceRpcExceptionFilter } from './filters/rpc-exception.filter';
import { MicroserviceHttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 4001,
      },
    },
  );

  app.useGlobalFilters(new MicroserviceRpcExceptionFilter());
  app.useGlobalFilters(new MicroserviceHttpExceptionFilter());
  await app.listen();

  console.log('Account Microservice is running on port 4001.');
}
void bootstrap();
