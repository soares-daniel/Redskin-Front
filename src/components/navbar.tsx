"use client";

import { FC } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import ThemeButton from "./ThemeButton";
import { de } from "date-fns/locale";
import { useCookies } from "react-cookie";

export default function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    // Remove the user ID cookie
    removeCookie('userId');

    // Clear local storage
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }

    // Redirect the user to the login page
    router.push('/login');
  };

  return (
    <nav className="w-full flex items-center justify-between p-6 pb-10 shadow-md rounded-[15px] bg-[#FBF7F7]">
      <div className="flex gap-4">
        <Link href="/dashboard">
          <div
            className={`${
              pathname === "/dashboard" ? "text-blue-600" : "text-gray-700"
            } cursor-pointer`}
          >
            Dashboard
          </div>
        </Link>
        <Link href="/admin">
          <div
            className={`${
              pathname === "/admin" ? "text-blue-600" : "text-gray-700"
            } cursor-pointer`}
          >
            Admin
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {/* <ThemeButton /> */}
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
  };
  
