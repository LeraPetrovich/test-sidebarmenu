type MenuItemType = {
  path: string;
  icon?: string;
  title: string;
  id: string;
  children?: MenuItemType[];
};

export type { MenuItemType };
