import { PartialType } from '@nestjs/mapped-types';
import { CreateRecommendationServiceDto } from './create-recommendation-service.dto';

export class UpdateRecommendationServiceDto extends PartialType(
  CreateRecommendationServiceDto,
) {
  id: number;
}
