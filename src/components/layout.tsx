import { FC, ReactNode } from "react";
import Navbar from "./navbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className="flex h-screen bg-gray-200">
    <div className="flex flex-col w-full">
      <Navbar />
      <main className="flex-grow">{children}</main>
    </div>
  </div>
);

export default Layout;
