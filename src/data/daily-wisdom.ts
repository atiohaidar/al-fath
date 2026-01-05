
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
