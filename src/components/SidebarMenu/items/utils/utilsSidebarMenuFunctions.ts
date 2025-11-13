import { type MenuItemWithState } from "../../../../types/menu";

export const findFirstChildWithoutChildren = (
  items: MenuItemWithState[]
): MenuItemWithState | undefined => {
  if (!items || items.length === 0) return undefined;

  for (const item of items) {
    if (!item.children || item.children.length === 0) {
      return item;
    } else {
      const latest = findFirstChildWithoutChildren(item.children);
      return latest;
    }
  }
  return undefined;
};

export const hasActiveDescendant = (item: MenuItemWithState): boolean => {
  if (item.isActive) return true;
  return item.children?.some(hasActiveDescendant) ?? false;
};
