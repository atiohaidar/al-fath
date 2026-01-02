import { Target, Heart, Award } from "lucide-react";

const AboutSection = () => {
    return (
        <section id="about" className="py-20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `url('/assets/playful/Texture/grid full.png')`,
                    backgroundSize: '100px 100px'
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-4 border-2 border-secondary/20">
                        Tentang Kami
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Mengenal LDK Al-Fath</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Al-Fath merupakan salah satu UKM di Universitas Telkom yang diharapkan dapat menjadi wadah kegiatan keagamaan mahasiswa muslim.
                        Melalui Al-Fath diharapkan dapat menyalurkan bakat, minat serta mampu menjadi fasilitator bagi mahasiswa untuk mengembangkan ilmu pengetahuan khususnya agama dan menyambung silaturahmi antar mahasiswa muslim.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Visi */}
                    <div className="card-pop bg-card p-8 rounded-3xl relative group hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-6 text-yellow-600 border-2 border-yellow-200">
                            <Target className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Visi Al-Fath</h3>
                        <p className="text-muted-foreground leading-relaxed italic">
                            "Menjadikan LDK Al-Fath yang profesional dengan berlandaskan Al-Quran dan As-Sunnah dalam membentuk pribadi muslim yang kaffah (menyeluruh) untuk mewujudkan masyarakat madani."
                        </p>
                    </div>

                    {/* Misi */}
                    <div className="card-pop bg-card p-8 rounded-3xl relative group hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 border-2 border-blue-200">
                            <Heart className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Misi Al-Fath</h3>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex gap-3">
                                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                                <span>Membangun LDK Al-Fath yang inklusif, dinamis, mandiri dan kreatif.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                                <span>Membina kader untuk membentuk jiwa kepemimpinan yang sesuai dengan muwashafat tarbiyah.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                                <span>Memberdayakan potensi kader untuk mensyiarkan nilai-nilai islam melalui pengabdian.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
