import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import prismaService from './prisma';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth.moodule';

@Module({
  imports: [
    JwtModule.register({
      secret:"halloworld",
      global: true
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
