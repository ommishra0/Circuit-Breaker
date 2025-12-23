import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SpeedInsightsModule } from './modules/speed-insights/speed-insights.module';

@Module({
  imports: [DashboardModule, SpeedInsightsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
