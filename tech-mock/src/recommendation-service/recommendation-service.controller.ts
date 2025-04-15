import { Controller } from '@nestjs/common';
import { RecommendationServiceService } from './recommendation-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class RecommendationServiceController {
  constructor(
    private readonly recommendationService: RecommendationServiceService,
  ) {}

  @MessagePattern({ cmd: 'create_recommendation' })
  async getRecommendation(data: any) {
    return await this.recommendationService.generate(data);
  }
}
