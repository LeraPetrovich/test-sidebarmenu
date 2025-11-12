import { type FC } from "react";
import { useHelpPanelMenu } from "../../contexts/HelpPanelContext";
import { SidebarMenuItem } from "../SidebarMenu/items";
import { DynamicIcon } from "lucide-react/dynamic";

export const HelpMenu: FC = () => {
  const { isOpen, closePanel, selectedItem } = useHelpPanelMenu();

  return (
    <div
      className={[
        "transition-all duration-300 fixed z-[99999] w-full h-full overflow-scroll rounded-t-lg bg-white bottom-0 border-t border-l border-r border-slate-200",
        isOpen ? "max-h-[40%]" : "max-h-[0px]",
      ].join(" ")}
    >
      <div className="w-full h-full relative">
        <div className="absolute h-[50px] top-0 left-0 w-full flex items-center justify-end p-2 bg-white">
          <DynamicIcon
            onClick={() => closePanel()}
            name="x"
            size={20}
            color="black"
            className="cursor-pointer"
          />
        </div>
        <div className="pt-[50px] flex flex-col gap-2 relative">
          {selectedItem &&
            selectedItem.map((item) => {
              return (
                <SidebarMenuItem isOpen={true} key={item.path} data={item} />
              );
            })}
        </div>
      </div>
    </div>
  );
};
