import { type FC, useMemo, memo } from "react";
import { DynamicIcon } from "lucide-react/dynamic";

import type { MenuItemType } from "../../../configs/types";

const MemoNavBarMenu: FC<{ data: MenuItemType }> = ({ data }) => {
  const isActiveParent = useMemo(() => {
    return (
      !!data.children?.some((child) => location.pathname === child.path) ||
      location.pathname === data.path
    );
  }, [location.pathname, data]);

  return (
    <div
      className={[
        "h-full p-2 d-flex flex-col items-centre justify-center gap-1",
        isActiveParent ? "" : "",
      ].join(" ")}
    >
      <DynamicIcon name={data.icon as any} size={30} color="black" />
      <span>{data.title}</span>
    </div>
  );
};

export const NavBarMenu = memo(MemoNavBarMenu);
