import { MapPin, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionLabel from "@/components/ui/SectionLabel";
import { Card } from "@/components/ui/card";
import { Event } from "@/lib/data/interfaces";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface UpcomingEventProps {
  events: Event[];
}

const statusConfig = {
  soon: { label: "Segera", className: "bg-alfath-blue text-secondary-foreground" },
  ongoing: { label: "Berlangsung", className: "bg-alfath-green text-success-foreground" },
  done: { label: "Selesai", className: "bg-muted text-muted-foreground" },
};

const UpcomingEvent = ({ events }: UpcomingEventProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SectionLabel variant="secondary">Event Mendatang</SectionLabel>
          <img
            src="/assets/playful/Star/Biru.png"
            alt=""
            className="w-6 h-6 opacity-70"
          />
        </div>
        <Link to="/app/events" className="text-sm font-semibold text-secondary flex items-center">
          Lihat Semua <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {events.length === 0 ? (
          <Card variant="playful" className="p-6 text-center border-dashed border-2 bg-muted/30">
            <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-3 flex items-center justify-center">
              <Clock className="w-8 h-8 text-muted-foreground opacity-50" />
            </div>
            <p className="font-bold text-foreground">Belum ada event</p>
            <p className="text-xs text-muted-foreground mt-1">
              Nantikan update selanjutnya ya! ✨
            </p>
          </Card>
        ) : (
          events.slice(0, 2).map((event) => {
            // Simple status derivation
            const status = "soon";

            return (
              <Link key={event.id} to={`/app/events/${event.id}`} className="block">
                <Card variant="playful" className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-foreground line-clamp-1">{event.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusConfig[status].className}`}>
                      {statusConfig[status].label}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {format(new Date(event.date), "d MMM", { locale: id })} • {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate max-w-[100px]">{event.location}</span>
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UpcomingEvent;
