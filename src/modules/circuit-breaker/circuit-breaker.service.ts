import { Injectable, Logger } from '@nestjs/common';
import CircuitBreaker from 'opossum';

@Injectable()
export class CircuitBreakerService {
    private readonly logger = new Logger(CircuitBreakerService.name);

    // This method wraps any Promise (like an HTTP call) with protection
    createBreaker(action: any, fallback: any) {
        const options = {
            timeout: 3000, // If action takes > 3s, fail
            errorThresholdPercentage: 50, // If 50% of reqs fail, open circuit
            resetTimeout: 10000, // After 10s, try again (Half-Open)
        };

        const breaker = new CircuitBreaker(action, options);

        // Logging for visibility
        breaker.on('open', () => this.logger.warn('🔴 Circuit OPEN: Downstream is dead.'));
        breaker.on('halfOpen', () => this.logger.log('🟡 Circuit HALF-OPEN: Testing downstream...'));
        breaker.on('close', () => this.logger.log('🟢 Circuit CLOSED: Downstream is healthy.'));

        // If it fails, define what to return
        breaker.fallback(fallback);

        return breaker;
    }
}
