import { Module } from '@nestjs/common';
import { RecommendationServiceService } from './recommendation-service.service';
import { RecommendationServiceController } from './recommendation-service.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RECOMMENDATION_SERVICE',
        transport: Transport.TCP, // TCP transport
        options: {
          host: '127.0.0.1',
          port: 3001,
        },
      },
    ]),
    RecommendationServiceModule,
  ],
  controllers: [RecommendationServiceController],
  providers: [RecommendationServiceService],
})
export class RecommendationServiceModule {}
