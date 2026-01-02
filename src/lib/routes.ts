/**
 * Application route constants
 * Centralized route definitions to avoid hardcoded strings
 */

export const ROUTES = {
    // Public routes
    LANDING: "/",
    AUTH: "/auth",

    // App routes (protected)
    APP: {
        HOME: "/app",
        AMALAN: "/app/amalan",
        EVENTS: "/app/events",
        INFO: "/app/info",
        PROFILE: "/app/profile",
        KADER_OF_MONTH: "/app/kader-of-month",

        // Profile sub-routes
        PROFILE_STATISTIK: "/app/profile/statistik",
        PROFILE_RIWAYAT_GEN: "/app/profile/riwayat-gen",
        PROFILE_RIWAYAT_PANITIA: "/app/profile/riwayat-panitia",
        PROFILE_RIWAYAT_KEGIATAN: "/app/profile/riwayat-kegiatan",
        PROFILE_SETTINGS: "/app/profile/settings",
    },

    // Error routes
    NOT_FOUND: "/404",
} as const;

/**
 * Helper function to build dynamic routes
 * Example: buildRoute(ROUTES.APP.EVENTS, { id: '123' }) => '/app/events/123'
 */
export const buildRoute = (route: string, params?: Record<string, string | number>) => {
    if (!params) return route;

    let finalRoute = route;
    Object.entries(params).forEach(([key, value]) => {
        finalRoute = finalRoute.replace(`:${key}`, String(value));
    });

    return finalRoute;
};

/**
 * Type-safe navigation helper
 */
export type AppRoute = typeof ROUTES[keyof typeof ROUTES] | typeof ROUTES.APP[keyof typeof ROUTES.APP];
