import { Inject, Injectable } from '@nestjs/common';
import { CreateRecommendationServiceDto } from './dto/create-recommendation-service.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RecommendationServiceService {
  constructor(
    @Inject('RECOMMENDATION_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  create(dto: CreateRecommendationServiceDto) {
    return this.client.send({ cmd: 'create_recommendation' }, dto);
  }
}
