import { useState } from "react";
import { useCheckPageSize } from "../../hooks/useCheckPageSize";
import { buildMenuTreeData } from "../../utils/buildMenuTreeData";
import { router } from "../../router/router";

import { SidebarMenuItem, NavBarMenu } from "./items";
import { DynamicIcon } from "lucide-react/dynamic";

export const SidebarMenu = () => {
  const [open, setOpen] = useState(true);
  const { isTrueWidth } = useCheckPageSize();

  const routes = router.routes[0].children ?? [];
  const menuTree = buildMenuTreeData(routes);
  console.log(menuTree);

  return (
    <div
      className={[
        "sm:order-1 order-2 transition-all duration-300 bg-slate-100 border-r-[1.5px] border-slate-200 text-white sm:h-screen h-100px sm:overflow-x-visible overflow-x-scroll",
        isTrueWidth ? (open ? "w-64" : "w-16") : "w-full",
      ].join(" ")}
    >
      <div className="flex sm:flex-col sm:items-start items-center sm:px-4 sm:gap-2 sm:py-5">
        <div className="flex w-full sm:items-start sm:justify-start items-center justify-between sm:flex-col sm:gap-2">
          {menuTree.map((item) => {
            return isTrueWidth ? (
              <SidebarMenuItem key={item.path} isOpen={open} data={item} />
            ) : (
              <NavBarMenu key={item.path} data={item} />
            );
          })}
        </div>
        {isTrueWidth && (
          <div className="w-full border-t-1 border-slate-200 pt-2">
            <button
              onClick={() => setOpen((open) => !open)}
              className="flex items-center gap-2 p-[5px] rounded-lg transition-colors w-max text-left hover:bg-zinc-200 text-black"
            >
              {/* использвовала иконки уже готовые для скорости выполнеия т к собирать список своих иконок было бы достаточно затратно по времени
            если бы делала свои иконки то исопользовала vite-plugin-icons */}
              <DynamicIcon
                name={open ? "arrow-left-from-line" : "arrow-right-from-line"}
                size={20}
                color="black"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
