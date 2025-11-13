import { type FC, useState, useEffect } from "react";
import { cloneMenuDataWithState } from "../../utils/cloneMenuDataWithState";
import { useNavigate, useLocation } from "react-router-dom";

import { SidebarMenu } from "../SidebarMenu";

import type { MenuItemType, MenuItemWithState } from "../../types/types";

export const AppMenu: FC<{ menuTree: MenuItemType[] }> = ({ menuTree }) => {
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
        const isActive =
          item.path === location.pathname ||
          item.children?.some((child) => child.path === location.pathname);
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
    console.log(clickedItem)
    const toggleItem = (items: MenuItemWithState[]): MenuItemWithState[] => {
      return items.map((item) => {
        const hasActiveChild = item.children?.some(
          (child) => child.id === clickedItem.id || child.isActive
        );

        const isCurrent = item.id === clickedItem.id;

        return {
          ...item,
          isActive: isCurrent || !!hasActiveChild,
          children: item.children ? toggleItem(item.children) : [],
        };
      });
    };
    setMenuState(toggleItem(menuState));
    navigate(clickedItem.path);
  };

  return <SidebarMenu menuTree={menuState} onItemClick={handleItemClick} />;
};
