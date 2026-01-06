import { db } from '../db';
import { Event, Attendance, IEventRepository } from '../interfaces';

export class LocalEventRepository implements IEventRepository {

    // --- Event CRUD ---

    async getEvents(): Promise<Event[]> {
        return await db.events.toArray();
    }

    async getEvent(id: number): Promise<Event | undefined> {
        return await db.events.get(id);
    }

    async createEvent(event: Omit<Event, 'id'>): Promise<number> {
        return await db.events.add(event as Event);
    }

    async updateEvent(id: number, updates: Partial<Event>): Promise<void> {
        await db.events.update(id, updates);
    }

    async deleteEvent(id: number): Promise<void> {
        await db.events.delete(id);
        // Also delete associated attendance records
        await db.attendance.where('eventId').equals(id).delete();
    }

    // --- Attendance Logic ---

    async checkInUser(eventId: number, userId: number): Promise<boolean> {
        const existing = await db.attendance
            .where('[eventId+userId]')
            .equals([eventId, userId])
            .first();

        if (existing) {
            return false; // Already checked in
        }

        await db.attendance.add({
            eventId,
            userId,
            timestamp: new Date().toISOString()
        } as Attendance);

        return true;
    }

    async getEventAttendees(eventId: number): Promise<Attendance[]> {
        return await db.attendance.where('eventId').equals(eventId).toArray();
    }

    async isUserCheckedIn(eventId: number, userId: number): Promise<boolean> {
        const record = await db.attendance
            .where('[eventId+userId]')
            .equals([eventId, userId])
            .first();
        return !!record;
    }
}
