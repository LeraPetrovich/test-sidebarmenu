import { useState, useMemo } from "react";
import { mainLayoutConfig } from "../../configs";
import { SidebarMenuItem } from "../SidebarMenuItem";

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
        {mainLayoutConfig.map((item) => {
          return <SidebarMenuItem data={item} />;
        })}
      </div>
    </div>
  );
};
