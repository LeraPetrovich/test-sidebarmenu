import { type FC } from "react";

import { buildMenuTreeData } from "../utils/buildMenuTreeData";
import { router } from "../router/router";

import { Outlet } from "react-router-dom";
import { AppMenu } from "../components";

export const MainLayout: FC = () => {
  const routes = router.routes[0].children ?? [];
  const menuTree = buildMenuTreeData(routes);

  return (
    <div className="flex w-full h-full sm:flex-row flex-col">
      <AppMenu menuTree={menuTree} />
      <div className="flex-1 bg-white transition-all duration-300 flex flex-col sm:order-2 order-1">
        <Outlet />
      </div>
    </div>
  );
};
