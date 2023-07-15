"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeButton from "./ThemeButton";

const Navbar: FC = () => {
  const pathname = usePathname();

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
      </div>
      <div className="flex items-center gap-4">
        <ThemeButton />
        <Link href="/logout">
          <div className="text-red-500">Logout</div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
