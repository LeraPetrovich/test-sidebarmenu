import type { MenuItemWithState } from "../../../types/menu";

interface SidebarMenuItemProps {
  data: MenuItemWithState;
  isOpenSidebarMenu: boolean;
}

interface TooltipItemProps {
  data: MenuItemWithState;
  onTooltipItemClick: (item: MenuItemWithState) => void;
}

export type { SidebarMenuItemProps, TooltipItemProps };
