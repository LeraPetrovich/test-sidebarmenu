import type { RouteObject } from "react-router-dom";
import { type MenuItemType } from "../../../types/types";

export const buildMenuTreeData = (routes: RouteObject[]): MenuItemType[] => {
  const items: Record<string, MenuItemType> = {};

  routes.forEach((route) => {
    const handle = route.handle as any;
    if (!handle || handle.hidden) return;

    const path = route.index ? "/" : "/" + (route.path ?? "");

    items[handle.id] = {
      path,
      title: handle.title,
      ...(handle.icon ? { icon: handle.icon } : {}),
      children: [],
      id: handle.id,
    };
  });

  Object.values(items).forEach((item) => {
    const handle = routes.find((rout) => (rout.handle as any)?.id === item.id)
      ?.handle as any;
    const parentId = handle?.parent;
    if (parentId && items[parentId]) {
      items[parentId].children!.push(item);
    }
  });

  const tree = Object.values(items).filter((item) => {
    const handle = routes.find((rout) => (rout.handle as any)?.id === item.id)
      ?.handle as any;
    return !handle?.parent;
  });

  return tree;
};
