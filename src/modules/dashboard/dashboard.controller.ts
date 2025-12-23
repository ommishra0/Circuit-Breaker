import { Controller, Get } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { UsersService } from '../users/users.service';

@Controller('dashboard')
export class DashboardController {
    constructor(
        private usersService: UsersService,
        private ordersService: OrdersService
    ) { }

    @Get()
    async getDashboard() {
        const start = Date.now();

        // PARALLEL EXECUTION
        // We fetch both at the same time.
        // Even if ordersService fails, the circuit breaker returns the fallback,
        // so this Promise.all never actually crashes!
        const [userData, orderData] = await Promise.all([
            this.usersService.getUserProfile(),
            this.ordersService.getOrders(),
        ]);

        return {
            timestamp: new Date().toISOString(),
            latency: `${Date.now() - start}ms`,
            user: userData,
            orders: orderData, // Might be the real data, or the fallback object
        };
    }
}
