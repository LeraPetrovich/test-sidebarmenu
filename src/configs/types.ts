type MenuItemType = {
  path: string;
  icon?: string;
  title: string;
  children?: MenuItemType[];
};

export type { MenuItemType };
