import { MapPin, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: "soon" | "ongoing" | "done";
}

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
        <h2 className="text-lg font-bold text-foreground">Event Mendatang</h2>
        <Link to="/events" className="text-sm font-semibold text-secondary flex items-center">
          Lihat Semua <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {events.slice(0, 2).map((event) => (
          <Link key={event.id} to={`/events/${event.id}`} className="card-pop p-4 block">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-foreground">{event.title}</h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusConfig[event.status].className}`}>
                {statusConfig[event.status].label}
              </span>
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {event.date} • {event.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {event.location}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvent;
