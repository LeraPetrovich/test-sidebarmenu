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
  selectedTitle: string | null;
  openPanel: (dataRoute: Array<MenuItemType>, selectedTitle?: string) => void;
  closePanel: () => void;
}

const HelpPanelContext = createContext<HelpPanelContextProps | null>(null);

export const HelpPanelContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Array<MenuItemType> | null>(
    null
  );

  const openPanel = (dataRoute: Array<MenuItemType>, title?: string) => {
    if (title) {
      setSelectedTitle(title);
    }

    setSelectedItem(dataRoute);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    setSelectedItem(null);
    setSelectedTitle(null);
  };

  return (
    <HelpPanelContext.Provider
      value={{ isOpen, selectedItem, openPanel, closePanel, selectedTitle }}
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
