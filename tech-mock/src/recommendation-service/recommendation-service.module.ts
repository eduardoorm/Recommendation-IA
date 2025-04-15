import { Module } from '@nestjs/common';
import { RecommendationServiceService } from './recommendation-service.service';
import { RecommendationServiceController } from './recommendation-service.controller';

@Module({
  controllers: [RecommendationServiceController],
  providers: [RecommendationServiceService],
})
export class RecommendationServiceModule {}
