import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    async getUserProfile() {
        // Simulate a fast, stable database call
        return {
            id: 1,
            name: 'John Doe',
            plan: 'Premium',
            email: 'john.doe@example.com'
        };
    }
}
