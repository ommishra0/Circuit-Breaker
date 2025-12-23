import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(private readonly httpService: HttpService) { }

    async getUserProfile() {
        // Call external API (JSONPlaceholder)
        // This makes it a "Real" microservice call!
        const { data } = await firstValueFrom(
            this.httpService.get('https://jsonplaceholder.typicode.com/users/1')
        );
        return data;
    }
}
