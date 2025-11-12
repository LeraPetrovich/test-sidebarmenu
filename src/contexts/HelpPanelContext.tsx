import {
  createContext,
  useContext,
  type FC,
  type ReactNode,
  useState,
} from "react";

import type { MenuItemType } from "../configs/types";

interface HelpPanelContextProps {
  isOpen: boolean;
  selectedItem: Array<MenuItemType> | null;
  openPanel: (dataRoute: Array<MenuItemType>) => void;
  closePanel: () => void;
}

const HelpPanelContext = createContext<HelpPanelContextProps | null>(null);

export const HelpPanelContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Array<MenuItemType> | null>(
    null
  );

  const openPanel = (dataRoute: Array<MenuItemType>) => {
    setSelectedItem(dataRoute);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  return (
    <HelpPanelContext.Provider
      value={{ isOpen, selectedItem, openPanel, closePanel }}
    >
      {children}
    </HelpPanelContext.Provider>
  );
};

export const useHelpPanelMenu = () => {
  const context = useContext(HelpPanelContext);
  if (!context)
    throw new Error(
      "useHelpPanel must be used within HelpPanelContextProvider"
    );
  return context;
};
