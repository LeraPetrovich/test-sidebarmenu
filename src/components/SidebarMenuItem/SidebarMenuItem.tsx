import { type FC, useState, useMemo, useEffect, memo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import type { MenuItemType } from "../../configs/types";
import { DynamicIcon } from "lucide-react/dynamic";

const MemoSidebarMenuItem: FC<{ data: MenuItemType; isOpen: boolean }> = ({
  data,
  isOpen,
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const location = useLocation();

  const isActiveParent = useMemo(() => {
    return (
      !!data.children?.some((child) => location.pathname === child.path) ||
      location.pathname === data.path
    );
  }, [location.pathname]);

  useEffect(() => {
    if (!isActiveParent && isOpenDropdown && isOpen) {
      setIsOpenDropdown(false);
    }
  }, [isActiveParent, isOpen]);

  if (data.children?.length) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => {
            if (isOpen) setIsOpenDropdown((open) => !open);
          }}
          className={[
            "cursor-pointer flex items-center rounded-lg transition-colors w-full text-left",
            isActiveParent
              ? "text-sky-700 [&_svg]:stroke-sky-700 hover:bg-zinc-200"
              : "hover:bg-zinc-200 text-black",
            data.icon !== null && data.icon !== undefined
              ? "pr-4"
              : "px-3 py-1",
          ].join(" ")}
        >
          {data.icon && (
            <div className="p-[5px] rounded-lg transition-colors w-max text-left">
              <DynamicIcon name={data.icon as any} size={20} color="black" />
            </div>
          )}
          {isOpen && <span className="flex-1">{data.title}</span>}
          {isOpen && (
            <DynamicIcon
              name={isOpenDropdown ? "chevron-up" : ("chevron-down" as any)}
              size={16}
              color="black"
            />
          )}
        </button>

        {isOpenDropdown && isOpen && (
          <div className="ml-6 mt-1 flex flex-col gap-1">
            {data.children.map((child) => (
              <SidebarMenuItem isOpen={isOpen} key={child.path} data={child} />
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
        "flex items-center  rounded-lg transition-colors w-full text-left",
        isActiveParent
          ? "bg-sky-100 text-sky-700 [&_svg]:stroke-sky-700"
          : "hover:bg-zinc-200 text-black",
        data.icon !== null && data.icon !== undefined ? "pr-4" : "px-3 py-1",
      ].join(" ")}
    >
      {data.icon && (
        <div className="p-[5px] rounded-lg transition-colors w-max text-left">
          <DynamicIcon name={data.icon as any} size={20} color="black" />
        </div>
      )}
      {isOpen && <span>{data.title}</span>}
    </NavLink>
  );
};

export const SidebarMenuItem = memo(MemoSidebarMenuItem);
