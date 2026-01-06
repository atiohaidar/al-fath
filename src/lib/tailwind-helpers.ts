/**
 * Helper to convert Tailwind position/size classes to pixel values for preview
 */

// Tailwind spacing scale (in pixels, assuming 1rem = 16px)
const spacingMap: Record<string, number> = {
    "0": 0,
    "1": 4,
    "2": 8,
    "3": 12,
    "4": 16,
    "5": 20,
    "6": 24,
    "8": 32,
    "10": 40,
    "12": 48,
    "14": 56,
    "16": 64,
    "18": 72,
    "20": 80,
    "24": 96,
    "32": 128,
    "36": 144,
    "40": 160,
    "48": 192,
    "52": 208,
};

export const parseTailwindPosition = (positionClass: string, containerSize: { width: number; height: number }) => {
    let x = 0;
    let y = 0;

    const classes = positionClass.split(" ");

    classes.forEach((cls) => {
        // Top positioning
        if (cls.startsWith("-top-")) {
            const value = cls.replace("-top-", "");
            y = -(spacingMap[value] || 0);
        } else if (cls.startsWith("top-")) {
            const value = cls.replace("top-", "");
            if (value === "1/2") y = containerSize.height / 2;
            else if (value === "1/3") y = containerSize.height / 3;
            else if (value === "2/3") y = (containerSize.height * 2) / 3;
            else if (value.includes("[") && value.includes("%")) {
                const percent = parseInt(value.match(/\d+/)?.[0] || "0");
                y = (containerSize.height * percent) / 100;
            } else {
                y = spacingMap[value] || 0;
            }
        }

        // Bottom positioning
        if (cls.startsWith("-bottom-")) {
            const value = cls.replace("-bottom-", "");
            y = containerSize.height + (spacingMap[value] || 0);
        } else if (cls.startsWith("bottom-")) {
            const value = cls.replace("bottom-", "");
            y = containerSize.height - (spacingMap[value] || 0);
        }

        // Left positioning
        if (cls.startsWith("-left-")) {
            const value = cls.replace("-left-", "");
            x = -(spacingMap[value] || 0);
        } else if (cls.startsWith("left-")) {
            const value = cls.replace("left-", "");
            if (value === "1/2") x = containerSize.width / 2;
            else if (value === "1/3") x = containerSize.width / 3;
            else if (value === "2/3") x = (containerSize.width * 2) / 3;
            else {
                x = spacingMap[value] || 0;
            }
        }

        // Right positioning
        if (cls.startsWith("-right-")) {
            const value = cls.replace("-right-", "");
            x = containerSize.width + (spacingMap[value] || 0);
        } else if (cls.startsWith("right-")) {
            const value = cls.replace("right-", "");
            x = containerSize.width - (spacingMap[value] || 0);
        }
    });

    return { x, y };
};

export const parseTailwindSize = (sizeClass: string) => {
    const match = sizeClass.match(/w-(\d+)/);
    if (match) {
        const value = match[1];
        return spacingMap[value] || 64; // default 64px
    }
    return 64;
};

export const parseTailwindOpacity = (opacityClass: string) => {
    const match = opacityClass.match(/opacity-(\d+)/);
    if (match) {
        return parseInt(match[1]);
    }
    return 100;
};

export const parseTailwindRotation = (rotationClass: string) => {
    if (!rotationClass) return 0;

    const match = rotationClass.match(/-?rotate-(\d+)/);
    if (match) {
        const value = parseInt(match[1]);
        return rotationClass.startsWith("-") ? -value : value;
    }
    return 0;
};
