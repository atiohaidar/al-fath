import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const visiMisiData = [
    {
        type: "visi",
        title: "Visi",
        content: "Menjadikan LDK Al-Fath terdepan sebagai penggerak kebaikan yang unggul, mandiri, dan berdampak menyeluruh melalui pengembangan kader dakwah yang memiliki karakter sesuai Al-Quran dan Sunnah"
    },
    {
        type: "misi",
        title: "Misi 1",
        content: "Membangun LDK Al-Fath yang inklusif, dinamis, mandiri dan kreatif dalam menjalankan program dakwah kampus."
    },
    {
        type: "misi",
        title: "Misi 2",
        content: "Membina kader untuk membentuk jiwa kepemimpinan yang sesuai dengan muwashafat tarbiyah."
    },
    {
        type: "misi",
        title: "Misi 3",
        content: "Memberdayakan potensi kader untuk mensyiarkan nilai-nilai islam melalui pengabdian kepada masyarakat."
    }
];

const AboutSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % visiMisiData.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + visiMisiData.length) % visiMisiData.length);
    };

    const currentItem = visiMisiData[currentSlide];

    return (
        <section id="about" className="py-20 relative overflow-hidden bg-background">
            {/* Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `url('/assets/playful/Texture/grid full.png')`,
                    backgroundSize: '100px 100px'
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-4 border-2 border-secondary/20">
                        Tentang Kami
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Mengenal LDK Al-Fath</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Al-Fath merupakan salah satu UKM di Universitas Telkom yang diharapkan dapat menjadi wadah kegiatan keagamaan mahasiswa muslim.
                    </p>
                </div>

                {/* Visi Misi Carousel - Speech Bubble with Left Tail */}
                <div className="relative max-w-3xl mx-auto">
                    {/* Decorative Stickers */}
                    <img
                        src="/assets/playful/Star/Kuning.png"
                        alt=""
                        className="absolute -top-10 -left-10 w-24 h-24 -rotate-12 drop-shadow-lg hidden md:block z-20"
                    />
                    <img
                        src="/assets/playful/Rectangle/Letsgoo.png"
                        alt=""
                        className="absolute -top-4 -right-8 w-20 rotate-12 drop-shadow-lg hidden md:block z-20"
                    />
                    <img
                        src="/assets/playful/Star/Merah.png"
                        alt=""
                        className="absolute top-1/3 -right-16 w-16 h-16 rotate-45 drop-shadow-lg hidden lg:block z-20"
                    />
                    <img
                        src="/assets/playful/Smiley/Asset 102@4x.png"
                        alt=""
                        className="absolute -bottom-8 -left-6 w-16 h-16 -rotate-6 drop-shadow-lg hidden md:block z-20"
                    />

                    {/* Speech Bubble Card with LEFT tail */}
                    <div className="relative flex items-start">
                        {/* Speech bubble tail - LEFT side */}
                        <div className="hidden md:block absolute -left-6 top-1/2 -translate-y-1/2 z-10">
                            {/* Black border tail (behind) */}
                            <div className="absolute w-0 h-0 border-t-[18px] border-t-transparent border-b-[18px] border-b-transparent border-r-[22px] border-r-black -left-1"></div>
                            {/* White fill tail (front) */}
                            <div className="w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-r-[20px] border-r-[#FFFDF5]"></div>
                        </div>

                        {/* Main Card */}
                        <div className="flex-1 bg-[#FFFDF5] p-8 md:p-12 rounded-[2rem] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative ml-0 md:ml-4">

                            {/* Type Badge - VISI atau MISI */}
                            <div className="absolute -top-4 left-8">
                                <span className={`px-4 py-1.5 rounded-full font-black text-sm uppercase tracking-wide border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${currentItem.type === 'visi'
                                        ? 'bg-[#FBBF24] text-black'
                                        : 'bg-[#3B82F6] text-white'
                                    }`}>
                                    {currentItem.title}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="text-center min-h-[180px] flex flex-col justify-center pt-4">
                                <p className="text-lg md:text-xl lg:text-2xl font-medium italic text-gray-800 leading-relaxed">
                                    {currentItem.content}
                                </p>
                            </div>

                            {/* Carousel Indicators */}
                            <div className="flex items-center justify-center gap-3 mt-8">
                                {visiMisiData.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center transition-all text-lg ${currentSlide === index
                                                ? 'bg-black text-white'
                                                : 'bg-white text-black hover:bg-gray-100'
                                            }`}
                                        title={item.title}
                                    >
                                        {index === 0 ? '☀' : index === 1 ? '✦' : index === 2 ? '⊕' : '≡'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border-3 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all z-30"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border-3 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all z-30"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
