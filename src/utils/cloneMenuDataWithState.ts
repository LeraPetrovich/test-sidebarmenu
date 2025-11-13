import type { MenuItemType, MenuItemWithState } from "../types/menu";

export const cloneMenuDataWithState = (
  menu: Array<MenuItemType>
): MenuItemWithState[] => {
  if (!menu || menu.length === 0) {
    return [];
  }
  return menu.map((item) => {
    const hasChildren =
      item.children !== null &&
      item.children !== undefined &&
      item.children.length > 0;
    return {
      ...item,
      isActive: false,
      children: hasChildren
        ? cloneMenuDataWithState(item.children as MenuItemType[])
        : [],
    };
  });
};
