import { type FC } from "react";
import { useHelpPanelMenu } from "../../contexts/HelpPanelContext";
import { SidebarMenuItem } from "../SidebarMenu/items";
import { DynamicIcon } from "lucide-react/dynamic";

export const HelpMenu: FC = () => {
  const { isOpen, closePanel, selectedItem, selectedTitle } =
    useHelpPanelMenu();

  return (
    <div
      className={[
        "transition-all duration-300 fixed z-[99999] w-full h-full overflow-scroll rounded-t-lg bg-white bottom-0 border-t border-l border-r border-slate-200",
        isOpen ? "max-h-[40%]" : "max-h-[0px]",
      ].join(" ")}
    >
      <div className="w-full h-full relative">
        <div className="z-[99999] bg-slate-200 absolute h-[50px] top-0 left-0 w-full flex items-center gap-2 flex-wrap justify-between p-2">
          <div>
            {selectedTitle && (
              <p className="text-slate-500 text-xl font-medium">
                {selectedTitle}
              </p>
            )}
          </div>
          <button
            className="p-1 border-0 flex items-center justify-center"
            onClick={() => {
              closePanel();
            }}
          >
            <DynamicIcon
              name="x"
              size={20}
              color="black"
              className="cursor-pointer"
            />
          </button>
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
