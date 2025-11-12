import { type FC } from "react";

//компонет создан для того чтобы на кадой странице не дублировать стили заголовков
export const InfoPageText: FC<{ text?: string }> = ({ text = "" }) => {
  return (
    <h1 className="md:text-4xl sm:text-lg text-base font-medium text-black">
      {text}
    </h1>
  );
};
