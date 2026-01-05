import { db } from '../db';
import { Amalan, IAmalanRepository, User, IAuthRepository, Event, Attendance, IEventRepository, KaderRank } from '../interfaces';

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
        return { ...user, id };
    }

    async getCurrentUser(): Promise<User | null> {
        // For local dev without real auth, we could store 'current session' in localStorage using the user ID
        const userId = localStorage.getItem('currentUserId');
        if (!userId) return null;

        if (userId === 'guest') {
            return {
                id: 0, // 0 for guest
                email: "guest@alfath.com",
                nama: "Tamu",
                nim: "-",
                divisi: "Tamu",
                tingkatKader: "Umum",
                generasi: "-",
                jabatan: "Pengunjung",
                avatar: null
            };
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
    async setSession(userId: number) {
        localStorage.setItem('currentUserId', userId.toString());
    }

    async updateUser(userId: number, updates: Partial<User>): Promise<void> {
        await db.users.update(userId, updates);
    }

    async updatePassword(userId: number, oldPassword: string, newPassword: string): Promise<boolean> {
        const user = await db.users.get(userId);
        if (!user) return false;

        // Verify old password
        if (user.password !== oldPassword) {
            return false;
        }

        // Update to new password
        await db.users.update(userId, { password: newPassword });
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
        const guestUser: User = {
            id: 0, // 0 for guest
            email: "guest@alfath.com",
            nama: "Tamu",
            nim: "-",
            divisi: "Tamu",
            tingkatKader: "Umum",
            generasi: "-",
            jabatan: "Pengunjung",
            avatar: null
        };
        localStorage.setItem('currentUserId', 'guest');
        return guestUser;
    }
}
