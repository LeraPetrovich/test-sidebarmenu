type MenuItemType = {
  path: string;
  icon?: string;
  title: string;
  id: string;
  children?: MenuItemType[];
};

type MenuItemWithState = {
  path: string;
  icon?: string;
  title: string;
  id: string;
  isActive: boolean;
  children?: MenuItemWithState[];
};

export type { MenuItemType, MenuItemWithState };
