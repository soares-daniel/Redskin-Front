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
      <div className="flex h-full gap-4 pt-4">
        {" "}
        {/* padding added here */}
        <div className="w-1/4 overflow-y-auto h-screen p-4">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
        <div className="w-3/4 border border-gray-400 mx-auto p-2">
          <Calendar />
        </div>
      </div>
    </Layout>
  );
}
