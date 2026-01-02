
import { db } from '../db';
import { Amalan, IAmalanRepository } from '../interfaces';

export class LocalAmalanRepository implements IAmalanRepository {
    async getAmalans(date: string): Promise<Amalan[]> {
        return await db.amalans.where('date').equals(date).toArray();
    }

    async toggleAmalan(id: number): Promise<void> {
        const amalan = await db.amalans.get(id);
        if (amalan) {
            await db.amalans.update(id, { completed: !amalan.completed });
        }
    }

    async addAmalan(amalan: Omit<Amalan, 'id'>): Promise<number> {
        return await db.amalans.add(amalan as Amalan);
    }

    async initDailyAmalans(date: string, defaultAmalans: Omit<Amalan, 'id' | 'date'>[]): Promise<Amalan[]> {
        const existing = await this.getAmalans(date);
        if (existing.length > 0) {
            return existing; // Already initialized
        }

        const newAmalans = defaultAmalans.map(a => ({
            ...a,
            date,
            // Ensure completed is false for new day unless specified otherwise in template? 
            // Usually defaults are static, so we take them as is.
        }));

        // Bulk add
        await db.amalans.bulkAdd(newAmalans as Amalan[]);
        return await this.getAmalans(date);
    }
}
