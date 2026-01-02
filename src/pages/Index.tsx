import AppLayout from "@/components/layout/AppLayout";
import GreetingCard from "@/components/home/GreetingCard";
import QuickStats from "@/components/home/QuickStats";
import QuickActions from "@/components/home/QuickActions";
import UpcomingEvent from "@/components/home/UpcomingEvent";

// Mock data - akan diganti dengan data dari backend nanti
const mockUser = {
  name: "Tio Haidar Hanif",
  tingkatKader: "Kader Madya",
};

const mockStats = {
  amalanCompleted: 8,
  amalanTotal: 12,
  upcomingEvents: 3,
  kaderRank: 5,
};

const mockEvents = [
  {
    id: "1",
    title: "Kajian Rutin Bulanan",
    date: "5 Jan 2026",
    time: "19:00",
    location: "Masjid Al Fath",
    status: "soon" as const,
  },
  {
    id: "2",
    title: "Rapat Kerja Divisi",
    date: "7 Jan 2026",
    time: "13:00",
    location: "Sekretariat",
    status: "soon" as const,
  },
];

const Index = () => {
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <GreetingCard
          name={mockUser.name}
          tingkatKader={mockUser.tingkatKader}
        />

        <QuickStats
          amalanCompleted={mockStats.amalanCompleted}
          amalanTotal={mockStats.amalanTotal}
          upcomingEvents={mockStats.upcomingEvents}
          kaderRank={mockStats.kaderRank}
        />

        <QuickActions />

        <UpcomingEvent events={mockEvents} />
      </div>
    </AppLayout>
  );
};

export default Index;
