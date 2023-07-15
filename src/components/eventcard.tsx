// components/EventCard.tsx
import { FC } from "react";

type Event = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
};

type EventCardProps = {
  event: Event;
};

const EventCard: FC<EventCardProps> = ({ event }) => (
  <div className="bg-white rounded p-4 shadow mb-4">
    <h3 className="text-xl">{event.title}</h3>
    <p>
      {event.start.toString()} - {event.end.toString()}
    </p>
    <p>All day event: {event.allDay ? "Yes" : "No"}</p>
  </div>
);

export default EventCard;
