import { Module, Global } from '@nestjs/common';
import { CircuitBreakerService } from './circuit-breaker.service';

@Global() // Make it global so we don't have to import it everywhere, or just export it.
// The user didn't specify Global, but for a utility module like this, generic export is fine.
// I wont make it Global to follow strict dependency injection patterns unless needed.
@Module({
    providers: [CircuitBreakerService],
    exports: [CircuitBreakerService],
})
export class CircuitBreakerModule { }
