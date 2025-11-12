import { useEffect, useState } from "react";

//хук для отслеживания ширины экрана чтобы перебирать NavBarMenuItem и SidebarMenu item
//нужен для того чтобы убирать и добавлять элементы из дом дерева

export const useCheckPageSize = (widthPageInRem: number = 40) => {
  const [isTrueWidth, setIsTrueWidth] = useState<boolean>(false);

  const handleCheckPageWidth = () => {
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const windowInnerWidth = window.innerWidth;
    const windowSizeRem = windowInnerWidth / rootFontSize;
    setIsTrueWidth(windowSizeRem > widthPageInRem);
  };

  useEffect(() => {
    handleCheckPageWidth();

    window.addEventListener("resize", handleCheckPageWidth);

    return () => {
      window.removeEventListener("resize", handleCheckPageWidth);
    };
  }, []);

  return { isTrueWidth };
};
