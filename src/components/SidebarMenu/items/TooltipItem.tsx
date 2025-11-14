import { type FC, useState, memo, useEffect } from "react";
import {
  findFirstChildWithoutChildren,
  hasActiveDescendant,
} from "./utils/utilsSidebarMenuFunctions";
import { useSidebarMenuContext } from "../context/SidebarMenuContext";

import { DynamicIcon } from "lucide-react/dynamic";

import type { TooltipItemProps } from "./types";
import type { MenuItemWithState } from "../../../types/menu";

//сделала отдельные итемы для tooltip для решения проблемы с конфликтами hover

const MemoTooltipItem: FC<TooltipItemProps> = ({
  data,
  onTooltipItemClick,
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { onItemClick } = useSidebarMenuContext();

  //динамически закрываем меню если в нем нет дочерних активных элементов
  useEffect(() => {
    if (!hasActiveDescendant(data) && isOpenDropdown) {
      setIsOpenDropdown(false);
    }
  }, [data, isOpenDropdown]);

  //динамически открываем  меню если в нем есть дочерних активных элементов
  useEffect(() => {
    if (hasActiveDescendant(data) && !isOpenDropdown) {
      setIsOpenDropdown(true);
    }
  }, [data, isOpenDropdown]);

  const handleOpenDropdown = (children?: MenuItemWithState[]) => {
    if (!isOpenDropdown && children?.length) {
      const firstLeaf = findFirstChildWithoutChildren(children);
      if (firstLeaf) onItemClick(firstLeaf);
    }
  };

  const clickDefaultItem = (data: MenuItemWithState) => {
    onTooltipItemClick(data);
  };

  if (data.children?.length) {
    return (
      <div className="relative w-full">
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
          <span className="flex-1">{data.title}</span>
          <DynamicIcon
            name={isOpenDropdown ? "chevron-up" : ("chevron-down" as any)}
            size={16}
            color="black"
          />
        </button>

        {/* рекурсионная отрисовка */}
        {isOpenDropdown && (
          <div className="ml-6 mt-1 flex flex-col gap-1">
            {data.children.map((child) => (
              <TooltipItem
                onTooltipItemClick={onItemClick}
                key={child.path}
                data={child}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  //классичкская ссылка без дочерних элементов
  return (
    <div
      onClick={() => clickDefaultItem(data)}
      className={[
        "cursor-pointer relative flex items-center  rounded-lg transition-colors w-full text-left",
        data.isActive
          ? "bg-sky-100 text-sky-700 [&_svg]:stroke-sky-700"
          : "hover:bg-zinc-200 text-black",
        data.icon !== null && data.icon !== undefined ? "pr-4" : "px-3 py-1",
      ].join(" ")}
    >
      {data.icon && (
        <div className="p-[5px] rounded-lg transition-colors w-max text-left">
          {data.icon && (
            <DynamicIcon name={data.icon as any} size={20} color="black" />
          )}
        </div>
      )}
      <span>{data.title}</span>
    </div>
  );
};

export const TooltipItem = memo(MemoTooltipItem);
