import { FC } from "react";
import Link from "next/link";

const Sidebar: FC = () => (
  <div className="h-screen w-64 bg-gray-200 p-6">
    <h2 className="text-2xl mb-6">My Dashboard</h2>
    <ul className="space-y-4">
      <li>
        <Link href="/dashboard/">
          <div className="text-gray-700 hover:text-gray-900">Home</div>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/profile">
          <div className="text-gray-700 hover:text-gray-900">Profile</div>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/">
          <div className="text-gray-700 hover:text-gray-900">Settings</div>
        </Link>
      </li>
    </ul>
  </div>
);

export default Sidebar;
