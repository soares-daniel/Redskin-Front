"use client"
import React, { useEffect } from "react";
import Layout from "@/components/layout";
import Calendar from "@/components/calendar";
import EventCard from "@/components/eventcard";
import useEventsData from "@/hooks/useEventsData";
import { useRouter } from "next/navigation";
import { ErrorTypes } from "@/types/errorTypes";


export default function Dashboard() {
  const router = useRouter();
  const { data: events, loading, error } = useEventsData();

  useEffect(() => {
    if (error && error.name === ErrorTypes.NOT_AUTHORIZED) {
      router.push('/login');
    }
  }, [error, router]);

  if (loading) return <p>Loading...</p>;
  if (error) return null;
  if (!Array.isArray(events)) return <p>No events to display</p>;

  return (
    <Layout>
      <div className="flex h-full gap-4 pt-4">
        <div className="w-1/4 overflow-y-auto h-screen p-4">
          <EventCard events={events} />
        </div>
        <div className="w-3/4 border border-gray-400 mx-auto p-2">
          <Calendar events={events}/>
        </div>
      </div>
    </Layout>
  );
}