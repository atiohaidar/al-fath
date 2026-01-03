
import Dexie, { Table } from 'dexie';
import { Amalan, User, Event, Attendance } from './interfaces';

export class AlFathDatabase extends Dexie {
    amalans!: Table<Amalan, number>; // Using number for auto-increment ID locally
    users!: Table<User, number>; // Using number for auto-increment ID locally
    events!: Table<Event, number>;
    attendance!: Table<Attendance, number>;

    constructor() {
        super('AlFathDB');
        this.version(1).stores({
            amalans: '++id, date, category, [date+category]', // Indexing for query performance
            users: '++id, email',
            events: '++id, date, creatorId',
            attendance: '++id, eventId, userId, [eventId+userId]',
        });
    }
}

export const db = new AlFathDatabase();
