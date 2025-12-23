import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { UsersModule } from '../users/users.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
    imports: [UsersModule, OrdersModule],
    controllers: [DashboardController],
})
export class DashboardModule { }
