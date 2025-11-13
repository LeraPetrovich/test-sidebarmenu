import { type FC, useEffect, useRef } from "react";
import { useHelpPanelMenu } from "../context/HelpPanelContext";
import { SidebarMenuItem } from ".";
import { DynamicIcon } from "lucide-react/dynamic";

//панель которая доступная везде и упаравляется через контекст из хука useHelpPanelMenu

export const HelpMenu: FC = () => {
  const { isOpen, closePanel, selectedItem, selectedTitle } =
    useHelpPanelMenu();
  const panelRef = useRef<HTMLDivElement | null>(null);

  //тут проверка или клик был не по компоненту меню чтобы можно было закрыть его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        closePanel();
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closePanel]);

  return (
    <div
      className={[
        "transition-all duration-300 fixed z-[99999] w-full h-full overflow-scroll rounded-t-lg bg-white bottom-0 border-t border-l border-r border-slate-200",
        isOpen ? "max-h-[40%]" : "max-h-[0px]",
      ].join(" ")}
      ref={panelRef}
    >
      <div className="w-full h-full relative">
        <div className="z-[99999] bg-slate-200 absolute h-[50px] top-0 left-0 w-full flex items-center gap-2 flex-wrap justify-between p-2">
          <div>
            {selectedTitle && (
              <p className="text-slate-500 text-xl font-medium">
                {selectedTitle}
              </p>
            )}
          </div>
          <button
            className="p-1 border-0 flex items-center justify-center"
            onClick={() => {
              closePanel();
            }}
          >
            {/* использвовала иконки уже готовые для скорости выполнеия т к собирать список своих иконок было бы достаточно затратно по времени
            если бы делала свои иконки то исопользовала vite-plugin-icons */}
            <DynamicIcon
              name="x"
              size={20}
              color="black"
              className="cursor-pointer"
            />
          </button>
        </div>
        {/* переиспользую компонент SidebarMenuItem который был изначально настроен и имеет логику открытия item для дальнейшего расширения */}
        <div className="pt-[60px] flex flex-col gap-0 relative">
          {selectedItem &&
            selectedItem.map((item) => {
              return (
                <SidebarMenuItem isOpen={true} key={item.path} data={item} />
              );
            })}
        </div>
      </div>
    </div>
  );
};
