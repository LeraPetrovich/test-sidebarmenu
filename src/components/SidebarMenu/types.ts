import { type MenuItemWithState } from "../../types/types";

interface SidebarMenuProps {
  menuTree: MenuItemWithState[];
  onItemClick: (item: MenuItemWithState) => void;
}

export type { SidebarMenuProps };
