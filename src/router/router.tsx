import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../app/App";
import { MainPage } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
