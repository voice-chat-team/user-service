import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user.v1',
        protoPath: 'node_modules/@voice-chat/contracts/proto/user.proto',
        url: 'localhost:50501',
      },
    },
  );

  await app.listen();
}
bootstrap();
