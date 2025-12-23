import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrdersService } from './orders.service';
import { CircuitBreakerModule } from '../circuit-breaker/circuit-breaker.module';

@Module({
    imports: [HttpModule, CircuitBreakerModule],
    providers: [OrdersService],
    exports: [OrdersService],
})
export class OrdersModule { }
