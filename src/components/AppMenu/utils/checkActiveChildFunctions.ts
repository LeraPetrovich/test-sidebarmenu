import { type MenuItemWithState } from "../../../types/menu";

export const checkIsActiveItem = (
  item: MenuItemWithState,
  pathName: string
): boolean => {
  if (item.path === pathName) return true;
  if (item.children && item.children.length > 0) {
    return item.children.some((child) => checkIsActiveItem(child, pathName));
  }
  return false;
};

export const checkIsActiveToggleItem = (
  item: MenuItemWithState,
  toggleId: string
): boolean => {
  if (item.id === toggleId) return true;
  if (item.children && item.children.length > 0) {
    return item.children.some((child) =>
      checkIsActiveToggleItem(child, toggleId)
    );
  }
  return false;
};
