import { type FC } from "react";
import { Outlet } from "react-router-dom";
import { HelpMenu } from "../components";
import { SidebarMenu } from "../components";
import { HelpPanelContextProvider } from "../contexts/HelpPanelContext";

//удобный layout чтобы отрисовывать сменные страницы и не дублировать меню sidebar

export const MainLayout: FC = () => {
  return (
    <HelpPanelContextProvider>
      <div className="flex w-full h-full sm:flex-row flex-col">
        <SidebarMenu />
        <div className="flex-1 bg-white transition-all duration-300 flex flex-col sm:order-2 order-1">
          <Outlet />
        </div>
        <HelpMenu />
      </div>
    </HelpPanelContextProvider>
  );
};
