
import { LocalAmalanRepository } from '../lib/data/repositories/local-amalan-repository';
import { LocalAuthRepository } from '../lib/data/repositories/local-auth-repository';
import { LocalEventRepository } from '../lib/data/repositories/local-event-repository';

// Singleton instances
const amalanRepository = new LocalAmalanRepository();
const authRepository = new LocalAuthRepository();
const eventRepository = new LocalEventRepository();

export const useRepositories = () => {
    return {
        amalanRepository,
        authRepository,
        eventRepository
    };
};
