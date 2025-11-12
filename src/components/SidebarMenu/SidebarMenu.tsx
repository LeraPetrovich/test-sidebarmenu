import { useState, useMemo } from "react";
import { mainLayoutConfig } from "../../configs";
import { SidebarMenuItem } from "../SidebarMenuItem";
import { DynamicIcon } from "lucide-react/dynamic";

export const SidebarMenu = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={[
        "transition-all duration-300 bg-slate-100 border-r-[1.5px] border-slate-200 text-white h-screen overflow-scroll",
        open ? "w-64" : "w-16",
      ].join(" ")}
    >
      <div className="flex flex-col px-4 gap-2 py-5">
        <div className="flex flex-col gap-2">
          {mainLayoutConfig.map((item) => {
            return (
              <SidebarMenuItem key={item.path} isOpen={open} data={item} />
            );
          })}
        </div>
        <div className="border-t-1 border-slate-200 pt-2">
          <button
            onClick={() => setOpen((open) => !open)}
            className="flex items-center gap-2 p-[5px] rounded-lg transition-colors w-max text-left hover:bg-zinc-200 text-black"
          >
            <DynamicIcon
              name={open ? "arrow-left-from-line" : "arrow-right-from-line"}
              size={20}
              color="black"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
