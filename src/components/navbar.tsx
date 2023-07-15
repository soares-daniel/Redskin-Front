"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: FC = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full flex items-center justify-between p-6 shadow-md rounded-[15px] bg-[#FBF7F7]">
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
        <Link href="/dashboard/settings">
          <div
            className={`${
              pathname === "/dashboard/settings"
                ? "text-blue-600"
                : "text-gray-700"
            } cursor-pointer`}
          >
            Settings
          </div>
        </Link>
      </div>
      <div>
        <Link href="/logout">
          <div className="text-red-500">Logout</div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
