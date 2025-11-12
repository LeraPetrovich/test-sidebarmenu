import { type FC, useState, useMemo, useEffect, memo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import type { MenuItemType } from "../../../configs/types";
import { DynamicIcon } from "lucide-react/dynamic";

const MemoSidebarMenuItem: FC<{ data: MenuItemType; isOpen: boolean }> = ({
  data,
  isOpen,
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const isActiveParent = useMemo(() => {
    return (
      !!data.children?.some((child) => location.pathname === child.path) ||
      location.pathname === data.path
    );
  }, [location.pathname, data]);

  useEffect(() => {
    if (!isActiveParent && isOpenDropdown && isOpen) {
      setIsOpenDropdown(false);
    }
  }, [isActiveParent, isOpen]);

  if (data.children?.length) {
    return (
      <div
        className="relative w-full"
        onMouseEnter={() => !isOpen && setIsHovered(true)}
        onMouseLeave={() => !isOpen && setIsHovered(false)}
      >
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
        {!isOpen && isHovered && (
          <div
            className="flex flex-col gap-1 z-[999] absolute top-0 left-full ml-0 bg-white shadow-lg rounded-lg border border-slate-200 p-2 z-50 min-w-[180px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="font-semibold text-gray-500 px-2 mb-1">
              {data.title}
            </div>
            {data.children.map((child) => (
              <SidebarMenuItem key={child.path} isOpen={true} data={child} />
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
        "relative flex items-center  rounded-lg transition-colors w-full text-left",
        isActiveParent
          ? "bg-sky-100 text-sky-700 [&_svg]:stroke-sky-700"
          : "hover:bg-zinc-200 text-black",
        data.icon !== null && data.icon !== undefined ? "pr-4" : "px-3 py-1",
      ].join(" ")}
      onMouseEnter={() => !isOpen && setIsHovered(true)}
      onMouseLeave={() => !isOpen && setIsHovered(false)}
    >
      {data.icon && (
        <div className="p-[5px] rounded-lg transition-colors w-max text-left">
          <DynamicIcon name={data.icon as any} size={20} color="black" />
        </div>
      )}
      {isOpen && <span>{data.title}</span>}
      {!isOpen && isHovered && (
        <div className="absolute font-bold p-1 bg-sky-700 text-white text-sm max-w-20 rounded-md z-[999] absolute top-0 left-full ml-0 mb-2">
          {data.title}
        </div>
      )}
    </NavLink>
  );
};

export const SidebarMenuItem = memo(MemoSidebarMenuItem);
