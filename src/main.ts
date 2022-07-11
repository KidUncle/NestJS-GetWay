import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { generateDocument } from './doc';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

declare const module: any

async function bootstrap() {
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI
  })
  app.useGlobalInterceptors(new TransformInterceptor())
  generateDocument(app)
  await app.listen(3000);
}
bootstrap();
