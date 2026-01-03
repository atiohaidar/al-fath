
export interface Wisdom {
    id: number;
    content: string;
    source: string;
    type: 'hadits' | 'quran' | 'quote';
    arabic?: string;
}

export const dailyWisdoms: Wisdom[] = [
    {
        id: 1,
        content: "Maka sesungguhnya bersama kesulitan ada kemudahan.",
        source: "QS. Al-Insyirah: 5",
        type: "quran",
        arabic: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا"
    },
    {
        id: 2,
        content: "Barangsiapa yang menempuh jalan untuk mencari ilmu, Allah akan mudahkan baginya jalan menuju surga.",
        source: "HR. Muslim",
        type: "hadits",
        arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ"
    },
    {
        id: 3,
        content: "Sebaik-baik manusia adalah yang paling bermanfaat bagi orang lain.",
        source: "HR. Ahmad",
        type: "hadits",
        arabic: "خَيْرُ الناسِ أَنفَعُهُم لِلنَّاسِ"
    },
    {
        id: 4,
        content: "Dan bersabarlah, sesungguhnya Allah beserta orang-orang yang sabar.",
        source: "QS. Al-Anfal: 46",
        type: "quran"
    },
    {
        id: 5,
        content: "Senyummu di hadapan saudaramu adalah sedekah.",
        source: "HR. Tirmidzi",
        type: "hadits"
    },
    {
        id: 6,
        content: "Hai orang-orang yang beriman, berzikirlah (dengan menyebut nama) Allah, zikir yang sebanyak-banyaknya.",
        source: "QS. Al-Ahzab: 41",
        type: "quran"
    },
    {
        id: 7,
        content: "Dunia ini laksana bayangan. Jika kau mencoba menangkapnya, ia akan lari. Tapi jika kau membelakanginya, ia tak punya pilihan selain mengikutimu.",
        source: "Ibnu Qayyim Al-Jauziyyah",
        type: "quote"
    },
    {
        id: 8,
        content: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.",
        source: "QS. Al-Baqarah: 286",
        type: "quran"
    },
    {
        id: 9,
        content: "Sesungguhnya Allah itu indah dan menyukai keindahan.",
        source: "HR. Muslim",
        type: "hadits"
    },
    {
        id: 10,
        content: "Janganlah kamu marah, maka bagimu surga.",
        source: "HR. Thabrani",
        type: "hadits"
    },
    {
        id: 11,
        content: "Dan apabila hamba-hamba-Ku bertanya kepadamu tentang Aku, maka (jawablah), bahwasanya Aku adalah dekat.",
        source: "QS. Al-Baqarah: 186",
        type: "quran"
    },
    {
        id: 12,
        content: "Balas dendam terbaik adalah menjadikan dirimu lebih baik.",
        source: "Ali bin Abi Thalib",
        type: "quote"
    },
    {
        id: 13,
        content: "Sesungguhnya shalat itu mencegah dari (perbuatan-perbuatan) keji dan mungkar.",
        source: "QS. Al-Ankabut: 45",
        type: "quran"
    },
    {
        id: 14,
        content: "Kebersihan adalah sebagian dari iman.",
        source: "HR. Muslim",
        type: "hadits"
    },
    {
        id: 15,
        content: "Tidak ada seorang muslim pun yang tertimpa rasa letih, penyakit, sedih, gelisah, maupun gangguan, hingga duri yang menusuknya, melainkan Allah akan menghapuskan dosa-dosanya.",
        source: "HR. Bukhari",
        type: "hadits"
    },
    {
        id: 16,
        content: "Hai manusia, sesungguhnya Kami menciptakan kamu dari seorang laki-laki dan seorang perempuan dan menjadikan kamu berbangsa-bangsa dan bersuku-suku supaya kamu saling kenal-mengenal.",
        source: "QS. Al-Hujurat: 13",
        type: "quran"
    },
    {
        id: 17,
        content: "Ilmu tanpa amal adalah gila, dan amal tanpa ilmu adalah sia-sia.",
        source: "Imam Al-Ghazali",
        type: "quote"
    },
    {
        id: 18,
        content: "Maka nikmat Tuhan kamu yang manakah yang kamu dustakan?",
        source: "QS. Ar-Rahman: 13",
        type: "quran"
    },
    {
        id: 19,
        content: "Barangsiapa yang beriman kepada Allah dan hari akhir, hendaklah dia berkata baik atau diam.",
        source: "HR. Bukhari & Muslim",
        type: "hadits"
    },
    {
        id: 20,
        content: "Sesungguhnya orang-orang yang beriman itu bersaudara.",
        source: "QS. Al-Hujurat: 10",
        type: "quran"
    },
    {
        id: 21,
        content: "Jangan menjelaskan tentang dirimu kepada siapapun, karena yang menyukaimu tidak butuh itu, dan yang membencimu tidak percaya itu.",
        source: "Ali bin Abi Thalib",
        type: "quote"
    },
    {
        id: 22,
        content: "Sesungguhnya Allah beserta orang-orang yang berbuat baik.",
        source: "QS. Al-Ankabut: 69",
        type: "quran"
    },
    {
        id: 23,
        content: "Tangan di atas lebih baik daripada tangan di bawah.",
        source: "HR. Bukhari & Muslim",
        type: "hadits"
    },
    {
        id: 24,
        content: "Waktu itu ibarat pedang, jika kau tidak menebasnya maka dia yang akan menebasmu.",
        source: "Imam Syafi'i",
        type: "quote"
    },
    {
        id: 25,
        content: "Dan Kami jadikan kamu berpasang-pasangan.",
        source: "QS. An-Naba: 8",
        type: "quran"
    },
    {
        id: 26,
        content: "Bertaqwalah kepada Allah di mana saja kamu berada.",
        source: "HR. Tirmidzi",
        type: "hadits"
    },
    {
        id: 27,
        content: "Hati yang bersyukur adalah hati yang bahagia.",
        source: "Anonim",
        type: "quote"
    },
    {
        id: 28,
        content: "Sesungguhnya sesudah kesulitan itu ada kemudahan.",
        source: "QS. Al-Insyirah: 6",
        type: "quran"
    },
    {
        id: 29,
        content: "Shalat adalah tiang agama.",
        source: "HR. Baihaqi",
        type: "hadits"
    },
    {
        id: 30,
        content: "Kesabaran adalah anak kunci kegembiraan.",
        source: "Imam Syafi'i",
        type: "quote"
    },
    {
        id: 31,
        content: "Dan janganlah kamu berputus asa dari rahmat Allah.",
        source: "QS. Yusuf: 87",
        type: "quran"
    }
];

export const getDailyWisdom = (): Wisdom => {
    // Use current date to determine the index
    // This ensures the wisdom stays the same for the entire day for a specific user
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);

    // Use modulo to cycle through the array endlessly
    const index = dayOfYear % dailyWisdoms.length;

    return dailyWisdoms[index];
};
