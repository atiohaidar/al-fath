import { useState, useEffect } from "react";
import { Plus, MapPin, Calendar, Clock, Lock, Users } from "lucide-react";
import { useRepositories } from "@/hooks/use-repositories";
import { Event, User } from "@/lib/data/interfaces";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import CreateEventDialog from "@/components/events/CreateEventDialog";
import EventDetailDialog from "@/components/events/EventDetailDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Events = () => {
  const navigate = useNavigate();
  const { eventRepository, authRepository } = useRepositories();
  const [events, setEvents] = useState<Event[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEditClick = (event: Event) => {
    setEditingEvent(event);
    setIsCreateOpen(true);
  };

  const handleDetailClick = (event: Event) => {
    // If creator, open edit dialog
    if (isCreator(event)) {
      handleEditClick(event);
    } else {
      setSelectedEvent(event);
      setIsDetailOpen(true);
    }
  };

  const loadData = async () => {
    const [eventData, user] = await Promise.all([
      eventRepository.getEvents(),
      authRepository.getCurrentUser()
    ]);
    // Sort by date descending (newest first)
    setEvents(eventData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setCurrentUser(user);
  };

  useEffect(() => {
    loadData();
  }, [eventRepository, authRepository]);

  const isCreator = (event: Event) => currentUser?.id === event.creatorId;


  return (
    <div className="p-4 space-y-5 pb-20">
      {/* Header */}
      <div className="flex justify-center">
        <Card variant="playful" className="py-4 px-8 flex flex-col items-center justify-center bg-card relative overflow-hidden w-fit text-center">
          <div className="relative z-10">
            <h1 className="text-2xl font-extrabold text-foreground">Agenda Kegiatan</h1>
            <p className="text-sm text-muted-foreground">Jangan lewatkan kegiatan seru!</p>
          </div>
          {/* Decorative element typical of playful cards */}
          <div className="absolute right-0 top-0 w-20 h-20 bg-alfath-yellow/10 rounded-full blur-xl -mr-10 -mt-10" />
          <div className="absolute left-0 bottom-0 w-16 h-16 bg-alfath-blue/10 rounded-full blur-xl -ml-8 -mb-8" />
        </Card>
      </div>

      {/* Event List */}
      <div className="space-y-4">
        {events.length === 0 ? (
          <div className="text-center py-10 opacity-50">
            <Calendar className="w-16 h-16 mx-auto mb-3 text-muted-foreground" />
            <p>Belum ada event</p>
          </div>
        ) : (
          events.map((event) => (
            <Card key={event.id} variant="playful" className="p-5 flex flex-col gap-4">
              {/* Header: Badge & Title */}
              <div className="space-y-2">
                <Badge variant="playful-yellow" className="w-fit">
                  {event.category || "Segera"}
                </Badge>
                <h3 className="font-extrabold text-xl text-foreground leading-tight">
                  {event.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {event.description || `Kajian rutin bulanan dengan tema '${event.title}' yang insyaAllah bermanfaat.`}
              </p>

              {/* Grid Info */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-foreground" />
                  <span className="truncate">{format(new Date(event.date), "d MMM yyyy", { locale: id })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-foreground" />
                  <span className="truncate">{event.time} {event.end_time ? `- ${event.end_time}` : ""} WIB</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-foreground" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-foreground" />
                  <span className="truncate">{event.participants_count || "0"} peserta</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 mt-2">
                {/* Tombol Presensi (Hijau) */}
                <Button
                  onClick={() => isCreator(event) ? navigate(`/app/events/${event.id}/scan`) : navigate(`/app/events/${event.id}/attendance`)}
                  variant="gradient-green"
                  className="w-full rounded-xl font-bold"
                >
                  {isCreator(event) ? "Scan QR" : "Presensi"}
                </Button>

                {/* Tombol Detail (Outline) */}
                <Button
                  variant="outline"
                  className="w-full rounded-xl font-bold border-2 border-foreground hover:bg-muted"
                  onClick={() => handleDetailClick(event)}
                >
                  {isCreator(event) ? "Edit Info" : "Detail"}
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setIsCreateOpen(true)}
        className="fixed bottom-24 right-4 w-14 h-14 gradient-yellow border-playful-thick rounded-full flex items-center justify-center shadow-playful-lg active:scale-95 transition-transform z-40"
      >
        <Plus className="w-8 h-8 text-alfath-dark stroke-[3]" />
      </button>

      <CreateEventDialog
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
          setEditingEvent(null);
        }}
        onSuccess={loadData}
        creatorId={currentUser ? Number(currentUser.id) : 0}
        event={editingEvent}
      />
      <EventDetailDialog
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
      />
    </div>
  );
};

export default Events;
