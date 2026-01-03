
export interface Amalan {
    id?: number; // Dexie uses number for autoIncrement, but we can map string id if needed. Let's use string for compatibility with mock/future backend.
    // Actually, Dexie autoIncrement is number. If we want compatibility with Supabase (UUID), we should probably use string.
    // Let's stick to the interface defined in AmalanYaumiah.tsx for now but maybe adapt it.
    // Original: id: string;
    name: string;
    category: string;
    completed: boolean;
    time?: string;
    date: string; // ISO Date string YYYY-MM-DD
}

export interface User {
    id?: string;
    email: string;
    password?: string; // Add password field
    nama: string;
    nim: string;
    // Profile details
    divisi?: string;
    departemen?: string;
    tingkatKader?: string;
    generasi?: string;
    jabatan?: string;
    avatar?: string | null;
}

export interface IAmalanRepository {
    getAmalans(date: string): Promise<Amalan[]>;
    toggleAmalan(id: string | number): Promise<void>; // id depends on DB implementation
    addAmalan(amalan: Omit<Amalan, "id">): Promise<string | number>;
    initDailyAmalans(date: string, defaultAmalans: Omit<Amalan, "id" | "date">[]): Promise<Amalan[]>;
}

export interface IAuthRepository {
    login(email: string): Promise<User | null>;
    register(user: User): Promise<User>;
    getCurrentUser(): Promise<User | null>;
    logout(): Promise<void>;
    updateUser(userId: number, updates: Partial<User>): Promise<void>;
    updatePassword(userId: number, oldPassword: string, newPassword: string): Promise<boolean>;
}

export interface Event {
    id?: number;
    title: string;
    description: string;
    date: string;
    time: string;
    end_time?: string;
    location: string;
    creatorId: number;
    category?: string;
    banner?: string;
    participants_count?: number;
}

export interface Attendance {
    id?: number;
    eventId: number;
    userId: number;
    timestamp: string; // ISO string
}

export interface IEventRepository {
    getEvents(): Promise<Event[]>;
    getEvent(id: number): Promise<Event | undefined>;
    createEvent(event: Omit<Event, 'id'>): Promise<number>;
    updateEvent(id: number, updates: Partial<Event>): Promise<void>;
    deleteEvent(id: number): Promise<void>;

    // Attendance
    checkInUser(eventId: number, userId: number): Promise<boolean>; // Returns true if new check-in, false if already Checked-in
    getEventAttendees(eventId: number): Promise<Attendance[]>;
    isUserCheckedIn(eventId: number, userId: number): Promise<boolean>;
}
