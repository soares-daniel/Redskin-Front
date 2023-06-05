"use client";

import { FC } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

type Event = {
  start: Date;
  end: Date;
  title: string;
  allDay?: boolean;
};

type CalendarProps = {
  events: Event[];
};

const Calendar: FC<CalendarProps> = ({ events }) => (
  <div className="flex-grow">
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100vh" }}
    />
  </div>
);

export default Calendar;
