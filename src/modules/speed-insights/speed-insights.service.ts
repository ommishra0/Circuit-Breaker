import { Injectable, OnModuleInit } from '@nestjs/common';

/**
 * SpeedInsightsService
 *
 * Integrates Vercel Speed Insights into the NestJS application.
 * This service initializes Speed Insights tracking when the application module loads.
 *
 * Speed Insights will automatically track Core Web Vitals and send the data to Vercel
 * for performance monitoring and analysis.
 */
@Injectable()
export class SpeedInsightsService implements OnModuleInit {
  /**
   * OnModuleInit lifecycle hook
   * Initializes Speed Insights when the module is initialized.
   *
   * Note: This initialization is primarily useful for server-side tracking.
   * For client-side tracking in HTML pages served by this application,
   * the Speed Insights script tag should be added to the HTML template.
   */
  onModuleInit(): void {
    try {
      // Import the Speed Insights function dynamically
      // This is done at runtime to ensure it only initializes when needed
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      import('@vercel/speed-insights').then(({ injectSpeedInsights }) => {
        injectSpeedInsights();
      });
    } catch (error) {
      // Speed Insights is optional - if it fails to initialize,
      // the application should continue to function normally
      console.warn('Speed Insights initialization skipped or failed:', error);
    }
  }
}
