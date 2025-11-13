import { type FC, useEffect, useRef, useMemo, memo } from "react";
import { useHelpPanelMenu } from "../context/HelpPanelContext";
import { SidebarMenuItem } from ".";
import { DynamicIcon } from "lucide-react/dynamic";
import type { MenuItemWithState } from "../../../types/menu";

const MemoHelpMenu: FC<{ menuItems: MenuItemWithState[] }> = ({
  menuItems,
}) => {
  const { isOpen, closePanel, selectedItem, selectedTitle } =
    useHelpPanelMenu();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        closePanel();
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closePanel]);

  const menuMap = useMemo(() => {
    const map = new Map<string, MenuItemWithState>();

    const traverse = (items: MenuItemWithState[]) => {
      for (const item of items) {
        map.set(item.id, item);
        if (item.children?.length) traverse(item.children);
      }
    };

    traverse(menuItems);
    return map;
  }, [menuItems]);

  const currentData = selectedItem ? menuMap.get(selectedItem) : null;

  return (
    <div
      className={[
        "transition-all duration-300 fixed z-[99999] w-full h-full overflow-scroll rounded-t-lg bg-white bottom-0 border-t border-l border-r border-slate-200",
        isOpen ? "max-h-[40%]" : "max-h-[0px]",
      ].join(" ")}
      ref={panelRef}
    >
      <div className="w-full h-full relative">
        <div className="z-[99999] bg-slate-200 absolute h-[50px] top-0 left-0 w-full flex items-center gap-2 flex-wrap justify-between p-2">
          {selectedTitle && (
            <p className="text-slate-500 text-xl font-medium">
              {selectedTitle}
            </p>
          )}
          <button
            className="p-1 border-0 flex items-center justify-center"
            onClick={closePanel}
          >
            <DynamicIcon
              name="x"
              size={20}
              color="black"
              className="cursor-pointer"
            />
          </button>
        </div>

        <div className="pt-[60px] flex flex-col gap-0 relative">
          {currentData?.children?.map((item, index) => (
            <SidebarMenuItem
              isOpenSidebarMenu={true}
              key={`${index}_${currentData.id}_${item.id}`}
              data={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const HelpMenu = memo(MemoHelpMenu);
