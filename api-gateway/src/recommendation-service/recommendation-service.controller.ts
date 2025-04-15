import { Body, Controller, Post } from '@nestjs/common';
import { RecommendationServiceService } from './recommendation-service.service';
import { CreateRecommendationServiceDto } from './dto/create-recommendation-service.dto';

@Controller('/recommendation')
export class RecommendationServiceController {
  constructor(
    private readonly recommendationServiceService: RecommendationServiceService,
  ) {}

  @Post()
  createRecommendation(
    @Body() createRecommendationServiceDto: CreateRecommendationServiceDto,
  ) {
    return this.recommendationServiceService.create(
      createRecommendationServiceDto,
    );
  }
}
