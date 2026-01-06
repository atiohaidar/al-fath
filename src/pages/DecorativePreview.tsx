import { useState } from "react";
import DecorativeElements from "@/components/ui/DecorativeElements";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Variant = "corners" | "top" | "bottom" | "scattered" | "minimal";

const DecorativePreview = () => {
    const [selectedVariant, setSelectedVariant] = useState<Variant>("corners");
    const [showGrid, setShowGrid] = useState(false);

    const variants: { value: Variant; label: string; description: string }[] = [
        { value: "corners", label: "Corners", description: "4 bintang di setiap sudut" },
        { value: "top", label: "Top", description: "Dekorasi di bagian atas" },
        { value: "bottom", label: "Bottom", description: "Dekorasi di bagian bawah" },
        { value: "scattered", label: "Scattered", description: "Banyak elemen tersebar" },
        { value: "minimal", label: "Minimal", description: "Hanya 2 bintang kecil" },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Control Panel - Fixed at top */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border p-4">
                <div className="max-w-7xl mx-auto space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-extrabold text-foreground">Decorative Elements Preview</h1>
                            <p className="text-sm text-muted-foreground">
                                Edit posisi di: <code className="bg-muted px-2 py-1 rounded text-xs">src/components/ui/DecorativeElements.tsx</code>
                            </p>
                        </div>
                        <Button
                            variant={showGrid ? "gradient-primary" : "outline"}
                            onClick={() => setShowGrid(!showGrid)}
                            size="sm"
                        >
                            {showGrid ? "Hide Grid" : "Show Grid"}
                        </Button>
                    </div>

                    {/* Variant Selector */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {variants.map((variant) => (
                            <Button
                                key={variant.value}
                                onClick={() => setSelectedVariant(variant.value)}
                                variant={selectedVariant === variant.value ? "gradient-yellow" : "outline"}
                                size="sm"
                                className="whitespace-nowrap"
                            >
                                {variant.label}
                            </Button>
                        ))}
                    </div>

                    {/* Current Variant Info */}
                    <Card variant="playful" className="p-3">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <div>
                                <p className="font-bold text-sm text-foreground">
                                    Current: {variants.find((v) => v.value === selectedVariant)?.label}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {variants.find((v) => v.value === selectedVariant)?.description}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Preview Area */}
            <div className="pt-48 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Preview Container */}
                    <div className="relative">
                        {/* Grid Overlay */}
                        {showGrid && (
                            <div
                                className="absolute inset-0 pointer-events-none z-10"
                                style={{
                                    backgroundImage: `
                    linear-gradient(to right, rgba(var(--primary), 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(var(--primary), 0.1) 1px, transparent 1px)
                  `,
                                    backgroundSize: '50px 50px'
                                }}
                            />
                        )}

                        {/* Main Preview Card */}
                        <Card variant="playful" className="p-8 min-h-[600px] relative overflow-hidden">
                            {/* Decorative Elements */}
                            <DecorativeElements variant={selectedVariant} className="absolute inset-0" />

                            {/* Sample Content */}
                            <div className="relative z-10 space-y-6">
                                <div className="text-center space-y-2">
                                    <h2 className="text-4xl font-extrabold text-foreground">
                                        Preview Area
                                    </h2>
                                    <p className="text-muted-foreground">
                                        Decorative elements akan muncul di sekitar area ini
                                    </p>
                                </div>

                            </div>
                        </Card>

                        {/* Corner Labels */}
                        <div className="absolute -top-8 -left-8 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                            Top Left
                        </div>
                        <div className="absolute -top-8 -right-8 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold">
                            Top Right
                        </div>
                        <div className="absolute -bottom-8 -left-8 bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-bold">
                            Bottom Left
                        </div>
                        <div className="absolute -bottom-8 -right-8 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                            Bottom Right
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="mt-8 space-y-4">
                        <h3 className="text-xl font-bold text-foreground">Cara Mengubah Posisi:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card variant="playful" className="p-4">
                                <h4 className="font-bold text-foreground mb-2">1. Buka File</h4>
                                <code className="text-xs bg-muted p-2 rounded block">
                                    src/components/ui/DecorativeElements.tsx
                                </code>
                            </Card>
                            <Card variant="playful" className="p-4">
                                <h4 className="font-bold text-foreground mb-2">2. Edit Config</h4>
                                <p className="text-xs text-muted-foreground">
                                    Cari <code className="bg-muted px-1 rounded">decorativeConfig</code> dan ubah property <code className="bg-muted px-1 rounded">position</code>
                                </p>
                            </Card>
                            <Card variant="playful" className="p-4">
                                <h4 className="font-bold text-foreground mb-2">3. Contoh Posisi</h4>
                                <code className="text-xs bg-muted p-2 rounded block">
                                    position: "top-10 right-20"
                                </code>
                            </Card>
                            <Card variant="playful" className="p-4">
                                <h4 className="font-bold text-foreground mb-2">4. Save & Lihat</h4>
                                <p className="text-xs text-muted-foreground">
                                    Simpan file, halaman ini akan auto-reload
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DecorativePreview;
