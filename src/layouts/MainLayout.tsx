import { type FC } from "react";
import { Outlet } from "react-router-dom";

import { SidebarMenu } from "../components";

export const MainLayout: FC = () => {
  return (
    <div className="flex">
      <SidebarMenu />
      <div className="flex-1 bg-white transition-all duration-300 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};
