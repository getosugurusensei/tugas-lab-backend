import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config= new DocumentBuilder()
  .setTitle ('Latihan nest JS kelas - B')
  .setDescription('M. FIKRI HAIKAL AYATULLAH,105841105522')
  .setVersion ('0.1')
  .addTag ('LATIHAN 1')
  .addBearerAuth()
  .build();
const documenFactory = () => SwaggerModule.createDocument(app,config);
SwaggerModule.setup ('api-docs',app,documenFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
