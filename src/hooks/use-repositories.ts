
import { LocalAmalanRepository } from '../lib/data/repositories/local-amalan-repository';
import { LocalAuthRepository } from '../lib/data/repositories/local-auth-repository';

// Singleton instances
const amalanRepository = new LocalAmalanRepository();
const authRepository = new LocalAuthRepository();

export const useRepositories = () => {
    return {
        amalanRepository,
        authRepository,
    };
};
