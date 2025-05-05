import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: '*',  // או תוכל להחליף עם URL מסוים אם אתה רוצה להגביל
  }));
  app.enableCors({
    origin: 'http://localhost:5173', // הדומיין של הפרונטנד שלך
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000,()=>{
    console.log('✅ Server is running on http://localhost:3000')
  });
}
bootstrap();
