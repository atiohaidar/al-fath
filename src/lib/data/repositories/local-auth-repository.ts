import { db } from '../db';
import { User, IAuthRepository, KaderRank } from '../interfaces';

/**
 * Simple password hashing utility.
 * NOTE: In production, use bcrypt or similar secure hashing library!
 * This is a basic implementation for local development only.
 */
const hashPassword = (password: string): string => {
    // Simple hash using btoa + salt for demo purposes
    // In production, use bcrypt: await bcrypt.hash(password, 10)
    return btoa(`alfath_salt_${password}_hash`);
};

const verifyPassword = (password: string, hashedPassword: string): boolean => {
    return hashPassword(password) === hashedPassword;
};

/**
 * Guest user constant to avoid duplication
 */
const GUEST_USER: User = {
    id: 0,
    email: "guest@alfath.com",
    nama: "Tamu",
    nim: "-",
    divisi: "Tamu",
    tingkatKader: "Umum",
    generasi: "-",
    jabatan: "Pengunjung",
    avatar: null
};


export class LocalAuthRepository implements IAuthRepository {
    async login(email: string, password?: string): Promise<User | null> {
        const user = await db.users.where('email').equals(email).first();

        if (user && password) {
            // Verify hashed password
            if (user.password && verifyPassword(password, user.password)) {
                return user;
            }
            return null;
        }

        return user || null;
    }

    async register(user: User): Promise<User> {
        // Hash password before storing
        const userToStore = {
            ...user,
            password: user.password ? hashPassword(user.password) : undefined
        };
        const id = await db.users.add(userToStore);
        return { ...userToStore, id };
    }

    async getCurrentUser(): Promise<User | null> {
        // For local dev without real auth, we could store 'current session' in localStorage using the user ID
        const userId = localStorage.getItem('currentUserId');
        if (!userId) return null;

        if (userId === 'guest') {
            return GUEST_USER;
        }

        // Dexie auto-increment IDs are numbers, but we might store as string in localStorage
        const user = await db.users.get(Number(userId));
        return user || null;
    }

    async getUser(id: number): Promise<User | null> {
        const user = await db.users.get(id);
        return user || null;
    }

    async logout(): Promise<void> {
        localStorage.removeItem('currentUserId');
    }

    // Helper to set session
    async setSession(userId: number): Promise<void> {
        localStorage.setItem('currentUserId', userId.toString());
    }

    async updateUser(userId: number, updates: Partial<User>): Promise<void> {
        await db.users.update(userId, updates);
    }

    async updatePassword(userId: number, oldPassword: string, newPassword: string): Promise<boolean> {
        const user = await db.users.get(userId);
        if (!user) return false;

        // Verify old password using hash comparison
        if (!user.password || !verifyPassword(oldPassword, user.password)) {
            return false;
        }

        // Update to new hashed password
        await db.users.update(userId, { password: hashPassword(newPassword) });
        return true;
    }

    async getKaderRankings(): Promise<KaderRank[]> {
        // Return mock data for now, but through repository
        return [
            { rank: 1, name: "Fatimah Azzahra", divisi: "PSDM", score: 98 },
            { rank: 2, name: "Muhammad Rizki", divisi: "Kaderisasi", score: 95 },
            { rank: 3, name: "Aisyah Putri", divisi: "Medkominfo", score: 92 },
            { rank: 4, name: "Tio Haidar Hanif", divisi: "Medkominfo", score: 88 },
            { rank: 5, name: "Umar Abdullah", divisi: "Syiar", score: 85 },
            { rank: 6, name: "Khadijah Sari", divisi: "Sosmas", score: 82 },
            { rank: 7, name: "Bilal Ibrahim", divisi: "PSDM", score: 80 },
            { rank: 8, name: "Maryam Husna", divisi: "Kaderisasi", score: 78 },
            { rank: 9, name: "Yusuf Hakim", divisi: "Syiar", score: 75 },
            { rank: 10, name: "Sarah Amelia", divisi: "Sosmas", score: 72 },
        ];
    }

    async loginAsGuest(): Promise<User> {
        localStorage.setItem('currentUserId', 'guest');
        return GUEST_USER;
    }
}
