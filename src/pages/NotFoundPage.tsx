import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { InfoPageText } from "../components";

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 items-center justify-center flex-1">
      <InfoPageText text="Page Not Found" />
      <button
        onClick={() => navigate("/")}
        className="border-0 px-3 py-2 rounded-lg bg-sky-700 text-white"
      >
        Go to main page
      </button>
    </div>
  );
};
