// dashboard/page.tsx

import React from "react";
import Layout from "@/components/layout";
import Calendar from "@/components/calendar";
import EventCard from "@/components/eventcard";

const singleEvent = {
  title: "Test Event",
  start: new Date(),
  end: new Date(),
  allDay: true,
};

// Mock events
const events = Array(10).fill(singleEvent);

export default function Dashboard() {
  return (
    <Layout>
      <div className="flex h-full">
        <div className="w-1/3 overflow-y-auto h-screen p-4">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
        <div className="w-2/3 h-full">
          <Calendar events={events} />
        </div>
      </div>
    </Layout>
  );
}
