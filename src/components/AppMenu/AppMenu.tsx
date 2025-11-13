import { type FC, useState, useEffect } from "react";
import { router } from "../../router/router";
import { buildMenuTreeData } from "./utils/buildMenuTreeData";
import { cloneMenuDataWithState } from "../../utils/cloneMenuDataWithState";
import { useNavigate, useLocation } from "react-router-dom";
import {
  checkIsActiveItem,
  checkIsActiveToggleItem,
} from "./utils/checkActiveChildFunctions";

import { SidebarMenu } from "../SidebarMenu";

import type { MenuItemWithState } from "../../types/menu";

export const AppMenu: FC = () => {
  const routes = router.routes[0].children ?? [];
  const menuTree = buildMenuTreeData(routes);
  const navigate = useNavigate();
  const location = useLocation();

  const [menuState, setMenuState] = useState<Array<MenuItemWithState>>(
    cloneMenuDataWithState(menuTree)
  );

  useEffect(() => {
    const getActiveBayPathName = (
      items: MenuItemWithState[]
    ): MenuItemWithState[] => {
      return items.map((item) => {
        const isActive = checkIsActiveItem(item, location.pathname);
        return {
          ...item,
          isActive: !!isActive,
          children: item.children ? getActiveBayPathName(item.children) : [],
        };
      });
    };
    setMenuState((prevMenu) => getActiveBayPathName(prevMenu));
  }, [location.pathname]);

  const handleItemClick = (clickedItem: MenuItemWithState) => {
    const toggleItem = (items: MenuItemWithState[]): MenuItemWithState[] => {
      return items.map((item) => {
        const isActive = checkIsActiveToggleItem(item, clickedItem.id);

        return {
          ...item,
          isActive,
          children: item.children ? toggleItem(item.children) : [],
        };
      });
    };
    setMenuState(toggleItem(menuState));
    navigate(clickedItem.path);
  };

  return <SidebarMenu menuTree={menuState} onItemClick={handleItemClick} />;
};
