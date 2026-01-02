
import Dexie, { Table } from 'dexie';
import { Amalan, User } from './interfaces';

export class AlFathDatabase extends Dexie {
    amalans!: Table<Amalan, number>; // Using number for auto-increment ID locally
    users!: Table<User, number>; // Using number for auto-increment ID locally

    constructor() {
        super('AlFathDB');
        this.version(1).stores({
            amalans: '++id, date, category, [date+category]', // Indexing for query performance
            users: '++id, email',
        });
    }
}

export const db = new AlFathDatabase();
