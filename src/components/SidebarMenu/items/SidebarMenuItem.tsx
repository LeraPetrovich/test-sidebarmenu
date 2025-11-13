import { type FC, useState, memo, useEffect } from "react";
import { useSidebarMenuContext } from "../context/SidebarMenuContext";
import {
  findFirstChildWithoutChildren,
  hasActiveDescendant,
} from "./utils/utilsSidebarMenuFunctions";

import { DynamicIcon } from "lucide-react/dynamic";

import type { SidebarMenuItemProps } from "./types";
import type { MenuItemWithState } from "../../../types/menu";

//использовала рекурсионную отрисовку items для воможности расширять компонент

const MemoSidebarMenuItem: FC<SidebarMenuItemProps> = ({ data, isOpen }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { onItemClick } = useSidebarMenuContext();

  //динамически закрываем меню если в нем нет дочерних активных элементов
  useEffect(() => {
    if (!hasActiveDescendant(data) && isOpenDropdown && isOpen) {
      setIsOpenDropdown(false);
    }
  }, [data, isOpen, isOpenDropdown]);

  useEffect(() => {
    if (hasActiveDescendant(data) && !isOpenDropdown && isOpen) {
      setIsOpenDropdown(true);
    }
  }, [data, isOpen, isOpenDropdown]);

  //отрисовала два состояния чтобы правильно использвоать NavLink

  const handleOpenDropdown = (children?: MenuItemWithState[]) => {
    if (!isOpen) return;
    // setIsOpenDropdown((prev) => !prev);

    if (!isOpenDropdown && children?.length) {
      const firstLeaf = findFirstChildWithoutChildren(children);
      if (firstLeaf) onItemClick(firstLeaf);
    }
  };

  if (data.children?.length) {
    return (
      <div
        className="relative w-full"
        onMouseEnter={() => !isOpen && setIsHovered(true)}
        onMouseLeave={() => !isOpen && setIsHovered(false)}
      >
        <button
          onClick={() => {
            handleOpenDropdown(data.children);
          }}
          className={[
            "cursor-pointer flex items-center rounded-lg transition-colors w-full text-left",
            data.isActive
              ? "text-sky-700 [&_svg]:stroke-sky-700 hover:bg-zinc-200"
              : "hover:bg-zinc-200 text-black",
            data.icon !== null && data.icon !== undefined
              ? "pr-4"
              : "px-3 py-1",
          ].join(" ")}
        >
          {/* использвовала иконки уже готовые для скорости выполнеия т к собирать список своих иконок было бы достаточно затратно по времени
            если бы делала свои иконки то исопользовала vite-plugin-icons */}
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

        {/* рекурсионная отрисовка */}
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

  //классичкская ссылка без дочерних элементов
  return (
    <div
      onClick={() => onItemClick(data)}
      className={[
        "cursor-pointer relative flex items-center  rounded-lg transition-colors w-full text-left",
        data.isActive
          ? "bg-sky-100 text-sky-700 [&_svg]:stroke-sky-700"
          : "hover:bg-zinc-200 text-black",
        data.icon !== null && data.icon !== undefined ? "pr-4" : "px-3 py-1",
      ].join(" ")}
      onMouseEnter={() => !isOpen && setIsHovered(true)}
      onMouseLeave={() => !isOpen && setIsHovered(false)}
    >
      {data.icon && (
        <div className="p-[5px] rounded-lg transition-colors w-max text-left">
          {data.icon && (
            <DynamicIcon name={data.icon as any} size={20} color="black" />
          )}
        </div>
      )}
      {isOpen && <span>{data.title}</span>}
      {!isOpen && isHovered && (
        <div className="absolute font-bold p-1 bg-sky-700 text-white text-sm max-w-20 rounded-md z-[999] absolute top-0 left-full ml-0 mb-2">
          {data.title}
        </div>
      )}
    </div>
  );
};

export const SidebarMenuItem = memo(MemoSidebarMenuItem);
