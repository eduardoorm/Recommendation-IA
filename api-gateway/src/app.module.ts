import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecommendationServiceModule } from './recommendation-service/recommendation-service.module';

@Module({
  imports: [RecommendationServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
