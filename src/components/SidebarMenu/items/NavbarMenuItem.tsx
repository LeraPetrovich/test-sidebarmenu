import { type FC, memo } from "react";
import { useHelpPanelMenu } from "../../../contexts/HelpPanelContext";
import { DynamicIcon } from "lucide-react/dynamic";

import type { MenuItemWithState } from "../../../types/types";

//отрислвала navBarMenu отдельно чтобы не переполнять логику sidebarMenuItem и при этом смогла переиспользовать SidebarMenuItem в helppanelMenu

const MemoNavBarMenu: FC<{
  data: MenuItemWithState;
  onItemClick: (item: MenuItemWithState) => void;
}> = ({ data, onItemClick }) => {
  const { openPanel } = useHelpPanelMenu();

  if (
    data.children !== null &&
    data.children !== undefined &&
    data?.children?.length
  ) {
    return (
      <div
        className={[
          "cursor-pointer h-full p-2 flex flex-col items-center justify-center gap-1 text-black hover:text-sky-700 hover:[&_svg]:stroke-sky-700",
          data.isActive
            ? "text-sky-700 [&_svg]:stroke-sky-700"
            : "text-black [&_svg]:stroke-black",
        ].join(" ")}
        onClick={() => data.children && openPanel(data.children, data.title)}
      >
        {/* использвовала иконки уже готовые для скорости выполнеия т к собирать список своих иконок было бы достаточно затратно по времени
            если бы делала свои иконки то исопользовала vite-plugin-icons */}
        <DynamicIcon name={data.icon as any} size={20} color="black" />
        <span>{data.title}</span>
      </div>
    );
  }

  return (
    <div
      onClick={() => onItemClick(data)}
      className={[
        "cursor-pointer h-full p-2 flex flex-col items-center justify-center gap-1 hover:text-sky-700 hover:[&_svg]:stroke-sky-700",
        data.isActive
          ? "text-sky-700 [&_svg]:stroke-sky-700"
          : "text-black [&_svg]:stroke-black",
      ].join(" ")}
    >
      {/* использвовала иконки уже готовые для скорости выполнеия т к собирать список своих иконок было бы достаточно затратно по времени
            если бы делала свои иконки то исопользовала vite-plugin-icons */}
      {data.icon && (
        <DynamicIcon name={data.icon as any} size={20} color="black" />
      )}
      <span>{data.title}</span>
    </div>
  );
};

export const NavBarMenu = memo(MemoNavBarMenu);
