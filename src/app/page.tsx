import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/dashboard">Dashboard</Link>
    </main>
  );
}
// Compare this snippet from src/pages/dashboard.tsx:
