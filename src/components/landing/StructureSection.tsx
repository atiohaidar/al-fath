import landingContent from "@/lib/data/landing-content.json";
import * as Icons from "lucide-react";

export const StructureSection = () => {
    const { structure } = landingContent;

    return (
        <section id="structure" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-foreground font-bold text-sm mb-4 border-2 border-primary/20">
                        Struktur Organisasi
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Departemen & Divisi</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        LDK Al-Fath didukung oleh berbagai departemen yang berfokus pada bidangnya masing-masing untuk mencapai visi bersama.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {structure.departments.map((dept, idx) => {
                        // Dynamically load icon
                        const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[dept.icon] || Icons.Circle;

                        return (
                            <div
                                key={idx}
                                className="group bg-card p-6 rounded-3xl border-2 border-border hover:border-playful transition-all duration-300 hover:-translate-y-1 hover:shadow-playful"
                            >
                                <div className="w-14 h-14 rounded-2xl gradient-yellow border-playful flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                                    <IconComponent className="w-7 h-7 text-alfath-dark" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{dept.name}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {dept.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
