import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Calendar, MapPin, Clock, Users, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: "soon" | "ongoing" | "done";
  organizer: string;
  description: string;
  attendees: number;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Kajian Rutin Bulanan",
    date: "5 Jan 2026",
    time: "19:00 - 21:00",
    location: "Masjid Al Fath",
    status: "soon",
    organizer: "Dept. Kaderisasi",
    description: "Kajian rutin bulanan dengan tema 'Menjadi Kader Tangguh'",
    attendees: 45,
  },
  {
    id: "2",
    title: "Rapat Kerja Divisi",
    date: "7 Jan 2026",
    time: "13:00 - 16:00",
    location: "Sekretariat",
    status: "soon",
    organizer: "BPH",
    description: "Rapat koordinasi program kerja divisi",
    attendees: 25,
  },
  {
    id: "3",
    title: "Training Public Speaking",
    date: "2 Jan 2026",
    time: "09:00 - 12:00",
    location: "Aula Gedung A",
    status: "ongoing",
    organizer: "Dept. PSDM",
    description: "Pelatihan public speaking untuk kader baru",
    attendees: 30,
  },
  {
    id: "4",
    title: "Launching Proker Gen 12",
    date: "28 Des 2025",
    time: "19:00 - 22:00",
    location: "Aula Utama",
    status: "done",
    organizer: "BPH",
    description: "Launching program kerja generasi 12",
    attendees: 100,
  },
];

const statusConfig = {
  soon: { label: "Segera", className: "gradient-yellow border-playful text-alfath-dark" },
  ongoing: { label: "Berlangsung", className: "gradient-green border-playful text-success-foreground" },
  done: { label: "Selesai", className: "bg-muted text-muted-foreground" },
};

type StatusFilter = "all" | "soon" | "ongoing" | "done";

const Events = () => {
  const [filter, setFilter] = useState<StatusFilter>("all");

  const filteredEvents = filter === "all"
    ? mockEvents
    : mockEvents.filter((e) => e.status === filter);

  return (
    <AppLayout>
      <div className="p-4 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-foreground">Event</h1>
          <Button variant="playful" size="icon-playful" className="bg-muted">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {[
            { key: "all", label: "Semua" },
            { key: "soon", label: "Segera" },
            { key: "ongoing", label: "Berlangsung" },
            { key: "done", label: "Selesai" },
          ].map((tab) => (
            <Button
              key={tab.key}
              onClick={() => setFilter(tab.key as StatusFilter)}
              variant={filter === tab.key ? "gradient-yellow" : "ghost"}
              className={`rounded-full whitespace-nowrap ${filter === tab.key ? "" : "bg-muted text-muted-foreground"}`}
              size="sm"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card key={event.id} variant="playful" className="p-4 space-y-3">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-2 ${statusConfig[event.status].className}`}>
                    {statusConfig[event.status].label}
                  </span>
                  <h3 className="font-bold text-foreground text-lg">{event.title}</h3>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{event.description}</p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees} peserta</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                {event.status !== "done" && (
                  <Button variant="gradient-green" className="flex-1" size="sm">
                    Presensi
                  </Button>
                )}
                <Button variant="playful" className="flex-1 bg-muted" size="sm">
                  Detail
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Events;
