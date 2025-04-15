import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecommendationServiceModule } from './recommendation-service/recommendation-service.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RecommendationServiceModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
