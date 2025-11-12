import { type FC, useMemo, memo } from "react";
import { useHelpPanelMenu } from "../../../contexts/HelpPanelContext";
import { DynamicIcon } from "lucide-react/dynamic";
import { NavLink, useLocation } from "react-router-dom";

import type { MenuItemType } from "../../../configs/types";

const MemoNavBarMenu: FC<{ data: MenuItemType }> = ({ data }) => {
  const location = useLocation();
  const { openPanel } = useHelpPanelMenu();

  const isActiveParent = useMemo(() => {
    return (
      !!data.children?.some((child) => location.pathname === child.path) ||
      location.pathname === data.path
    );
  }, [location.pathname, data]);

  if (
    data.children !== null &&
    data.children !== undefined &&
    data?.children?.length
  ) {
    return (
      <div
        className={[
          "cursor-pointer h-full p-2 flex flex-col items-center justify-center gap-1 text-black hover:text-sky-700 hover:[&_svg]:stroke-sky-700",
          isActiveParent
            ? "text-sky-700 [&_svg]:stroke-sky-700"
            : "text-black [&_svg]:stroke-black",
        ].join(" ")}
        onClick={() => data.children && openPanel(data.children, data.title)}
      >
        <DynamicIcon name={data.icon as any} size={20} color="black" />
        <span>{data.title}</span>
      </div>
    );
  }

  return (
    <NavLink
      to={data.path}
      className={[
        "cursor-pointer h-full p-2 flex flex-col items-center justify-center gap-1 hover:text-sky-700 hover:[&_svg]:stroke-sky-700",
        isActiveParent
          ? "text-sky-700 [&_svg]:stroke-sky-700"
          : "text-black [&_svg]:stroke-black",
      ].join(" ")}
    >
      <DynamicIcon name={data.icon as any} size={20} color="black" />
      <span>{data.title}</span>
    </NavLink>
  );
};

export const NavBarMenu = memo(MemoNavBarMenu);
