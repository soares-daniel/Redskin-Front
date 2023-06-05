// dashboard/page.tsx

import React from "react";
import Link from "next/link";
import Layout from "@/components/layout";
import Calendar from "@/components/calendar";

const events = [
  {
    title: "All Day Event",
    start: new Date(),
    end: new Date(),
    allDay: true,
  },
  // More events...
];

export default function Dashboard() {
  return (
    <Layout>
      <h1>Dashboard</h1>
      <Calendar events={events} />
    </Layout>
  );
}
