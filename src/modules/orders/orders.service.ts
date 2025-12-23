import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CircuitBreakerService } from '../circuit-breaker/circuit-breaker.service';

@Injectable()
export class OrdersService {
    private breaker: any; // Using any for Breaker type as it's dynamic from Opossum

    constructor(
        private readonly httpService: HttpService,
        private readonly cbService: CircuitBreakerService
    ) {
        // We define the risky action: Calling an external API
        const fetchOrders = async () => {
            // Simulate random failure (50% chance to fail)
            if (Math.random() > 0.5) {
                throw new Error('Downstream Service Timeout');
            }
            // Simulate API call
            const response = await firstValueFrom(
                this.httpService.get('https://jsonplaceholder.typicode.com/todos')
            );
            return response.data.slice(0, 5); // Return first 5 items
        };

        // We define the Fallback: What to return if it fails
        const fallbackResponse = () => {
            return { status: 'partial_failure', orders: [], note: 'Orders temporarily unavailable' };
        };

        // Wrap the action in the breaker
        this.breaker = this.cbService.createBreaker(fetchOrders, fallbackResponse);
    }

    async getOrders() {
        // Execute the breaker
        return this.breaker.fire();
    }
}
