"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, []);

  return null;
}
// Compare this snippet from src/pages/dashboard.tsx:
