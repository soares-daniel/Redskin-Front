"use client";

// components/Calendar.tsx
import { FC } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

type Event = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
};

type CalendarProps = {
  events: Event[];
};

const Calendar: FC<CalendarProps> = ({ events }) => (
  <div className="h-full">
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100%" }}
      views={["month"]}
    />
  </div>
);

export default Calendar;
