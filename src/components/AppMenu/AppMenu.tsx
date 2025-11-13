import { type FC } from "react";
import { SidebarMenu } from "../SidebarMenu";

import type { MenuItemType } from "../../types/types";

export const AppMenu: FC<{ menuTree: MenuItemType[] }> = ({ menuTree }) => {
  return <SidebarMenu menuTree={menuTree} />;
};
