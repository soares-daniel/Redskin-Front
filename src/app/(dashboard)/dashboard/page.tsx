"use client"
import React from "react";
import Layout from "@/components/layout";
import Calendar from "@/components/calendar";
import EventCard from "@/components/eventcard";
import Test from "@/components/Test";
import useEventsData from "@/hooks/useEventsData";


export default function Dashboard() {
  const events = useEventsData();

  return (
    <Layout>
      <div className="flex h-full gap-4 pt-4">
        <div className="w-1/4 overflow-y-auto h-screen p-4">
          {events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()).map((event, index) => (
            <EventCard event={event} key={index}/>
          ))}
        </div>
        <div className="w-3/4 border border-gray-400 mx-auto p-2">
          <Calendar />
        </div>
      </div>
    </Layout>
  );
}