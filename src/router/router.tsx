import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
        handle: {
          id: "main",
          title: "Main",
          icon: "house",
        },
      },
      {
        path: "trends",
        element: <TrendsPage />,
        handle: {
          id: "trends",
          title: "Trends",
          icon: "chart-column-decreasing",
        },
      },
      {
        path: "tasks",
        element: <TasksPage />,
        handle: {
          id: "tasks",
          title: "Tasks",
          icon: "list-checks",
        },
      },
      {
        path: "tickets",
        element: <TicketsPage />,
        handle: {
          id: "tickets",
          title: "Tickets",
          icon: "square-kanban",
        },
      },
      {
        path: "inventory",
        handle: {
          id: "inventory",
          title: "Inventory",
          icon: "squares-exclude",
        },
      },
      {
        path: "products",
        element: <ProductsPage />,
        handle: {
          id: "products",
          title: "Products",
          parent: "inventory",
        },
      },
      {
        path: "orders",
        element: <OrdersPage />,
        handle: {
          id: "orders",
          title: "Orders",
          parent: "inventory",
        },
      },
      {
        path: "supplies",
        element: <SuppliesPage />,
        handle: {
          id: "supplies",
          title: "Supplies",
          parent: "inventory",
        },
      },
      {
        path: "clients",
        element: <></>,
        handle: {
          id: "clients",
          title: "Clients",
          icon: "users",
        },
      },
      {
        path: "list",
        element: <ListPage />,
        handle: {
          id: "list",
          title: "List",
          parent: "clients",
        },
      },
      {
        path: "reviews",
        element: <ReviewsPage />,
        handle: {
          id: "reviews",
          title: "Reviews",
          parent: "clients",
        },
      },
      {
        path: "notification",
        element: <NotificationPage />,
        handle: {
          id: "notification",
          title: "Notification",
          parent: "clients",
        },
      },
      {
        path: "shop",
        element: <ShopPage />,
        handle: {
          id: "shop",
          title: "Shop",
          icon: "shopping-bag",
        },
      },
      {
        path: "*",
        element: <NotFoundPage />,
        handle: {
          id: "notFound",
          hidden: true,
        },
      },
    ],
  },
]);