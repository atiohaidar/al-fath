import { useState, useEffect } from 'react';

/**
 * Custom hook for parallax effect
 * @param speed - The speed factor of the parallax effect. 
 *                Positive values move slower (background), 
 *                Negative values move faster (foreground),
 *                0 moves at normal scroll speed.
 * @returns CSSProperties with transform applied
 */
export const useParallax = (speed: number = 0.5) => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        // Optimasi: Hanya jalankan jika speed != 0 dan window ada
        if (speed === 0 || typeof window === 'undefined') return;

        let requestRef: number;
        let lastScrollY = window.scrollY;

        const animate = () => {
            const currentScrollY = window.scrollY;

            // Kami hanya update jika scroll berubah untuk efisiensi render
            if (currentScrollY !== lastScrollY) {
                setOffset(currentScrollY * speed);
                lastScrollY = currentScrollY;
            }
            requestRef = requestAnimationFrame(animate);
        };

        requestRef = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(requestRef);
    }, [speed]);

    return {
        transform: `translateY(${offset}px)`,
        willChange: 'transform', // Hardware acceleration hint
    };
};
