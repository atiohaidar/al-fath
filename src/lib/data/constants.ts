/**
 * Application-wide constants
 */

import { Amalan } from './interfaces';

/**
 * Default Amalan template for daily initialization.
 * Used by both Index and AmalanYaumiah pages.
 */
export const DEFAULT_AMALAN_TEMPLATE: Omit<Amalan, "id" | "date">[] = [
    { name: "Sholat Subuh", category: "Sholat Wajib", completed: false, time: "05:00" },
    { name: "Sholat Dhuha", category: "Sholat Sunnah", completed: false },
    { name: "Sholat Dzuhur", category: "Sholat Wajib", completed: false, time: "12:00" },
    { name: "Sholat Ashar", category: "Sholat Wajib", completed: false, time: "15:00" },
    { name: "Sholat Maghrib", category: "Sholat Wajib", completed: false, time: "18:00" },
    { name: "Sholat Isya", category: "Sholat Wajib", completed: false, time: "19:00" },
    { name: "Tilawah 1 Halaman", category: "Al-Quran", completed: false },
    { name: "Dzikir Pagi", category: "Dzikir", completed: false },
    { name: "Dzikir Petang", category: "Dzikir", completed: false },
    { name: "Sholat Tahajud", category: "Sholat Sunnah", completed: false },
    { name: "Sedekah", category: "Amal", completed: false },
    { name: "Puasa Sunnah", category: "Puasa", completed: false },
];

/**
 * Category colors for amalan display
 */
export const AMALAN_CATEGORY_COLORS: Record<string, string> = {
    "Sholat Wajib": "gradient-green",
    "Sholat Sunnah": "gradient-blue",
    "Al-Quran": "gradient-yellow",
    "Dzikir": "gradient-red",
    "Amal": "bg-alfath-green",
    "Puasa": "bg-alfath-blue",
    "Lainnya": "bg-muted"
};

/**
 * Category icons for amalan display
 */
export const AMALAN_CATEGORY_ICONS: Record<string, string> = {
    "Sholat Wajib": "🕌",
    "Sholat Sunnah": "🏠",
    "Al-Quran": "📖",
    "Dzikir": "🤲",
    "Amal": "🤲",
    "Puasa": "🌙",
    "Lainnya": "🕌"
};
