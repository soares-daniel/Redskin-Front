//navbar.tsx

"use client";

import { FC, useContext } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useCookies } from "react-cookie";
import RolesContext from "./RolesContext";
import UsersContext from "./UserContext";
import {useLogout} from "@/hooks/useLogout";

export default function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);
  const rolesContext = useContext(RolesContext);
  const usersContext = useContext(UsersContext);
  const userRoles = rolesContext?.userRoles || [];
  const user= usersContext?.users || null;
  const router = useRouter();
  const pathname = usePathname();
  const { logout, error } = useLogout();

  const handleLogout = async () => {
    await logout();
  }

  return (
    <nav className="w-full flex items-center justify-between p-4 shadow-md rounded-[15px] bg-red-50">
      <Image src="/logo.png" alt="Logo PRD" width={80} height={80} className="mr-4" />
  
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <div
            className={`${
              pathname === "/dashboard" ? "text-black-600" : "text-gray-700"
            } cursor-pointer bg-[#FAEFEF] p-2 rounded-md shadow-lg hover:bg-gray-300 transition-all duration-300`}
          >
            Calendar
          </div>
        </Link>
  
        {/* Conditional render for Admin link */}
        {userRoles.some(role => role.name === 'admin') && (
          <Link href="/admin">
            <div
              className={`${
                pathname === "/admin" ? "text-black-600" : "text-gray-700"
              } cursor-pointer bg-[#FAEFEF] p-2 rounded-md shadow-lg hover:bg-gray-300 transition-all duration-300`}
            >
              Admin
            </div>
          </Link>
        )}
        <div className="text-black-600">
        
          </div>
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all duration-300">
          Logout
        </button>
      </div>
    </nav>
  );
  };
  
