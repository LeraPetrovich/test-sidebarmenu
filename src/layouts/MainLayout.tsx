import { type FC } from "react";
import { Outlet } from "react-router-dom";

export const MainLayout: FC = () => {
  return (
    <div className="flex">
      <div className="flex-[1_1_40%] bg-zinc-200"></div>
      <div className="flex-[1_1_40%] bg-zinc-400">
        <Outlet />
      </div>
    </div>
  );
};
