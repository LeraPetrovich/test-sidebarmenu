import { type FC } from "react";
import { MainLayout } from "../layouts";
import { HelpPanelContextProvider } from "../contexts/HelpPanelContext";

//оставила app, т к в других случая тут можно было бы расширить логику и использовать другие провайдеры например
export const App: FC = () => {
  return (
    <HelpPanelContextProvider>
      <MainLayout />
    </HelpPanelContextProvider>
  );
};
