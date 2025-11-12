import { type FC, useState, useMemo, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import type { MenuItemType } from "../../configs/types";
import { DynamicIcon } from "lucide-react/dynamic";

export const SidebarMenuItem: FC<{ data: MenuItemType }> = ({ data }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const location = useLocation();

  const isActiveParent = useMemo(() => {
    return (
      !!data.children?.some((child) => location.pathname === child.path) ||
      location.pathname === data.path
    );
  }, [location.pathname]);

  useEffect(() => {
    if (!isActiveParent && isOpenDropdown) {
      setIsOpenDropdown(false);
    }
  }, [isActiveParent]);

  if (data.children?.length) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => setIsOpenDropdown((open) => !open)}
          className={[
            "cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-colors w-full text-left",
            isActiveParent
              ? "text-sky-700 [&_svg]:stroke-sky-700 hover:bg-zinc-200"
              : "hover:bg-zinc-200 text-black",
          ].join(" ")}
        >
          {data.icon && <DynamicIcon name={data.icon as any} size={20} />}
          <span className="flex-1">{data.title}</span>
          <DynamicIcon
            name={isOpenDropdown ? "chevron-up" : ("chevron-down" as any)}
            size={16}
            color="black"
          />
        </button>

        {isOpenDropdown && (
          <div className="ml-6 mt-1 flex flex-col gap-1">
            {data.children.map((child) => (
              <SidebarMenuItem key={child.path} data={child} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={data.path}
      className={[
        "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors w-full text-left",
        isActiveParent
          ? "bg-sky-100 text-sky-700 [&_svg]:stroke-sky-700"
          : "hover:bg-zinc-200 text-black",
      ].join(" ")}
    >
      {data.icon && <DynamicIcon name={data.icon as any} size={20} />}
      <span>{data.title}</span>
    </NavLink>
  );
};
