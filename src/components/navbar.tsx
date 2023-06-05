import { FC } from "react";
import Link from "next/link";

const Navbar: FC = () => (
  <nav className="bg-blue-500 text-white p-4">
    <ul className="flex justify-end space-x-4">
      <li>
        <Link href="/dashboard/home">
          <div className="cursor-pointer hover:text-gray-200">Home</div>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/profile">
          <div className="cursor-pointer hover:text-gray-200">Profile</div>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/settings">
          <div className="cursor-pointer hover:text-gray-200">Settings</div>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/calendar">
          <div className="cursor-pointer hover:text-gray-200">Calendar</div>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/logout">
          <div className="cursor-pointer hover:text-gray-200">Logout</div>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
