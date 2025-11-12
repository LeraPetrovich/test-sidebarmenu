import { type MenuItemType } from "./types";

export const mainLayoutConfig: Array<MenuItemType> = [
  {
    path: "/",
    icon: "house",
    title: "Main",
  },
  {
    path: "/trends",
    icon: "chart-column-decreasing",
    title: "Trends",
  },
  {
    path: "/tasks",
    icon: "list-checks",
    title: "Tasks",
  },
  {
    path: "/tickets",
    icon: "square-kanban",
    title: "Tickets",
  },
  {
    path: "/inventory",
    icon: "squares-exclude",
    title: "Inventory",
    children: [
      {
        path: "/products",
        title: "Products",
      },
      {
        path: "/orders",
        title: "Orders",
      },
      {
        path: "/supplies",
        title: "Supplies",
      },
    ],
  },
  {
    path: "/clients",
    icon: "users",
    title: "Clients",
    children: [
      {
        path: "/list",
        title: "List",
      },
      {
        path: "/reviews",
        title: "Reviews",
      },
      {
        path: "/notification",
        title: "Notification",
      },
    ],
  },
  {
    path: "/shop",
    icon: "shopping-bag",
    title: "Shop",
  },
];
