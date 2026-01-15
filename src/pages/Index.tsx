import { useEffect, useState } from "react";
import GreetingCard from "@/components/home/GreetingCard";
import DailyWisdom from "@/components/home/DailyWisdom";
import QuickStats from "@/components/home/QuickStats";
import QuickActions from "@/components/home/QuickActions";
import UpcomingEvent from "@/components/home/UpcomingEvent";
import { useRepositories } from "@/hooks/use-repositories";
import { User, Event } from "@/lib/data/interfaces";
import { DEFAULT_AMALAN_TEMPLATE } from "@/lib/data/constants";
import { format } from "date-fns";


const Index = () => {
  const { authRepository, amalanRepository, eventRepository } = useRepositories();
  const [user, setUser] = useState<User | null>(null);
  const [amalanStats, setAmalanStats] = useState({ completed: 0, total: 0 });
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  // Note: Rank functionality is not yet implemented in repository, still using mock/placeholder logic if needed
  // For now we can keep it hardcoded or derived from levels, let's keep it static or random for demo until requested
  const kaderRank = 5;

  const loadData = async () => {
    // 1. Fetch User
    const currentUser = await authRepository.getCurrentUser();
    setUser(currentUser);

    // 2. Fetch Amalan Stats for Today
    const today = format(new Date(), "yyyy-MM-dd");
    // Ensure data exists, similar to AmalanYaumiah page
    const amalans = await amalanRepository.initDailyAmalans(today, DEFAULT_AMALAN_TEMPLATE);
    const completed = amalans.filter(a => a.completed).length;
    setAmalanStats({
      completed,
      total: amalans.length
    });

    // 3. Fetch Upcoming Events
    const allEvents = await eventRepository.getEvents();
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    // Filter events that are today or in the future
    const futureEvents = allEvents
      .filter(e => {
        const eventDate = new Date(e.date);
        return eventDate >= startOfDay;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setUpcomingEvents(futureEvents);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <GreetingCard
        name={user?.nama || "Tamu"}
        tingkatKader={user?.tingkatKader || "Calon Anggota"}
      />

      <DailyWisdom />

      <QuickStats
        amalanCompleted={amalanStats.completed}
        amalanTotal={amalanStats.total}
        upcomingEvents={upcomingEvents.length}
        kaderRank={kaderRank}
      />

      <QuickActions />

      <UpcomingEvent events={upcomingEvents} />
    </div>
  );
};
export default Index;
