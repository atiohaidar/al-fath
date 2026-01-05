import { Facebook, Instagram, Twitter, Heart } from "lucide-react";

const Footer = () => {
    return (
        <footer className="relative bg-muted py-12 border-t-2 border-dashed border-border overflow-hidden">
            {/* Simple Decorative Top Border */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-[url('/assets/playful/Texture/grid.png')] opacity-10" />

            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="flex flex-col items-center justify-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-card border-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center p-2 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <img src="/logo.png" alt="AF" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-extrabold text-2xl tracking-tight text-foreground">LDK Al-Fath</span>
                        <span className="text-sm font-medium text-muted-foreground">Universitas Telkom</span>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 mb-8">
                    {/* Playground Social Links */}
                    <a href="#" className="w-10 h-10 bg-blue-100 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-600 hover:scale-110 transition-transform shadow-[2px_2px_0px_0px_rgba(59,130,246,1)]">
                        <Twitter size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 bg-pink-100 rounded-full border-2 border-pink-500 flex items-center justify-center text-pink-600 hover:scale-110 transition-transform shadow-[2px_2px_0px_0px_rgba(236,72,153,1)]">
                        <Instagram size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 bg-indigo-100 rounded-full border-2 border-indigo-500 flex items-center justify-center text-indigo-600 hover:scale-110 transition-transform shadow-[2px_2px_0px_0px_rgba(99,102,241,1)]">
                        <Facebook size={18} />
                    </a>
                </div>

                <p className="text-muted-foreground mb-6 text-sm max-w-md mx-auto leading-relaxed">
                    "Lebih Dekat, Lebih Bersahabat." <br />
                    Membangun generasi Rabbani yang berintelektual dan berakhlakul karimah.
                </p>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60 font-medium bg-background/50 px-4 py-2 rounded-full border border-border inline-flex mx-auto">
                    <span>© 2026 Al-Fath Dev Team</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        Made with <Heart size={10} className="text-red-500 fill-red-500" /> in Bandung
                    </span>
                </div>
            </div>

            {/* Background Decorations */}
            <img src="/assets/playful/Star/Kuning.png" alt="" className="absolute -bottom-6 -left-6 w-24 h-24 opacity-20 rotate-12" />
            <img src="/assets/playful/Star/Biru.png" alt="" className="absolute top-10 right-10 w-12 h-12 opacity-20 -rotate-12" />
        </footer>
    );
};

export default Footer;
