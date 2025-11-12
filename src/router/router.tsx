import { createBrowserRouter } from "react-router-dom";
import { App } from "../app/App";
import {
  MainPage,
  ListPage,
  NotificationPage,
  OrdersPage,
  ProductsPage,
  ReviewsPage,
  ShopPage,
  SuppliesPage,
  TasksPage,
  TicketsPage,
  TrendsPage,
  NotFoundPage,
} from "../pages";

//конфигурация доступных страниц

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      { path: "trends", element: <TrendsPage /> },
      { path: "tasks", element: <TasksPage /> },
      { path: "tickets", element: <TicketsPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "supplies", element: <SuppliesPage /> },
      { path: "list", element: <ListPage /> },
      { path: "reviews", element: <ReviewsPage /> },
      { path: "notification", element: <NotificationPage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
