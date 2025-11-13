import type { MenuItemWithState } from "../../../types/types";

interface SidebarMenuItemProps {
  data: MenuItemWithState;
  isOpen: boolean;
  onItemClick: (item: MenuItemWithState) => void;
}

export type { SidebarMenuItemProps };
