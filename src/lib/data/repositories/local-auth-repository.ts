
import { db } from '../db';
import { IAuthRepository, User } from '../interfaces';

export class LocalAuthRepository implements IAuthRepository {
    async login(email: string, password?: string): Promise<User | null> {
        // simple lookup by email and password
        const user = await db.users.where('email').equals(email).first();

        if (user && password) {
            if (user.password === password) {
                return user;
            }
            return null;
        }

        return user || null;
    }

    async register(user: User): Promise<User> {
        const id = await db.users.add(user);
        return { ...user, id: id.toString() };
    }

    async getCurrentUser(): Promise<User | null> {
        // For local dev without real auth, we could store 'current session' in localStorage using the user ID
        const userId = localStorage.getItem('currentUserId');
        if (!userId) return null;

        // Dexie auto-increment IDs are numbers, but we might store as string in localStorage
        const user = await db.users.get(Number(userId));
        return user || null;
    }

    async logout(): Promise<void> {
        localStorage.removeItem('currentUserId');
    }

    // Helper to set session
    async setSession(userId: number) {
        localStorage.setItem('currentUserId', userId.toString());
    }
}
