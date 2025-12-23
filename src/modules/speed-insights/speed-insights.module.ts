import { Module } from '@nestjs/common';
import { SpeedInsightsService } from './speed-insights.service';

@Module({
  providers: [SpeedInsightsService],
  exports: [SpeedInsightsService],
})
export class SpeedInsightsModule {}
