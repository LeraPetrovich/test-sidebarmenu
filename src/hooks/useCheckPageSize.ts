import { useEffect, useState } from "react";

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
