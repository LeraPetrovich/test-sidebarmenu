import { createContext, useContext, type FC, type ReactNode } from "react";
import type { MenuItemWithState } from "../../../types/menu";

type SidebarMenuContextType = {
  onItemClick: (item: MenuItemWithState) => void;
};

const SidebarMenuContext = createContext<SidebarMenuContextType | null>(null);

export const SidebarMenuContextProvider: FC<{
  children: ReactNode;
  onItemClick: (item: MenuItemWithState) => void;
}> = ({ onItemClick, children }) => {
  return (
    <SidebarMenuContext.Provider value={{ onItemClick }}>
      {children}
    </SidebarMenuContext.Provider>
  );
};

export const useSidebarMenuContext = () => {
  const context = useContext(SidebarMenuContext);
  if (!context) {
    throw new Error("useSidebarMenu must be used within SidebarMenuProvider");
  }
  return context;
};
